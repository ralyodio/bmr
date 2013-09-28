var app = window.app || {};

//application-specific methods
_.extend(app, {
    uncaught: true,

    init: function(){
        c.log('app.init');

        if ( this.uncaught ) {
            process.on('uncaughtException', function(err) {
                c.log("Uncaught exception!", err);
                ui.err('Woops, there was an error: ' + err.code);
            });
        }
    },

    //@deprecated infavor of ui.logger()
    log: function(){
        if ( !window.console ) return;

        var args = Array.prototype.slice.call(arguments);
        var log = Function.prototype.bind.call(console.log, console);

        log.apply(console, args);
    },

    create: function(namespace, object){
        var base = {
            parent: this,
            destroy: this.destroy
        };

        app[namespace] = window.app[namespace] || {};

        _.extend(base, object, { ns: namespace }); //override base class with implementation
        _.extend(app[namespace], base);
    },

    size: function(string) {
        var fs = require('filesize');

        return fs(this.bytes(string), true);
    },

    bytes: function(string){
        return Buffer.byteLength(string, 'utf8');
    },

    isAuth: function(){
        var isAuth = false;

        if (api.getConnection()) {
            c.log('authenticated...');
            isAuth = true;
        } else {
            c.log('not authenticated.');
            ui.navigateTo(null, 'logout');
        }

        return isAuth;
    },

    destroy: function(ns){
        c.log('app.destroy');

        if ( ns ) {
            c.log('app.destroy:ns', ns);
            $(document).add('*').off('.' + ns);
        }

        ui.destroy();
    }
});