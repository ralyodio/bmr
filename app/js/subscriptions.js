app.create('subscriptions', {
    init: function () {
        if (!api.conn) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        c.log('app.subscriptions.init');

        ui.init(this.ns);

        ui.$pg = $(ui.tpl('subscriptions', {}));
        ui.$header.show();
        ui.$header.find('a.subscriptions').addClass('active').siblings().removeClass('active');

        api.listSubscriptions(this.showSubscriptions); //needs spinner

        //events
        ui.$pg.find('#subscriptions-action').on('submit.subscriptions', this.actionItem.bind(this));
        ui.$pg.find('#subscriptions-select-action').on('change.subscriptions', ui.showActionFields);
    },

    showSubscriptions: function (subscriptions, refresh) {
        var $table = ui.$pg.find('table')
            , $total = ui.$header.find('a.subscriptions .total')
            , $tbody = $table.find("tbody");

        c.log('subscriptions', subscriptions);

        if ( refresh ) {
            $tbody.empty();
        }

        $tbody.append(ui.tpl('subscriptionsList', { subscriptions: subscriptions }));

        //initialize events for the table
        if ( !refresh ) {
            ui.sortTable($table);
        }

        ui.markAll($table);
        ui.shiftCheck.init($table);
        ui.checkItem($table);

        //stub: wire up events here for address rows here
        $tbody.on('click.subscriptions', 'tr .address', function(e){
            //this might need to use sendBroadcast instead of sendMessage
            e.preventDefault();

            var $address = $(e.currentTarget)
                , id = $address.text();

            c.log('address', id);
            app.compose.init(id);
        });

        $total.text(subscriptions.length);
        ui.$content.append(ui.$pg);
        ui.$pg.fadeIn();
    },

    actionItem: function (e) {
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = ui.$pg.find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        c.log('actionItem: ' + action);

        ui.clearFormErrors($form);

        if ( action === 'delete-subscription' ) {
            $.each($checked, function (i, cb) {
                var address = cb.value;

                api.unsubscribe(address, function(response){
                    var stat = response.split(/API Error (\d+): /)
                        , $row = $table.find('tr[data-address='+address+']');

                    if ( stat[1] ) {
                        ui.err(stat[2]);
                        c.error(stat[1], stat[2]);
                    } else {
                        ui.ok('Subscription has been deleted');
                        c.log('subscription status: ', address, stat[0]);

                        $row.fadeOut(600, function(){
                            var $total = $("a.subscriptions .total")
                                , total = $total.text()-1;

                            $total.text(total);
                            $(this).remove();
                        });
                    }
                });
            });

        } else if ( action === 'add-subscription' ) {
            var f = $form.get(0)
                , address = f.address.value
                , label = f.label.value;

            //c.log('form: ', f, address, label);

            if ( address && address.length && label && label.length ) {
                api.subscribe(address, label, function(response){
                    var refresh = true
                        , stat = response.split(/API Error (\d+): /);

                    //show error if there was one
                    if ( stat[1] ) {
                        ui.err(stat[2]);
                        $form.find('input[name=address]').parents('label').addClass('error');
                        c.error(stat[1], stat[2]);
                    } else {
                        ui.ok('Subscription has been added');
                        c.log('subscription status: ', stat[0]);
                        api.listSubscriptions(this.showSubscriptions, refresh);
                        ui.resetForm($form);
                    }
                }.bind(this));
            } else {
                //form errors
                if ( !label.length ) {
                    ui.err("Please specify a label for your subscription");
                    $form.find('input[name=label]').parents('label').addClass('error');
                }

                if ( !address.length ) {
                    ui.err("Please specify an address for your subscription");
                    $form.find('input[name=address]').parents('label').addClass('error');
                }
            }
        }
    },

    destroy: function () {
        c.log('app.subscriptions.destroy');

        ui.destroy();
        ui.$pg.remove();
        $(document).add('*').off('.' + this.ns);

        this.parent.destroy();
    }
});