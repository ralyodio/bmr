app.create('logout', {
    init: function () {
        c.log('app.logout.init');

        api.destroy();
        this.destroy();

        ui.ok("You have been logged out");
        ui.navigateTo(null, 'login');
    },

    destroy: function () {
        c.log('app.logout.destroy');

        //delete application data
        //ui.settings(null);
    }
});