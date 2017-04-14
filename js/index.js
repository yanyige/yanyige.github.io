$(document).ready(() => {

	var leftTitle = document.getElementsByClassName('title-left')[0];
	var rightTitle = document.getElementsByClassName('title-right')[0];
	var menuIcon = document.getElementsByClassName('menu-icon')[0];
	var iconArr = document.getElementsByClassName('icon-arr-down')[0];
	var titleName = document.getElementsByClassName('title-name')[0];
	var bottomName = document.getElementsByClassName('bottom-name')[0];
	var menuBar = document.getElementsByClassName('menu-bar')[0];
	var menuItemRightName = document.getElementsByClassName('menu-item-right-name')[0];
	var menuItemRightBlog = document.getElementsByClassName('menu-item-right-blog')[0];

	const parts = ['title', 'aboutMe', 'education', 'awards', 'projects', 'skills', 'evaluate', 'contact', 'gallary'];

	leftTitle.onmouseover = () => {
		var menuIconCss = document.defaultView.getComputedStyle(menuIcon, null);
		menuIcon.style.opacity = '0';
		titleName.className = 'title-name title-name-animated';
		bottomName.className = 'bottom-name bottom-name-animated';
		menuBar.className = 'menu-bar menu-bar-animated';

	}
	leftTitle.onmouseout = () => {
		menuIcon.style.opacity = '1';
		menuIcon.style.display = 'block';
		titleName.className = 'title-name';
		bottomName.className = 'bottom-name';
		menuBar.className = 'menu-bar';
	}

	rightTitle.onmouseover = () => {
		iconArr.style.opacity = '0';
		menuItemRightName.className = 'menu-item-right-name menu-item-right-name-animated';
		menuItemRightBlog.className = 'menu-item-right-blog menu-item-right-blog-animated';

	}
	rightTitle.onmouseout = () => {
		iconArr.style.opacity = '1';
		menuItemRightName.className = 'menu-item-right-name';
		menuItemRightBlog.className = 'menu-item-right-blog';
	}

	$('.menu-item').add($('.bar-left').children(':first').next().children()).click(function() {
		var item = $(this).children(':first').data('target');
		if(item == 'home'){
			$.scrollTo(item, 2000);
		}else {
			$.scrollTo($('#' + item), 2000);
		}
	})

	$('.menu-item-right-name').click(function() {
		$.scrollTo($('#aboutMe'), 2000);
	});

	$('.xiaohui').click(function() {
		$.scrollTo('home', 2000);
	})

	jQuery.scrollTo = (target, time) => {
		console.log(target);
		if(target == 'home') {
			$('html, body').stop().animate({
				scrollTop: 0
			}, time);
		} else {
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, time);
		}
		$.showTag(target);
	}

	jQuery.getCurrentPart = () => {
		var scrollHeight = $(document).scrollTop();
		var windowHeight = $(window).height();
		var currentPart = parseInt(scrollHeight / windowHeight);

		return currentPart;
	}

	var scrollFunc = function (e) {

		if($('html, body').is(':animated')) {
		} else {
	        var direct = 0;
	        e = e || window.event;
	        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
	            if (e.wheelDelta > 0) { //当滑轮向上滚动时
	                // alert("滑轮向上滚动");
	                if($.getCurrentPart() == 0 || $.getCurrentPart() == 1) {
	                	$.scrollTo($('.title'), 1000);
	                }
	                else if($.getCurrentPart() > 0)
	                $.scrollTo($('#'+parts[$.getCurrentPart() - 1]), 1000);
	            }
	            if (e.wheelDelta < 0) { //当滑轮向下滚动时
	                // alert("滑轮向下滚动");
	            	console.log($.getCurrentPart());
	            	console.log(parts[$.getCurrentPart() + 1]);
	                if($.getCurrentPart() < 9)
	                $.scrollTo($('#'+parts[$.getCurrentPart() + 1]), 1000);
	            }
	        } else if (e.detail) {  //Firefox滑轮事件
	            if (e.detail> 0) { //当滑轮向上滚动时
	                // alert("滑轮向上滚动");
	                if($.getCurrentPart() == 0 || $.getCurrentPart() == 1) {
	                	$.scrollTo($('.title'), 1000);
	                }
	                else if($.getCurrentPart() > 0)
	                $.scrollTo($('#'+parts[$.getCurrentPart() - 1]), 1000);
	            }
	            if (e.detail< 0) { //当滑轮向下滚动时
	                // alert("滑轮向下滚动");
	                if($.getCurrentPart() < 9)
	                $.scrollTo($('#'+parts[$.getCurrentPart() + 1]), 1000);
	            }
	        }
		}
    }
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;

    $(window).scroll(function() {
    	// var scrollTop = $(window).scrollTop();
    	// var windowHeight = $(window).height();
    	// if(scrollTop >= windowHeight) {
    	// 	$('.bar-left').show();
    	// } else {
    	// 	$('.bar-left').hide();
    	// }
    });

    jQuery.showTag = (target) => {
    	if(target == 'home') {
    		var _target = target;
    	}else {
    		var _target = target.attr('id');
    	}
    	$('.body-item-name').map((id, item) => {
			$(item).removeClass('active');
    	});
    	$('.body-item-name').map((id, item) => {
    		if(_target == $(item).data('target')) {
    			$(item).addClass('active');
    		}
    	});
    }

});