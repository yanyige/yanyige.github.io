/**
 * Created by yyg on 15-10-26.
 */

$(document).ready(function(){

    jQuery.myscroll = function(scrolldom , scrolltime){
        $(scrolldom).click(function(){
            var scrollto = $(this).attr("scrollto");
            $("html , body").animate({
                scrollTop : $(scrollto).offset().top
            } , scrolltime);
        });
    }

    $.myscroll(".e6b");

    jQuery.imqq = function(){
        $(window).scroll(function(){
            //console.log(document.all.content2.offsetWidth);
            //console.log($("#eg7_wrap").offset().top);
            var t1 =  $("#eg7_wrap").offset().top - $(window).scrollTop();
            t1 = t1 * 0.1;
            var posX = "50%";
            var posY = t1+"px";
            $(".eg7_bg1").animate({"background-positionx":posX, "background-position-y":posY}, 200, 'easeOutQuint');
            var t2 = $("#content2").offset().top - $(window).scrollTop();
            t2 = t2 * 0.1;
            var posX = "50%";
            var posY = t2+"px";
            $(".eg7_bg2").animate({"background-positionx":posX, "background-position-y":posY}, 200, 'easeOutQuint');
            var t3 = $("#content3").offset().top - $(window).scrollTop();
            t3 = t3 * 0.1;
            var posX = "50%";
            var posY = t3+"px";
            $(".eg7_bg3").animate({"background-positionx":posX, "background-position-y":posY}, 200, 'easeOutQuint');
        });
        $('#eg7_wrap').mousemove(function(ev){
            var event = ev || window.event;
            //get the pos of the dom
            var pageX = event.pageX;
            var pageY = event.clientY;
            var posX = pageX * 0.009;
            var posY = pageY * 0.009;
            var ret = 'translate3D(' + posX + 'px, ' + posY + 'px, 0px)';
            console.log(ret);
            $('.eg7-cloud').css('transform', ret);
        });
    }
    $.imqq();

    jQuery.elippsetext = function(textdiv){
        var divheight = $(textdiv).outerHeight();
        var $p = $("p" , $(textdiv)).eq(0);
        var textheight = $("p" , $(textdiv)).eq(0).height();
        //console.log(divheight + " haha " + textheight);
       while(divheight<textheight){
           $p.text($p.text().replace(/([a-zA-Z0-9]+|[\W])(\.\.\.)*$/ , "..."));
            textheight = $p.outerHeight();
            console.log(textheight);
        }
    }
    $.elippsetext("#eg5_content2");
});

