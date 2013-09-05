app.create('inbox', {
    lastReceivedTime: null,

    init: function () {
        if (!api.conn) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        ui.init(this.ns);
        c.log('app.inbox.init');

        ui.$pg = $(ui.tpl('inbox', {}));
        ui.$header.show();
        ui.$header.find('a.inbox').addClass('active').siblings().removeClass('active');

        api.getInbox(this.showInbox.bind(this)); //needs spinner

        //page events
        ui.$pg.find("#inbox-action").on('submit.inbox', this.actionItem.bind(this));
        ui.filter();

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
                app.message.hideMsg(id);
            } else if ( $el.is('a.reply') ) {
                this.showReply(id); //should be moved to app.message?
            } else if ( $el.is('a.render-html') ) {
                var isSentMessage = false;

                app.message.renderHtml(id, isSentMessage);
            }
        }.bind(this));
    },

    showReply: function(id){
        //create empty base modal
        var modal = ui.modal.show('', {
            header: 'Reply to message',
            primaryButton: 'Reply'
        });

        api.getMessage(id, function(msg){
            api.listAddresses(function(identities){
                identities[0].selected = true; //pre-select the first address in menu

                var options = ui.tpl('fromOptions', { identities: identities });
                var form = ui.tpl('reply', {
                    msg: msg,
                    options: options,
                    selectedId: identities[0].address
                });

                //populate the modal
                modal.$section.html(form);
                modal.resize();
                modal.$section.find('textarea.message').focus();

                //update the address shown
                modal.$section.find('#reply-from').on('change.ui.modal', function(e){
                    modal.$section.find("#reply-id").text(this.value);
                });

                //handle modal primary button click
                modal.$el.on('primary.ui.modal', function(e, spin){
                    var f = $("#reply").get(0)
                        , toAddress = f.to.value
                        , fromAddress = f.from.value
                        , subject = f.subject.value
                        , message = f.message.value;

                    c.log('Sending message', f);

                    api.sendMessage(toAddress, fromAddress, subject, message, function(ackdata){
                        c.log(ackdata);

                        spin.stop();
                        modal.hide();
                        ui.ok("Your reply has been sent!");
                    });
                });
            });
        });
    },

    showMessages: function(msgs){
        var $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.inbox .total')
            , $tbody = $table.find("tbody");

        msgs = ui.sortByDateAttr(msgs, 'receivedTime');

        //save the time of the most recent message for long polling new messages
        this.lastReceivedTime = msgs[0] ? msgs[0].receivedTime : this.lastReceivedTime;

        $tbody.prepend(ui.tpl('inboxMessages', { messages: this.getMessagesData(msgs) }));
        $total.text($tbody.find('tr').length);
    },

    getMessagesData: function(msgs){
        var messages = [];

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
                , class: item.read ? '' : 'unread'
            });
        });

        return messages;
    },

    showInbox: function (msgs) {
        var messages = [] //template data
            , $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.inbox .total')
            , $tbody = $table.find("tbody");

        //msgs = msgs.slice(0, 10);

        //default to most recent first
        //msgs = ui.sortByDateAttr(msgs, 'receivedTime');

        //save the time of the most recent message for long polling new messages
        //this.lastReceivedTime = msgs[0].receivedTime;

        /*
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
                , class: item.read ? '' : 'unread'
            });
        });
        */

        //$tbody.html(ui.tpl('inboxMessages', { messages: this.getMessagesData(msgs) }));

        this.showMessages(msgs);

        //initialize events for the table
        ui.markAll($table);
        ui.shiftCheck.init($table);
        ui.sortTable($table);
        ui.checkItem($table);
        app.message.readMsg($table, false);

        //$total.text(msgs.length);
        ui.$content.append(ui.$pg);
        ui.$pg.fadeIn();
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
        } else if ( action === 'read' || action === 'unread' ) {
            $.each($checked, function(i, cb){
               var id = cb.value
                   , read = !!(action === 'read');

                api.getMessage(id, function(msg){
                    var $row = $table.find('tr[data-id='+id+']');

                    //mark the row as read or unread
                    $row[action === 'read' ? 'removeClass' : 'addClass']('unread');

                    //action finished, reset checkboxes
                    $row.removeClass('highlight');
                    $(cb).attr('checked', false);
                    ui.ok('Message'+(i?'s':'')+' marked as ' + action);
                }, read); //send 'read' state
            });
        }
    },

    destroy: function () {
        c.log('app.login.destroy');

        app.message.destroy();

        ui.destroy();

        $(document).add('*').off('.' + this.ns);
        ui.$pg.remove();

        this.parent.destroy();
    }
});