$(document).ready(function(){

    jQuery.tabTrans = function() {
        $('.tab-link').click(function() {
            $('.tab-link').removeClass('active');
            $(this).addClass('active');
            $('.' + $(this).data('toggle')).show();
            $('.' + $(this).data('toggle')).siblings().hide();
        });
    }
    $.tabTrans();

});