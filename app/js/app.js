var app = window.app || {};
var ui = window.ui || {};

//ui methods
ui = {
    error: function(m){
        $("#msg").addClass('err').html(m).fadeIn();
    },

    ok: function(m){
        $("#msg").addClass('ok').html(m).fadeIn();
        ui.hideMsg();
    },

    hideMsg: function(){
        setTimeout(function(){
            $("#msg").hide().removeClass('ok err').html('');
        }, 5000);
    },

    markAll: function($table){
        var $cb = $table.find('thead [name=mark-all]')
            , $toCheck = $table.find('tbody td:first-child [type=checkbox]');

        $cb.on('click', function(e){
            var $cb = $(e.target)
                , isChecked = $cb.is(':checked');

            app.log($cb);
            if ( e.metaKey ) {
                //invert checked boxes
                $.each($toCheck, function(i, cb){
                    cb.checked = !cb.checked;
                })
            } else {
                $toCheck.prop('checked', isChecked);
            }
        });
    },

    shiftCheck: function($table){
        var lastChecked = null
            , $cbs = $table.find('tbody td:first-child [type=checkbox]');

        $cbs.on('click', function(e){
            var start = null
                , end = null;

            if ( !lastChecked ) {
                lastChecked = this;
                return;
            }

            if ( e.shiftKey ) {
                start = $cbs.index(this);
                end = $cbs.index(lastChecked);

                $cbs.slice(Math.min(start, end), Math.max(start, end)+1).prop('checked', lastChecked.checked);
            }

            lastChecked = this;
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

                return aVal < bVal ? -1 : ( aVal > bVal ? 1 : 0);
            });

            $th.removeClass('asc desc');
            $th.siblings().removeClass('asc desc');
            $th.addClass(dir);

            if ( dir === 'desc' ) {
                $rows.reverse();
            }

            $tbody.html($rows);
            ui.markAll($table);
            ui.shiftCheck($table);
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
        , $tbody = $table.find("tbody");

    msgs.forEach(function(item, i){
        var time = item.receivedTime;

        $tbody.append(
            '<tr>' +
                '<td><input type="checkbox" name="mark" value="1"></td>' +
                '<td data-sort="'+item.subject+'">'+item.subject+'</td>' +
                '<td data-sort="'+moment(time).unix()+'"><span title="'+time+'">'+moment(time).fromNow()+'</span></td>' +
            '</tr>'
        );
    });

    ui.markAll($table);
    ui.shiftCheck($table);
    ui.sortTable($table);

    $inbox.fadeIn();
};

(function($){
    $(function(){
        app.log('bmr ready...');

        $("#login").on('submit', login);
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

        $("#login").fadeOut(function(){
            getInbox();
            $("#inbox").fadeIn();
        });
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
})(jQuery);