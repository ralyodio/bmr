ui.create('modal', {
    $el: null,
    $header: null,
    $section: null,
    $footer: null,
    $overlay: null,

    show: function(content, opts){
        var defaults = {
            header: 'Compose message',
            primaryButton: 'Send'
        };

        opts = _.extend(defaults, opts);

        this.$overlay = $('#overlay');
        this.$el = $('<div id="modal" />');
        this.parent.$modal = this.$el;


        this.hide(); //close existing

        //close when overlay clicked
        this.$overlay.one('click.ui.modal', this.hide.bind(this));
        this.$overlay.show();

        //add content
        this.$el.append('<header><h2>'+opts.header+'</h2><div class="icons"><a href="#" class="maximize hide">Maxmimize</a><a href="#" class="minimize">Minimize</a><a href="#" class="close">Close</a></div></header>');
        this.$el.append('<section>'+ content + '</section>');
        this.$el.append('<footer><button class="btn-primary">'+opts.primaryButton+'</button></footer>');

        //cache
        this.$header = this.$el.find('> header');
        this.$section = this.$el.find('> section');
        this.$footer = this.$el.find('> footer');

        this.$overlay.after(this.$el);

        this.resize();

        //events
        this.$header.on('click.ui.modal', '.close', this.hide.bind(this));
        this.$header.on('click.ui.modal', '.minimize', this.minimize.bind(this));
        this.$header.on('click.ui.modal', '.maximize', this.maximize.bind(this));
        this.$footer.on('click.ui.modal', '.btn-primary', function(e){
            e.preventDefault();

            var spin
                , $btn = $(e.target)
                , $spin = $('<em class="spin btn">&nbsp;</em>');

            $btn.attr('disabled', true);
            $btn.before($spin);
            spin = ui.spin($spin);
            this.$el.trigger('primary.ui.modal', spin);
        }.bind(this));

        this.$el.on('resize.ui.modal', this.resize.bind(this));
        $(window).on('resize.ui.modal', this.resize.bind(this));

        return this;
    },

    minimize: function(e){
        if ( e ) e.preventDefault();

        this.$el.addClass('minimized');
        this.$overlay.hide();
    },

    maximize: function(e){
        if ( e ) e.preventDefault();

        this.$el.removeClass('minimized');
        this.$overlay.show();
    },

    resize: function(){
        this.$section.css('maxHeight', ''); //reset to calculate new height
        this.$el.css('marginTop', -this.$el.outerHeight()/2);
        this.$section.css('maxHeight', this.getMaxHeight());
    },

    getMaxHeight: function(){
        return this.$el.outerHeight() - ( this.$header.outerHeight() + this.$footer.outerHeight() );
    },

    hide: function(e){
        if ( e ) e.preventDefault();

        this.$el.trigger('hide.ui.modal');
        this.$el.remove();
        this.$section = null;
        this.$footer = null;
        this.$header = null;

        this.$overlay.hide();
        $(window).off('.ui.modal');
        $(document).add('*').off('.ui.modal');
    }
});