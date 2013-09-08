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

        //close existing
        if ( this.parent.$modal ) this.hide();

        //close when overlay clicked
        this.$overlay.one('click.ui.modal', this.hide.bind(this));
        this.$overlay.removeClass('hide');

        this.$el = $(ui.tpl('modal', {
            header: opts.header
            , primaryButton: opts.primaryButton
        }));

        this.$el.find('section').html(content);

        this.parent.$modal = this.$el;

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

            //all primary buttons get a spinner
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
        this.$overlay.addClass('hide');
    },

    maximize: function(e){
        if ( e ) e.preventDefault();

        this.$el.removeClass('minimized');
        this.$overlay.removeClass('hide');
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

        this.$overlay.addClass('hide');
        $(window).off('.ui.modal');
        $(document).add('*').off('.ui.modal');
    }
});