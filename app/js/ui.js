var ui = window.ui || {};

//ui-specific methods
_.extend(ui, {
    globals: {
        currPage: null
    },

    timers: {
        msg: null
    },

    $body: null,
    $header: null,

    dom: {},

    init: function () {
        app.log('ui.init');

        this.$body = $("body");
        this.$header = $("body > header");

        $(window).on('popstate.ui', function(e){
//            if ( !this.globals.currPage || this.globals.currPage === 'login' ) return;

            var newPage = window.location.href.split('#')[1];

            app.log('popstate ', this.globals.currPage, newPage);

            this.navigateTo(this.globals.currPage, newPage);
        }.bind(this));

        $(document.body).on('click.ui', 'header nav a[href]', function (e) {
            e.preventDefault();

            var currPage = window.location.href.split('#')[1]
                , newPage = $(e.currentTarget).attr('href').split('#')[1];

            //logout
            /*
            if ( newPage === 'logout' ) {
                app.logout(currPage);
                return;
            }
            */

            this.navigateTo(currPage, newPage);
        }.bind(this));
    },

    navigateTo: function (currPage, newPage) {
        var $body = this.$body;

        app.log('navigateTo from ' + currPage + ' to ' + newPage);

        /*
        if ( newPage === 'logout' ) {
            app.logout(currPage);
            return;
        }
        */

        history.pushState(null, null, '#'+newPage);
        this.globals.currPage = newPage;

        if ( currPage ) {
            $body.removeClass(currPage);
            app[currPage].destroy();
        }

        $body.addClass(newPage);
        app[newPage].init();
    },

    err: function (m) {
        clearTimeout(this.timers.msg);
        $("#msg").stop().addClass('err').html(m).fadeIn();
        this.hideMsg();
    },

    ok: function (m) {
        clearTimeout(this.timers.msg);
        $("#msg").stop().addClass('ok').html(m).fadeIn();
        this.hideMsg();
    },

    hideMsg: function () {
        this.timers.msg = setTimeout(function () {
            $("#msg").fadeTo(600, .1, function () {
                $(this).slideUp(function () {
                    $(this).removeClass('ok err').html('').css({ opacity: 1});
                });
            });
        }, 2500);
    },

    markAll: function ($table) {
        var $cb = $table.find('thead [name=mark-all]')
            , $toCheck = $table.find('tbody td:first-child [type=checkbox]');

        app.log('markAll');
        $cb.on('click.ui', function (e) {
            var $cb = $(e.currentTarget)
                , isChecked = $cb.is(':checked');

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
                app.log('here', $cb, isChecked);
                $toCheck.prop('checked', isChecked);
                $toCheck.parents('tr')[( isChecked ? 'addClass' : 'removeClass' )]('highlight');
            }
        }.bind(this));
    },

    shiftCheck: {
        lastChecked: null,

        init: function ($table) {
            app.log('shiftCheck.init');

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


        $thead.find('th').on('click.ui', function (e) {
            e.preventDefault();
            $tbody.find('tr.msg').remove();

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
            $tbody.append($rows); //existing rows get re-ordered w/o loosing events
            this.shiftCheck.reset();
        }.bind(this));
    },

    destroy: function(){
        $(window).off('.ui');
        $(document).add('*').off('.ui');
    }
});