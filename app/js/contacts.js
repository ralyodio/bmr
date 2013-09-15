app.create('contacts', {
    init: function () {
        if (!api.getConnection()) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        c.log('app.contacts.init');

        ui.init(this.ns);

        ui.partial('filter');
        ui.$pg = $(ui.tpl('contacts', {}));
        ui.$header.show();
        ui.$header.find('a.contacts').addClass('active').siblings().removeClass('active');

        api.listContacts(this.showContacts); //needs spinner

        //events
        ui.$pg.find('#contacts-action').on('submit.contacts', this.actionItem.bind(this));
        ui.$pg.find('#contacts-select-action').on('change.contacts', ui.showActionFields);
        ui.filter('.address, .label');
    },

    showContacts: function (contacts, refresh) {
        var $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.contacts .total')
            , $tbody = $table.find("tbody");

        c.log('contacts', contacts);

        $tbody.html(ui.tpl('contactsList', { contacts: contacts }));
        $total.text(contacts.length);

        //initialize events for the table
        if ( !refresh ) {
            ui.sortTable($table);
            ui.markAll($table);
            ui.shiftCheck.init($table);
            ui.checkItem($table);

            //stub: wire up events here for address rows here
            $tbody.on('click.contacts', 'tr .address', function(e){
                //this might need to use sendBroadcast instead of sendMessage
                e.preventDefault();

                var $address = $(e.currentTarget)
                    , id = $address.text();

                c.log('address', id);
                app.compose.init(id);
            });

            $total.text(contacts.length);
            ui.$content.append(ui.$pg);
            ui.$pg.fadeIn();
        }
    },

    actionItem: function (e) {
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = ui.$pg.find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        c.log('actionItem: ' + action);

        ui.clearFormErrors($form);

        if ( action === 'delete-contact' ) {
            $.each($checked, function (i, cb) {
                var address = cb.value;

                api.deleteContact(address, function(response){
                    var stat = response.split(/API Error (\d+): /)
                        , $row = $table.find('tr[data-address='+address+']');

                    if ( stat[1] ) {
                        ui.err(stat[2]);
                        c.error(stat[1], stat[2]);
                    } else {
                        ui.ok('Contact has been deleted');
                        c.log('contact status: ', address, stat[0]);

                        $row.fadeOut(600, function(){
                            var $total = $("a.contacts .total")
                                , total = $total.text()-1;

                            $total.text(total);
                            $(this).remove();
                        });
                    }
                });
            });

        } else if ( action === 'add-contact' ) {
            var f = $form.get(0)
                , address = f.address.value
                , label = f.label.value;

            //c.log('form: ', f, address, label);

            if ( address && address.length && label && label.length ) {
                api.addContact(address, label, function(response){
                    var refresh = true
                        , stat = response.split(/API Error (\d+): /);

                    //show error if there was one
                    if ( stat[1] ) {
                        ui.err(stat[2]);
                        $form.find('input[name=address]').parents('label').addClass('error');
                        c.error(stat[1], stat[2]);
                    } else {
                        ui.ok('Contact has been added');
                        c.log('contact status: ', stat[0]);
                        api.listContacts(this.showContacts, refresh);
                        ui.resetForm($form);
                    }
                }.bind(this));
            } else {
                //form errors
                if ( !label.length ) {
                    ui.err("Please specify a label for your contact");
                    $form.find('input[name=label]').parents('label').addClass('error');
                }

                if ( !address.length ) {
                    ui.err("Please specify an address for your contact");
                    $form.find('input[name=address]').parents('label').addClass('error');
                }
            }
        }
    },

    destroy: function () {
        c.log('app.contacts.destroy');

        ui.destroy();
        ui.$pg.remove();
        $(document).add('*').off('.' + this.ns);

        this.parent.destroy();
    }
});