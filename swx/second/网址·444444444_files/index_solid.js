// JavaScript Document  ×ÊÑ¶»ÃµÆÆ¬ CSS

function $(id) { return document.getElementById(id); }

function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
		return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function classNormal(iFocusBtnID,iFocusTxID){
	var iFocusBtns= $(iFocusBtnID).getElementsByTagName('li');
	var iFocusTxs = $(iFocusTxID).getElementsByTagName('li');
	for(var i=0; i<iFocusBtns.length; i++) {
		iFocusBtns[i].className='normal';
		iFocusTxs[i].className='normal';
	}
}

function classCurrent(iFocusBtnID,iFocusTxID,n){
	var iFocusBtns= $(iFocusBtnID).getElementsByTagName('li');
	var iFocusTxs = $(iFocusTxID).getElementsByTagName('li');
	iFocusBtns[n].className='current';
	iFocusTxs[n].className='current';
}

function iFocusChange() {
	if(!$('ifocus')) return false;
	$('ifocus').onmouseover = function(){atuokey = true};
	$('ifocus').onmouseout = function(){atuokey = false};
	var iFocusBtns = $('ifocus_btn').getElementsByTagName('li');
	var listLength = iFocusBtns.length;
	iFocusBtns[0].onmouseover = function() {
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
	if (listLength>=2) {
		iFocusBtns[1].onmouseover = function() {
			moveElement('ifocus_piclist',0,-270,3);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',1);
		}
	}
	if (listLength>=3) {
		iFocusBtns[2].onmouseover = function() {
			moveElement('ifocus_piclist',0,-540,3);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',2);
		}
	}
	if (listLength>=4) {
		iFocusBtns[3].onmouseover = function() {
			moveElement('ifocus_piclist',0,-805,3);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',3);
		}
	}
	if (listLength>=5) {
		iFocusBtns[4].onmouseover = function() {
			moveElement('ifocus_piclist',0,-1073,3);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',4);
		}
	}
	if (listLength>=6) {
		iFocusBtns[5].onmouseover = function() {
			moveElement('ifocus_piclist',0,-1340,3);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',5);
      	       }
	}
		if (listLength>=7) {
		iFocusBtns[6].onmouseover = function() {
			moveElement('ifocus_piclist',0,-1610,3);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',6);
      	       }
	}
	
        }

setInterval('autoiFocus()',3500);
var atuokey = false;
function autoiFocus() {
	if(!$('ifocus')) return false;
	if(atuokey) return false;
	var focusBtnList = $('ifocus_btn').getElementsByTagName('li');
	var listLength = focusBtnList.length;
	for(var i=0; i<listLength; i++) {
		if (focusBtnList[i].className == 'current') var currentNum = i;
	}
	if (currentNum==0&&listLength!=1 ){
		moveElement('ifocus_piclist',0,-270,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',1);
	}
	if (currentNum==1&&listLength!=2 ){
		moveElement('ifocus_piclist',0,-540,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',2);
	}
	if (currentNum==2&&listLength!=3 ){
		moveElement('ifocus_piclist',0,-805,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',3);
	}
	if (currentNum==3&&listLength!=4 ){
		moveElement('ifocus_piclist',0,-1073,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',4);
	}
		if (currentNum==4&&listLength!=5 ){
		moveElement('ifocus_piclist',0,-1340,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',5);
	}	
	if (currentNum==5&&listLength!=6 ){
		moveElement('ifocus_piclist',0,-1610,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',6);
	}
	
	
	if (currentNum==6 ){
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
	if (currentNum==1&&listLength==2 ){
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
	if (currentNum==2&&listLength==3 ){
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
	if (currentNum==3&&listLength==4 ){
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
		if (currentNum==4&&listLength==5 ){
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
		if (currentNum==5&&listLength==6 ){
		moveElement('ifocus_piclist',0,0,3);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',0);
	}
	
	
}
addLoadEvent(iFocusChange);





