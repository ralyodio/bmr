app.inbox = window.app.inbox = {};

_.extend(app.inbox, {
    init: function () {
        if (!api.conn) {
            app.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        app.log('app.inbox.init');

        ui.init();
        api.getInbox(); //needs spinner

        $("body > header").show();
        $("a.inbox").addClass('active');

        $("#inbox-action").on('submit.inbox', this.actionItem.bind(this));

        //handle click events on open messages
        $("#inbox table").on('click.inbox', 'tr.msg', function (e) {
            e.preventDefault();

            var $el = $(e.target) //clicked element
                , $row = $(e.currentTarget)
                , id = $row.attr('data-msgid'); //msg.msgid

            //handle msg actions
            if ( $el.is('a.trash') ) {
                app.log('trash msg');
                api.moveToTrash(id, this.moveToTrash);

            } else if ( $el.is('a.close') ) {
                app.log('close msg');
                this.hideMsg(id);
            }
        }.bind(this));
    },

    showInbox: function (msgs) {
        var $inbox = $("#inbox")
            , $table = $inbox.find('table')
            , $total = $('a.inbox .total')
            , $tbody = $table.find("tbody");

        //msgs = msgs.slice(0, 10);
        msgs.forEach(function (item, i) {
            var time = item.receivedTime
                , from = item.fromAddress
                , to = item.toAddress
                , id = item.msgid;

            //app.log(item);

            $tbody.append(
                '<tr data-id="' + id + '">' +
                    '<td><input type="checkbox" name="mark" value="' + id + '"></td>' +
                    '<td data-sort="' + from + '"><span class="nowrap" data-from="' + from + '">' + from + '</span></td>' +
                    '<td data-sort="' + to + '"><span class="nowrap" data-to="' + to + '">' + to + '</span></td>' +
                    '<td data-sort="' + item.subject + '"><span class="subject">' + item.subject + '</span></td>' +
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

    showMsg: function(msg){
        var $row = $('#inbox tbody tr[data-id='+msg.msgid+']')
            , colCount = $row.find('td').length
            , to = msg.toAddress
            , from = msg.fromAddress;

        app.log('show msg: ', msg);

        $row.after(
            '<tr class="msg" data-msgid="'+msg.msgid+'">' +
                '<td colspan="' + colCount + '">' +
                    '<div class="content">' +
                        '<a href="#" class="close">Close</a>' +
                        '<h3 class="subject">' + msg.subject + '</h3>' +
                        '<p class="date">' + msg.receivedTime + '</p>' +
                        '<p data-from="' + from + '" class="from">From: ' + from + '</p>' +
                        '<p data-to="' + to + '" class="to">To: ' + to + '</p>' +
                        '<nav>' +
                            '<a href="#" class="reply">Reply</a>' +
                            '<a href="#" class="trash">Trash</a>' +
                        '</nav>' +
                        '<section class="message">' + msg.message + '</section>' +
                    '</div>' +
                '</td>' +
            '</tr>'
        );

        $row.data('isopen', true);
    },

    hideMsg: function(id){
        app.log('hideMsg: ', id);

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

            app.log('read msg: ' + id);

            if ( isOpen ) {
                this.hideMsg(id);
                return;
            }

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
        var $inbox = $("#inbox");

        ui.destroy();
        $(document).add('*').off('.inbox .ui');

        $inbox.hide();
        $inbox.find("tbody").empty();

        if (ui.globals.currPage === 'login') {
            $("body > header").hide();
            ui.$header.hide();
        }
    }
});