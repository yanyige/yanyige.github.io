/**
 * Created by yyg on 2016/3/5.
 */

window.onload = function(){
    alignDiv("leftBox", "rightBox");
    testScore();
}

var anss=[];
var ANS;//记录结果
var youranss = [];
var score = 0;
var tScore = 0;
var allFormulas = [];

function testScore(){
    var box = document.getElementsByClassName("guest-score")[0];
    box.innerHTML = box.innerHTML.replace(/()(\d+)$/, "$1");
    box.innerHTML += (score + "");
}

function alignDiv(a, b){
    var box1 = document.getElementById(a);
    var box2 = document.getElementById(b);
    var h1 = box1.offsetHeight;
    var h2 = box2.offsetHeight;
    box1.style.height = Math.max(h1, h2) + "px";
    box2.style.height = Math.max(h1, h2) + "px";
}

function submit(){

    var tScore = 0;
    $("#leftBox").hide();
    $("#leftBox1").hide();
    $("#leftBox2").css({"height":"381px"});
    $("#leftBox2").fadeIn(2000);
    while(youranss.length){
        youranss.pop();
    }
    var text = document.getElementById("problem-table").children[0].children;
    for(var i = 0 ; i < 5 ; i ++){
        youranss.push(text[i].children[2].children[0].value);
    }
    text = document.getElementById("ans-table").children[0].children;
    for(var i = 0 ; i < 5 ; i ++){
        var text = document.getElementById("ans-table").children[0].children;
        text[i].children[1].innerHTML = "正确答案"+anss[i].toString();
    }
    for(var i = 0 ; i < 5 ; i ++){
        var text = document.getElementById("ans-table").children[0].children;
        text[i].children[2].innerHTML = "你的答案"+youranss[i];
    }
    for(var i = 0 ; i < 5 ; i ++){
        var text = document.getElementById("ans-table").children[0].children;
        if(anss[i] == youranss[i]){
            text[i].children[3].innerHTML = '<i class="fa fa-check"></i>';
            tScore ++;
        }
        else
            text[i].children[3].innerHTML = '<i class="fa fa-times"></i>';
    }
    score += tScore;
    text[5].children[0].innerHTML = '#';
    text[5].children[1].innerHTML = '本次得分:' + tScore;
    text[5].children[2].innerHTML = '您的总分:' + score;
}

function back(){
    $("#leftBox2").hide();
    $("#leftBox1").hide();
    testScore();
    $("#leftBox").fadeIn(2000);
}

function test(){
    console.log($(".formulas:first"));
    console.log(document.getElementById("problem-table"));
}

function getItem(MAXNUM, MAXDIGIT, PUNCTUATION, BRACKET){
    var items = [];
    $("#leftBox").hide();
    
    for(var i = 0 ; i < 5 ; i ++){
        items.push(getFormula(MAXNUM, MAXDIGIT, PUNCTUATION, BRACKET));
    }
    showFormula(items);
    $("#leftBox1").css({"height":"381px"});
    $("#leftBox1").fadeIn(2000);

}


//获取运算式
function getFormula(MAXNUM, MAXDIGIT, PUNCTUATION, BRACKET){

    var NUMDIGIT = Math.random() * MAXDIGIT; // 确定式子中数字的个数
    var punctuation = ['+' , '-' , '*' , '/']; //标点符号数组
    var formula = []; //generation的公式

    while(anss.length){
        anss.pop();
    }

    NUMDIGIT = checkNum(NUMDIGIT); //检查数字个数
    for(var i = 0 ; i < NUMDIGIT ; i ++){ //循环生成公式
        formula.push(Math.ceil(Math.random() * MAXNUM));
        if(i != NUMDIGIT - 1){
            var index = Math.floor(Math.random() * PUNCTUATION);
            formula.push(punctuation[index]);
        }
    }
    if(BRACKET)
    addBrackets();

    function checkNum(number){
        if(number < 2) return 2;
        else return Math.ceil(number);
    }

    function addBrackets(){ //添加括号
        var flag = 1;
        //console.log(flag);
        if(flag){

            var p1 = Math.floor(Math.random() * NUMDIGIT * 2); //生成2个位置插入括号
            var p2 = Math.floor(Math.random() * NUMDIGIT * 2);
            while((p1 - p2 == 1) || (p1 - p2 == -1) || p1 == p2) {
                var p1 = Math.floor(Math.random() * NUMDIGIT * 2); //生成2个位置插入括号
                var p2 = Math.floor(Math.random() * NUMDIGIT * 2);
            }
            if(p1 > p2){ //如果p1比p2大则交换他们的值
                var t = p1;
                p1 = p2;
                p2 = t;
            }

            if(!(p1 % 2)){
                formula.splice(p1 , 0 , '(');
            }else{
                formula.splice(p1 - 1 , 0 , '(');
            }
            if(!((p2 + 1) % 2)){
                formula.splice(p2 + 1 , 0 , ')');
            }else{
                formula.splice(p2 + 2 , 0 , ')');
            }
            // formula = formula.slice(0 , formula.length - 2); //去掉最后一个符号
        }
        
    }
    allFormulas.push(formula);
    return formula;
}

function showFormula(items) { //显示公式并且计算答案

    for(var j = 0 ; j < items.length ; j++){

        var str = items[j];
        var strFormula = str.join("");
        var text = document.getElementById("problem-table").children[0].children;
        text[j].children[1].innerHTML = strFormula;

        var S1 = [] // 保存运算符的栈
        var S2 = [] // 保存中间结果的栈

        for (var i = 0; i < str.length; i++) {
            if (!isNaN(str[i])){
                S2.push(str[i]);
            }else if(isOperate(str[i])){
                if(!S1.length){
                    S1.push(str[i]);
                } else{
                    var s1Top = S1.pop();
                    S1.push(s1Top);
                    if(s1Top == '('){
                        S1.push(str[i]);
                    }
                    else{
                        var prior1 = getPriorty(s1Top);
                        var prior2 = getPriorty(str[i]);
                        if(prior1 < prior2){
                            S1.push(str[i]);
                        }else{
                            var tempOp = S1.pop();
                            S2.push(tempOp);
                            i --;
                        }
                    }
                }
            }else if(str[i] == '('){
                S1.push(str[i]);
            }else if(str[i] == ')'){
                var tempOp = S1.pop();
                while(tempOp != '('){
                    S2.push(tempOp);
                    tempOp = S1.pop();
                }
            }

        }

        while(S1.length){
            var tempOp = S1.pop();
            S2.push(tempOp);
        }

        ANS = getAns(S2);        

        anss.push(Number(ANS.toFixed(2)));
    }
    console.log(anss);
}

function checkAns(){
    ANS = ANS.toFixed(2);
    ANS = Number(ANS);
    console.log("答案="+ANS);
    var myAns = document.getElementById("answer").value;
    console.log(myAns);
    if(myAns == ANS){
        alert("回答正确!");
    }else{
        alert("回答错误! 正确答案是"+ANS+",请仔细检查一下哟~");
    }
}

function getAns(formula){
    var ansArr = []; //存储结果的栈

    for(var i = 0 ; i < formula.length ; i ++){
        if(!isNaN(formula[i])){
            ansArr.push(formula[i]);
        }else{
            var p1 = ansArr.pop();
            var p2 = ansArr.pop();
            var tAns;
            switch (formula[i]){
                case '+': tAns = p2 + p1; break;
                case '-': tAns = p2 - p1; break;
                case '*': tAns = p2 * p1; break;
                case '/': tAns = p2 / p1; break;
            }
            ansArr.push(tAns);
        }
    }
    return ansArr.pop();
}

//判断是否为运算符
function isOperate(op){//判断是否为运算符有
    if(op == '+' || op == '-' || op == '*' || op == '/'){
        return true;
    }else{
        return false;
    }
}

//获取op的优先级
function getPriorty(op){//获取op的优先级
    var prior;
    if(op == "+" || op == "-") prior = 0;
    if(op == "*" || op == "/") prior = 1;
    return prior;
}

function showAllFormulas(){
    console.log(allFormulas)
    var mytable = document.getElementById("all-problem-table").children[0];

    var t = mytable.children["length"];
    for(var i = 0 ; i < t - 1 ; i ++){
        mytable.removeChild(mytable.children[1]);
    }

    for(var i = 0 ; i < allFormulas.length ; i ++){
        var newTr = document.createElement("tr");
        var newTd1 = document.createElement("td");
        newTd1.appendChild(document.createTextNode(i+""));
        var newTd2 = document.createElement("td");
        newTd2.appendChild(document.createTextNode(allFormulas[i].join("")));
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        mytable.appendChild(newTr);
    }
    $("#leftBox3").fadeIn(2000);
    
    
}

function miss(){
    console.log(allFormulas)
    $("#leftBox3").hide();
}