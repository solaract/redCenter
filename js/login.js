/**
 * Created by zxy on 2015/6/11.
 */
var user = $('#inputUser')[0];
var pass = $('#inputPassword')[0];
var check = new form_check({
    form:'#form_login',
    check:[function(){
        var reg = /s?\d+/;
        var value = user.value;
        if(reg.test(value)&&value.length === 10&&pass.value!==''){
            console.log('true');
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }]
});
check.run();