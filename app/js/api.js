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
        c.log('api.getMessage ' + id);
        try {
            this.conn.messages.inbox.single(id, cb);
        } catch (err) {
            c.log(err);
        }
    },

    auth: function (data, cb) {
        c.log(data);

        try {
            this.conn = require('bitmessage-node')(data.host, data.port, data.user, data.pass);
            c.log('conn', this.conn);
            cb();
        } catch (err) {
            ui.err('Could not connect');
            c.log(err);
        }
    },

    getInbox: function () {
        try {
            this.conn.messages.inbox.list(function (msgs) {
                app.inbox.showInbox(msgs);
            });
        } catch (err) {
            c.log(err);
        }
    },

    sentMessages: function () {
        try {
            this.conn.messages.sent.list(function (msgs) {
                app.sent.showSent(msgs);
            });
        } catch (err) {
            c.log(err);
        }
    },

    getSentMessage: function(id, cb){
        c.log('api.getSentMessage: ', id);
        try {
            this.conn.messages.sent.single(id, cb);
        } catch (err) {
            c.log(err);
        }
    },

    moveToTrash: function (id, cb) {
        c.log('api.moveToTrash: ', id);

        try {
            this.conn.messages.inbox.moveToTrash(id, function(msg){
                cb(id, msg);
            });
        } catch (err) {
            c.log(err);
        }
    },

    listAddresses: function(refresh){
        try {
            this.conn.addresses.list(function(identities){
                app.identities.showIdentities(identities, refresh)
            });
        } catch (err) {
            c.log(err);
        }
    },

    createRandomAddress: function (opts, cb) {
        c.log('api.createRandomAddress: ', opts);

        var label = opts.label;

        this.conn.addresses.createRandom(label, cb); //returns address id
    },

    destroy: function(){
        this.conn = null;
        ui.err('Disconnected from server');
        c.log('Disconnected');
    }
});