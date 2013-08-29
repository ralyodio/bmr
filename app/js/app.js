var app = window.app || {};

//application-specific methods
_.extend(app, {
    log: function(){
        if ( !window.console ) return;

        var args = Array.prototype.slice.call(arguments);
        var log = Function.prototype.bind.call(console.log, console);

        log.apply(console, args);
    },

    create: function(namespace, object){
        app[namespace] = window.app[namespace] = {};
        _.extend(app[namespace], object);
    }
});