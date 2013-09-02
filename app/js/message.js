app.create('message', {
    preShowMsg: function(id){
        c.log('app.message.preShowMsg', id);

        var $row = ui.$pg.find('tbody tr[data-id='+id+']')
            , colCount = $row.find('td').length;

        $row.after(ui.tpl('message', { id: id, colCount: colCount }));
    },

    showMsg: function(msg, isSentMessage){
        c.log('app.message.showMsg', msg);

        var $row = ui.$pg.find('tbody tr[data-id='+msg.msgid+']')
            , $msg = $row.next('.msg')
            , $content = $msg.find('.content');

        $content.append(ui.tpl('messageContent', { msg: msg, isSentMessage: isSentMessage }));
        $content.removeClass('loading');
        $row.data('isopen', true);
    },

    hideMsg: function(id){
        c.log('app.message.hideMsg', id);

        var $row = ui.$pg.find('tbody tr[data-id='+id+']');

        $row.data('isopen', false);
        $row.next('.msg').remove();
    },

    readMsg: function ($table, isSentMessage) {
        c.log('app.message.readMessage: isSentMessage', isSentMessage);

        var $subjects = $table.find('tbody .subject');

        $subjects.on('click.message', function (e) {
            e.preventDefault();

            var $subject = $(e.currentTarget)
                , $row = $subject.parents('tr')
                , isOpen = !!$row.data('isopen')
                , id = $row.attr('data-id');

            c.log('app.message.readMsg', id);

            if ( isOpen ) {
                this.hideMsg(id);
                return;
            }

            this.preShowMsg(id);

            if ( isSentMessage ) {
                api.getSentMessage(id, function(msg){
                    this.showMsg(msg, isSentMessage);
                }.bind(this));
            } else {
                api.getMessage(id, function(msg){
                    this.showMsg(msg, isSentMessage);
                }.bind(this));
            }
        }.bind(this));
    },

    destroy: function(){
        c.log('app.message.destroy');

        $(document).add('*').off('.message');
    }
});