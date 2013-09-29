app.create('inbox', {
    lastReceivedTime: null,

    init: function () {
        if (!app.isAuth()) return;

        ui.init(this.ns);
        c.log('app.inbox.init');

        ui.partial('filter');
        ui.$pg = $(ui.tpl('inbox', {}));
        ui.$header.removeClass('hide');
        ui.$nav.removeClass('hide');
        ui.$header.find('a.inbox').addClass('active').siblings().removeClass('active');

        api.getInbox(this.showInbox.bind(this)); //needs spinner

        //start long polling for new messages
        ui.timers.inbox = setInterval(function(){
            ui.$header.find('a.inbox').addClass('anim');
            api.getInbox(this.showMessages.bind(this));
        }.bind(this), app.cfg('inbox.refresh'));

        //page events
        ui.$pg.find("#inbox-action").on('submit.inbox', this.actionItem.bind(this));
        ui.filter();

        //handle click events on currently opened messages
        ui.$pg.find("table").on('click.inbox', 'tr.msg header', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , isSentMessage = false
                , $row = $(e.currentTarget).parents('tr.msg')
                , id = $row.attr('data-msgid'); //msg.msgid

            //handle msg actions
            if ( $el.is('a.trash') ) {
                c.log('trash msg');
                api.moveToTrash(id, this.moveToTrash.bind(this));
            } else if ( $el.is('a.close') ) {
                c.log('close msg');
                app.message.hideMsg(id);
            } else if ( $el.is('a.maximize') ) {
                app.message.maximize($row);
            } else if ( $el.is('a.minimize') ) {
                app.message.minimize($row);
            } else if ( $el.is('a.reply') ) {
                this.showReply(id); //should be moved to app.message?
            } else if ( $el.is('.from') || $el.is('.address') ) {
                (function(){
                    var id = $el.attr('data-address');

                    c.log('address', id);
                    app.compose.init(id);
                })();
            } else if ( $el.is('a.render-html') ) {
                app.message.renderHtml(id, isSentMessage);
            } else if ( $el.is('a.ext') ) {
                //ui.win($el.attr('href'));
            } else if ( $el.is('a.reverse') ) {
                app.message.reverseThread(id, isSentMessage);
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
                //pre-select the first address in menu
                var selectedId = identities[0].address;
                identities[0].selected = true;

                _.map(identities, function(ident){
                    if ( ident.label === 'unused API address' ) {
                        ident.label = '[chan]';
                    }

                    if ( ident.address === msg.fromAddress || ident.address === msg.toAddress ) {
                        //its a channel identity, default to selected
                        delete identities[0].selected;
                        ident.selected = true;
                        selectedId = ident.address;
                    }

                    ident.label = ident.label + ' ' + ident.address.substring(3, 10);
                });

                ui.partial('from');
                var form = ui.tpl('reply', {
                    msg: msg
                    , selectedId: selectedId
                    , identities: identities
                });

                //populate the modal
                modal.$section.html(form);
                modal.resize();
                modal.$section.find('textarea.message').focus();
                modal.$section.find('textarea.message').on('click.ui.modal', ui.tabKey);

                //update the address shown
                modal.$section.find('#from').on('change.ui.modal', function(e){
                    modal.$section.find("#from-id").text(this.value);
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

        //if we are in a long poll, filter for new messages
        if ( msgs && this.lastReceivedTime ) {
            msgs = _.filter(msgs, function(m){
                return moment(m.receivedTime).unix() > moment(this.lastReceivedTime).unix();
            }.bind(this));
        }

        //c.log(msgs);

        //save the time of the most recent message for long polling of new messages
        this.lastReceivedTime = msgs[0] ? msgs[0].receivedTime : this.lastReceivedTime;

        ui.$header.find('a.inbox').removeClass('anim');

        if ( msgs.length ) {

            $tbody.prepend(ui.tpl('inboxMessages', { messages: this.getMessagesData(msgs) }));
            $total.text($tbody.find('tr').length);
        }
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
                , bytes: app.bytes(item.message)
                , size: app.size(item.message)
            });
        });

        return messages;
    },

    showInbox: function (msgs) {
        var $table = ui.$pg.find('table');

        this.showMessages(msgs);

        ui.table.init($table);
        app.message.readMsg($table, false);

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
                   , read = action === 'read';

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
        this.lastReceivedTime = null;
        clearTimeout(ui.timers.inbox);

        //ui.destroy();
        //$(document).add('*').off('.' + this.ns);
        //ui.$pg.remove();

        this.parent.destroy(this.ns);
    }
});