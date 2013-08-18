app.inbox = window.app.inbox = {};

_.extend(app.inbox, {
    init: function () {
        app.log('Inbox init');

        ui.init();
        api.getInbox(); //needs spinner

        $("body > header").show();
        $("a.inbox").addClass('active');

        $("#inbox-action").on('submit.inbox', this.actionItem);

        $("#inbox table").on('click.inbox', 'tr.msg nav a.trash', function (e) {
            e.preventDefault();

            var $el = $(e.currentTarget)
                , $table = $el.parents('table')
                , id = $el.attr('data-id');

            api.moveToTrash($table, id);
        });
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

            //app.log(item);

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
        this.readMsg($table);

        $total.text(msgs.length);
        $inbox.fadeIn();
    },

    readMsg: function($table){
        var $subjects = $table.find('tbody .subject');

        $subjects.on('click.inbox', function(e){
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

                app.log('msg', msg);

                $row.after(
                    '<tr class="msg">' +
                        '<td colspan="'+colCount+'">' +
                        '<h3 class="subject">'+msg.subject+'</h3>' +
                        '<p class="date">'+msg.receivedTime+'</p>' +
                        '<p data-from="'+from+'" class="from">From: '+from+'</p>' +
                        '<p data-to="'+to+'" class="to">To: '+to+'</p>' +
                        '<nav>' +
                        '<a href="#" class="reply" data-id="'+msg.msgid+'">Reply</a>' +
                        '<a href="#" class="trash" data-id="'+msg.msgid+'">Trash</a>' +
                        '</nav>' +
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

        $row.fadeOut(600, function(){
            var $total = $("a.inbox .total")
                , total = $total.text()-1;

            $total.text(total);
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

    destroy: function () {
        var $inbox = $("#inbox");

        ui.destroy();
        $(document).add('*').off('.inbox .ui');

        $inbox.hide();
        $inbox.find("tbody").empty();

        if ( ui.globals.currPage === 'login' ) {
            $("body > header").hide();
            ui.$header.hide();
        }
    }
});