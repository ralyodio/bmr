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
            , $messageHtml
            , $message;

        $messageHtml = $(ui.tpl('messageContent', {
            msg: msg
            , isSentMessage: isSentMessage
            , renderHtml: renderHtml
        }));

        $message = $messageHtml.find('.message');
        $message.html(this.parseMessage($message.html(), renderHtml));

        $content.html($messageHtml);
        $content.removeClass('loading');

        //hide maximize button if not needed
        if ( $message.prop('scrollHeight') <= 325 ) { //max-height of .minimize class
            $content.find('.minimize').addClass('hide');
        }

        $row.data('isopen', true);
        $row.removeClass('unread');
    },

    sanitize: function(html){
        function stripTag(html, tag){
            var div, els, i;

            div = document.createElement('div');
            div.innerHTML = html;
            els = div.getElementsByTagName(tag);
            i = els.length;

            while (i--) {
                els[i].parentNode.removeChild(els[i]);
            }

            return div.innerHTML;
        }

        function trimAttributes(node, allowedAttrs) {
            $.each(node.attributes, function() {
                var attrName = this.name;

                if ($.inArray(attrName, allowedAttrs) == -1) {
                    $(node).removeAttr(attrName)
                }
            });
        }

        function clean(html, whitelist) {
            var tags = {'font': ['color'], 'strong': [], 'b': [], 'i': [], img: ['src'], ol: [], ul: [], li: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], code: [], blockquote: [], pre: [], table: ['border', 'cellpadding', 'cellspacing'], caption: [], tr: [], th: ['colspan', 'rowspan'], td: ['colspan', 'rowspan'], em: [], strong: [], sub: [], sup: [], p: [], br: [] };

            whitelist = _.extend(tags, whitelist);

            var $el = $('<div>'+html+'</div>');

            $el.find('*').each(function() {
                var allowedAttrs = whitelist[this.nodeName.toLowerCase()];
                if(!allowedAttrs) {
                    $(this).remove();
                } else {
                    trimAttributes(this, allowedAttrs);
                }
            });

            return $el.html();
        }

        html = stripTag(html, 'script');
        html = clean(html);

        return html;
    },

    parseMessage: function(html, renderHtml){
        var URI = require('URIjs');

        //!renderHtml is already escaped by hbs and considered safe
        if ( renderHtml ) {
            html = this.sanitize(html);
        }

        html = URI.withinString(html, function(url){
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
        html = html.replace(
            /(BM-[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{32,34})/g,
            '<a href="#" class="address" data-address="$1">$1</a>'
        );

        return html;
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