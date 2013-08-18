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
        app.log('getMessage ' + id);
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
            return;
        }
    },

    getInbox: function () {
        try {
            this.conn.messages.inbox.list(function (msgs) {
                app.inbox.showInbox(msgs);
            });
        } catch (err) {
            app.log(err);
            return;
        }
    },

    sentMessages: function () {
        try {
            this.conn.messages.sent.list(function (msgs) {
                app.log(msgs);
            });
        } catch (err) {
            app.log(err);
        }
    },

    moveToTrash: function ($table, id) {
        app.log('moveToTrash: ', id);

        try {
            this.conn.messages.moveToTrash(id, function (msg) {
                ui.ok(msg);
                app.inbox.moveToTrash($table, id);
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