app.create('inbox', {
    init: function () {
        if (!api.conn) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        c.log('app.inbox.init');

        ui.init();
        api.getInbox(); //needs spinner

        $("body > header").show();
        $("a.inbox").addClass('active').siblings().removeClass('active');

        $("#inbox-action").on('submit.inbox', this.actionItem.bind(this));

        //handle click events on open messages
        $("#inbox table").on('click.inbox', 'tr.msg', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , $row = $(e.currentTarget)
                , id = $row.attr('data-msgid'); //msg.msgid

            //handle msg actions
            if ( $el.is('a.trash') ) {
                c.log('trash msg');
                api.moveToTrash(id, this.moveToTrash);

            } else if ( $el.is('a.close') ) {
                c.log('close msg');
                this.hideMsg(id);
            } else if ( $el.is('a.reply') ) {
                this.showReply(id);
            }
        }.bind(this));
    },

    showReply: function(id){
        //create base modal
        var $modal = ui.modal('', {
            header: 'Reply to message',
            primaryText: 'Reply'
        });

        api.getMessage(id, function(msg){
            api.listAddresses(function(identities){
                var options = '';

                _.each(identities, function(id){
                    options += '<option value="'+id.address+'">'+id.label+'</option>';
                });

                var form = (
                    '<form id="reply" method="post">' +
                        '<input type="hidden" name="id" value="'+msg.msgid+'">' +
                        '<fieldset>' +
                        '<p>' +
                            '<label for="reply-from">From</label>' +
                            '<select name="from" id="reply-from">'+ options +'</select>' +
                        '</p>' +
                        '<p><label for="reply-to">To</label> <input type="text" name="to" id="reply-to" value="'+msg.fromAddress+'"></p>' +
                        '<p><label for="reply-subject">Subject</label> <input type="text" name="subject" id="reply-subject" value="'+msg.subject+'"></p>' +
                        '<textarea name="message" class="message" id="reply-body">' +
                        '&#13;&#10;&#13;&#10;------------------------------------------------------&#13;&#10;' +
                        msg.message +
                        '</textarea>' +
                        '</fieldset>' +
                        '</form>'
                    );

                //populate the modal
                $modal.find('> section').append(form);
                $modal.trigger('resize.ui.modal');
                $modal.find('textarea.message').focus();

                //handle modal primary button click
                $modal.on('primary.ui.modal', function(e, spin){
                    var f = $("#reply").get(0)
                        , toAddress = f.to.value
                        , fromAddress = f.from.value
                        , subject = f.subject.value
                        , message = f.message.value;

                    c.log('Sending message', f);

                    api.sendMessage(toAddress, fromAddress, subject, message, function(ackdata){
                        c.log(ackdata);

                        spin.stop();
                        ui.hideModal();
                        ui.ok("Your reply has been sent");
                    });
                });
            });
        });
    },

    showInbox: function (msgs) {
        var $inbox = $("#inbox")
            , $table = $inbox.find('table')
            , $total = $('a.inbox .total')
            , $tbody = $table.find("tbody");

        //msgs = msgs.slice(0, 10);

        //default to most recent first
        msgs = ui.sortByDateAttr(msgs, 'receivedTime');

        msgs.forEach(function (item) {
            var time = item.receivedTime
                , from = item.fromAddress
                , to = item.toAddress
                , id = item.msgid;

            //c.log(item);

            $tbody.append(
                '<tr data-id="' + id + '">' +
                    '<td class="mark-item"><input type="checkbox" name="mark" value="' + id + '"></td>' +
                    '<td data-sort="' + from + '"><span class="nowrap" data-from="' + from + '">' + from + '</span></td>' +
                    '<td data-sort="' + to + '"><span class="nowrap" data-to="' + to + '">' + to + '</span></td>' +
                    '<td data-sort="' + item.subject + '"><span class="subject wrap">' + item.subject + '</span></td>' +
                    '<td class="nowrap" data-sort="' + moment(time).unix() + '"><span title="' + time + '">' + moment(time).fromNow() + '</span></td>' +
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

    preShowMsg: function(id){
        c.log('preShowMsg');

        var $row = $('#inbox tbody tr[data-id='+id+']')
            , colCount = $row.find('td').length;

        $row.after(
            '<tr class="msg" data-msgid="'+id+'">' +
                '<td colspan="' + colCount + '">' +
                    '<div class="content loading"></div>' +
                '</td>' +
            '</tr>'
        );
    },

    showMsg: function(msg){
        var $row = $('#inbox tbody tr[data-id='+msg.msgid+']')
            , to = msg.toAddress
            , from = msg.fromAddress
            , $msg = $row.next('.msg')
            , $content = $msg.find('.content');

        c.log('show msg: ', msg);

        $content.append(
            '<a href="#" class="close">Close</a>' +
            '<h3 class="subject">' + msg.subject + '</h3>' +
            '<p class="date">' + msg.receivedTime + '</p>' +
            '<p data-from="' + from + '" class="from">From: ' + from + '</p>' +
            '<p data-to="' + to + '" class="to">To: ' + to + '</p>' +
            '<nav>' +
                '<a href="#" class="reply">Reply</a>' +
                '<a href="#" class="trash">Trash</a>' +
            '</nav>' +
            '<section class="message">' + msg.message + '</section>'
        );

        $content.removeClass('loading');
        $row.data('isopen', true);
    },

    hideMsg: function(id){
        c.log('hideMsg: ', id);

        var $row = $('#inbox tbody tr[data-id='+id+']');

        $row.data('isopen', false);
        $row.next('.msg').remove();
    },

    readMsg: function ($table) {
        var $subjects = $table.find('tbody .subject');

        $subjects.on('click.inbox', function (e) {
            e.preventDefault();

            var $subject = $(e.currentTarget)
                , $row = $subject.parents('tr')
                , isOpen = !!$row.data('isopen')
                , id = $row.attr('data-id');

            c.log('read msg: ' + id);

            if ( isOpen ) {
                this.hideMsg(id);
                return;
            }

            this.preShowMsg(id);
            api.getMessage(id, this.showMsg);

        }.bind(this));
    },

    moveToTrash: function (id, msg) {
        var $table = $("#inbox table")
            , $row = $table.find('tbody tr[data-id=' + id + ']')
            , $openMsg = $row.next('.msg');

        ui.ok(msg);

        //remove the open message from table
        if ($openMsg.length) {
            $openMsg.fadeOut(600, function () {
                $(this).remove();
            });
        }

        //remove the original inbox row
        $row.fadeOut(600, function () {
            var $total = $("a.inbox .total")
                , total = $total.text()-1;

            $total.text(total);
            $(this).remove();
        });
    },

    actionItem: function (e) {
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = $form.parents('section').find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        if (action === 'trash') {
            $.each($checked, function (i, cb) {
                var id = cb.value;

                api.moveToTrash(id, this.moveToTrash);
            }.bind(this));
        }
    },

    destroy: function () {
        var $pg = $('#' + this.ns);

        ui.destroy();
        $(document).add('*').off('.' + this.ns);

        $pg.hide();
        $pg.find("tbody").empty();
    }
});