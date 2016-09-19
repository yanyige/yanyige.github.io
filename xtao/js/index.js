$(document).ready(function(){

	jQuery.header = function() {
		$(".nav ul li").hover(function(){
			$(this).addClass('active');
		}, function(){
			$(this).removeClass('active');
		});
	}
	$.header();

	jQuery.ballsMove = function() {
		$(document).mousemove(function(ev){
	            var event = ev || window.event;
	            //get the pos of the dom
	            var pageX = event.pageX;
	            var pageY = event.clientY;
	            var posX = pageX * 0.009;
	            var posY = pageY * 0.009;
	            var ret = 'translate3D(' + posX + 'px, ' + posY + 'px, 0px)';
                $('.ball').css('transform', ret);
	            $('.cloud').css('transform', ret);
	    });
	}
	$.ballsMove();

	jQuery.myScroll = function() {
		$(window).scroll(function(){
            display($('.data-space'));
            display($('.data-analytic'));
            display($('.universe'));
        });
	}
	$.myScroll();

    function display(dom) {
        var scrollTop = (document.body.scrollTop || document.documentElement.scrollTop) + document.documentElement.clientHeight;
        if(scrollTop > dom.find('h2').offset().top + 100) {
            dom.find('h2').stop().fadeIn('slow');
        }else {
            dom.find('h2').stop().fadeOut('fast');
        }
        if(scrollTop > dom.find('p').offset().top + 100) {
            dom.find('p').stop().fadeIn('slow');
        }else {
            dom.find('p').stop().fadeOut('fast');
        }
        if(scrollTop > dom.find('.more').offset().top + 100) {
            $('.more').stop().fadeIn('slow');
        }else {
            $('.more').stop().fadeOut('fast');
        }
    }

	jQuery.slideScroll = function() {
		 $(window).scroll(function(){
            var t1 =  $(".universe").offset().top - $(window).scrollTop();
            t1 = t1 * 0.1;
            var posX = "50%";
            var posY = t1+$(".universe").data('top') + "px";
            $(".universe").stop().animate({"background-positionx":posX, "background-position-y":posY}, 3000, 'easeOutQuint');
            Array.prototype.slice.call($(".track-wrapper"), 0).forEach( function(element, index) {
                posY = t1 + $(element).data('top') + "px";
                $(element).stop().animate({"background-positionx":posX, "background-position-y":posY}, 3000, 'easeOutQuint');
            });
            t1 = $(window).scrollTop() - $(".data-analytic").offset().top;
            posY = t1 * 0.1 + $(".data-analytic").data('top')+ "px";
            $(".data-analytic").stop().animate({"background-positionx":posX, "background-position-y":posY}, 3000, 'easeOutQuint');
            t1 = $(".data-space").offset().top - $(window).scrollTop() -400;
            posY = t1 * 0.05 + "px";
            $(".data-space").stop().animate({"background-positionx":posX, "background-position-y":posY}, 3000, 'easeOutQuint');
        });
	}
	$.slideScroll();




	jQuery.sportsBall = function(){
         //定义画布宽高和生成点的个数
        var WIDTH = document.documentElement.clientWidth, HEIGHT = 6000, POINT = 35;
        
        var canvas = document.getElementById('canvas');
        canvas.width = WIDTH,
        canvas.height = HEIGHT;
        var context = canvas.getContext('2d');
        context.strokeStyle = 'rgba(0,0,0,0.1)',
        context.strokeWidth = 1,
        context.fillStyle = 'rgba(0,0,0,0.5)';
        var circleArr = [];

        //线条：开始xy坐标，结束xy坐标，线条透明度
        function Line (x, y, _x, _y, o) {
            this.beginX = x,
            this.beginY = y,
            this.closeX = _x,
            this.closeY = _y,
            this.o = o;
        }
        //点：圆心xy坐标，半径，每帧移动xy的距离
        function Circle (x, y, r, moveX, moveY) {
            this.x = x,
            this.y = y,
            this.r = r,
            this.moveX = moveX,
            this.moveY = moveY;
        }
        //生成max和min之间的随机数
        function num (max, _min) {
            var min = arguments[1] || 0;
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        // 绘制原点
        function drawCricle (cxt, x, y, r, moveX, moveY) {
            var img = new Image();
            img.src = "image/icon-2.png"
            var circle = new Circle(x, y, r, moveX, moveY)
            cxt.beginPath()
            // context.fillStyle = 'rgba(36,240,255,0.3)';
            // cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
            // cxt.closePath()
            // cxt.fill();
            cxt.drawImage(img, x-r*1, y-r*1, r* 2, r*2);
            return circle;
        }
        //绘制线条
        function drawLine (cxt, x, y, _x, _y, o) {
            var line = new Line(x, y, _x, _y, o)
            cxt.beginPath()
            cxt.strokeStyle = 'rgba(36,240,255,0.03)'
            cxt.moveTo(line.beginX, line.beginY)
            cxt.lineTo(line.closeX, line.closeY)
            cxt.closePath()
            cxt.stroke();

        }
        //初始化生成原点
        function init () {
            circleArr = [];
            for (var i = 0; i < POINT; i++) {
                circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
            }
            draw();
        }

        //每帧绘制
        function draw () {
            context.clearRect(0,0,canvas.width, canvas.height);
            for (var i = 0; i < POINT; i++) {
                drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
            }
            for (var i = 0; i < POINT; i++) {
                var j = i - 1;
                    if (j < POINT && j > 0) {
                        var A = Math.abs(circleArr[j].x - circleArr[i].x),
                            B = Math.abs(circleArr[j].y - circleArr[i].y);
                        var lineLength = Math.sqrt(A*A + B*B);
                        var C = 1/lineLength*7-0.009;
                        var lineOpacity = C > 0.03 ? 0.03 : C;
                        drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[j].x, circleArr[j].y, lineOpacity);
                        
                    }
                j = i + 1;
                    if (j < POINT && j > 0) {
                        var A = Math.abs(circleArr[j].x - circleArr[i].x),
                            B = Math.abs(circleArr[j].y - circleArr[i].y);
                        var lineLength = Math.sqrt(A*A + B*B);
                        var C = 1/lineLength*7-0.009;
                        var lineOpacity = C > 0.03 ? 0.03 : C;
                        drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[j].x, circleArr[j].y, lineOpacity);
                        
                    }
            }
        }

        //调用执行
        init();
        setInterval(function () {
            for (var i = 0; i < POINT; i++) {
                var cir = circleArr[i];
                cir.x += cir.moveX;
                cir.y += cir.moveY;
                if (cir.x > WIDTH) cir.x = 0;
                else if (cir.x < 0) cir.x = WIDTH;
                if (cir.y > HEIGHT) cir.y = 0;
                else if (cir.y < 0) cir.y = HEIGHT;
                
            }
            draw();
        }, 16);
    }
    $.sportsBall();

});