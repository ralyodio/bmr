app.create('subscriptions', {
    init: function () {
        if (!api.conn) {
            c.log('No connection.');
            ui.navigateTo(null, 'logout');
            return;
        }

        c.log('app.subscriptions.init');

        ui.init();
        api.listSubscriptions(); //needs spinner

        $("body > header").show();
        $("a.subscriptions").addClass('active').siblings().removeClass('active');

        $("#subscriptions-action").on('submit.subscriptions', this.actionItem.bind(this));
        $("#subscriptions-select-action").on('change.subscriptions', ui.showActionFields);
    },

    showSubscriptions: function (subscriptions, refresh) {
        var $pg = $("#subscriptions")
            , $table = $pg.find('table')
            , $total = $('a.subscriptions .total')
            , $tbody = $pg.find("tbody");

        c.log('subscriptions', subscriptions);

        if ( refresh ) {
            $tbody.empty();
        }

        subscriptions.forEach(function (item) {
            var address = item.address
                , label = item.label
                , enabled = item.enabled;

            //c.log(item);

            $tbody.append(
                '<tr data-address="' + address + '">' +
                    '<td class="mark-item"><input type="checkbox" name="mark" value="' + address + '"></td>' +
                    '<td data-sort="' + label + '"><span class="nowrap">' + label + '</span></td>' +
                    '<td data-sort="' + address + '"><span class="nowrap">' + address + '</span></td>' +
                    '<td data-sort="' + enabled + '"><span class="enabled">' + enabled + '</span></td>' +
                    '</tr>'
            );
        });

        //initialize events for the table
        if ( !refresh ) {
            ui.sortTable($table);
        }

        ui.markAll($table);
        ui.shiftCheck.init($table);
        ui.checkItem($table);

        //call to wire up events here for address rows

        $total.text(subscriptions.length);
        $pg.fadeIn();
    },

    actionItem: function (e) {
        e.preventDefault();

        var $form = $(e.target)
            , action = $form.find('option:selected').val()
            , $table = $form.parents('section').find('table')
            , $checked = $table.find('tbody td:first-child [type=checkbox]:checked');

        c.log('actionItem: ' + action);

        ui.clearFormErrors($form);

        if ( action === 'delete-subscription' ) {
            $.each($checked, function (i, cb) {
                var id = cb.value;

                c.log('delete subscription: ', id);
            }.bind(this));

        } else if ( action === 'add-subscription' ) {
            var f = $form.get(0)
                , address = f.address.value
                , label = f.label.value;

            //c.log('form: ', f, address, label);

            if ( address && address.length && label && label.length ) {
                api.subscribe(address, label, function(response){
                    var refresh = true
                        , stat = response.split(/API Error (\d+): /);

                    if ( stat[1] ) {
                        ui.err(stat[2]);
                        $form.find('input[name=address]').parents('label').addClass('error');
                        c.error(stat[1], stat[2]);
                    } else {
                        ui.ok('Subscription has been added');
                        c.log('subscription status: ', stat[0]);
                        api.listSubscriptions(refresh);
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
        var $pg = $('#' + this.ns);

        ui.destroy();
        $(document).add('*').off('.' + this.ns);

        $pg.hide();
        $pg.find("tbody").empty();
    }
});