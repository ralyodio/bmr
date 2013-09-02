ui.create('modal', {
    $el: null,
    $header: null,
    $section: null,
    $footer: null,
    $overlay: null,

    show: function(content, opts){
        var defaults = {
            header: 'Compose message',
            primaryText: 'Send'
        };

        opts = _.extend(defaults, opts);

        this.$overlay = $('#overlay');
        this.$el = $('<div id="modal" />');


        this.hide(); //close existing

        //close on overlay click
        this.$overlay.one('click.ui.modal', this.hide.bind(this));
        this.$overlay.show();

        //add content
        this.$el.append('<header><h2>'+opts.header+'</h2><a href="#" class="close">Close</a></header>');
        this.$el.append('<section>'+ content + '</section>');
        this.$el.append('<footer><button class="btn-primary">'+opts.primaryText+'</button></footer>');

        //cache
        this.$header = this.$el.find('> header');
        this.$section = this.$el.find('> section');
        this.$footer = this.$el.find('> footer');

        this.$overlay.after(this.$el);

        this.resize();

        //events
        this.$header.on('click.ui.modal', '.close', this.hide.bind(this));
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

    hide: function(e){
        if ( e ) e.preventDefault();

        this.$el.remove();
        this.$overlay.hide();
        $(window).off('.ui.modal');
        $(document).add('*').off('.ui.modal');
    },

    resize: function(){
        this.$section.css('maxHeight', ''); //reset to calculate new height
        this.$el.css('marginTop', -this.$el.outerHeight()/2);
        this.$section.css('maxHeight', this.getMaxHeight());
    },

    getMaxHeight: function(){
        return this.$el.outerHeight() - ( this.$header.outerHeight() + this.$footer.outerHeight() );
    }
});