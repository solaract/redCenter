/**
 * Created by zxy on 2015/6/11.
 */
jQuery(function($) {
    var $user = $('#inputUser');
    var $pass = $('#inputPassword');
//输入提示
    $user.tooltip({title: '学号', trigger: 'focus'});
    $pass.tooltip({title: 'ucenter/重邮通行证/身份证后六位', trigger: 'focus'});
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
});
