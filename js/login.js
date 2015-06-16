/**
 * Created by zxy on 2015/6/11.
 */
var user = $('#inputUser');
var pass = $('#inputPassword');
var forget = $('.form_forget');
var comp = $('.complete');
var form_ask = $('#form_ask');
var ans = $('#inputAns');
var close = $('.comp_close');
var form_change = $('#form_change');
var chan_pass = $('#inputPass');
var pass_again = $('#inputPass_again');
//弹出遮罩
forget.bind('click',function(){
    comp.css('display','block');
//    form_ask.style.display = 'block';
    form_ask.css('display','block');
});
//关闭遮罩
close.each(function(){
   $(this).bind('click',function(){
       comp.css('display','none');
       form_ask.css('display','none');
       form_change.css('display','none');
       ans.val('');
       chan_pass.val('');
       pass_again.val('');
   })
});
//登陆验证
var login_check = new form_check({
    form:'#form_login',
    check:[function(){
        var reg = /s?\d+/;
        var value = user.val();
        if(reg.test(value)&&value.length === 10&&pass.val() !== ''){
            console.log('true');
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }]
});
//密保问题验证
var ask_check = new form_check({
    form:'#form_ask',
    check:[function(){
        if(ans.val() !== ''){
    return true;
}
else{
    return false;
}
}]
});
var change_check = new form_check({
    form:'#form_change',
    check:[function(){
        if(chan_pass.val() === ''||pass_again.val() === ''){
            return false;
        }
        else{
            return true;
        }
    }]
});
login_check.run();
ask_check.run();
