/**
 * Created by yyg on 2016/3/5.
 */

window.onload = function(){


}

var ANS;//记录结果

function getFormula(){
    var NUMDIGIT = Math.random() * 10; // 确定式子中数字的个数
    var MAXNUM = 100; //记录算式中最大的数字
    var punctuation = ['+' , '-' , '*' , '/']; //标点符号数组
    var formula = []; //generation的公式

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
    return formula;
}

function showFormula() { //显示公式并且计算答案
    var str = getFormula();
    var strFormula = str.join("");
    var text = document.getElementById("formula");
    text.value = strFormula;

    var S1 = [] // 保存运算符的栈
    var S2 = [] // 保存中间结果的栈

    console.log(str);
    for (var i = 0; i < str.length; i++) {
        console.log("******************");
        console.log("S1="+S1);
        console.log("S2="+S2);
        console.log("str[i]="+ str[i])
        if (!isNaN(str[i])){
            S2.push(str[i]);
        }else if(isOperate(str[i])){
            console.log("操作数是" + str[i]);
            if(!S1.length){
                S1.push(str[i]);
            } else{
                console.log("SSSSS1="+S1);
                var s1Top = S1.pop();
                S1.push(s1Top);
                console.log("S1栈顶是"+s1Top);
                if(s1Top == '('){
                    S1.push(str[i]);
                }
                else{
                    var prior1 = getPriorty(s1Top);
                    var prior2 = getPriorty(str[i]);
                    if(prior1 < prior2){
                        S1.push(str[i]);
                    }else{
                        console.log("i-1");
                        var tempOp = S1.pop();
                        console.log("tempOp="+tempOp);
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
    console.log("S1结束时="+S1);
    while(S1.length){
        var tempOp = S1.pop();
        S2.push(tempOp);
    }
    console.log(S2);

    ANS = getAns(S2);
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
