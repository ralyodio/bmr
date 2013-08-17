var app = window.app || {};
var ui = window.ui || {};

//ui methods
ui = {
    globals: {},

    error: function(m){
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

        $.fn.reverse = [].reverse; //provide a way to reverse the sort

        $thead.find('th').on('click', function(e){
            //e.preventDefault();

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
};

app.log = function(){
    if ( !window.console ) return;

    var args = Array.prototype.slice.call(arguments);
    var log = Function.prototype.bind.call(console.log, console);

    log.apply(console, args);
};

app.showInbox = function(msgs){
    var $inbox = $("#inbox")
        , $table = $inbox.find('table')
        , $total = $('a.inbox .total')
        , $tbody = $table.find("tbody");

    //msgs = msgs.slice(0, 10);
    msgs.forEach(function(item, i){
        var time = item.receivedTime
            , from = item.fromAddress
            , to = item.toAddress
            , id = item.msgid;

        app.log(item);

        $tbody.append(
            '<tr data-id="'+id+'">' +
                '<td><input type="checkbox" name="mark" value="'+id+'"></td>' +
                '<td data-sort="'+from+'"><span class="nowrap" data-from="'+from+'">'+from+'</span></td>' +
                '<td data-sort="'+to+'"><span class="nowrap" data-to="'+to+'">'+to+'</span></td>' +
                '<td data-sort="'+item.subject+'"><span>'+item.subject+'</span></td>' +
                '<td class="nowrap" data-sort="'+moment(time).unix()+'"><span title="'+time+'">'+moment(time).fromNow()+'</span></td>' +
            '</tr>'
        );
    });

    //initialize events for the table
    ui.markAll($table);
    ui.shiftCheck.init($table);
    ui.sortTable($table);
    ui.checkItem($table);

    $total.text(msgs.length);
    $inbox.fadeIn();
};

app.moveToTrash = function($table, id){
    var $row = $table.find('tbody tr[data-id='+id+']');

    $row.fadeOut(800);
};

(function($){
    $(function(){
        app.log('bmr ready...');

        $("#login").on('submit', login);
        $("#inbox-action").on('submit', actionItem);
    });

    function login(e){
        e.preventDefault();

        var $form = $(e.target)
            , user = $form.find('input[name=user]').val()
            , pass = $form.find('input[name=pass]').val()
            , host = $form.find('input[name=host]').val()
            , port = $form.find('input[name=port]').val()
            ;

        try {
            app.conn = require('bitmessage-node')(host, port, user, pass);
        } catch (err) {
            ui.err('Could not connect');
            return;
        }

        ui.ok('Successfully connected to API');

        $("#login").hide({
            duration: 0,
            complete: function(){
                getInbox();
                //these could be moved to getInbox + spinner
                $("body > header").show();
                $("a.inbox").addClass('active');
            }
        });
    }

    function actionItem(e){
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = $form.parents('section').find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        if ( action === 'trash' ) {
            $.each($checked, function(i, cb){
                moveToTrash($table, cb.value);
            });
        }
    }

    function getInbox(){
        try {
            app.conn.messages.inbox.list(function(msgs) {
                app.showInbox(msgs);
            });
        } catch (err) {
            app.log(err);
            return;
        }
    }

    function sentMessages(){
        try {
            app.conn.messages.sent.list(function(msgs) {
                app.log(msgs);
            });
        } catch (err){
            app.log(err);
        }
    }

    function moveToTrash($table, id){
        app.log('moveToTrash: ', id);

        try {
            app.conn.messages.moveToTrash(id, function(msg) {
                ui.ok(msg);
                app.moveToTrash($table, id);
            });
        } catch (err){
            app.log(err);
        }
    }
})(jQuery);