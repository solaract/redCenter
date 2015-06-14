/**
 * Created by zxy on 2015/6/11.
 */
var user = $('#inputUser');
var pass = $('#inputPassword');
var forget = $('.form_forget');
var comp = $('.complete')[0];
var form_ask = $('#form_ask')[0];
forget.bind('click',function(){
    comp.style.display = 'block';
    form_ask.style.display = 'block';
});
//登陆验证
var login_check = new form_check({
    form:'#form_login',
    check:[function(){
        var reg = /s?\d+/;
        var value = user.value;
        if(reg.test(value)&&value.length === 10&&pass.value!==''){
//            console.log('true');
            return true;
        }
        else{
//            console.log('false');
            return false;
        }
    }]
});

login_check.run();
