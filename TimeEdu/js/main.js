$(document).ready(function(){

	var done = false;

	// if(localStorage.getItem('login') !== 'true') {
	// 	alert("请先输入密码再访问本页面！");

	// 	$(window).unbind('beforeunload');
	// 	window.location.href = '../index.html';
	// }

	// $(window).on('beforeunload',function(){
	// 	localStorage.removeItem('login');
	// });

	var Sets = function(){};
	Sets.sets = [];
	var problemType = '-1';
	var problemId = 0;
	var setId = -1;
	var changshiSet = new ProblemSet(1, 'changshi', 900, true, '常识判断', '根据题目要求，在四个选项中选出一个最恰当的答案', 20);
	var panduanSet = new ProblemSet(2, 'panduan', 35*60, true, '判断推理', '请按每道题的答题要求作答', 40);
	var shuliangSet = new ProblemSet(3, 'shuliang', 900, true, '数量关系', '在这部分试题中，每道题呈现一段表述数字关系的文字，要求你迅速、准确地计算出答案', 15);
	var yanyuSet = new ProblemSet(4, 'yanyu', 35*60, true, ' 言语理解与表达', '本部分包括表达与理解两方面的内容。请根据题目要求，在四个选项中选出一个最恰当的答案', 40);
	var ziliaoSet = new ProblemSet(5, 'ziliao', 1200, true, '资料分析', '所给出的图、表、文字或综合性资料均有若干个问题要你回答。你应根据资料提供的信息进行分析、比较、计算和判断处理', 20);
	var partTimer;

	function ProblemSet(id, type, limitTime, status, title, titleIntro, count) {

		this.id = id;
		this.type = type;
		this.limitTime = limitTime;
		this.status = status;
		this.problems = [];
		this.title = title;
		this.titleIntro = titleIntro;
		this.count = count;

	}

	function Problem(id, content, status, ans, opt, sAns, type, key, title, titleId) {

		this.id = id;
		this.content = content;
		this.status = status;
		this.ans = ans;
		this.opt = opt;
		this.sAns = sAns;
		this.type = type;
		this.key = key;
		this.title = title;
		this.titleId = titleId;

	}

	Sets.findSet = function(type) {
		var _set;
		this.sets.forEach(function(item) {
			if(item.type == type) return _set = item;
		});
		return _set;
	}

	Sets.lastedSet = function() {
		var tot = 0;
		this.sets.forEach(function(item) {
			if(item.status == true) {
				tot ++;
			}
		});
		return tot;
	}

	ProblemSet.prototype.findProblem = function(id) {
		return this.problems[id];
	}

	ProblemSet.prototype.lastedProblem = function() {
		return this.problems.filter(function(item) {
			if(item.status == true) return item;
		}).length;
	}

	function getAns() {
		$('#main').hide();

		var ret = [];
		var _right = 0;
		var _all = 0;
		Sets.sets.forEach(function(item) {
			var _item = item;
			var obj = {};
			var empty = 0;
			var right = 0;
			item.problems.map(function(item) {
				// console.log(item.sAns.charCodeAt(0));
				// console.log(item.ans);
				if(item.ans == -1) {
					empty ++;
				}
				if(item.ans == item.sAns.charCodeAt(0) - 65) {
					right ++;
				}
			});
			obj.empty = empty;
			obj.right = right;
			obj.all = item.problems.length;
			_all += obj.all;
			_right += right;
			ret.push(obj);
		});
		ret.forEach(function(item, id) {
			var _id = 'art'+id;
			var _div = $('<div id="art'+id+'" style="width: 600px;height:400px;margin: 0 auto"></div>');
			$('.result').append(_div);

			var myChart = echarts.init(document.getElementById(_id));

	        // 指定图表的配置项和数据
	        var option = {
	            title: {
	                text: '第' + num[parseInt(id + 1)] + "部分考试结果:",
			        x:'center'
	            },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: ['正确','错误','未作答']
			    },
			    series : [
			        {
			            name: '答题情况',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:item.right, name:'正确'},
			                {value:item.all - item.right - item.empty, name:'错误'},
			                {value:item.empty, name:'未作答'},
			            ],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
	        };


	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);

		});
		var rate = _right / _all;
		alert('一共'+_all+'道题，你答对了'+_right+'题目，最后得分是'+100*rate+'分！');
		$('.result').height($(window).height());

		done = true;
	}

	function showTitleDesc(_set) {
		$('.title-intro').children().remove();
		_content = $('<p></p>');
		var _text = '第'+num[_set.id]+'部分'+'——'+_set.title;
		_text = _text + '<br>' + _set.titleIntro;
		_content.html(_text);
		$('.title-intro').append(_content);
	}

	function trySwitchProblem(type, id) {
		var _oriset = Sets.findSet(problemType);
		var _set = Sets.findSet(type);
		var setid = _set.id;

		if(done == false) {
			if(_oriset == undefined) {
				var flag = confirm('您选择进入'+num[_set.id]+'部分答题'+',该部分共'+_set.problems.length+'题,作答时限'+_set.limitTime/60+'分钟。确认进入作答吗?');
				if(flag) {
					switchProblem(type, id, setid);

					if(partTimer){
						clearTimeout(partTimer);
					}
					showTitleDesc(_set);
					partTimer = showPartTime(_set, _set.limitTime);

				}
				return;
			}
			// console.log(_set);
			if(problemType != type) { // 跳转到其他类型
				if(_set.status == false) {
					alert('该部分已经作答，你无法返回该部分');
				}else {
					var _lastedProblem = _oriset.lastedProblem();
					// if(_lastedProblem == _oriset.problems.length) {
					// 	var flag = confirm('您选择进入'+_set.id+'部分答题'+',该部分共'+_set.problems.length+'题,作答时限15分钟。确认进入作答吗?');
					// 	if(flag) {
					// 		switchProblem(type, id);
					// 		_oriset.status = false;
					// 	}
					// } else
					if(_lastedProblem != 0) {
						var flag = confirm('第'+num[_oriset.id]+'部分还有'+_lastedProblem+'题未作答。离开后，该部分的所有作答结果将不能查看或更改。确认要离开吗？');
						if(flag) {
							switchProblem(type, id, setid);
							_oriset.status = false;

							if(partTimer){
								clearTimeout(partTimer);
							}
							showTitleDesc(_set);
							partTimer = showPartTime(_set, _set.limitTime);

						}
					} else {
						var flag = confirm('离开后'+num[_oriset.id]+'部分的所有作答结果将不能查看或更改，确定要离开吗？');
						if(flag) {
							switchProblem(type, id, setid);
							_oriset.status = false;

							if(partTimer){
								clearTimeout(partTimer);
							}
							showTitleDesc(_set);
							partTimer = showPartTime(_set, _set.limitTime);

						}
					}
				}
			} else {
				if(_set.status == false) {
					alert('该部分已经作答，你无法返回该部分');
				}else{
					switchProblem(type, id, setid);
				}
			}
		} else {
			switchProblem(type, id, setid);
		}
	}

	function switchProblem(type, id, setid) {
		problemType = type;
		problemId = id;
		setId = setid;
		render();
		panelRender();
		updateOptEvent();
		updatePanelEvent();

		$('.problem ul').show();
		$('#welcome').hide();
	}

	// var logic = new ProblemSet(1, 'logic', )



	function resize() {

		$(window).resize(function(){
			var Height = $(window).height();
			$('nav').css('height', Height - 86);
			$('.subject').css('height', Height - 86);
		});

		var Height = $(window).height();
		$('nav').css('height', Height - 86);
		$('.subject').css('height', Height - 86);

	}

	function loadProblem(set, problems) {
		// changshiProblems.forEach(function(item, id){
		// 	var _problem = new Problem(item.id, item.content, true, item.ans, item.opt, item.sAns, item.type, false);
		// 	changshiSet.problems.push(_problem);
		// });
		if(set.type == 'ziliao') {
			console.log(problems);
			var _count = set.count / 5;
			var temp_count = set.count / 5;
			var _id = 0;
			var flag = new Array(100);
			var rand;
			while(_count--) {
				rand = parseInt(Math.random() * temp_count);
				while(flag[rand] === true) {
					rand = parseInt(Math.random() * temp_count);
				}
				flag[rand] = true;
				for(var i = 0 ; i < 5 ; i ++) {
					var _rand = 5 * rand + i;
					var _problem = new Problem(problems[_rand].id, problems[_rand].content, true, problems[_rand].ans, problems[_rand].opt, problems[_rand].sAns, problems[_rand].type, false, problems[_rand].title, problems[_rand].titleId);
					set.problems.push(_problem);
				}
			}
		}else {
			var _count = set.count;
			var _id = 0;
			var flag = new Array(100);
			var rand;
			while(_count--) {
				rand = parseInt(Math.random() * set.count);
				while(flag[rand] === true) {
					rand = parseInt(Math.random() * set.count);
				}
				flag[rand] = true;
				var _problem = new Problem(problems[rand].id, problems[rand].content, true, problems[rand].ans, problems[rand].opt, problems[rand].sAns, problems[rand].type, false, problems[rand].title, problems[rand].titleId);
				set.problems.push(_problem);
			}
		}

		// panduanProblems.forEach(function(item, id){
		// 	var _problem = new Problem(item.id, item.content, true, item.ans, item.opt, item.sAns, item.type, false);
		// 	panduanSet.problems.push(_problem);
		// });
		// shuliangProblems.forEach(function(item, id){
		// 	var _problem = new Problem(item.id, item.content, true, item.ans, item.opt, item.sAns, item.type, false);
		// 	shuliangSet.problems.push(_problem);
		// });
		// ziliaoProblems.forEach(function(item, id){
		// 	var _problem = new Problem(item.id, item.content, true, item.ans, item.opt, item.sAns, item.type, false);
		// 	ziliaoSet.problems.push(_problem);
		// });
		// yanyuProblems.forEach(function(item, id){
		// 	var _problem = new Problem(item.id, item.content, true, item.ans, item.opt, item.sAns, item.type, false);
		// 	yanyuSet.problems.push(_problem);
		// });
		// Sets.sets.push(changshiSet, panduanSet, shuliangSet, yanyuSet, ziliaoSet);
		Sets.sets.push(set);

	}

	function updateOptEvent() {
		/******************************************************* *************************************/
		var _set = Sets.findSet(problemType);
		var _problem = _set.findProblem(problemId);
		Array.prototype.slice.call($('.problem ul li input'), 0).map(function(item, id){
			$(item).unbind('click');
			$(item).prop("checked",false);
			// console.log('当前答案：')
			// console.log(_problem.ans);
			// console.log('当前id：')
			// console.log(id);
			if(_problem.ans == id) {
				$(item).prop("checked",true);
			}
			// console.log('*****************************');
		});
		Array.prototype.slice.call($('.problem ul li input'), 0).map(function(item, id){
			$(item).click(function() {
				// _set.status = false;
				_problem.status = false;
				_problem.ans = id;
			});
		});
	}
	function updatePanelEvent() {

		/******************************************************* *************************************/
		$('.no').click(function() {
			var _type = $(this).parents('.pro-block').data('type');
			var _id = $(this).text() - 1;
			trySwitchProblem(_type, _id);
		});

	}
	function render() {
		var _set = Sets.findSet(problemType);
		var _problem = _set.findProblem(problemId);
		// console.log(problemType);
		// console.log(problemId);
		// console.log(_problem.content);
		// console.log(_set);
		var _label = $('<label></label>');
		_label.text(_problem.id);
		var _content = $('<p></p>');
		$(_content).html(_problem.content);
		$('.problem-content').html(_content);
		$('.problem-content p').prepend(_label);
		Array.prototype.slice.call($('.problem ul li'), 0).map(function(item, id){
			$(item).find('label').html('<span style="float:left;">'+String.fromCharCode(65+id)+'. </span>'+_problem.opt[id]);
		});
		if(_problem.type == 'picInContent') {
			var _img = new Image();
			var _src = 'images/' + _set.id + '-' + _problem.id + '.png';
			_img.src = _src;
			$(_img).css({'vertical-align': 'top', 'margin-left': '70px'});
			$('.problem-content').append(_img);
		}
		if(_problem.type == 'picInBoth') {
			var _img = new Image();
			var _src = 'images/' + _set.id + '-' + _problem.id + '.png';
			_img.src = _src;
			$(_img).css({'vertical-align': 'top', 'margin-left': '70px'});
			$('.problem-content').append(_img);
		}
		if(_problem.type == 'withTitleAndPic') {
			var _img = new Image();
			var _src = 'images/' + _set.id + '-' + _problem.titleId + '.png';
			_img.src = _src;
			$(_img).css({'vertical-align': 'top', 'margin-left': '70px'});
			$('.problem-content').prepend(_img);
			var _content = $('<p></p>');
			_content.html(_problem.title);
			$('.problem-content').prepend(_content);
		}
		if(_problem.type == 'withTitle') {
			var _content = $('<p></p>');
			_content.html(_problem.title);
			$('.problem-content').prepend(_content);
		}

		if(done == true) {
			var _ans=$('<p></p>');
			_ans.html('答案是'+_problem.sAns);
			$('.problem-content').prepend(_ans);
		}

	}

	function showPartTime(set, time) {

		var endTime = new Date().getTime() + time * 1000;
		var _el = $('<div class="partTime">本部分剩余时间'+'<span class="partHour"></span>:<span class="partMinute"></span>:<span class="partSecond"></span>'+'</div');
		$('.title-intro p').append(_el);

		function go () {

			var nowTime = new Date().getTime();
			var leftTime = (endTime - nowTime) /  1000;
			var h = parseInt(leftTime / (3600) % 24);
			var m = parseInt(leftTime / (60) % 60);
			var s = parseInt(leftTime % 60);

			$('.partHour').text(h);
			$('.partMinute').text(m);
			$('.partSecond').text(s);
			partTimer = setTimeout(go, 500);

			if(leftTime <= 0) {
				alert('时间到!请选择另外一个部分开始作答。');
				set.status = false;
				clearTimeout(partTimer);
			}
		}

		go();
	}

	function panelRender() {
		$('.pro-wrapper').children().remove();
		Sets.sets.map(function(item, id) {
			var _item = item;
			var _id = id;
			item.problems.map(function(item, id) {
				var _node = '<div class="no">'+parseInt(id+1)+'</div>';
				$('.'+_item.type).find('.pro-wrapper').append($(_node));
				if(item.status == false) {
					$('.pro-wrapper').eq(_item.id - 1).find('.no').eq(id).removeClass('pro-focus').addClass('pro-done');
				}
				if(item.key === true) {
					$('.pro-wrapper').eq(_item.id - 1).find('.no').eq(id).addClass('addkey');
				} else {
					$('.pro-wrapper').eq(_item.id - 1).find('.no').eq(id).removeClass('addkey');
				}
				if(done == true && item.ans == item.sAns.charCodeAt(0) - 65) {
					$('.pro-wrapper').eq(_item.id - 1).find('.no').eq(id).removeClass('pro-focus').removeClass('pro-done').addClass('pro-right');
				} else if(done == true && item.ans != item.sAns.charCodeAt(0) - 65) {
					$('.pro-wrapper').eq(_item.id - 1).find('.no').eq(id).removeClass('pro-focus').removeClass('pro-done').addClass('pro-wrong');
				}
			});
			var _content = '第'+num[item.id]+'部分'+'——'+item.title;
			$('.block-title').eq(id).find('p').text(_content);
			if(item.status == false) {
				$('.block-title').eq(item.id - 1).addClass('set-done');
			}
		});
		if(setId > 0) {
			$('.pro-wrapper').eq(setId - 1).find('.no').eq(problemId).removeClass('pro-done').addClass('pro-focus');
		}
	}

	function validate(type) {
		var _set = Sets.findSet(type);
		return _set.status;
	}

	function init() {
		$('.no').click(function() {
			var _type = $(this).parents('.pro-block').data('type');
			var _id = $(this).text() - 1;
			trySwitchProblem(_type, _id);
			// if(validate(_type)) {
			// 	var _oriset = Sets.findSet(problemType);
			// 	var _lastedPro = _oriset.lastedProblem;
			// 	console.log(_lastedPro);
			// 	_oriset.status = false;
			// 	problemType = _type;
			// 	problemId = _id;
			// 	render();
			// } else {
			// 	alert('该部分已经作答，你无法返回该部分');
			// }
			render();
			panelRender();
			updateOptEvent();
			updatePanelEvent();


		});
		panelRender();
		updatePanelEvent();
		// render();

		$('.problem ul').hide();
		// console.log($('.problem ul'));

		$('#handin_btn').click(function(){
			var _lastedSet = Sets.lastedSet();
			if(_lastedSet != 0) {
				var info = '你还有' + num[_lastedSet] + '个部分没有作答，确认要提交吗？';
				var flag = confirm(info);
				if(flag == true) {
					getAns();
				}
			} else {
				var info = '确认要提交吗？';
				var flag = confirm(info);
				if(flag == true) {
					getAns();
				}
			}
		});

		$('.change_part').click(function() {
			var _type = $(this).data('type');
			trySwitchProblem(_type, problemId);
		});

		$('.lookResult').click(function() {
			$('.result').hide();
			$('#main').show();
			if(problemType != '-1'){
				switchProblem(problemType, problemId);
			}

		});
	}

	function countDown() {
		var endTime = new Date().getTime() + 7200 * 1000;

		function go () {

			var nowTime = new Date().getTime();
			var leftTime = (endTime - nowTime) /  1000;
			var h = parseInt(leftTime / (3600) % 24);
			var m = parseInt(leftTime / (60) % 60);
			var s = parseInt(leftTime % 60);

			$('.hour').text(h);
			$('.minute').text(m);
			$('.second').text(s);
			var _timer = setTimeout(go, 500);

			if(leftTime <= 0) {
				alert('时间到!');
				getAns();
				clearTimeout(_timer);
			}
		}

		go();
	}

	function service() {
		$('.next').click(function() {
			var _set = Sets.findSet(problemType);
			if(problemId < _set.problems.length - 1) {
				problemId ++;
				trySwitchProblem(problemType, problemId);
			}
		});
		$('.up').click(function() {
			var _set = Sets.findSet(problemType);
			if(problemId >= 1) {
				problemId --;
				trySwitchProblem(problemType, problemId);
			}
		});
		$('.key').click(function() {
			var _set = Sets.findSet(problemType);
			_set.findProblem(problemId).key = !_set.findProblem(problemId).key;
			render();
			panelRender();
			updateOptEvent();
			updatePanelEvent();
		});
	}

	(function (){

		loadProblem(changshiSet, changshiProblems);
		loadProblem(panduanSet, panduanProblems);
		loadProblem(shuliangSet, shuliangProblems);
		loadProblem(yanyuSet, yanyuProblems);
		loadProblem(ziliaoSet, ziliaoProblems);
		init();
		countDown();
		resize();
		service();

	})();

});

var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];