app.create('identities', {
    init: function () {
        if (!app.isAuth()) return;

        ui.init(this.ns);
        c.log('app.identities.init');

        ui.partial('filter');
        ui.$pg = $(ui.tpl('identities', {}));
        ui.$header.removeClass('hide');
        ui.$nav.removeClass('hide');
        ui.$header.find('a.identities').addClass('active').siblings().removeClass('active');

        api.listAddresses(this.showIdentities); //needs spinner

        ui.$pg.find('#identities-action').on('submit.identities', this.actionItem.bind(this));
        ui.$pg.find('#identities-select-action').on('change.identities', ui.showActionFields);
        ui.filter('.address, .label');
    },

    showIdentities: function (identities, refresh) {
        var $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.identities .total')
            , $tbody = $table.find("tbody");

        c.log('app.identities.showIdentities', identities);

        if ( refresh ) {
            $tbody.empty();
        }

        $tbody.append(ui.tpl('identitiesList', { identities: identities }));

        //initialize events for the table
        if ( !refresh ) {
            ui.table.init($table);

            //call to wire up events here for address rows
            $tbody.on('click.identities', 'tr .address', function(e){
                e.preventDefault();

                var $address = $(e.currentTarget)
                    , id = $address.text();

                c.log('address', id);
                app.compose.init(id);
            });

            $total.text(identities.length);
            ui.$content.append(ui.$pg);
            ui.$pg.fadeIn();
        }
    },

    actionItem: function (e) {
        e.preventDefault();

        var $form = $(e.target)
            , f
            , opts
            , action = $form.find('option:selected').val()
            , $table = ui.$pg.find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        c.log('app.identities.actionItem', action);

        ui.clearFormErrors($form);

        if (action === 'enable-address') {
            $.each($checked, function (i, cb) {
                var id = cb.value;

                c.log('enable address: ', id);
            }.bind(this));

        } else if ( action === 'disable-address' ) {
            $.each($checked, function (i, cb) {
                var id = cb.value;

                c.log('disable address: ', id);
            }.bind(this));

        } else if ( action === 'create-address' ) {
            f = $form.get(0);
            opts = {};

            opts.label = f.label.value;
            //unused
            opts.totalDifficulty = f.totalDifficulty.value;
            opts.smallMessageDifficulty = f.smallMessageDifficulty.value;
            opts.eighteenByteRipe = f.eighteenByteRipe.checked;

            c.log('form: ', f, opts);

            if ( opts.label && opts.label.length ) {
                api.createRandomAddress(opts, function(address){
                    var refresh = true;

                    ui.ok('Address ' + address + ' has been created');
                    api.listAddresses(this.showIdentities, refresh);
                    ui.resetForm($form);
                }.bind(this));
            } else {
                ui.err("Please specify a label for your address");
                $form.find('input[name=label]').parents('label').addClass('error');
            }
        } else if ( action === 'create-deterministic' ) {
            f = $form.get(0);
            opts = {};

            opts.passphrase = f.passphrase.value;
            //unused
            opts.number = f.number.value;
            opts.totalDifficulty = f.totalDifficulty.value;
            opts.smallMessageDifficulty = f.smallMessageDifficulty.value;
            opts.eighteenByteRipe = f.eighteenByteRipe.checked;

            c.log('form: ', f, opts);

            if ( opts.passphrase && opts.passphrase.length ) {
                api.createDeterministicAddress(opts, function(address){
                    var refresh = true;

                    if ( !address ) {
                        ui.err('You already created that address');
                    } else {
                        ui.ok('Deterministic address ' + address + ' has been created');
                    }

                    api.listAddresses(this.showIdentities, refresh);
                    ui.resetForm($form);
                }.bind(this));
            } else {
                ui.err("Please specify a passphrase for your deterministic address");
                $form.find('input[name=label]').parents('label').addClass('error');
            }
        }
    },

    destroy: function () {
        c.log('app.identities.destroy');

        /*
        ui.destroy();
        $(document).add('*').off('.' + this.ns);
        ui.$pg.remove();
        */

        this.parent.destroy(this.ns);
    }
});