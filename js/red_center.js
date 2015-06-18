/**
 * Created by zxy on 2015/6/11.
 */
var name;
var intro;
var $face = $('.left_face');
$face.tooltip({title:'点击自定义头像',trigger:'hover',placement:'top'});
$(document).ready(function(){
    name = $('#name').val();
    intro = $('#intro').val();
});
//console.log(name);
//顶部阴影添加
$(window).scroll(function(e){
    var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
    if(scrolltop>=43){
        $('.nav_con').attr('class','container-fluid nav_con nav_con_shadow');
    }
    else{
        $('.nav_con').attr('class','container-fluid nav_con');
    }
});
//物品兑换图片长宽对齐
var exchangeImgs = $('#right_contair_exchange img');
var imgs_helper = function(i){
    exchangeImgs[i].height = exchangeImgs[i].width;
};
var imgsLen = exchangeImgs.length;
for(var i = 0;i<imgsLen;i++){
    imgs_helper(i);
}
//计算字符串编码长度（中文=2，英文=1）
var strCodeLen=function(str){
    var count=0;
    var len=str.length;
    var code;
    for(var i=0;i<len;i++){
        //将i索引处的字符转成ASCII码
        code=str.charCodeAt(i);
        if(code>=0&&code<=128){
            count+=1;
        }
        else{
            count+=2;
        }
    }
    return count;
};
//限制简介长度
var len=0;
document.getElementById('intro').onkeydown=function(e){
    var codLen = strCodeLen(this.value);
    //记录字符串长度
    if(codLen<=100){
        len = this.value.length;
    }
    if(codLen>=100&&e.keyCode!==8){
        // alert(len);
        // console.log(codLen);
        // console.log(len);
        //按之前记录的长度裁剪字符串
        this.value=this.value.substring(0,len);
        //禁止默认事件
        return false;
    }
};
//昵称简介表单验证
var det_check = new form_check({
    form:'#det_form',
    check:[function(){
        var name_now = $('#name').val();
        var intro_now = $('#intro').val();
        if(name_now !== name&&name_now !== ''){
            return true;
        }
        if(intro_now !== intro&&intro_now !== ''){
            return true;
        }
        return false;
    }]
});
det_check.run();
//完善信息表单验证
var comp_check = new form_check({
    form:'#comp_form',
    check:[function(){
//        return false;
        var $ask = $('#inputAsk');
        var $ans = $('#inputAns');
        if($ask.val() === ''){
            $ask.focus();
            return false;
        }
        else if($ans.val() === ''){
            $ans.focus();
            return false;
        }
        return true;
    }]
});
comp_check.run();
