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
    ns: null,

    dom: {},

    init: function (ns) {
        this.logger();

        c.log('ui.init');

        this.ns = ns;
        this.$body = $('body');
        this.$header = this.$body.find('> header');
        this.$content = this.$body.find('> #content');

        $(window).on('popstate.ui', function(){
            var newPage = window.location.href.split('#')[1];

            c.log('popstate ', this.globals.currPage, newPage);
            this.navigateTo(this.globals.currPage, newPage);
        }.bind(this));

        $(document.body).on('click.ui', 'header nav a[href]', function (e) {
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
    },

    navigateTo: function (currPage, newPage) {
        var $body = this.$body;

        c.log('navigateTo from ' + currPage + ' to ' + newPage);

        history.pushState(null, null, '#'+newPage);
        this.globals.currPage = newPage;

        if ( currPage ) {
            $body.removeClass(currPage);
            app[currPage].destroy();
        }

        $body.addClass(newPage);

        //close existing modal
        if ( this.$modal ) {
            this.modal.hide();
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

        $msg.addClass(type).html(m).fadeTo(250, 1);
        this.hideMsg();
    },

    hideMsg: function () {
        this.timers.msg = setTimeout(function () {
            $("#msg").fadeTo(600, 0, function () {
                $(this).removeClass('ok err').html('');
            });
        }, 3000);
    },

    markAll: function ($table) {
        c.log('markAll');

        $table.on('click.ui', 'thead [name=mark-all]', function (e) {
            var $cb = $(e.currentTarget)
                , isChecked = $cb.prop('checked')
                , $toCheck = $table.find('tbody tr:visible td:first-child [type=checkbox]'); //only visible rows.

            if (e.metaKey) {
                //invert checked boxes
                $.each($toCheck, function (i, _cb) {
                    var $_cb = $(_cb)
                        , $_tr = $_cb.parents('tr')
                        , _oppChecked = !$_cb.is(':checked');

                    $_cb.prop('checked', _oppChecked);
                    $_tr[( _oppChecked ? 'addClass' : 'removeClass' )]('highlight');

                    //cb.checked = !cb.checked;
                }.bind(this))
            } else {
                c.log('here', $cb, isChecked);
                $toCheck.prop('checked', isChecked); //bug?
                $toCheck.parents('tr')[( isChecked ? 'addClass' : 'removeClass' )]('highlight');
            }
        }.bind(this));
    },

    shiftCheck: {
        lastChecked: null,

        init: function ($table) {
            c.log('shiftCheck.init');

            this.reset();

            $table.on('click.ui', 'tbody td:first-child [type=checkbox]', function (e) {
                var start = null
                    , end = null
                    , _this = e.currentTarget
                    , _$tbody = $(_this).parents('tbody')
                    , $_cbs = _$tbody.find('tr:visible td:first-child [type=checkbox]') //get the re-ordered list, only visible
                    , $checked;

                if (!this.lastChecked) {
                    this.lastChecked = _this;
                    return;
                }

                if (e.shiftKey) {
                    start = $_cbs.index(_this);
                    end = $_cbs.index(this.lastChecked);

                    //grab the boxes to auto-check
                    $checked = $_cbs.slice(Math.min(start, end), Math.max(start, end) + 1);
                    $checked.prop('checked', this.lastChecked.checked);
                    $checked.parents('tr')[( this.lastChecked.checked ? 'addClass' : 'removeClass' )]('highlight');
                }

                this.lastChecked = _this;
            }.bind(this));
        },

        initOld: function ($table) {
            c.log('shiftCheck.init');

            var $cbs = $table.find('tbody td:first-child [type=checkbox]');

            this.reset();

            $cbs.on('click.ui', function (e) {
                var start = null
                    , end = null
                    , _this = e.currentTarget
                    , $_cbs = $table.find('tbody td:first-child [type=checkbox]') //get the re-ordered list
                    , $checked;

                if (!this.lastChecked) {
                    this.lastChecked = _this;
                    return;
                }

                if (e.shiftKey) {
                    start = $_cbs.index(_this);
                    end = $_cbs.index(this.lastChecked);

                    //grab the boxes to auto-check
                    $checked = $_cbs.slice(Math.min(start, end), Math.max(start, end) + 1);
                    $checked.prop('checked', this.lastChecked.checked);
                    $checked.parents('tr')[( this.lastChecked.checked ? 'addClass' : 'removeClass' )]('highlight');
                }

                this.lastChecked = _this;
            }.bind(this));
        },

        reset: function () {
            this.lastChecked = null;
        }
    },

    checkItem: function ($table) {
        $table.find('tbody').on('click.ui', 'td:first-child [type=checkbox]', function (e) {
            var $cb = $(e.currentTarget)
                , $row = $cb.parents('tr')
                , isChecked = $cb.is(':checked');

            $row[( isChecked ? 'addClass' : 'removeClass' )]('highlight');
        }.bind(this));
    },

    checkItemOld: function ($table) {
        var $cbs = $table.find('tbody td:first-child [type=checkbox]');

        $cbs.on('click.ui', function (e) {
            var $cb = $(e.target)
                , $row = $cb.parents('tr')
                , isChecked = $cb.is(':checked');

            $row[( isChecked ? 'addClass' : 'removeClass' )]('highlight');
        }.bind(this));
    },

    sortTable: function ($table) {
        var $thead = $table.find('thead')
            , $tbody = $table.find('tbody');

        $thead.on('click.ui', 'th:not(.no-sort)', function (e) {
            e.preventDefault();

            $tbody.find('tr.msg').remove(); //remove open messages

            var $th = $(e.currentTarget)
                , $rows = $tbody.find('tr')
                , pos = $thead.find('th').index($th) + 1
                , dir = $th.hasClass('asc') ? 'desc' : 'asc';

            if ($th.hasClass('no-sort')) return;

            $rows.sort(function (a, b) {
                var $a = $(a).find('td:nth-child(' + pos + ')')
                    , $b = $(b).find('td:nth-child(' + pos + ')')
                    , aVal
                    , bVal;

                aVal = $a.attr('data-sort').toLowerCase();
                bVal = $b.attr('data-sort').toLowerCase();

                if (dir === 'desc') {
                    return aVal < bVal ? 1 : ( aVal > bVal ? -1 : 0);
                }

                return aVal < bVal ? -1 : ( aVal > bVal ? 1 : 0);
            });

            $th.removeClass('asc desc');
            $th.siblings().removeClass('asc desc');
            $th.addClass(dir);
            $tbody.append($rows); //existing rows get re-ordered w/o loosing events when .append()
            this.shiftCheck.reset();
        }.bind(this));
    },

    resetForm: function($form){
        this.clearFormErrors($form);
        $form[0].reset();
    },

    clearFormErrors: function($form){
        var $labels = $form.find('label');

        $labels.removeClass('error');
    },

    filter: function(){
        this.$pg.find('#filter-value').on('input.ui', this.filterInput.bind(this));
        this.$pg.find('#filter button[type=reset]').on('click.ui', this.resetFilter.bind(this));
        this.$pg.find('#filter #include').on('click.ui', function(e){
            this.filterInput.call(this);
        }.bind(this));
    },

    resetFilter: function(e){
        this.$pg.find('tbody tr').show();
        this.$header.find('a.'+this.ns+' .total').text(this.$pg.find('tbody tr:visible').length);
    },

    filterInput: function(e){
        var val = this.$pg.find('#filter-value').val().toLowerCase()
            , $include = this.$pg.find('#include')
            , includeField = $include.prop('checked')
            , $rows = this.$pg.find('tbody tr');

        //add :meta filters, like :unread, :read

        $.each($rows, function(i, row){
            var $row = $(row)
                , field = $row.find('.'+$include.val()).text().toLowerCase()
                , subject = $row.find('.subject').text().toLowerCase()
                , hasMatch = true;

            // meta filters
            if ( val.indexOf(':') === 0 ) {
                if ( val === ':unread' ) {
                    hasMatch = $row.hasClass('unread');
                } else if ( val === ':read' ) {
                    hasMatch = !$row.hasClass('unread');
                }
            } else {
                if ( includeField ) {
                    hasMatch = subject.indexOf(val) > -1 || field.indexOf(val) > -1;
                } else {
                    hasMatch = subject.indexOf(val) > -1;
                }
            }

            $row[( hasMatch ? 'show' : 'hide' )]();
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

    textSelect: function(){
        //http://jsfiddle.net/qY7gE/
        $(document)
    },

    create: function(namespace, object){
        var base = {
            parent: this
        };

        ui[namespace] = window.ui[namespace] || {};

        _.extend(base, object, { ns: namespace }); //override base class with implementation
        _.extend(ui[namespace], base);
    },

    destroy: function(){
        this.ns = null;

        $(window).off('.ui');
        $(document).add('*').off('.ui');

        if (this.globals.currPage === 'login') {
            this.$header.hide();
        }
    }
});