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
            , $content = $msg.find('.content')
            , $message;

        $content.html(ui.tpl('messageContent', {
            msg: msg
            , isSentMessage: isSentMessage
            , renderHtml: renderHtml
        }));

        this.parseMessage($content.find('.message'), renderHtml);

        $content.removeClass('loading');
        $message = $content.find('.message');

        //hide maximize button if not needed
        if ( $message.prop('scrollHeight') <= 325 ) { //max-height of .minimize class
            $content.find('.minimize').addClass('hide');
        }

        $row.data('isopen', true);
        $row.removeClass('unread');
    },

    parseMessage: function($message, renderHtml){
        var URI = require('URIjs')
            , text = renderHtml ? $message.html() : $message.text();

        if ( !renderHtml ) {
            text = _.escape(text);
        }

        text = URI.withinString(text, function(url){
            var label = url;

            //data urls are very long and can be ignored.
            if ( /^data:/.test(url) ) {
                return !renderHtml ? url.substring(0, 500)+'...' : url;
            }

            //make a valid url if we have a domain only
            if ( !/^\w+:/.test(url) ) {
                url = 'http://'+url;
            }

            return '<a href="'+url+'" class="ext">'+label+'</a>';
        });

        //Bitmessage addressses
        text = text.replace(/(BM-[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{32,34})/g, '<a href="#" class="address" data-address="$1">$1</a>');

        $message.html(text);
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

        $table.on('click.message', 'tr:not(.msg) .subject', function (e) {
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
            , delim = '\n\n------------------------------------------------------\n'
            , msg = $msg.html().split(delim).reverse().join(delim);

        $msg.html(msg);
    },

    maximize: function($row){
        var $nav = $row.find('.message-container nav.icons');

        $row.find('.message').removeClass('minimize');
        $nav.find('.maximize').addClass('hide');
        $nav.find('.minimize').removeClass('hide');
    },

    minimize: function($row){
        var $nav = $row.find('.message-container nav.icons');

        $row.find('.message').addClass('minimize');
        $nav.find('.maximize').removeClass('hide');
        $nav.find('.minimize').addClass('hide');
    },

    destroy: function(){
        c.log('app.message.destroy');

        $(document).add('*').off('.message');
    }
});