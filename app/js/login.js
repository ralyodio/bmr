app.create('login', {
    init: function(){
        var $login = $("#login");

        c.log('app.login.init');

        ui.init();

        $login.show();
        $login.on('submit.login', this.login.bind(this));
        $("body > header").hide();
    },

    login: function(e){
        e.preventDefault();

        var $form = $(e.target)
            , data = {};

        data.user = $form.find('input[name=user]').val();
        data.pass = $form.find('input[name=pass]').val();
        data.host = $form.find('input[name=host]').val();
        data.port = $form.find('input[name=port]').val();

        api.init(data, function(){
            ui.init();
            ui.ok('Successfully connected to API');
            //move to app.hideLogin
            $("#login").hide({
                duration: 0,
                complete: function(){
                    ui.navigateTo('login', 'inbox');
                }
            });
        });
    },

    destroy: function(){
        c.log('app.login.destroy');

        var $pg = $('#' + this.ns);

        ui.destroy();
        $(document).add('*').off('.' + this.ns);

        $pg.hide();

        this.parent.destroy();
    }
});
