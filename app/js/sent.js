app.create('sent', {
    init: function () {
        if (!api.conn) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        ui.init();
        c.log('app.sent.init');

        ui.$pg = $(ui.tpl('sent', {}));
        ui.$header.show();
        ui.$header.find('a.sent').addClass('active').siblings().removeClass('active');

        api.sentMessages(this.showSent.bind(this)); //needs spinner

        ui.$pg.find('#sent-action').on('submit.sent', this.actionItem.bind(this));

        //handle click events on open messages
        ui.$pg.find('table').on('click.sent', 'tr.msg', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , $row = $(e.currentTarget)
                , id = $row.attr('data-msgid'); //msg.msgid

            //handle msg actions
            if ( $el.is('a.trash') ) {
                c.log('trash sent msg');
                api.moveToTrash(id, this.moveToTrash);

            } else if ( $el.is('a.close') ) {
                c.log('close msg');
                app.message.hideMsg(id);
            } else if ( $el.is('a.render-html') ) {
                var isSentMessage = true;

                app.message.renderHtml(id, isSentMessage);
            }
        }.bind(this));
    },

    showSent: function (msgs) {
        var messages = []
            , $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.sent .total')
            , $tbody = $table.find("tbody");

        c.log(msgs);
        //msgs = msgs.slice(0, 10);

        //default to most recent first
        msgs = ui.sortByDateAttr(msgs, 'lastActionTime');

        //prepare data for template
        msgs.forEach(function (item) {
            var time = item.lastActionTime;

            messages.push({
                time: time
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

        //initialize events for the table
        ui.markAll($table);
        ui.shiftCheck.init($table);
        ui.sortTable($table);
        ui.checkItem($table);
        app.message.readMsg($table, true);

        $total.text(msgs.length);
        ui.$content.append(ui.$pg);
        ui.$pg.fadeIn();
    },

    moveToTrash: function (id, msg) {
        //should be refactored to app.message (inbox.js too)
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

                api.moveToTrash(id, this.moveToTrash);
            }.bind(this));
        }
    },

    destroy: function () {
        c.log('app.sent.destroy');

        app.message.destroy();

        ui.destroy();
        $(document).add('*').off('.' + this.ns);
        ui.$pg.remove();

        this.parent.destroy();
    }
});