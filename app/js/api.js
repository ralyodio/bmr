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

    getMessage: function (id, cb, read) {
        c.log('api.getMessage', id, read);

        try {
            this.conn.messages.inbox.single(id, cb, read);
        } catch (err) {
            c.error(err);
        }
    },

    sendMessage: function(toAddress, fromAddress, subject, message, cb){
        try {
            this.conn.messages.send(toAddress, fromAddress, subject, message, cb);
        } catch ( err ) {
            c.error(err);
        }
    },

    auth: function (data, cb) {
        c.log(data);

        try {
            this.conn = require('bitmessage-node')(data.host, data.port, data.user, data.pass);
            cb();
        } catch (err) {
            ui.err('Could not connect to API');
            c.error(err);
        }
    },

    getInbox: function (cb) {
        try {
            this.conn.messages.inbox.list(cb);
        } catch (err) {
            c.error(err);
        }
    },

    sentMessages: function (cb) {
        try {
            this.conn.messages.sent.list(cb);
        } catch (err) {
            c.error(err);
        }
    },

    getSentMessage: function(id, cb){
        c.log('api.getSentMessage: ', id);
        try {
            this.conn.messages.sent.single(id, cb);
        } catch (err) {
            c.error(err);
        }
    },

    getSentMessageByAck: function(ack, cb){
        c.log('api.getSentMessageByAck: ', ack);
        try {
            this.conn.messages.sent.singleByAck(ack, cb);
        } catch (err) {
            c.error(err);
        }
    },

    moveToTrash: function (id, cb) {
        c.log('api.moveToTrash: ', id);

        try {
            this.conn.messages.inbox.moveToTrash(id, function(msg){
                cb(id, msg);
            });
        } catch (err) {
            c.error(err);
        }
    },

    moveSentToTrashByAck: function (ack, cb) {
        c.log('api.moveSentToTrashByAck: ', ack);

        try {
            this.conn.messages.sent.moveToTrashByAck(ack, function(msg){
                cb(ack, msg);
            });
        } catch (err) {
            c.error(err);
        }
    },

    listAddresses: function(cb, refresh){
        try {
            this.conn.addresses.list(function(identities){
                cb(identities, refresh);
            });
        } catch (err) {
            c.error(err);
        }
    },

    createRandomAddress: function (opts, cb) {
        c.log('api.createRandomAddress: ', opts);

        var label = opts.label;

        this.conn.addresses.createRandom(label, cb); //returns address id
    },

    createDeterministicAddress: function (opts, cb) {
        c.log('api.createDeterministicAddress: ', opts);

        var passphrase = opts.passphrase;

        this.conn.addresses.createDeterministic(passphrase, cb); //returns address id
    },

    listSubscriptions: function(cb, refresh){
        try {
            this.conn.subscriptions.list(function(subscriptions){
                cb(subscriptions, refresh);
            });
        } catch (err) {
            c.error(err);
        }
    },

    subscribe: function(address, label, cb){
        this.conn.subscriptions.subscribe(address, label, cb); //returns string with status
    },

    unsubscribe: function(address, cb){
        this.conn.subscriptions.unsubscribe(address, cb); //returns string with status
    },

    listContacts: function(cb, refresh){
        this.conn.addressbook.list(function(contacts){
            cb(contacts, refresh);
        });
    },

    addContact: function(address, label, cb){
        this.conn.addressbook.addEntry(address, label, cb);
    },

    deleteContact: function(address, cb){
        this.conn.addressbook.deleteEntry(address, cb);
    },

    destroy: function(){
        this.conn = null;
        ui.err('Disconnected from server');
        c.log('Disconnected');
    }
});