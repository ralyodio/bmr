app.create('sent', {
    init: function () {
        if (!app.isAuth()) return;

        ui.init(this.ns);
        c.log('app.sent.init');

        ui.partial('filter');
        ui.$pg = $(ui.tpl('sent', {}));
        ui.$header.removeClass('hide');
        ui.$nav.removeClass('hide');
        ui.$header.find('a.sent').addClass('active').siblings().removeClass('active');

        api.sentMessages(this.showSent.bind(this)); //needs spinner

        //page events
        ui.$pg.find('#sent-action').on('submit.sent', this.actionItem.bind(this));
        ui.filter();

        //handle click events on open messages
        ui.$pg.find('table').on('click.sent', 'tr.msg header', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , isSentMessage = true
                , $row = $(e.currentTarget).parents('tr.msg')
                , id = $row.attr('data-msgid'); //this is actually ackData

            //handle msg actions
            if ( $el.is('a.trash') ) {
                c.log('trash sent msg');
                api.moveSentToTrashByAck(id, this.moveToTrash);

            } else if ( $el.is('a.close') ) {
                c.log('close msg');
                app.message.hideMsg(id, isSentMessage);
            } else if ( $el.is('a.maximize') ) {
                app.message.maximize($row);
            } else if ( $el.is('a.minimize') ) {
                app.message.minimize($row);
            } else if ( $el.is('a.render-html') ) {
                app.message.renderHtml(id, isSentMessage);
            } else if ( $el.is('a.ext') ) {
                //ui.win($el.attr('href'));
            } else if ( $el.is('a.reverse') ) {
                app.message.reverseThread(id, isSentMessage);
            } else if ( $el.is('a.next-msg') ) {
                app.message.nextMsg($row, id, isSentMessage);
            } else if ( $el.is('a.prev-msg') ) {
                app.message.prevMsg($row, id, isSentMessage);
            }
        }.bind(this));
    },

    showSent: function (msgs) {
        var messages = []
            , isSentMessage = true
            , $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.sent .total')
            , $tbody = $table.find("tbody");

        //c.log(msgs);
        //msgs = msgs.slice(0, 10);

        //default to most recent first
        msgs = ui.sortByDateAttr(msgs, 'lastActionTime');

        //prepare data for template
        msgs.forEach(function (item) {
            var time = item.lastActionTime;

            messages.push({
                time: time
                , ack: item.ackData
                , subject: item.subject
                , timeSortable: moment(time).unix()
                , timeReadable: moment(time).fromNow()
                , from: item.fromAddress
                , to: item.toAddress
                , id: item.msgid
                , status: item.status
            });
        });

        $tbody.append(ui.tpl('sentMessages', { messages: messages }));

        //wire up events here for rows here
        //bring up compose modal when clicking an address
        $tbody.on('click.sent', 'tr .to, tr .address', function(e){
            e.preventDefault();

            var $address = $(e.currentTarget)
                , id = $address.attr('data-address');

            c.log('address', id);
            app.compose.init(id);
        });

        ui.table.init($table);
        app.message.readMsg($table, isSentMessage);

        $total.text(msgs.length);
        ui.$content.append(ui.$pg);
        ui.$pg.fadeIn();
    },

    moveToTrash: function (id, msg) {
        //should be refactored to app.message (inbox.js too)
        var $table = ui.$pg.find('table')
            , $row = $table.find('tbody tr[data-ack=' + id + ']')
            , $openMsg = $row.next('.msg');

        ui.ok(msg);

        //remove the open message from table
        if ($openMsg.length) {
            $openMsg.fadeOut(600, function () {
                $(this).remove();
            });
        }

        //remove the original sent row
        $row.fadeOut(600, function () {
            var $total = ui.$header.find('a.sent .total')
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

                api.moveSentToTrashByAck(id, this.moveToTrash);
            }.bind(this));
        }
    },

    destroy: function () {
        c.log('app.sent.destroy');

        app.message.destroy();

        /*
        ui.destroy();
        $(document).add('*').off('.' + this.ns);
        ui.$pg.remove();
        */

        this.parent.destroy(this.ns);
    }
});