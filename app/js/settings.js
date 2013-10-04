app.create('settings', {
    init: function(){
        if (!app.isAuth()) return;

        ui.init(this.ns);
        c.log('app.settings.init');

        this.show();
        //events
        ui.$pg.on('submit.settings', this.save);
    },

    show: function(){
        var settings = ui.settings();

        //add the flags for the radio buttons
        settings.proxy_urls_ixquick = settings.proxy_urls === 'ixquick';
        settings.proxy_urls_anonymouse = settings.proxy_urls === 'anonymouse';
        settings.proxy_urls_webproxynet = settings.proxy_urls === 'webproxynet';
        settings.proxy_urls_none = settings.proxy_urls === 'none';

        if ( settings.inbox_notification !== 'none' ) {
            settings.inbox_notification = settings.inbox_notification === "1";
        }

        settings.inbox_notification_none = settings.inbox_notification === 'none';

        ui.$header.removeClass('hide');
        ui.$nav.removeClass('hide');
        ui.$header.find('a').removeClass('active');
        ui.$pg = $(ui.tpl('settings', settings));
        ui.$content.append(ui.$pg);
    },

    save: function(e){
        e.preventDefault();

        var $form = $(e.target)
            , data = {};

        data.proxy_urls = $form.find('input[name=proxy_urls]:checked').val();
        data.inbox_notification = $form.find('input[name=inbox_notification]:checked').val();

        ui.settings(data);
        ui.ok('Settings updated');
        ui.$pg.hide({
            duration: 0,
            complete: function(){
                ui.navigateTo('settings', 'inbox');
            }
        });
    },

    destroy: function(){
        c.log('app.settings.destroy');

        /*
        ui.destroy();
        ui.$pg.remove();
        $(document).add('*').off('.' + this.ns);
        */

        this.parent.destroy(this.ns);
    }
});
