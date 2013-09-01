app.create('inbox', {
    init: function () {
        if (!api.conn) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        ui.init();
        c.log('app.inbox.init');

        ui.$pg = $(ui.tpl('inbox', {}));
        ui.$content.append(ui.$pg);
        ui.$header.show();
        ui.$header.find('a.inbox').addClass('active').siblings().removeClass('active');

        api.getInbox(this.showInbox.bind(this)); //needs spinner

        //page events
        ui.$pg.find("#inbox-action").on('submit.inbox', this.actionItem.bind(this));

        //handle click events on currently opened messages
        ui.$pg.find("table").on('click.inbox', 'tr.msg', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , $row = $(e.currentTarget)
                , id = $row.attr('data-msgid'); //msg.msgid

            //handle msg actions
            if ( $el.is('a.trash') ) {
                c.log('trash msg');
                api.moveToTrash(id, this.moveToTrash.bind(this));

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
                identities[0].selected = true; //pre-select the first address in menu

                var options = ui.tpl('inboxReplyOptions', { identities: identities });
                var form = ui.tpl('inboxReply', {
                    msg: msg,
                    options: options,
                    selectedId: identities[0].address
                });

                //populate the modal
                $modal.find('> section').append(form);
                $modal.trigger('resize.ui.modal');
                $modal.find('textarea.message').focus();

                //update the address shown
                $modal.find('#reply-from').on('change.ui.modal', function(e){
                    $("#reply-id").text(this.value);
                });

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
                        ui.ok("Your reply has been sent!");
                    });
                });
            });
        });
    },

    showInbox: function (msgs) {
        var messages = [] //template data
            , $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.inbox .total')
            , $tbody = $table.find("tbody");

        //msgs = msgs.slice(0, 10);

        //default to most recent first
        msgs = ui.sortByDateAttr(msgs, 'receivedTime');

        //prepare data for template
        msgs.forEach(function (item) {
            var time = item.receivedTime;

            messages.push({
                time: time
                , subject: item.subject
                , timeSortable: moment(time).unix()
                , timeReadable: moment(time).fromNow()
                , from: item.fromAddress
                , to: item.toAddress
                , id: item.msgid
            });
        });

        $tbody.append(ui.tpl('inboxMessages', { messages: messages }));

        //initialize events for the table
        ui.markAll($table);
        ui.shiftCheck.init($table);
        ui.sortTable($table);
        ui.checkItem($table);
        this.readMsg($table);

        $total.text(msgs.length);
        ui.$pg.fadeIn();
    },

    preShowMsg: function(id){
        c.log('app.inbox.preShowMsg', id);

        var $row = ui.$pg.find('tbody tr[data-id='+id+']')
            , colCount = $row.find('td').length;

        $row.after(ui.tpl('inboxMessage', { id: id, colCount: colCount }));
    },

    showMsg: function(msg){
        c.log('app.inbox.showMsg', msg);

        var $row = ui.$pg.find('tbody tr[data-id='+msg.msgid+']')
            , $msg = $row.next('.msg')
            , $content = $msg.find('.content');

        $content.append(ui.tpl('inboxMessageContent', { msg: msg }));
        $content.removeClass('loading');
        $row.data('isopen', true);
    },

    hideMsg: function(id){
        c.log('hideMsg: ', id);

        var $row = ui.$pg.find('tbody tr[data-id='+id+']');

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

            c.log('app.inbox.readMsg', id);

            if ( isOpen ) {
                this.hideMsg(id);
                return;
            }

            this.preShowMsg(id);
            api.getMessage(id, this.showMsg);
        }.bind(this));
    },

    moveToTrash: function (id, msg) {
        var $table = ui.$pg.find('table')
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
            var $total = ui.$header.find('a.inbox .total')
                , total = $total.text()-1;

            $total.text(total);
            $(this).remove();
        });
    },

    actionItem: function (e) {
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = ui.$pg.find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        if (action === 'trash') {
            $.each($checked, function (i, cb) {
                var id = cb.value;

                api.moveToTrash(id, this.moveToTrash);
            }.bind(this));
        }
    },

    destroy: function () {
        c.log('app.login.destroy');

        ui.destroy();
        $(document).add('*').off('.' + this.ns);
        ui.$pg.remove();

        this.parent.destroy();
    }
});