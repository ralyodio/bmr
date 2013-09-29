var ui = window.ui || {};

//ui-specific methods
_.extend(ui, {
    globals: {
        currPage: null
    },

    timers: {
        msg: null,
        inbox: null
    },

    $body: null,
    $header: null,
    $content: null,
    $pg: null,
    $modal: null,
    $nav: null,
    ns: null,

    dom: {},

    init: function (ns) {
        this.logger();
        c.log('ui.init');

        this.ns = ns;
        this.$body = $('body');
        this.$header = this.$body.find('> header');
        this.$nav = this.$body.find('> nav.global');
        this.$content = this.$body.find('> #content');

        $(window).on('popstate.ui', function(e){
            //debugger;
            c.log('e.state', e.state);

            var newPage = window.location.href.split('#')[1];

            c.log('popstate ', this.globals.currPage, newPage);
            this.navigateTo(this.globals.currPage, newPage);
        }.bind(this));

        $(document.body).on('click.ui', '> header nav a[href]', function (e) {
            e.preventDefault();

            var type = $(e.target).attr('data-type')
                , currPage = window.location.href.split('#')[1]
                , newPage = $(e.currentTarget).attr('href').split('#')[1];

            if ( type === 'modal' ){
                app[newPage].init();
            } else {
                this.navigateTo(currPage, newPage);
            }
        }.bind(this));

        ui.$body.on('click.ui', 'a.ext', function(e){
            e.preventDefault();

            var $el = $(e.currentTarget);
            ui.win($el.attr('href'));
        });
    },

    create: function(namespace, object){
        var base = {
            parent: this
        };

        ui[namespace] = window.ui[namespace] || {};

        _.extend(base, object, { ns: namespace }); //override base class with implementation
        _.extend(ui[namespace], base);
    },

    navigateTo: function (currPage, newPage) {
        var $body = this.$body;

        c.log('navigateTo from ' + currPage + ' to ' + newPage);

        history.pushState(null, null, '#'+newPage);
        this.globals.currPage = newPage;

        if ( currPage ) {
            $body.removeClass(currPage);
            app[currPage].destroy();
        } else {
            //normally currPage.destroy() will call app.destroy() (above)
            //but we don't have a currPage to destroy here
            app.destroy();
        }


        $body.addClass(newPage);

        //close existing modal
        if ( this.$modal ) {
            this.modal.hide(); //ui.modal
        }

        app[newPage].init();
    },

    logger: function(){
        var fn = function(){};

        window.c = window.console ? console : { log: fn, warn: fn, dir: fn, error: fn, info: fn };
    },

    err: function (m) {
        this.showMsg(m, 'err');
    },

    ok: function (m) {
        this.showMsg(m, 'ok');
    },

    showMsg: function(m, type){
        var $msg = $("#msg");

        clearTimeout(this.timers.msg);

        if ( $msg.is(':animated') ) {
            $msg.stop().css('opacity', 1);
        }

        $msg.removeClass('ok err').show().addClass(type).html(m).fadeTo(250, 1);
        this.hideMsg();
    },

    hideMsg: function () {
        this.timers.msg = setTimeout(function () {
            $("#msg").fadeTo(600, 0, function () {
                $(this).removeClass('ok err').html('').hide();
            });
        }, 3000);
    },

    resetForm: function($form){
        var $fieldsets = $form.find('fieldset');

        this.clearFormErrors($form);
        $form[0].reset();

        $fieldsets.hide();
        $fieldsets.first().slideDown();
    },

    clearFormErrors: function($form){
        var $labels = $form.find('label');

        $labels.removeClass('error');
    },

    filter: function(toFilter){
        c.log('ui.filter');

        var $filter = this.$pg.find('#filter');

        $filter.find('#filter-value').on('keyup.ui', function(e){
            this.filterInput(e, toFilter);
        }.bind(this));
        $filter.find('button[type=reset]').on('click.ui', this.resetFilter.bind(this));
        $filter.on('submit.ui', function(e){
            e.preventDefault();
        });
    },

    resetFilter: function(e){
        var $tbody = this.$pg.find('tbody')
            , total = $tbody.find('tr').length;

        $tbody.find('tr').removeClass('hide');
        this.$header.find('a.'+this.ns+' .total').text(total);
    },

    filterInput: function(e, toFilter){
        var val = this.$pg.find('#filter-value').val().toLowerCase()
            , $rows = this.$pg.find('tbody tr');

        toFilter = toFilter || '.subject';

        //add :meta filters - :unread, :read, :to, :from
        $.each($rows, function(i, row){
            var $row = $(row)
                , subject = $row.find(toFilter).text().toLowerCase()
                , toMatch
                , re
                , metaField
                , hasMatch = true;

            c.log('filter subject', subject);
            c.log('filter test value', val);

            // meta filters, :read, :unread, :from, :to
            if ( val.indexOf(':') === 0 ) {
                if ( val === ':unread' ) {
                    hasMatch = $row.hasClass('unread');
                } else if ( val === ':read' ) {
                    hasMatch = !$row.hasClass('unread');
                } else if ( /^:from ./.test(val) ) {
                    //TODO data-from should be replaced with data-address everywhere
                    toMatch = val.substr(val.indexOf(' ')+1, val.length).toLowerCase();
                    metaField = $row.find('.from').attr('data-from').toLowerCase();
                    re = new RegExp(toMatch);

                    hasMatch = re.test(metaField);
                } else if ( /^:to ./.test(val) ) {
                    //TODO data-to should be replaced with data-address everywhere
                    toMatch = val.substr(val.indexOf(' ')+1, val.length).toLowerCase();
                    metaField = $row.find('.to').attr('data-address').toLowerCase();
                    re = new RegExp(toMatch);

                    hasMatch = re.test(metaField);
                }
            } else {
                hasMatch = subject.indexOf(val) > -1;
            }

            $row[( hasMatch ? 'removeClass' : 'addClass' )]('hide');
        });

        this.$header.find('a.'+this.ns+' .total').text(this.$pg.find('tbody tr:visible').length);
    },

    showActionFields: function(e){
        var $option = $(e.currentTarget).find('option:selected')
            , $form = $(e.target).parents('form')
            , action = $option.val()
            , $active = $form.find('fieldset#'+action)
            , $fieldsets;

        if ( $active.length ) {
            $fieldsets = $active.siblings('fieldset');
            $fieldsets.hide();
            $active.slideDown();
        } else {
            $fieldsets = $form.find('fieldset');
            $fieldsets.hide();
        }
    },

    isInViewport: function($el) {
        var el = $el.get(0)
            , rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document. documentElement.clientWidth) /*or $(window).width() */
        );
    },

    sortByDateAttr: function(data, attr){
        return data.sort(function(a, b){
            var aVal = moment(a[attr]).unix()
                , bVal = moment(b[attr]).unix();

            return aVal < bVal ? 1 : ( aVal > bVal ? -1 : 0);
        });
    },

    spin: function($target, opts){
        var defaults = {
            lines: 11,
            width: 2,
            radius: 0,
            length: 8,
            color: '#999'
        };

        _.extend(defaults, opts);

        return new Spinner(defaults).spin($target.get(0));
    },

    help: function(name){
        //TODO show user interface help
        //lookup template by name
        //display tooltip next to trigger element in UI
    },

    win: function(url){
        var gui = require('nw.gui');

        // Create a new window and get it
        return gui.Window.open(url, {
            position: 'center',
            width: 800,
            height: 600
        });
    },

    tpl: function(name, data){
        return Handlebars.templates[name](data);
    },

    partial: function(name){
        var html = Handlebars.templates[name];

        return Handlebars.registerPartial(name, html);
    },

    textSelect: function(){
        //TODO copy to clipboard using nw-win
        //http://jsfiddle.net/qY7gE/
    },

    tabKey: function(e){
        //selection does not work
        var $textarea = $(e.currentTarget);

        $textarea.on('keydown.ui.modal', function(e) {
            c.log('keydown', e);

            if(e.keyCode === 9) { // tab was pressed
                // prevent the focus lose
                e.preventDefault();

                // get caret position/selection
                var start = this.selectionStart;
                var end = this.selectionEnd;

                var $this = $(this);
                var value = $this.val();

                // set textarea value to: text before caret + tab + text after caret
                $this.val(value.substring(0, start)
                    + "\t"
                    + value.substring(end));

                // put caret at right position again (add one for the tab)
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    },

    settings: function(key, value){
        var data = this.store.get('settings');

        //key can be an object to replace existing value, or a key+value pair to set an attribute
        if ( _.isObject(key) || value || value === null ) {
            //key, value pair
            if ( value ) {
                data[key] = value;
            } else if ( value === null ) {
                delete data[key];
            } else {
                //replacement object
                data = key;
            }

            this.store.set('settings', data);
        } else if ( key === null ) {
            this.store.remove('settings');
        } else if ( key ) {
            return data[key];
        } else {
            return data;
        }
    },

    store: {
        get: function(key){
            return JSON.parse(localStorage.getItem(key)) || {};
        },

        set: function(key, value){
            var data = _.isObject(value) ? JSON.stringify(value) : value;

            localStorage.setItem(key, data);
        },

        remove: function(key){
            localStorage.removeItem(key);
        }
    },

    destroy: function(){
        c.log('ui.destroy');
        this.ns = null;

        $(window).off('.ui');
        $(document).add('*').off('.ui');

        if ( this.$pg ) this.$pg.remove();

        if (this.globals.currPage === 'login') {
            this.$header.addClass('hide');
            this.$nav.addClass('hide');
        }
    }
});