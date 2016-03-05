/**
 * Created by yyg on 2016/3/5.
 */

window.onload = function(){


}

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
    console.log(formula);
    addBrackets();
    var strFormula = formula.join("");
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
    return strFormula;
}

function showFormula(){
    var str = getFormula();
    var text = document.getElementById("formula");
    text.value = str;
}