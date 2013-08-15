(function($){
    var bm;

    var ui = {
        error: function(m){
            $("#msg").addClass('err').html(m).fadeIn();
        },

        ok: function(m){
            $("#msg").addClass('ok').html(m).fadeIn();
            ui.hideMsg();
        },

        hideMsg: function(){
            setTimeout(function(){
                $("#msg").hide().removeClass('ok err').html('');
            }, 5000);
        }
    };

    $(function(){
        log('bmr ready...');

        $("#login").on('submit', login);
    });

    function login(e){
        e.preventDefault();

        var $form = $(e.target)
            , user = $form.find('input[name=user]').val()
            , pass = $form.find('input[name=pass]').val()
            , host = $form.find('input[name=host]').val()
            , port = $form.find('input[name=port]').val()
            ;

        bm = require('bitmessage-node')(host, port, user, pass);

        ui.ok('Successfully connected to API');

        $("#login").fadeOut(function(){
            getInbox();
            $("#inbox").fadeIn();
        });

    }

    function getInbox(){
        try {
            bm.messages.inbox.list(function(msgs) {
                console.dir(msgs);
            });
        } catch (err) {
            console.dir(err);
        }
    }

    function sentMessages(){
        try {
            bm.messages.sent.list(function(msgs) {
                console.dir(msgs);
            });
        } catch (err){
            console.dir(err);
        }
    }

    function log(m){
        console && console.log(m);
    }
})(jQuery);



