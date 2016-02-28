var cate;
var childCate;
var task;

var cateText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "默认分类",'
    +     '"child": [0]'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "百度IFE项目",'
    +     '"child": [1, 3]'
    + '}'
+ ']';

var childCateText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "默认子分类",'
    +     '"child": [],'
    +     '"father": 0'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "task0001",'
    +     '"child": [0, 1, 2],'
    +     '"father": 1'
    + '},'
    + '{'
    +     '"id": 3,'
    +     '"name": "task0002",'
    +     '"child": [3],'
    +     '"father": 1'
    + '}'
+ ']';

var taskText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "to-do 1",'
    +     '"father": 1,'
    +     '"finish": true,'
    +     '"date": "2015-05-28",'
    +     '"content": "开始 task0001 的编码任务。"'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "to-do 3",'
    +     '"father": 1,'
    +     '"finish": true,'
    +     '"date": "2015-05-30",'
    +     '"content": "完成 task0001 的编码任务。"'
    + '},'
    + '{'
    +     '"id": 2,'
    +     '"name": "to-do 2",'
    +     '"father": 1,'
    +     '"finish": false,'
    +     '"date": "2015-05-29",'
    +     '"content": "重构 task0001 的编码任务。"'
    + '},'
    + '{'
    +     '"id": 3,'
    +     '"name": "to-do 4",'
    +     '"father": 3,'
    +     '"finish": false,'
    +     '"date": "2015-06-29",'
    +     '"content": "完成 task0002 的编码任务。"'
    + '}'
+ ']';

window.onload = function () {
    if (localStorage.getItem('cate')) {  // 页面之前没被访问过的情况，载入默认值
        localStorage.cate = cateText;
        localStorage.childCate = childCateText;
        localStorage.task = taskText;
        $('#type-all').className = 'choose';
    }
    //转化成json格式
    cate = JSON.parse(localStorage.cate);
    childCate = JSON.parse(localStorage.childCate);
    task = JSON.parse(localStorage.task);
    makeType();
}
function makeType() {
    setNum(); 
    var oldChoose=$(".type-wrap .choose");
    $("#type-all").innerHTML='<i class="icon-menu"></i><span>所有任务</span>('+task.length+')';
    var html='';
    for(var i=0;i<cate.length;i++){

        html+='<li><h3><i class="icon-folder-open-empty"></i><span>'+cate[i].name+'</span></h3><i class="delete icon-minus-circled" onclick="del(event, this)"></i><ul class="item">';
        for(var j=0;j<cate[i].child.length;j++){
           var childname= getObjByKey(childCate,'id',cate[i].child[j]);
            html +=''
            +'<li>'
            +     '<h4 onclick="typeClick(this)">'
            +       '<i class="icon-doc-text"></i>'
            +       '<span>'
            + childname.name
            +'</span>('+childname.child.length
            +      ')<i class="delete icon-minus-circled" onclick="del(event, this)"></i>'
            +'</h4>'
            + '</li>'
        }
        html +=''
        +'</ul>'
        +'</li>'
    }
    html=html.replace(/<i class="delete icon-minus-circled" onclick="del\(event,this\)"><\/i>/,'');
    html=html.replace(/<i class="delete icon-minus-circled" onclick="del\(event,this\)"><\/i>/,'');
    $('.item-wrap').innerHTML=html;
    //修改‘choose’选择之后的样式，并且调用typeClick（）函数
    //明白了，当点击添加按钮之后，之前的选择的条目已经不再了，所以要提前保存
//然后在下面的代码处恢复之前的选择项
    if(oldChoose){
        //某个h值
       var node=oldChoose.tagName.toLowerCase();
       var name=oldChoose.getElementsByTagName('span')[0].innerHTML;
       var isClick=false;
//里面的break是跳出当前的程序；所以每一个都要加一个break
       switch(node){
        case 'h2':
        $('h2').click();
        isClick=true;
        break;
        case 'h3':
        var cateEle=document.getElementsByTagName('h3');
        for(var i=0;i<cateEle.length;i++){
            if(cateEle[i].getElementsByTagName('span')[0].innerHTML===name){
                cateEle[i].click();
                isClick=true;
                break;
            }

        }
         break;
        case 'h4':
        var cateEle=document.getElementsByTagName('h4');
        for(var i=0;i<cateEle.length;i++){
            if(cateEle[i].getElementsByTagName('span')[0].innerHTML===name){
                cateEle[i].click();
                isClick=true;
                break;
            }
        }
break;
       }
       if(!isClick){
        $('h2').cilck();
       }
    }else{
        $('h2').click();
    }
makeTask();
    }
     

function setNum() {
    var sum;
    for (var i = 0; i < cate.length; i++) {
        sum = 0;
        for (var j = 0; j < cate[i].child.length; j++) {
            var childNum = getObjByKey(childCate, 'id', cate[i].child[j]).child.length;
            sum += childNum;
        }
        cate[i].num = sum;
    }
}
function getObjByKey(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] === value) {
            return obj[i];
        }
    }
}
function makeTask(){
    var oldChoose=$('.task-wrap .choose');
    $('.status li').click();
    var ele=$('.type-wrap .choose');
    var eleTag=ele.tagName.toLowerCase();
    var taskIdArr = [];
    //找到要显示的taskText的id号
    var name=ele.getElementsByTagName('span')[0].innerHTML;
    switch(eleTag){
        case 'h2':
       for(var i=0;i<task.length;i++){
        taskIdArr.push(task[i].id);
       }
       makeTaskById(taskIdArr);
       break;
       case 'h3':
       //找到了点击的是那个cate值
       var catename=getObjByKey(cate,'name',name);
       for(var i=0;i<catename.child.length;i++){
        var childid=getObjByKey(childCate,'id',catename.child[i]);
        for(var j=0;j<childid.child.length;j++){
            taskIdArr.push(childid.child[j]);
        }
       }
          makeTaskById(taskIdArr);
          break;
          case 'h4':
          var childname=getObjByKey(childCate,'name',name);
          for(var i=0;i<childname.child.length;i++){
            taskIdArr.push(childname.child[i]);
          }
          makeTaskById(taskIdArr);
          break;

    }
    //别忘了这部分都是恢复之前选择状态而写的
    if(oldChoose){
       var childEle=document.getElementsByTagName('h6');
       var name=oldChoose.getElementsByTagName('span')[0].innerHTML;
       var idClick=false;
       for(var i=0;i<childEle.length;i++){
        if(childEle[i].getElementsByTagName('span')[0].innerHTML===name){
            childEle[i].click();
            idClick=true;
            break;
        }
        if(!idClick&& $('h6')){
            $('h6').click();
        }
       }
    }
    else if($('h6')){
        $('h6').click();
    }
    makeDetails();

}
//当点击各种筛选标签的时候，触发的函数
//完成两部分功能，第一个把所有的classname清空，然后把当前
//点击的内容编程choose；第二个功能，筛选要显示的内容根据‘finish’classname
function statusClick(ele){
var otherChoose=ele.parentNode.getElementsByTagName('*');
for(var i=0;i<otherChoose.length;i++){
    if(otherChoose[i].className=='choose'){
        otherChoose[i].className='';
    }
}
ele.className='choose';
var myEle;
if(ele.innerHTML.indexOf('所有')!==-1){
     myEle=$('.task-wrap').getElementsByTagName('li');
    for(var i=0;i<myEle.length;i++){
        myEle[i].style.display='block';
    }
}else if(ele.innerHTML.indexOf('已完成')!==-1){
     myEle=$('.task-wrap').getElementsByTagName('li');
    for(var i=0;i<myEle.length;i++){
        myEle[i].style.display='none';
    }
    for(var i=0;i<myEle.length;i++){
        if(myEle[i].className.indexOf('task-finish')!==-1){
            myEle[i].style.display='block';
            myEle[i].parentNode.parentNode.style.display = 'block';
        }
    }
}else if(ele.innerHTML.indexOf('未完成')!==-1){
     myEle=$('.task-wrap').getElementsByTagName('li');
    for(var i=0;i<myEle.length;i++){
        myEle[i].style.display='none';
    }
    for(var i=0;i<myEle.length;i++){
        if(myEle[i].className.indexOf('task-finish')==-1&&myEle[i].parentNode=='item'){
            myEle[i].style.display='block';
            myEle[i].parentNode.parentNode.style.display = 'block';
        }
    }
}
//默认选择第一个显示的任务
var h6=document.getElementsByTagName('h6');
for(var i=0;i<h6.length;i++){
    if(h6[i].parentNode.style.display!=='none'){
        h6[i].click();
        break;
    }
}

}
//根据传进来的id号显示任务
    //形式是《li》《h5》时间</h5>《ul》<li></li></ul></li>
    //根据时间进行排序，写到这里已经好累好累了
function makeTaskById(id){
    var date=[];
    var taskObj;
    for(var i=0;i<id.length;i++){
        date.push(getObjByKey(task,'id',id[i]).date);
    }
    date=uniqArray(date);
    fate=sortDate(date);

    var html='';
    for(var i=0;i<date.length;i++){
        html+=''
        +'<li>'
        +'<h5>'+date[i]+'</h5>'
        +'<ul class="item">'
        for(var j=0;j<id.length;j++){
            taskObj=getObjByKey(task,'id',id[j]);
            if(taskObj.date===date[i]){
                if(taskObj.finish==true){
                    html+=''
                    +'<li class="task-item task-finish">'
                }else if(taskObj.finish==false){
                   html+=''
                   +'<li class="task-item">' 
                }
                html+=''
                +'<h6 onclick="taskClick(this)">'
                +                 '<i class="icon-check"></i><span>' +taskObj.name + '</span><i class="delete icon-minus-circled" onclick="del(event, this)"></i>'
            +             '</h6>'
            +         '</li>'
            }

        }
        html+=''
        +'</ul>'
        +'</li>'
    }
    $('.task-wrap').innerHTML = html;
}
function makeDetails(){
var ele=$('.task-wrap .choose');
var info=$('.details').getElementsByTagName('span');
if(ele){
    var name=ele.getElementsByTagName('span')[0].innerHTML;
    var taskObj=getObjByKey(task,'name',name);
    if(taskObj){
        info[0].innerHTML=taskObj.name;
        info[1].innerHTML=taskObj.date;
        info[2].innerHTML=taskObj.content;
    }
    else{
        info[0].innerHTML='';
    info[1].innerHTML='';
    info[2].innerHTML='';
    }
    //不明白是什么意思
    $('.set').style.display = 'inline';
}else{
    info[0].innerHTML='';
    info[1].innerHTML='';
    info[2].innerHTML='';
}
}
function taskClick(ele) {
    var otherChoose = ele.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
    for (var i = 0; i < otherChoose.length; i++) {
        if (otherChoose[i].className === 'choose') {
            otherChoose[i].className = '';
            break;
        }
    }
    ele.className = 'choose';
    makeDetails();
}
//根据传进来的点击的标签选择显示的内容
function typeClick(ele){
var myEle=ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
for(var i=0;i<myEle.length;i++){
    if(myEle[i].className==='choose'){
        myEle[i].className='';
        break;
    }
}
ele.className='choose';
makeTask();
}
function sortDate(date){
    return date.sort(function(a,b){
        return a.replace(/-/g,'')-b.replace(/-/g,'');
    });
}
//添加新分类，第一个弹窗出现
function newType(){
    $('.pop').style.display='block';
    $('.overlay').style.display='block';
    $('.pop-name').innerHTML='新增分类';
    var html=''
    +'<p>'
    +'新分类名称：'
    +'<input type="text" class="myText typeText" placeholder="在此输入新分类的名称" />'
    +'</p>'
    +'<p>'
    +'新分类父亲节点'
    +'<select class="mySelect">'
    +'<option value="-1">无'+'</option>'
    var itemWrap=$('.item-wrap');
    var itemName=itemWrap.getElementsByTagName('h3');
    for(var i=0;i<itemName.length;i++){
        html+='<option value="'+i+'">'+itemName[i].getElementsByTagName('span')[0].innerHTML+'</option>'

    }
html+=''
    +'</select>'
    +'</p>'
    +'<p class="error"></p>'
    +'<button class="myButton btn1" onclick="closePop()">取消</button>'
    +'<button class="myButton btn2" onclick="typeAdd()">确定</button>'
$('.pop-content').innerHTML=html;
}
//关闭这个pop
function closePop(){
    $('.pop').style.display='none';
    $('.overlay').style.display='none';
}
//添加内容到json数据里面
//如果选择的是无，则添加cate数据中的值
//如果不是无，则添加childcate数据中的值
function typeAdd(){
   var name=$('.typeText').value;
   var fatherName=$('.mySelect').value;
   if(name.length===0){
    $('.error').innerHTML="名称不能为空";
    //关于return的用法还要多看
    return;
   }else if(name.length>15){
    $('.error').innerHTML="输入的长度不能大于15";
   return;
   }
   else if(getObjByKey(cate,'name',name)){
    $('error').innerHTML='检测到分类的名称已经存在';
    return;
}
   else if(getObjByKey(childCate,'name',name)){
        $('.error').innerHTML = '检测到相同名称的子分类已存在';
        return;
    }
    //添加新的分类
    if(fatherName=='-1'){
        var newCate={
            "id":cate[cate.length-1].id+1,
            "name":name,
            "num":0,
            "child":[]
        };
        cate.push(newCate);
        save();
    }
    else{
        var newChild={
            "id":childCate[childCate.length-1].id+1,
            "name":name,
            "child":[],
            "father":cate[$('.mySelect').value].id
        };
        var father =getObjByKey(cate,'id',newChild.father);
        father.child.push(newChild.id);
        childCate.push(newChild);
        save();
    }
    makeType();
    closePop();
}
function save(){
    localStorage.cate = JSON.stringify(cate);
    localStorage.childCate=JSON.stringify(childCate);
    localStorage.task=JSON.stringify(task);
}
//就是把所有的值设成空，然后把隐藏的隐藏，显示的显示即可
//这里的span标签保存的是显示的内容，输入的内容在input中
function newTask(){
  $('.task .add').onclick='';
  document.getElementsByClassName('taskText')[0].value = '';                   // 进入编辑模式
    document.getElementsByClassName('taskText')[1].value = '';
    $('.myTextArea').value='';
  $('.task-title span').style.display='none';
  $('.task-date span').style.display='none';
  $('.task-content span').style.display='none';
  $('.set').style.display='none';
  $('.taskError').style.display='inline';
  document.getElementsByClassName('taskText')[0].style.display= 'inline';                   // 进入编辑模式
    document.getElementsByClassName('taskText')[1].style.display = 'inline';
    $('.myTextArea').style.display='inline';
    document.getElementsByClassName('btn3')[0].style.display='inline';
document.getElementsByClassName('btn3')[1].style.display = 'inline';

}
//放弃编辑的时候
//此时span标签中的内容还在，显示就可以了
function cancelAdd() {
    $.click($('.task .add'), newTask);                                 // 重新绑定新建按钮的点击事件

    $('.task-title span').style.display = 'inline';                              // 退出编辑模式
    $('.task-date span').style.display = 'inline';
    $('.task-content span').style.display = 'inline';
    $('.set').style.display = 'inline';
    $('.taskError').style.display = 'none';
    document.getElementsByClassName('taskText')[0].style.display = 'none';
    document.getElementsByClassName('taskText')[1].style.display = 'none';
    $('.myTextArea').style.display = 'none';
    document.getElementsByClassName('btn3')[0].style.display = 'none';
    document.getElementsByClassName('btn3')[1].style.display = 'none';
    $('.taskError').innerHTML = '';
}
//当按保存键的时候进行保存
//保存的内容进到task数据中，然后调用makeType（）函数
//首先判断是否合法，其次判断父亲是谁
function taskAdd(){
    var name=document.getElementsByClassName('taskText')[0].value;
    var date=document.getElementsByClassName('taskText')[1].value;
    var content=$('.myTextArea').value;
    //按照’-‘进行字符串的分割
    var dateSplit=date.split('-');
    if(name.length==0){
$('taskError').innerHTML="输入的任务标题不能为空";
return;
    }else if(date.length==0){
$('taskError').innerHTML="输入的时间不能为空";
return;
    }else if(!date.match(/^\d{4}-\d{2}-\d{2}$/)){
$('.taskError').innerHTML="任务日期的格式不对";
return;
    }else if(dateSplit[1]<1||dateSplit[1]>12||dateSplit[2]<1||dateSplit[2]>31){
     $('.taskError').innerHTML="没这天";
     return;   
    }else if(getObjByKey(task,'name',name)){
        $('.taskError').innerHTML="任务都存在了";
        return;
    }
    var father;
    var typeChoose=$('.type-wrap .choose');
    var tag=typeChoose.tagName.toLowerCase();
    //当时h2的情况的时候，是在默认子分类下添加任务
    switch(tag){
        case 'h2':
        father=0;
        break;
        case 'h3':
        var typeName=typeChoose.getElementsByTagName('span')[0].innerHTML;
        var typeObj=getObjByKey(cate,'name',typeName);
        if(typeObj.child.length>0){
            father=typeObj.child[0];
        }
        else{
            father=0;
        }
        break;
        case 'h4':
        var childname=typeChoose.getElementsByTagName('span')[0].innerHTML;
        father=getObjByKey(childCate,'name',childname).id;
        break;
    }
    var newTask={
        "id":task[task.length-1].id+1,
        "name":name,
        "father":father,
        "finish":false,
        "date":date,
        "content":content

    };
    task.push(newTask);
    var fatherObj=getObjByKey(childCate,'id',newTask.father);
    fatherObj.child.push(newTask.id);

    save();
    makeType();
    var h6=document.getElementsByTagName('h6');
    for(var i=0;i<h6.length;i++){
        var span=h6[i].getElementsByTagName('span')[0];
        if(span.innerHTML==name){
            span.click();
            break;
        }
    }
    cancelAdd();
}
//点击删除标签,e是event；ele是this
//如果是h3要删除三个，如果是h4要删除两个，如果是h6要删除1个
function del(e,ele){
 window.event?window.event.cancelBubble=true:e.stopPropagation();
var node=confirm("删除不可逆，还删不删！");
if(!node){
    return;
}
 var con=ele.parentNode.tagName.toLowerCase();
 var index;
 var name=ele.parentNode.getElementsByTagName('span')[0].innerHTML;
 switch (con){
    case 'h3':
    index=getIndexByKey(cate,'name',name);
    for(var i=0;i<cate[index].child.length;i++){
        childindex=getIndexByKey(childCate,'id',cate[index].child[i]);
        for(var j=0;j<childCate[childindex].child.length;j++){
            taskindex=getIndexByKey(task,'id',childCate[childindex].child[j]);
            task.splice(taskindex,1);
        }
            childCate.splice(childindex,1);
    }
    cate.splice(index,1);
    break;
    case 'h4':
    index=getIndexByKey(childCate,'name',name);
    for (var i=0;i<childCate[index].child.length;i++){
        var taskIndex = getIndexByKey(task, 'id', childCate[index].child[i])
                task.splice(taskIndex, 1);
            }
        var fatherObj=getObjByKey(cate,id,childCate[index].father);
        fatherObj.child.splice(fatherObj.child.indexOf(childCate[index].id),1);
        childCate.splice(index,1);
        break;
        case 'h6':
        index = getIndexByKey(task, 'name', name);

            var fatherObj = getObjByKey(childCate, 'id', task[index].father);  // 删除父节点中的记录
            fatherObj.child.splice(fatherObj.child.indexOf(task[index].id), 1);
            task.splice(index, 1);
            break;
        }
        save();
makeType();
}



function getIndexByKey(ele,key,value){
    for(var i=0;i<ele.length;i++){
        if(ele[i][key]===value){
            return i;
        }
    }
}
//还有点击完成finish按钮
function finishTask(){
    var taskName=$('.task-title span').innerHTML;
    var taskObj=getObjByKey(task,'name',taskName);
    if(taskObj.finish){
        alert("任务已经完成了");
        return;
    }
    var con=confirm("确定要设置任务为已经完成的状态吗");
    if(!con){
        return;
    }
    taskObj.finish=true;
    makeTask();
}
function editTask(){
    //不带括号的时候指绑定点击事件为空；
    $('.task .add').onclick ='';
    $.click(document.getElementsByClassName('btn3')[1],taskChange);
    document.getElementsByClassName('taskText')[0].value='';
    document.getElementsByClassName('taskText')[1].value='';
    $('.myTextArea').value='';
    $('.task-date span').style.display='none';
    $('.task-content span').style.display='none';
    $('.set').style.display='none';
    $('.taskError').style.display='inline';
    document.getElementsByClassName('taskText')[1].style.display='inline';
    $('.myTextArea').style.display='inline';
    document.getElementsByClassName('btn3')[0].style.display='inline';
    document.getElementsByClassName('btn3')[1].style.display='inline';
    document.getElementsByClassName('taskText')[1].value=$('.task-date span').innerHTML;
    $('.myTextArea').value=$('.task-content span').innerHTML;
}
//点击编辑按钮
function taskChange(){
    var name = $('.task-title span').innerHTML;
    var taskObj = getObjByKey(task, 'name', name);
    var date = document.getElementsByClassName('taskText')[1].value;
    var content = $('.myTextArea').value;
    var dateSplit = date.split('-');

    if (date.length === 0) {
        $('.taskError').innerHTML = '任务日期不能为空';
        return;
    }
    else if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        $('.taskError').innerHTML = '任务日期格式错误';
        return;
    }
    else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] > 31) {
        $('.taskError').innerHTML = '不要骗我，根本没有这一天';
        return;
    }
    taskObj.date = date;
    taskObj.content = content;
    save();
     makeType();
    var h6 = document.getElementsByTagName('h6');      // 选中新建的任务
    for (var i = 0; i < h6.length; i++) {
        var span = h6[i].getElementsByTagName('span')[0];
        if (span.innerHTML === name) {
            span.click();
            break;
        }
    }
    cancelAdd();
}

