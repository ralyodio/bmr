var ui = window.ui || {};

//ui-specific methods
_.extend(ui, {
    globals: {},

    err: function(m){
        $("#msg").addClass('err').html(m).fadeIn();
    },

    ok: function(m){
        $("#msg").addClass('ok').html(m).fadeIn();
        ui.hideMsg();
    },

    hideMsg: function(){
        setTimeout(function(){
            $("#msg").fadeTo(800, .1, function(){
                $(this).slideUp(function(){
                    $(this).removeClass('ok err').html('').css({ opacity: 1});
                });
            });
        }, 5000);
    },

    markAll: function($table){
        var $cb = $table.find('thead [name=mark-all]')
            , $toCheck = $table.find('tbody td:first-child [type=checkbox]');

        app.log('markAll');
        $cb.on('click', function(e){
            var $cb = $(e.target)
                , isChecked = $cb.is(':checked');

            app.log(e);
            if ( e.metaKey ) {
                //invert checked boxes
                $.each($toCheck, function(i, _cb){
                    var $_cb = $(_cb)
                        , $_tr = $_cb.parents('tr')
                        , _oppChecked = !$_cb.is(':checked');

                    $_cb.prop('checked', _oppChecked);
                    $_tr[( _oppChecked ? 'addClass' : 'removeClass' )]('highlight');

                    //cb.checked = !cb.checked;
                })
            } else {
                $toCheck.prop('checked', isChecked);
                $toCheck.parents('tr')[( isChecked ? 'addClass' : 'removeClass' )]('highlight');
            }
        });
    },

    shiftCheck: {
        lastChecked: null,

        init: function($table) {
            var $cbs = $table.find('tbody td:first-child [type=checkbox]');

            this.reset();

            $cbs.on('click', function(e){
                var start = null
                    , end = null
                    , _this = e.currentTarget
                    , $_cbs = $table.find('tbody td:first-child [type=checkbox]') //get the re-ordered list
                    , $checked;

                if ( !this.lastChecked ) {
                    this.lastChecked = _this;
                    return;
                }

                if ( e.shiftKey ) {
                    start = $_cbs.index(_this);
                    end = $_cbs.index(this.lastChecked);

                    //grab the boxes to auto-check
                    $checked = $_cbs.slice(Math.min(start, end), Math.max(start, end)+1);
                    $checked.prop('checked', this.lastChecked.checked);
                    $checked.parents('tr')[( this.lastChecked.checked ? 'addClass' : 'removeClass' )]('highlight');
                }

                this.lastChecked = _this;
            }.bind(this));
        },

        reset: function(){
            this.lastChecked = null;
        }
    },

    checkItem: function($table){
        var $cbs = $table.find('tbody td:first-child [type=checkbox]');

        $cbs.on('click', function(e){
            var $cb = $(e.target)
                , $row = $cb.parents('tr')
                , isChecked = $cb.is(':checked');

            $row[( isChecked ? 'addClass' : 'removeClass' )]('highlight');
        });
    },

    sortTable: function($table){
        var $thead = $table.find('thead')
            , $tbody = $table.find('tbody');


        $thead.find('th').on('click', function(e){
            e.preventDefault();
            $tbody.find('tr.msg').remove();

            var $th = $(e.currentTarget)
                , $rows = $tbody.find('tr')
                , pos = $thead.find('th').index($th)+1
                , dir = $th.hasClass('asc') ? 'desc' : 'asc';

            if ( $th.hasClass('no-sort') ) return;

            $rows.sort(function(a, b){
                var $a = $(a).find('td:nth-child('+pos+')')
                    , $b = $(b).find('td:nth-child('+pos+')')
                    , aVal
                    , bVal;

                aVal = $a.attr('data-sort').toLowerCase();
                bVal = $b.attr('data-sort').toLowerCase();

                if ( dir === 'desc' ) {
                    return aVal < bVal ? 1 : ( aVal > bVal ? -1 : 0);
                }

                return aVal < bVal ? -1 : ( aVal > bVal ? 1 : 0);
                //return bVal - aVal;
            });

            $th.removeClass('asc desc');
            $th.siblings().removeClass('asc desc');
            $th.addClass(dir);
            $tbody.append($rows); //existing rows get re-ordered w/o loosing events
            ui.shiftCheck.reset();
        });
    }
});