app.create('message', {
    preShowMsg: function(id, isSentMessage){
        c.log('app.message.preShowMsg', id);

        var attr = isSentMessage ? 'data-ack='+id : 'data-id='+id
            , $row = ui.$pg.find('tbody tr['+attr+']')
            , colCount = $row.find('td').length;

        $row.after(ui.tpl('message', {
            id: id,
            colCount: colCount
        }));
    },

    showMsg: function(msg, isSentMessage, renderHtml){
        c.log('app.message.showMsg', msg);

        var attr = isSentMessage ? 'data-ack='+msg.ackData : 'data-id='+msg.msgid
            , $row =  ui.$pg.find('tbody tr['+attr+']')
            , $msg = $row.next('.msg')
            , $content = $msg.find('.content');

        $content.html(ui.tpl('messageContent', {
            msg: msg
            , isSentMessage: isSentMessage
            , renderHtml: renderHtml
        }));

        this.parseMessage($content.find('.message'));

        $content.removeClass('loading');
        $row.data('isopen', true);
        $row.removeClass('unread');
    },

    parseMessage: function($message){
        $message.contents().filter(function() {
            return this.nodeType === 3;
        }).each(function(i, txt){
            var $txt = $(txt)
                , text = $txt.text();

            //BM- addressses
            text = text.replace(/(BM-[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{32,34})/g, '<a href="#" class="address" data-address="$1">$1</a>');

            //make urls links
            text = URI.withinString(text, function(url) {
                return '<a href="'+url+'" class="ext">'+url+'</a>';
            });

            $txt.replaceWith(text);
        });
    },

    hideMsg: function(id, isSentMessage){
        c.log('app.message.hideMsg', id);

        var attr = isSentMessage ? 'data-ack='+id : 'data-id='+id
            , $row = ui.$pg.find('tbody tr['+attr+']');

        $row.data('isopen', false);
        $row.next('.msg').remove();
    },

    readMsg: function ($table, isSentMessage) {
        c.log('app.message.readMessage: isSentMessage', isSentMessage);

        //can't open messages that haven't been sent yet
        var subjects = isSentMessage ? 'tr .subject' : 'tr .subject';

        $table.on('click.message', subjects, function (e) {
            e.preventDefault();

            var $subject = $(e.currentTarget)
                , $row = $subject.parents('tr')
                , isOpen = !!$row.data('isopen')
                , id = isSentMessage ? $row.attr('data-ack') : $row.attr('data-id');

            c.log('app.message.readMsg', id);

            if ( isOpen ) {
                this.hideMsg(id, isSentMessage);
                return;
            }

            this.preShowMsg(id, isSentMessage);

            if ( isSentMessage ) {
                api.getSentMessageByAck(id, function(msg){
                    this.showMsg(msg, isSentMessage);
                }.bind(this));
            } else {
                api.getMessage(id, function(msg){
                    this.showMsg(msg, isSentMessage);
                }.bind(this), true); //mark as read
            }
        }.bind(this));
    },

    renderHtml: function(id, isSentMessage){
        c.log('app.message.renderHtml', id);

        var renderHtml = true;

        this.hideMsg(id, isSentMessage);
        this.preShowMsg(id, isSentMessage);

        if ( isSentMessage ) {
            api.getSentMessageByAck(id, function(msg){
                this.showMsg(msg, isSentMessage, renderHtml);
            }.bind(this));
        } else {
            api.getMessage(id, function(msg){
                this.showMsg(msg, isSentMessage, renderHtml);
            }.bind(this));
        }
    },

    reverseThread: function(id, isSentMessage){
        var $msg = ui.$pg.find('tr[data-msgid='+id+'].msg .message')
            , delim = '\n------------------------------------------------------\n'
            , msg = $msg.text().split(delim).reverse().join(delim);

        $msg.html(msg);

        this.parseMessage($msg);
    },

    destroy: function(){
        c.log('app.message.destroy');

        $(document).add('*').off('.message');
    }
});