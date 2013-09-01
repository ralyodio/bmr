app.create('logout', {
    init: function () {
        c.log('app.logout.init');
        api.destroy();
        ui.ok("You have been logged out");
        ui.navigateTo(null, 'login');
    },

    destroy: function () {
        c.log('app.logout.destroy');

        this.parent.destroy();
    }
});