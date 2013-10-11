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

    //@deprecated
    sizeOld: function(string) {
        var fs = require('filesize');

        return fs(this.bytes(string), true);
    },

    size: function(bytes){
        var i = -1
            , units = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];

        do {
            bytes = bytes / 1024;
            i++;
        } while (bytes > 1024);

        return Math.max(bytes, 0.1).toFixed(1) + units[i];
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

    cfg: function(path){
        function getByPath(obj, key) {
            var keys = key.split('.');

            //lookup object
            _.each(keys, function(k){
               obj = obj[k];
            });

            return obj;
        }

        return getByPath(this.config, path);
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