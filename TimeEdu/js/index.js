$(function() {
	// var pass = prompt('请输入时代教育提供的密码', password);
	// if(pass == 'shidaijiaoyu123') {
	// 	location.href = 'user/main.html';
	// }
	$('#submit').click(function() {
		localStorage.setItem('login', true);
		window.location.href = "user/login.html";
	});
});