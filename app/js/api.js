var api = window.api || {};

//api calls to backend
_.extend(api, {
    conn: null,

    init: function (data, cb) {
        if (this.conn) {
            cb();
            return;
        }

        this.auth(data, cb);
    },

    getMessage: function (id, cb) {
        app.log('api.getMessage ' + id);
        try {
            this.conn.messages.inbox.single(id, cb);
        } catch (err) {
            app.log(err);
        }
    },

    auth: function (data, cb) {
        app.log(data);

        try {
            this.conn = require('bitmessage-node')(data.host, data.port, data.user, data.pass);
            app.log('conn', this.conn);
            cb();
        } catch (err) {
            ui.err('Could not connect');
            app.log(err);
        }
    },

    getInbox: function () {
        try {
            this.conn.messages.inbox.list(function (msgs) {
                app.inbox.showInbox(msgs);
            });
        } catch (err) {
            app.log(err);
        }
    },

    sentMessages: function () {
        try {
            this.conn.messages.sent.list(function (msgs) {
                app.sent.showSent(msgs);
            });
        } catch (err) {
            app.log(err);
        }
    },

    getSentMessage: function(id, cb){
        app.log('api.getSentMessage: ', id);
        try {
            this.conn.messages.sent.single(id, cb);
        } catch (err) {
            app.log(err);
        }
    },

    moveToTrash: function (id, cb) {
        app.log('api.moveToTrash: ', id);

        try {
            this.conn.messages.inbox.moveToTrash(id, function(msg){
                cb(id, msg);
            });
        } catch (err) {
            app.log(err);
        }
    },

    destroy: function(){
        this.conn = null;
        ui.err('Disconnected from server');
        app.log('Disconnected');
    }
});