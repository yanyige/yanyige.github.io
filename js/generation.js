/**
 * Created by yyg on 2016/3/5.
 */

window.onload = function(){


}

var ANS;//记录结果

var stack1 = []; //现在用户的输入
var stack2 = [];

var flag = 1; /*记录最近一次输入的类型
                1.代表数字
                2.代表符号
                3.代表等号
                4.代表刚按过c
                */

var ansFlag = 0;
var hasDot = 0;


// 记录此时用户的模式
var mode = 1;


var formula = [];

function getFormula(){
    var NUMDIGIT = Math.random() * 10; // 确定式子中数字的个数
    var MAXNUM = 100; //记录算式中最大的数字
    var punctuation = ['+' , '-' , '*' , '/']; //标点符号数组

    NUMDIGIT = checkNum(NUMDIGIT); //检查数字个数
    for(var i = 0 ; i < NUMDIGIT ; i ++){ //循环生成公式
        formula.push(Math.ceil(Math.random() * MAXNUM));
        var index = Math.floor(Math.random() * 4);
        formula.push(punctuation[index]);
    }

    addBrackets();
    //var strFormula = formula.join("");
    //console.log(strFormula);

    function checkNum(number){
        if(number < 2) return 2;
        else return number;
    }

    function addBrackets(){ //添加括号
        var flag = Math.round(Math.random());
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
            console.log("p1 = "+p1);
            console.log("p2 = "+p2);

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
        }
        formula = formula.slice(0 , formula.length - 1); //去掉最后一个符号
    }

}

function negtiveStack1() { //Stack1取反
    var tStack = [];
    while(stack1.length){
        tStack.push(stack1.pop());
    }
    Stack1.push("-");
    while(tStack.length){
        stack1.push(tStack.pop());
    }
    showStack(stack1 , "stack1");
}

function checkAns(ans1, ans2){
    if(ans1 == ans2){
        alert("回答正确!");
    }else{
        alert("回答错误! 正确答案是"+ans1+",请仔细检查一下哟~");
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

function isOperate(op){//判断是否为运算符有
    if(op == '+' || op == '-' || op == '*' || op == '/'){
        return true;
    }else{
        return false;
    }
}

function getPriorty(op){
    var prior;
    if(op == "+" || op == "-") prior = 0;
    if(op == "*" || op == "/") prior = 1;
    return prior;
}

// 点击面板之后的操作
function clickPanel(target){
    if(checkDot(stack1)){hasDot = 1;}
    else{hasDot = 0;}

    if(target == "."){
        if(stack1.length && !hasDot){
            stack1.push(target);
            showStack(stack1 , "stack1");
            flag = 1;
            hasDot = 1;
        }
        else{

        }
    }else{


    if(mode == 2){
        if(!isNaN(target)){ //如果是数字

            if(flag==1){
                stack1.push(target);
                showStack(stack1 , "stack1");
                flag = 1;
            }else{
                clearStack(stack1);
                stack1.push(target);
                showStack(stack1 , "stack1");
                flag = 1;
            }
            
        }
        else if(target == "ans"){
            var tAns = calc(formula);
            var myAns = Number(stack1.join(""));
            checkAns(tAns , myAns);
        }
    }
    else{


        if(!isNaN(target)){ //如果是数字

            if(flag != 4){

                if(flag != 3){ //如果之前没答案
                    if(flag==1){
                        stack1.push(target);
                        showStack(stack1 , "stack1");
                        flag = 1;
                    }else{
                        clearStack(stack1);
                        stack1.push(target);
                        showStack(stack1 , "stack1");
                        flag = 1;
                    }
                }else{  //有答案
                    clearStack(stack1);
                    clearStack(stack2);
                    clearStack(formula);
                    stack1.push(target);
                    showStack(stack1 , "stack1");
                    flag = 1;
                }
            }else{
                stack1.pop();
                stack1.push(target);
                showStack(stack1 , "stack1");
                flag = 1;
            }
            
        }else if(target=='='){

            if(stack1.length == 0){

            }else{

                if(flag!=3){
                    if(stack1.length!=0){
                        formula.push(Number(stack1.join("")));
                        var ans = calc(formula);
                        stack1 = ans.toString().split("");
                        showStack(stack1 , "stack1");
                        flag = 3;
                        clearStack(stack2);
                        showStack(stack2 , "stack2");
                    }else{
                        var ans = calc(formula);
                        stack1 = ans.toString().split("");
                        showStack(stack1 , "stack1");
                        flag = 3;
                        clearStack(stack2);
                        showStack(stack2 , "stack2");
                    }
                }else{
                    
                    var t1 = formula.pop();
                    var t2 = formula.pop();
                    formula.push(t2);
                    formula.push(t1);
                    formula.push(t2);
                    formula.push(t1);

                    var ans = calc(formula);
                    stack1 = ans.toString().split("");
                    showStack(stack1 , "stack1");
                    clearStack(stack2);
                    showStack(stack2 , "stack2");
                }
            }
            hasDot = 0;
        }else{
            if(checkDot(stack1)){hasDot = 1;}
            else{hasDot = 0;}
            if(flag == 1){
                if(stack1.length!=0){
                    formula.push(Number(stack1.join("")));
                    var s1 = calc(formula);
                    formula.push(target);
                    stack2 = formula.slice();
                    stack1 = s1.toString().split("");
                    showStack(stack1 , "stack1");
                    showStack(stack2 , "stack2");
                    flag = 2;
                }else{
                    var s1 = calc(formula);
                    formula.push(target);
                    stack2 = formula.slice();
                    stack1 = s1.toString().split("");
                    showStack(stack1 , "stack1");
                    showStack(stack2 , "stack2");
                    flag = 2;
                }
            }
            else if(flag == 3){
                clearStack(formula);
                formula.push(Number(stack1.join("")));
                var s1 = calc(formula);
                formula.push(target);
                stack2 = formula.slice();
                stack1 = s1.toString().split("");
                showStack(stack2 , "stack2");
                flag = 2;
            }
            else{
                formula.pop();
                formula.push(target);
                stack2 = formula.slice();
                showStack(stack2 , "stack2");
            }
        }
    }
    }
}

// 显示此时stack（保存当前用户输入）中的数字
function showStack(s , p){
    console.log(s);
    if(isNaN(s)){
        var str = s.join("");
        document.getElementById(p).innerHTML = str;
    }
    else{
        document.getElementById(p).innerHTML = s;
    }
}

function clearStack(s){ //清空数组
    if(s == "stack1"){hasDot = 0;}
    while(s.length){
        s.pop();
    }
}

function calc(str){

    var S1 = [] // 保存运算符的栈
    var S2 = [] // 保存中间结果的栈
    var ANS;

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

    return Number(ANS);
}

function allClear(){
    clearStack(stack1);
    clearStack(stack2);
    clearStack(formula);
    stack1.push("0");
    showStack(stack1 , "stack1");
    showStack(stack2 , "stack2");
    mode = 1;
    flag = 4;
    hasDot = 0;
}

function newFormula(){
    clearStack(formula);
    getFormula();
    stack2 = formula.slice();
    clearStack(stack1);
    showStack(stack1 , "stack1");
    showStack(stack2 , "stack2");
    mode = 2;
}

function checkDot(str){
    for(var i = 0 ; i < str.length ; i ++){
        if(str[i] == ".") return true;
    }
    return false;
}