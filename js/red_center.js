/**
 * Created by zxy on 2015/6/11.
 */
jQuery(function($) {
    var name;
    var intro;
    var user = document.querySelector('.nav_user');
    var $face = $('.left_face');
    $face.tooltip({title: '点击自定义头像', trigger: 'hover', placement: 'top'});
    $(document).ready(function () {
        if($('.complete').css('display') === 'none'){
            $face.tooltip('show');
        }
        var str = user.firstChild.data;
        name = str.substr(3,str.search(/\s/)-3);
        intro = $('#intro').val();
    });
    $face.bind('mouseover',function(){
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolltop >= 43) {
            $face.tooltip('hide');
        }
    });
//顶部阴影添加
    $(window).scroll(function (e) {
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolltop >= 43) {
            $('.nav_con').attr('class', 'container-fluid nav_con nav_con_shadow');
        }
        else {
            $('.nav_con').attr('class', 'container-fluid nav_con');
        }
        $('.tooltip').each(function(){
            $(this).css('display','none');
        })
    });
//物品兑换图片长宽对齐
    var exchangeImgs = $('#right_contair_exchange img');
    var imgs_helper = function (i) {
        exchangeImgs[i].height = exchangeImgs[i].width;
    };
    var imgsLen = exchangeImgs.length;
    for (var i = 0; i < imgsLen; i++) {
        imgs_helper(i);
    }
//ajax成功后回调
    var suc_cb = function suc_cb(data){
        var respond = $.parseJSON(data);
        if(typeof respond.error !== "string"&&respond.error !== ''){
            alert(respond.error);
            return false;
        }
        else{
            if(respond.name&&typeof respond.name === "string"){
                if(respond.name.length > 10){
                    respond.name = respond.name.substr(0,10);
                }
                name = respond.name;
            }
            $('#name').val(name);
            user.firstChild.data = '你好，'+name;
            if(respond.intro&&typeof respond.intro === "string"){
                if(respond.intro.length > 60){
                    respond.intro = respond.intro.substr(0,60);
                }
                intro = respond.intro;
            }
            $('#intro').val(intro);
            alert('修改成功！');
            return true;
        }
    };
//昵称简介表单验证
    var det_check = new form_check({
        form: '#det_form',
        check: [function () {
            var name_now = $('#name').val();
            var intro_now = $('#intro').val();
            if (typeof name_now === "string"&&name_now !== name && name_now !== ''&&name_now.length < 11) {
                return true;
            }
            if(typeof intro_now === "string"&&intro_now !== intro && intro_now !== ''&&intro_now.length < 61){
                return true;
            }
            else{
                alert('请先修改信息');
            }
            return false;
        }],
        success:function(){
            var det_data;
            var name_now = $('#name').val();
            var intro_now = $('#intro').val();
            if(name_now === name){
                name_now = '';
            }
            if(intro_now === intro){
                intro_now = '';
            }
            det_data = {
                name:name_now,
                intro:intro_now
            };
            det_data = JSON.stringify(det_data);
            $.ajax({
                type:'GET',
                url:'#',
                data:det_data,
                dataType:'json',
                success:suc_cb,
                error:function(){
                    alert('上传失败');
                }
            });
            return false;
        }
    });
    det_check.run();
//完善信息表单验证
    var comp_check = new form_check({
        form: '#comp_form',
        check: [function () {
            var $ask = $('#inputAsk'),
                $ans = $('#inputAns'),
                $name = $('#inputName'),
                $intro = $('#inputIntro'),
                $pass = $('#inputPass'),
                $pass_ag = $('#inputPass_again');
            //错误提示
            var tips = function tips(target,str){
                target.tooltip({title: str, trigger: 'click', placement: 'top',container: 'body'});
                target.on('hidden.bs.tooltip', function () {
                    target.tooltip('destroy');
                });
                target.tooltip('show');

            };
            if ($ask.val() === ''||typeof $ask.val() !== "string") {
                tips($ask,'请输入密保问题');
                return false;
            }
            if($ask.val().length > 10){
                tips($ask,'问题超过长度');
                return false;
            }
            if ($ans.val() === ''||typeof $ans.val() !== "string") {
//                alert('请输入密保答案');
                tips($ans,'请输入密保答案');
                return false;
            }
            if ($name.val()&&$name.val().length > 10){
//                alert('昵称超过长度');
                tips($name,'昵称超过长度');
                return false;
            }
            if($intro.val()&&$intro.val().length > 60){
//                alert('简介超过长度');
                tips($intro,'简介超过长度');
                return false
            }
            if($pass.val()||$pass_ag.val()){
                if($pass.val() === ''){
//                    alert('请输入密码');
                    tips($pass,'请输入密码');
                    return false;
                }
                if($pass_ag.val() === ''){
//                    alert('请确认密码');
                    tips($pass_ag,'请确认密码');
                    return false;
                }
                if($pass.val() !== $pass_ag.val()){
//                    alert('两次密码不同');
                    tips($pass,'两次密码不同');
                    $pass.val('');
                    $pass_ag.val('');
                    return false;
                }
            }
            return true;
        }],
        success:function(){
            var com_data = {};

            var $ask = $('#inputAsk'),
                $ans = $('#inputAns'),
                $name = $('#inputName'),
                $intro = $('#inputIntro'),
                $pass = $('#inputPass');
            com_data.ask = $ask.val();
            com_data.ans = $ans.val();
            com_data.name = ($name.val())?$name.val():'';
            com_data.intro = ($intro.val())?$intro.val():'';
            com_data.pass = ($pass.val())?$pass.val():'';
            com_data = JSON.stringify(com_data);
            $.ajax({
                type:'POST',
                url:'#',
                data:com_data,
                dataType:'json',
                success:function(data){
                    if(suc_cb(data)){
                        $('.complete').css('display','none');
                    }
                },
                error:function(){
                    alert('上传失败，请重试');
                }
            });
            return false;
        }

    });
    comp_check.run();
});