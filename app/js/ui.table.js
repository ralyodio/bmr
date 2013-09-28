ui.create('table', {
    init: function($table){
        //initialize events for the table
        // TODO move to ui.table.init($table)
        this.markAll($table);
        this.shiftCheck.init($table);
        this.sortTable($table);
        this.checkItem($table);
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

                //when numbers convert to integer
                if ( /^\d+$/.test(aVal) && /^\d+$/.test(bVal) ) {
                    aVal = parseInt(aVal);
                    bVal = parseInt(bVal);
                }

                if (dir === 'desc') {
                    return aVal < bVal ? 1 : ( aVal > bVal ? -1 : 0);
                }

                return aVal < bVal ? -1 : ( aVal > bVal ? 1 : 0);
            });

            $th.removeClass('asc desc');
            $th.siblings().removeClass('asc desc');
            $th.addClass(dir);
            $tbody.html($rows); //existing rows get re-ordered w/o loosing events when .append()
            this.shiftCheck.reset();
        }.bind(this));
    }
});