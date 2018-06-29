
//运算符优先级表
var OperatorInformationTable=[
  {operator:'(',priority:0,numOfParams:0},
  {operator:'[',priority:0,numOfParams:0},
  {operator:'|',priority:1,numOfParams:2},
  {operator:'.',priority:2,numOfParams:2},
  //不是单目运算符感根据优先级压入
  //是单目运算符直接弹出
  {operator:'*',priority:3,numOfParams:1},
  {operator:'+',priority:3,numOfParams:1},
  {operator:'{',priority:3,numOfParams:1},
  {operator:'?',priority:3,numOfParams:1},
  {operator:')',priority:4,numOfParams:0}]

//返回运算符优先级
function Priority(char){
  var priority=-1;//常规字符优先级为-1
  for(var i=0;i<OperatorInformationTable.length;i++)
  {
    if(char==OperatorInformationTable[i].operator){priority=OperatorInformationTable[i].priority;break;}
  }
  return priority;
}
//返回运算符目数
function NumOfParams(char){
  var numOfParams=-1;//常规字符为-1
  for(var i=0;i<OperatorInformationTable.length;i++)
  {
    if(char==OperatorInformationTable[i].operator){numOfParams=OperatorInformationTable[i].numOfParams;break;}
  }
  return numOfParams;
}

var stateTransition1=function(s,i,e){
  this.startState=s;
  this.inputChar=i;
  this.endState=e;
  this.printStateTransition1=printStateTransition1
}
function printStateTransition1 (){
  console.log(this.startState,this.inputChar,this.endState)
}

var Stack = function(){
  this.dataStore=[];
  this.pop=pop;
  this.top=top;
  this.push=push;
  this.nullOrNot=nullOrNot;
}
function pop(){
  //console.log(this.dataStore.length)
  this.dataStore.length = this.dataStore.length-1;
}
function top(){
  return this.dataStore[this.dataStore.length-1];
}
function push(el){
  this.dataStore[this.dataStore.length]=el
}
function nullOrNot(){
  //null则返回true
  if(this.dataStore.length==0){return true}else{return false}
}

var NFA=function(s,e){
  this.stateTransitionList=[];
  this.startState=s;
  this.endState=e;
  this.printNFA=printNFA
  this.init = init
  this.deepInit = deepInit
  this.getNumOfState = getNumOfState
}

function deepInit(op1) {
  this.startState=op1.startState;
  this.endState=op1.endState;
  for (var i in op1.stateTransitionList) {
    var tempStateTrans = op1.stateTransitionList[i]
    var newStateTrans = new stateTransition1( tempStateTrans.startState, tempStateTrans.inputChar, tempStateTrans.endState)
    this.stateTransitionList.push(newStateTrans)
  }
  // this.stateTransitionList.push.apply(this.stateTransitionList,op1.stateTransitionList)
}
function getNumOfState(){
  var max = this.startState
  var min = this.startState
  for( var i = 0 ; i < this.stateTransitionList.length ; i++){
    var temp = this.stateTransitionList[i]
    if( temp.startState > max ){
      max = temp.startState
    }
    if( temp.endState > max ){
      max = temp.endState
    }
    if( temp.startState < min ){
      min = temp.startState
    }
    if( temp.endState < min ){
      min = temp.endState
    }
  }

  return max - min + 1
}

function printNFA(){
  //正则表达式
  for(var i=0;i<this.stateTransitionList.length;i++){
    this.stateTransitionList[i].printStateTransition1();
  }
  console.log("开始状态",this.startState)
  console.log("接受状态",this.endState)
}
function init(op1) {
  this.startState=op1.startState;
  this.endState=op1.endState;
  this.stateTransitionList=this.stateTransitionList.concat(op1.stateTransitionList);
}
//  单个NFA  生成状态流
var singalNFA =function(str){
  this.regularString=str;
  this.stateTable=[]
  //this.OperatorTable=[{operator:'(',priority:'0'},{operator:'|',priority:'1'},{operator:'.',priority:'2'},{operator:'*',priority:'3'},{operator:')',priority:'4'}]
  this.NFAStack=new Stack();
  this.OperatorStack=new Stack();
  this.state=0;
  this.new_state=0
  this.generateNFA=generateNFA;
  this.OperatorPerform=OperatorPerform;  //运算符弹出并执行
  this.OperatorInToStack=OperatorInToStack;//运算符入栈

  this.connectOperator=connectOperator;
  this.selectOperator=selectOperator;
  this.clodureOperator=clodureOperator;
  this.printSingalNFA=printSingalNFA;
  this.updateNFA=updateNFA;
  this.generateStateTable=generateStateTable
  this.generateStateTable1=generateStateTable1
 // this.getOperatorStackTopPriority=getOperatorStackTopPriority
  //this.getOperatorPriority=getOperatorPriority
  this.questionMarkOperator=questionMarkOperator
  this.addOperator=addOperator
}
function generateNFA(){
  this.OperatorInToStack()//运算符入栈
  this.OperatorPerform();//运算符出栈并执行
  this.printSingalNFA()
  //弹出完毕
  //更新状态
  this.generateStateTable()
  this.updateNFA()
  //更新状态完毕
  this.printSingalNFA()

  //生成字母表
  //打印字母表
  //打印更新状态后的结果
}
function generateStateTable(){
  for(var i=0;i<this.state;i++){
    this.stateTable[i]=-1;
  }
  var temp_NFA=this.NFAStack.top().stateTransitionList
  this.stateTable[this.NFAStack.top().startState]=this.new_state;
  this.new_state++;
  var start=this.NFAStack.top().startState;
  for (var i=0;i<this.NFAStack.top().stateTransitionList.length;i++){
    if(this.NFAStack.top().stateTransitionList[i].startState==start&&this.stateTable[this.NFAStack.top().stateTransitionList[i].endState]==-1){

      if(this.NFAStack.top().stateTransitionList[i].endState!=this.NFAStack.top().endState){
        this.stateTable[this.NFAStack.top().stateTransitionList[i].endState]=this.new_state;
        this.new_state++;
        this.generateStateTable1(this,this.NFAStack.top().stateTransitionList[i].endState)
      }
    }

  }
  this.stateTable[this.NFAStack.top().endState]=this.state-1;
}
function generateStateTable1(self,start){
  for (var i=0;i<self.NFAStack.top().stateTransitionList.length;i++){
    if(self.NFAStack.top().stateTransitionList[i].startState==start&&self.stateTable[self.NFAStack.top().stateTransitionList[i].endState]==-1){
      //console.log(self.NFAStack.top().stateTransitionList[i].endState)

      if(self.NFAStack.top().stateTransitionList[i].endState!=self.NFAStack.top().endState){
        self.stateTable[self.NFAStack.top().stateTransitionList[i].endState]=self.new_state;
        self.new_state++;
        self.generateStateTable1(self,self.NFAStack.top().stateTransitionList[i].endState)}
    }

  }

}
function updateNFA(){
  var result = this.NFAStack.top();
  result.startState=this.stateTable[result.startState]
  result.endState=this.stateTable[result.endState]
  for(var i=0;i<result.stateTransitionList.length;i++){
    result.stateTransitionList[i].startState=this.stateTable[result.stateTransitionList[i].startState]
    result.stateTransitionList[i].endState=this.stateTable[result.stateTransitionList[i].endState]
  }

}

//运算符压入
function OperatorInToStack() {
  var str = this.regularString;
  var length = str.length
  this.state = 0;
  //遍历
  for (var i = 0; i < length; i++) {
    var temp_char = str[i];
    switch (NumOfParams(temp_char)) {//判断是几目运算符
      case -1://常规字符
        var regularChar=new NFA(this.state,this.state+1)
        regularChar.stateTransitionList[regularChar.stateTransitionList.length]=new stateTransition1(this.state,temp_char,this.state+1)
        this.state+=2
        this.NFAStack.push(regularChar)
        if(i+1<length&&Priority(str[i+1])<=0){this.OperatorStack.push('.');}
        break;
      case 0://()
        if(temp_char=='(') {
          if(i+1<length&&str[i+1]==')'){
            var regularChar=new NFA(this.state,this.state+1)
            regularChar.stateTransitionList[regularChar.stateTransitionList.length]=new stateTransition1(this.state,'ε',this.state+1)
            this.state+=2
            this.NFAStack.push(regularChar)
            i++
            regularChar.printNFA()
            if(i+1<length&&Priority(str[i+1])<=0){this.OperatorStack.push('.');}
          }
          break;
        }
        else if(temp_char==')')//遇到')'则弹出所有运算符
          {
            while(!this.OperatorStack.nullOrNot()){
              //逐步弹出所有操作符 并且执行
              //遇到(停止
              var operator =this.OperatorStack.top();
              if(operator!='(')
              {
                switch (operator)
                {
                  case '|':
                    this.selectOperator()
                    break;
                  case '.':
                    this.connectOperator()
                    break;
                }
              }
              else
                {
                this.OperatorStack.pop()
                break;
              }
            }//逐步弹出所有操作符 并且执行，遇到( 停止
            if(i+1<length&&Priority(str[i+1])<=0) {this.OperatorStack.push('.');}
          }
        break;
      case 1://单目运算符不入栈* + ? { }
        switch (temp_char) {
          case '*':
            this.clodureOperator();
            if (i + 1 < length && Priority(str[i + 1]) <= 0) {
              this.OperatorStack.push('.')
            }
            break;
          case '+':
            this.addOperator();
            if (i + 1 < length && Priority(str[i + 1]) <= 0) {
              this.OperatorStack.push('.')
            }
            break;
          case '?':
            this.questionMarkOperator();
            if (i + 1 < length && Priority(str[i + 1]) <= 0) {
              this.OperatorStack.push('.')
            }
            break;
          case'{':
            console.log('i: ',i)
            var tempCount = i + 1

            for( ; tempCount < str.length; tempCount++){
              if( str[tempCount] === ',' || str[tempCount] === '}'){
                break;
              }
            }

            // if(tempCount - i === 1 ){
            //   // console.log("invalid input after '{'")
            //   // break
            // }
            //大括号中只有一个数字
            if( str[tempCount] === '}'){
              var numStr = ""
              var num
              if(tempCount - i === 1){
                num = 0
              }
              else{
                for( var m = i+1 ; m < tempCount ; m++ ){
                  numStr += str[m]
                }
                num = parseInt(numStr)
              }
              
              console.log('test generate {: num = ' + num)
              if( num === 0 ){
                var op2=new NFA(0,0);
                op2.deepInit(this.NFAStack.top());
                this.NFAStack.pop();
                console.log('op2: ')
                op2.printNFA()
                this.state -= op2.getNumOfState()
                var op1 = new NFA( this.state , this.state + 1)
                op1.stateTransitionList.push( new stateTransition1(op1.startState, 'ε', op1.endState))
                this.state = this.state + 2
                console.log('op1: ')
                op1.printNFA()
                this.NFAStack.push(op1)
              }else{//num > 0
                var op1=new NFA(0,0);
                op1.init(this.NFAStack.top());
                this.NFAStack.pop();
                op1.printNFA()

                var op3 = new NFA(0,0)
                op3.deepInit(op1)

                var res = new NFA(0,0)
                res.startState = op3.startState
                res.stateTransitionList = res.stateTransitionList.concat( op3.stateTransitionList)
                var countState = op1.getNumOfState()

                for( var m = 1; m < num; m++ ){
                  var op2 = new NFA(0,0)
                  for(var n = 0; n < op1.stateTransitionList.length ; n++ ){
                    var temp = op1.stateTransitionList[n]
                    temp.startState += countState
                    temp.endState += countState
                  }
                  op1.startState +=  countState
                  op1.endState += countState
                  op2.deepInit(op1)
                  res.stateTransitionList.push.apply(res.stateTransitionList,op2.stateTransitionList)
                  res.stateTransitionList.push(new stateTransition1(op2.endState-countState,'ε',op2.startState))
                  this.state += countState
                }
                res.endState = op1.endState
                this.NFAStack.push(res)
              }
              i = tempCount
            }else{//遇到','
              var numOne
              var numTwo

              if(tempCount - i === 1){
                numOne = 0
              }else{
                var numStr = ""//new Array()
                for( var m = i + 1 ; m < tempCount ; m ++ ){
                  numStr += str[m]
                }
                // var numStr = numStrArray.join("")
                numOne = parseInt(numStr)
                if( numOne < 0){
                  console.log("numOne < 0 , invalid")
                  break;
                }
              }

              //开始检查第二个数字
              i = tempCount
              tempCount = tempCount + 1

              for( var m = tempCount ; m < str.length ; m ++){
                if( str[m] === '}'){
                  i = m
                  break
                }
              }

              //说明第二个数字为无穷，记为-1
              if( i === tempCount ){
                numTwo = -1
              }else{
                var numStr = ""//new Array()
                for( var m = tempCount ; m < i ; m ++ ){
                  numStr += str[m]
                }
                // var numStr = numStrArray.join("")
                numTwo = parseInt(numStr)
                if( numTwo < numOne){
                  console.log("numTwo < numOne , invalid")
                  break;
                }
              }
              console.log('numOne : ', numOne)
              console.log('numTwo :', numTwo)
              if( numOne === 0 ){
                if(numTwo === 0 ){//相当于 {0}
                  var op2=new NFA(0,0);
                  op2.deepInit(this.NFAStack.top());
                  this.NFAStack.pop();
                  this.state -= op2.getNumOfState()
                  var op1 = new NFA( this.state , this.state + 1)
                  op1.stateTransitionList.push( new stateTransition1(op1.startState, 'ε', op1.endState))
                  this.state = this.state + 2
                  this.NFAStack.push(op1)
                }else if(numTwo === -1){
                  var op1=new NFA(0,0);
                  op1.init(this.NFAStack.top());
                  this.NFAStack.pop();
                  var op3=new NFA(this.state,this.state+1)

                  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op3.endState)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op1.startState)
                  this.state=this.state+2
                  this.NFAStack.push(op3);
                }else{
                  var op1=new NFA(0,0);
                  op1.init(this.NFAStack.top());
                  op1.stateTransitionList.push(new stateTransition1(op1.startState,'ε',op1.endState))
                  this.NFAStack.pop();

                  console.log('op1: ' )
                  op1.printNFA()

                  var op3 = new NFA(0,0)
                  op3.deepInit(op1)

                  var res = new NFA(0,0)
                  res.startState = op3.startState
                  res.stateTransitionList = res.stateTransitionList.concat( op3.stateTransitionList)
                  var countState = op1.getNumOfState()

                  for( var m = 1; m < numTwo - numOne; m++ ){
                    var op2 = new NFA(0,0)
                    for(var n = 0; n < op1.stateTransitionList.length ; n++ ){
                      var temp = op1.stateTransitionList[n]
                      temp.startState += countState
                      temp.endState += countState
                    }
                    op1.startState +=  countState
                    op1.endState += countState
                    op2.deepInit(op1)
                    res.stateTransitionList.push.apply(res.stateTransitionList,op2.stateTransitionList)
                    res.stateTransitionList.push(new stateTransition1(op2.endState-countState,'ε',op2.startState))
                    this.state += countState
                  }
                  res.endState = op1.endState
                  this.NFAStack.push(res)
                }
              }
              else{//numOne > 0
                var op1=new NFA(0,0);
                op1.init(this.NFAStack.top());
                this.NFAStack.pop();
                op1.printNFA()

                var op3 = new NFA(0,0)
                op3.deepInit(op1)

                var res = new NFA(0,0)
                res.startState = op3.startState
                res.stateTransitionList = res.stateTransitionList.concat( op3.stateTransitionList)
                var countState = op1.getNumOfState()

                for( var m = 1; m < numOne; m++ ){
                  var op2 = new NFA(0,0)
                  for(var n = 0; n < op1.stateTransitionList.length ; n++ ){
                    var temp = op1.stateTransitionList[n]
                    temp.startState += countState
                    temp.endState += countState
                  }
                  op1.startState +=  countState
                  op1.endState += countState
                  op2.deepInit(op1)
                  res.stateTransitionList.push.apply(res.stateTransitionList,op2.stateTransitionList)
                  res.stateTransitionList.push(new stateTransition1(op2.endState-countState,'ε',op2.startState))
                  this.state += countState
                }
                res.endState = op1.endState
                console.log('countState :',countState)
                console.log('res before:')
                res.printNFA()
                console.log('op1 before:')
                op1.printNFA()
                console.log('this.state befor:' , this.state)

                if( numTwo === numOne ){
                  this.NFAStack.push(res)
                }else if(numTwo === -1){
                  for(var n = 0; n < op1.stateTransitionList.length ; n++ ){
                    var temp = op1.stateTransitionList[n]
                    temp.startState += countState
                    temp.endState += countState
                  }
                  op1.startState +=  countState
                  op1.endState += countState
                  this.state += countState
                  
                  console.log('op1 after:')
                  op1.printNFA()
                  console
                  var op3=new NFA(this.state,this.state+1)
                  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op3.endState)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
                  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op1.startState)
                  this.state=this.state+2

                  console.log('op3 after:')
                  op3.printNFA()

                  res.stateTransitionList.push.apply(res.stateTransitionList,op3.stateTransitionList)
                  res.stateTransitionList.push(new stateTransition1(res.endState,'ε',op3.startState))
                  res.endState = op1.endState
                  this.NFAStack.push(res)

                  console.log('res after:')
                  res.printNFA()

                }else{//
                  op1.stateTransitionList.push(new stateTransition1(op1.startState,'ε',op1.endState))
                  // res
                  for( var m = 0; m < numTwo - numOne; m++ ){
                    var op4 = new NFA(0,0)
                    for(var n = 0; n < op1.stateTransitionList.length ; n++ ){
                      var temp = op1.stateTransitionList[n]
                      temp.startState += countState
                      temp.endState += countState
                    }
                    op1.startState +=  countState
                    op1.endState += countState
                    op4.deepInit(op1)
                    res.stateTransitionList.push.apply(res.stateTransitionList,op4.stateTransitionList)
                    res.stateTransitionList.push(new stateTransition1(op4.endState-countState,'ε',op4.startState))
                    this.state += countState
                  }
                  res.endState = op1.endState
                  this.NFAStack.push(res)
                }
              }
            }
            if(i+1<length&&Priority(str[i+1])<=0){this.OperatorStack.push('.');}
            break;
        }
        break;
      case 2:
        //双目运算符. |   弹出比自身优先级高的再入栈
        var priorityTemp = Priority(temp_char);
        var priorityTop = Priority(this.OperatorStack.top());
        while (!this.OperatorStack.nullOrNot()&&priorityTop>priorityTemp) {

          switch(this.OperatorStack.top()){
            case '.':
              this.connectOperator()
              break;
            case '|':
              this.selectOperator()
              break;
          }
          priorityTemp = Priority(temp_char);
          priorityTop = Priority(this.OperatorStack.top());
        }
        this.OperatorStack.push(temp_char);
        break;

    }

  }
}
//运算符弹出并执行
function OperatorPerform() {
  console.log(this.OperatorStack.dataStore)
  while(!this.OperatorStack.nullOrNot()){

  var operator =this.OperatorStack.top();
  switch(operator){
    case '.':
      this.connectOperator()
      break;
    case '|':
      this.selectOperator()
      break;
  }
}
}

function connectOperator(){
  var op2=new NFA(0,0);
  op2.init(this.NFAStack.top());
  this.NFAStack.pop();
  var op1=new NFA(0,0);
  op1.init(this.NFAStack.top());
  this.NFAStack.pop();
  var op3=new NFA(op1.startState,op2.endState)
  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList,op2.stateTransitionList)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op2.startState)
  this.NFAStack.push(op3);
  op3.printNFA()
  this.OperatorStack.pop();
}
function selectOperator(){
  var op1=new NFA(0,0);
  op1.init(this.NFAStack.top());
  this.NFAStack.pop();
  var op3=new NFA(this.state,this.state+1)
  this.state+=2;
  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
  while(!this.OperatorStack.nullOrNot())
  {
    if(this.OperatorStack.top()=='('){break;}
    var op1=new NFA(0,0);
    op1.init(this.NFAStack.top());
    this.NFAStack.pop();
    // this.state+=2;
    op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
    op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
    op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
    this.OperatorStack.pop();
  }
  this.NFAStack.push(op3);

  op3.printNFA();
}
function clodureOperator(){
  var op1=new NFA(0,0);
  op1.init(this.NFAStack.top());
  this.NFAStack.pop();
  var op3=new NFA(this.state,this.state+1)

  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op3.endState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op1.startState)
  this.state=this.state+2
  this.NFAStack.push(op3);
}
function addOperator(){
  var op1=new NFA(0,0);
  op1.init(this.NFAStack.top());
  this.NFAStack.pop();
  var op3=new NFA(this.state,this.state+1)

  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
  //op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op3.endState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op1.startState)
  this.state=this.state+2
  this.NFAStack.push(op3);
}
function questionMarkOperator(){
  var op1=new NFA(0,0);
  op1.init(this.NFAStack.top());
  op1.printNFA()
  this.NFAStack.pop();
  var op3=new NFA(this.state,this.state+1)

  op3.stateTransitionList=op3.stateTransitionList.concat(op1.stateTransitionList)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op1.startState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op3.startState,'ε',op3.endState)
  op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op3.endState)
  //op3.stateTransitionList[op3.stateTransitionList.length]=new stateTransition1(op1.endState,'ε',op1.startState)
  this.state=this.state+2
  this.NFAStack.push(op3);
  op3.printNFA()
}

function printSingalNFA(){
  console.log(this.regularString)
  this.NFAStack.top().printNFA()
}


var finalNFA=function(strArray){
  this.strArray=strArray
  this.startState=0
  this.state=1
  this.StateTransition=[]
  this.generateFinalNFAStateTransition=generateFinalNFAStateTransition
  this.generateFinalNFAStateTransition
  this.alphabet=[]
  this.generatealphabet=generatealphabet
  this.acceptStateList=[]
  this.StateTransitionTable=[]
  this.generateStateTransitionTable=generateStateTransitionTable
  this.setTheResult=setTheResult
  this.result={
    stateTransition:this.StateTransition,
    alphabet:this.alphabet,
    acceptStateList:this.acceptStateList//元素state
  }
}
function generateFinalNFAStateTransition() {
  if(this.strArray.length>1) {
    for (var i = 0; i < this.strArray.length; i++) {

      var temp_NFA1 = new singalNFA(this.strArray[i])
      temp_NFA1.generateNFA()
      var temp_NFA = temp_NFA1.NFAStack.top()
      this.StateTransition[this.StateTransition.length] = new stateTransition1(this.startState, 'ε', temp_NFA.startState + this.state)
      for (var j = 0; j < temp_NFA.stateTransitionList.length; j++) {
        this.StateTransition[this.StateTransition.length] = new stateTransition1(temp_NFA.stateTransitionList[j].startState + this.state, temp_NFA.stateTransitionList[j].inputChar, temp_NFA.stateTransitionList[j].endState + this.state)
      }
      this.acceptStateList[this.acceptStateList.length] = {state: temp_NFA.endState + this.state, REId: i}
      this.state += temp_NFA1.state
    }
  }else{

    var temp_NFA1 = new singalNFA(this.strArray[0])
    temp_NFA1.generateNFA()
    var temp_NFA = temp_NFA1.NFAStack.top()
    this.state=temp_NFA1.state;
    for (var j = 0; j < temp_NFA.stateTransitionList.length; j++) {
      this.StateTransition[this.StateTransition.length] = temp_NFA.stateTransitionList[j]
    }
    this.acceptStateList[this.acceptStateList.length]={state: temp_NFA.endState , REId: 0}
  }
  //console.log(this.StateTransition)
  this.generatealphabet()
  this.generateStateTransitionTable()
 // console.log(this.StateTransition)
 // console.log(this.alphabet)
 // console.log(this.acceptStateList)
 // console.log(this.StateTransitionTable)

}
function generatealphabet(){
  for (var i=0;i<this.StateTransition.length;i++){
    var char=this.StateTransition[i].inputChar
    var notIn=true;
    for(var j=0;j<this.alphabet.length;j++){
      if(this.alphabet[j]==char){
        notIn=false
        break;
      }
    }
    if(notIn){
    this.alphabet[this.alphabet.length]=char}
  }
}
function generateStateTransitionTable(){
//console.log(this)
  for(var i=0;i<this.state;i++){
    var vector2=[]
    for(var j=0;j<this.alphabet.length;j++){
      var vector1=[]
      vector2[vector2.length]=vector1
    }
    this.StateTransitionTable[this.StateTransitionTable.length]=vector2
  }
  //console.log(this.StateTransitionTable)
  for(var i=0;i<this.StateTransition.length;i++){
    var input =0
    for(var j=0;j<this.alphabet.length;j++){
      if(this.alphabet[j]==this.StateTransition[i].inputChar){input=j;break}
    }
    this.StateTransitionTable[this.StateTransition[i].startState][input][this.StateTransitionTable[this.StateTransition[i].startState][input].length]=this.StateTransition[i].endState

  }
}
function setTheResult() {
  this.result={
    stateTransition:this.StateTransition,
    alphabet:this.alphabet,
    acceptStateList:this.acceptStateList//元素state
  }
}
// var output =function(strArray){
//   var result={
//     stateTransition:[],
//     alphabet:[],
//     acceptStateList:[]//元素state
//   }
//
//   return result;
// }
// var acceptStateElement={
//   acceptState:0,
//   REID:1
// }
//


module.exports = function(strArray) {
  var test = new finalNFA(strArray)
  test.generateFinalNFAStateTransition()
  test.generatealphabet()
  test.setTheResult()
  //console.log(test.result);
  return test.result;
}
module.exports.zz = function(){console.log(1111111111)}
