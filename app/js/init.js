
//application initialization
(function($){
    $(function(){
        app.log('bmr ready...');

        //app event handling
        $("#login").on('submit', app.login);
        $("#inbox-action").on('submit', app.actionItem);
    });
})(jQuery);