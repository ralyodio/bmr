var app = window.app || {};

//application-specific methods
_.extend(app, {
    log: function(){
        if ( !window.console ) return;

        var args = Array.prototype.slice.call(arguments);
        var log = Function.prototype.bind.call(console.log, console);

        log.apply(console, args);
    },

    showInbox: function(msgs){
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
                    '<td data-sort="'+item.subject+'"><span class="subject">'+item.subject+'</span></td>' +
                    '<td class="nowrap" data-sort="'+moment(time).unix()+'"><span title="'+time+'">'+moment(time).fromNow()+'</span></td>' +
                '</tr>'
            );
        });

        //initialize events for the table
        ui.markAll($table);
        ui.shiftCheck.init($table);
        ui.sortTable($table);
        ui.checkItem($table);
        app.readMsg($table);

        $total.text(msgs.length);
        $inbox.fadeIn();
    },

    readMsg: function($table){
        var $subjects = $table.find('tbody .subject')
        ;

        $subjects.on('click', function(e){
            app.log('read msg: ' + id);
            e.preventDefault();

            var $subject = $(e.currentTarget)
                , isOpen = !!$subject.data('isopen')
                , $row = $subject.parents('tr')
                , colCount = $row.find('td').length
                , id = $row.attr('data-id');

            if ( isOpen ) {
                $subject.data('isopen', false);
                $row.next('.msg').remove();

                return;
            }

            api.getMessage(id, function(msg){
                var to = msg.toAddress
                    , from = msg.fromAddress;

                $row.after(
                    '<tr class="msg">' +
                        '<td colspan="'+colCount+'">' +
                            '<h3 class="subject">'+msg.subject+'</h3>' +
                            '<p class="date">'+msg.receivedTime+'</p>' +
                            '<p data-from="'+from+'" class="from">From: '+from+'</p>' +
                            '<p data-to="'+to+'" class="to">To: '+to+'</p>' +
                            '<nav><a href="#" class="reply">Reply</a></nav>' +
                            '<section class="message">'+msg.message+'</section>' +
                        '</td>' +
                    '</tr>'
                );

                $subject.data('isopen', true);
            });
        });
    },

    moveToTrash: function($table, id){
        var $row = $table.find('tbody tr[data-id='+id+']')
            , $openMsg = $row.next('.msg');

        //close the open message if it has one
        if ( $openMsg.length ) {
            $openMsg.fadeOut(800, function(){
                $(this).remove();
            });
        }

        $row.fadeOut(800, function(){
            $(this).remove();
        });
    },

    actionItem: function(e){
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = $form.parents('section').find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        if ( action === 'trash' ) {
            $.each($checked, function(i, cb){
                api.moveToTrash($table, cb.value);
            });
        }
    },

    login: function(e){
        e.preventDefault();

        var $form = $(e.target)
            , data = {};

        data.user = $form.find('input[name=user]').val();
        data.pass = $form.find('input[name=pass]').val();
        data.host = $form.find('input[name=host]').val();
        data.port = $form.find('input[name=port]').val();

        api.login(data, function(){
            ui.ok('Successfully connected to API');

            //move to app.hideLogin
            $("#login").hide({
                duration: 0,
                complete: function(){
                    api.getInbox();
                    //these could be moved to getInbox + spinner
                    $("body > header").show();
                    $("a.inbox").addClass('active');
                }
            });
        });
    }
});