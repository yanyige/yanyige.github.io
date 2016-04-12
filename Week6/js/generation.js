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
var allAnss=[];
var allYourAnss=[];

function abs(a){
    return a<0?-a:a;
}

function checkFraction(a, b){
    return outputFraction(a)==b?true:false;
}

function gcd(a, b){
    return b?abs(gcd(b,a%b)):abs(a);
}

function normalizeFraction(fraction){
    if(fraction.denominator<0) return new Fraction(-fraction.numerator/gcd(fraction.numerator, fraction.denominator), -fraction.denominator/gcd(fraction.numerator, fraction.denominator));
    return new Fraction(fraction.numerator/gcd(fraction.numerator, fraction.denominator), fraction.denominator/gcd(fraction.numerator, fraction.denominator));

}

function outputFraction(fraction){
    fraction = normalizeFraction(fraction);
    return fraction.denominator==1?fraction.numerator:fraction.numerator + '/' + fraction.denominator;
}

function transforFraction(fractions){
    fractions = fractions.map(function(item, index){
        if(item instanceof Fraction) return normalizeFraction(item);
        else return item;
    });
    return fractions.map(function(item, index){
        if(item instanceof Fraction) return item.denominator==1?item.numerator:item.numerator+'/'+item.denominator;
        else return item;
    }).join("");
}

function Fraction(numerator, denominator){
    this.numerator = numerator;
    this.denominator = denominator;
}

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
        allYourAnss.push(text[i].children[2].children[0].value);
    }
    text = document.getElementById("ans-table").children[0].children;
    for(var i = 0 ; i < 5 ; i ++){
        var text = document.getElementById("ans-table").children[0].children;
        text[i].children[1].innerHTML = "正确答案"+outputFraction(anss[i]);
    }
    for(var i = 0 ; i < 5 ; i ++){
        var text = document.getElementById("ans-table").children[0].children;
        text[i].children[2].innerHTML = "你的答案"+youranss[i];
    }
    for(var i = 0 ; i < 5 ; i ++){
        var text = document.getElementById("ans-table").children[0].children;
        //if(anss[i] == youranss[i]){
        if(checkFraction(anss[i], youranss[i])){
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

function getItem(MAXNUM, MAXDIGIT, PUNCTUATION, BRACKET, DENOMINATOR){
    var items = [];
    $("#leftBox").hide();
    
    for(var i = 0 ; i < 5 ; i ++){
        items.push(getFormula(MAXNUM, MAXDIGIT, PUNCTUATION, BRACKET, DENOMINATOR));
    }
    showFormula(items);
    $("#leftBox1").css({"height":"381px"});
    $("#leftBox1").fadeIn(2000);

}


//获取运算式
function getFormula(MAXNUM, MAXDIGIT, PUNCTUATION, BRACKET, DENOMINATOR){

    var NUMDIGIT = Math.random() * MAXDIGIT; // 确定式子中数字的个数
    var punctuation = ['+' , '-' , '*' , '/']; //标点符号数组
    var formula = []; //generation的公式

    while(anss.length){
        anss.pop();
    }

    NUMDIGIT = checkNum(NUMDIGIT); //检查数字个数
    for(var i = 0 ; i < NUMDIGIT ; i ++){ //循环生成公式
        if(DENOMINATOR == 1){
            var numerator = Math.ceil(Math.random() * MAXNUM);
            var denominator = 1;
            var fraction = new Fraction(numerator, denominator);
        }else{
            var numerator = Math.ceil(Math.random() * MAXNUM);
            var denominator = Math.ceil(Math.random() * DENOMINATOR);
            var fraction = new Fraction(numerator, denominator);
        }
        formula.push(fraction);
        if(i != NUMDIGIT - 1){
            var index = Math.floor(Math.random() * PUNCTUATION);
            formula.push(punctuation[index]);
        }
    }
    if(BRACKET)
    addBrackets();

    // console.log(formula);

    function checkNum(number){
        // if(number < 2) return 2;
        // else return Math.ceil(number);
        return 4;
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
        var strFormula = transforFraction(str);
        var text = document.getElementById("problem-table").children[0].children;
        text[j].children[1].innerHTML = strFormula;
        // console.log('strFormula = '+ strFormula);
        var S1 = [] // 保存运算符的栈
        var S2 = [] // 保存中间结果的栈

        for (var i = 0; i < str.length; i++) {
            // if (!isNaN(str[i])){
            if(str[i] instanceof Fraction){
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

        // console.log('S2 = ' + S2);

        ANS = getAns(S2);        
        // console.log(ANS);

        // anss.push(Number(ANS.toFixed(2)));
        // allAnss.push(Number(ANS.toFixed(2)));
        anss.push(ANS);
        allAnss.push(ANS);

    }
    // console.log(anss);
}

function checkAns(){
    ANS = ANS.toFixed(2);
    ANS = Number(ANS);
    // console.log("答案="+ANS);
    var myAns = document.getElementById("answer").value;
    // console.log(myAns);
    if(myAns == ANS){
        alert("回答正确!");
    }else{
        alert("回答错误! 正确答案是"+ANS+",请仔细检查一下哟~");
    }
}

function addFraction(a, b){
    var denominator = a.denominator * b.denominator;
    var numerator = a.numerator * b.denominator + a.denominator * b.numerator;
    return new Fraction(numerator, denominator);
}

function minusFraction(a, b){
    var denominator = a.denominator * b.denominator;
    var numerator = a.numerator * b.denominator - a.denominator * b.numerator;
    return new Fraction(numerator, denominator);
}

function multiplyFraction(a, b){
    var denominator = a.denominator * b.denominator;
    var numerator = a.numerator * b.numerator;
    return new Fraction(numerator, denominator);
}

function devideFraction(a, b){
    var denominator = a.denominator * b.numerator;
    var numerator = a.numerator * b.denominator;
    return new Fraction(numerator, denominator);
}

function getAns(formula){
    var ansArr = []; //存储结果的栈


    for(var i = 0 ; i < formula.length ; i ++){
        //console.log('formula[i]='+formula[i]);
        // if(!isNaN(formula[i])){
        if(formula[i] instanceof Fraction){
            ansArr.push(formula[i]);
        }else{

            var p1 = ansArr.pop();
            var p2 = ansArr.pop();
            // console.log(p1);
            // console.log(p2);
            var tAns;
            switch (formula[i]){
                case '+': tAns = addFraction(p2, p1); break;
                case '-': tAns = minusFraction(p2, p1); break;
                case '*': tAns = multiplyFraction(p2, p1); break;
                case '/': tAns = devideFraction(p2, p1); break;
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

function showAllFormulas(){//习题册
    // console.log(allFormulas)
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
        newTd2.appendChild(document.createTextNode(transforFraction(allFormulas[i])));
        var newTd3 = document.createElement("td");
        newTd3.appendChild(document.createTextNode(outputFraction(allAnss[i])));
        var newTd4 = document.createElement("td");
        newTd4.appendChild(document.createTextNode(allYourAnss[i]));
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        newTr.appendChild(newTd3);
        newTr.appendChild(newTd4);
        mytable.appendChild(newTr);
    }
    $("#leftBox3").fadeIn(2000);
    
    
}

function miss(){

    $("#leftBox3").fadeOut(200);
}