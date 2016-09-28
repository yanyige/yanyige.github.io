$(document).ready(function(){

    jQuery.header = function() {
        $(".nav ul li").hover(function(){
            $(this).addClass('active');
        }, function(){
            $(this).removeClass('active');
        });
    }
    $.header();

	jQuery.toggleNav = function() {
        $('.menu-icon').click(function() {
            $("body").toggleClass('body-nav');
            if($(".sub-nav").is(':visible')) {
                $("nav ul").fadeIn(1000);
                $(".sub-nav").stop().animate({
                    right: "-500px"
                }, 1000, function() {
                    $(".sub-nav").css({"display":"none"});
                });
                $(".menu-icon").stop().animate({
                    right: "-40"
                }, 1000, function() {
                });

            }else {
                $("nav ul").fadeOut(1000);
                $(".sub-nav").css({"display":"block"});
                $(".sub-nav").stop().animate({
                    right: "0"
                }, 1000, function() {
                });
                $(".menu-icon").stop().animate({
                    right: "260"
                }, 1000, function() {
                });
            }
        });
    }
    $.toggleNav();
    
});