app.sent = window.app.sent = {};

_.extend(app.sent, {
    init: function () {
        if (!api.conn) {
            app.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        app.log('app.sent.init');

        ui.init();
        api.sentMessages(); //needs spinner

        $("body > header").show();
        $("a.sent").addClass('active').siblings().removeClass('active');

        $("#sent-action").on('submit.sent', this.actionItem.bind(this));

        //handle click events on open messages
        $("#sent table").on('click.sent', 'tr.msg', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , $row = $(e.currentTarget)
                , id = $row.attr('data-msgid'); //msg.msgid

            //handle msg actions
            if ( $el.is('a.trash') ) {
                app.log('trash sent msg');
                api.moveToTrash(id, this.moveToTrash);

            } else if ( $el.is('a.close') ) {
                app.log('close msg');
                this.hideMsg(id);
            }
        }.bind(this));
    },

    showSent: function (msgs) {
        var $sent = $("#sent")
            , $table = $sent.find('table')
            , $total = $('a.sent .total')
            , $tbody = $sent.find("tbody");

        app.log(msgs);
        //msgs = msgs.slice(0, 10);
        msgs.forEach(function (item, i) {
            var time = item.lastActionTime
                , from = item.fromAddress
                , to = item.toAddress
                , id = item.msgid;

            //app.log(item);

            //replace date with status
            $tbody.append(
                '<tr data-id="' + id + '">' +
                    '<td class="mark-item"><input type="checkbox" name="mark" value="' + id + '"></td>' +
                    '<td data-sort="' + from + '"><span class="nowrap" data-from="' + from + '">' + from + '</span></td>' +
                    '<td data-sort="' + to + '"><span class="nowrap" data-to="' + to + '">' + to + '</span></td>' +
                    '<td data-sort="' + item.subject + '"><span class="subject">' + item.subject + '</span></td>' +
                    '<td class="nowrap" data-sort="' + item.status + '"><span title="' + item.lastActionTime + '">' + item.status + '</span></td>' +
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
        $sent.fadeIn();
    },

    preShowMsg: function(id){
        app.log('preShowMsg');

        var $row = $('#sent tbody tr[data-id='+id+']')
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
        var $row = $('#sent tbody tr[data-id='+msg.msgid+']')
            , to = msg.toAddress
            , from = msg.fromAddress
            , $msg = $row.next('.msg')
            , $content = $msg.find('.content');

        app.log('show sent msg: ', msg);

        $content.append(
            '<a href="#" class="close">Close</a>' +
            '<h3 class="subject">' + msg.subject + '</h3>' +
            '<p class="date">' + msg.lastActionTime + '</p>' +
            '<p data-to="' + to + '" class="to">To: ' + to + '</p>' +
            '<p data-from="' + from + '" class="from">From: ' + from + '</p>' +
            '<nav>' +
                '<a href="#" class="add-address">Add address</a>' +
                '<a href="#" class="trash">Trash</a>' +
            '</nav>' +
            '<section class="message">' + msg.message + '</section>'
        );

        $content.removeClass('loading');
        $row.data('isopen', true);
    },

    hideMsg: function(id){
        app.log('hideMsg: ', id);

        var $row = $('#sent tbody tr[data-id='+id+']');

        $row.data('isopen', false);
        $row.next('.msg').remove();
    },

    readMsg: function ($table) {
        var $subjects = $table.find('tbody .subject');

        $subjects.on('click.sent', function (e) {
            e.preventDefault();

            var $subject = $(e.currentTarget)
                , $row = $subject.parents('tr')
                , isOpen = !!$row.data('isopen')
                , id = $row.attr('data-id');

            app.log('read sent msg: ' + id);

            if ( isOpen ) {
                this.hideMsg(id);
                return;
            }

            this.preShowMsg(id);
            api.getSentMessage(id, this.showMsg);

        }.bind(this));
    },

    moveToTrash: function (id, msg) {
        var $table = $("#sent table")
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
            var $total = $("a.sent .total")
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
        var $sent = $("#sent");

        ui.destroy();
        $(document).add('*').off('.sent .ui');

        $sent.hide();
        $sent.find("tbody").empty();

        if (ui.globals.currPage === 'login') {
            $("body > header").hide();
            ui.$header.hide();
        }
    }
});