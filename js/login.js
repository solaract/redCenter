/**
 * Created by zxy on 2015/6/11.
 */
jQuery(function($) {
    var $user = $('#inputUser');
    var $pass = $('#inputPassword');
//输入提示
    $user.tooltip({title: '学号', trigger: 'focus'});
    $user.tooltip('show');
    $pass.tooltip({title: 'ucenter/重邮通行证/身份证后六位', trigger: 'focus'});
//var forget = $('.form_forget');
//var comp = $('.complete');
//var form_ask = $('#form_ask');
//var ans = $('#inputAns');
//var close = $('.comp_close');
//var form_change = $('#form_change');
//var chan_pass = $('#inputPass');
//var pass_again = $('#inputPass_again');
////弹出遮罩
//forget.bind('click',function(){
//    comp.css('display','block');
////    form_ask.style.display = 'block';
//    form_ask.css('display','block');
//});
////关闭遮罩
//close.each(function(){
//   $(this).bind('click',function(){
//       comp.css('display','none');
//       form_ask.css('display','none');
//       form_change.css('display','none');
//       ans.val('');
//       chan_pass.val('');
//       pass_again.val('');
//   })
//});
//登陆验证
    var login_check = new form_check({
        form: '#form_login',
        check: [function () {
            var reg = /s?\d+/;
            var value = $user.val();
            if (!reg.test(value) || value.length !== 10) {
                $user.tooltip('show');
                $user.focus();
                return false;
            }
            else if ($pass.val() === '') {
                $pass.tooltip('show');
                $pass.focus();
                return false;
            }
            return true;
        }]
    });
    login_check.run();
////密保问题验证
//var ask_check = new form_check({
//    form:'#form_ask',
//    check:[function(){
//        if(ans.val() !== ''){
//    return true;
//}
//else{
//    return false;
//}
//}]
//});
//var change_check = new form_check({
//    form:'#form_change',
//    check:[function(){
//        if(chan_pass.val() === ''||pass_again.val() === ''){
//            return false;
//        }
//        else{
//            return true;
//        }
//    }]
//});

//ask_check.run();
});
