/**
 * Created by zxy on 2015/6/17.
 */
jQuery(function($) {
//var $form_ask = $('#form_ask');
    var $ans = $('#inputAns');
//var $close = $('.comp_close');
    var $chan_pass = $('#inputPass');
    var $pass_again = $('#inputPass_again');

//密保问题验证
    var pass_check = new form_check({
        form: '#form_ask',
        check: [function () {
            if ($ans.val() === '') {
                $ans.tooltip({title: '请先回答问题', trigger: 'focus'});
                $ans.tooltip('show');
                $ans.focus();
                return false;
            }
            else if ($chan_pass.val() === '') {
                $chan_pass.val('');
                $pass_again.val('');
                $chan_pass.tooltip({title: '请填写新密码', trigger: 'focus'});
                $chan_pass.tooltip('show');
                $chan_pass.focus();
                return false;
            }
            else if ($chan_pass.val() !== $pass_again.val()) {
                $pass_again.tooltip({title: '两次密码填写不同', trigger: 'focus'});
                $pass_again.val('');
                $chan_pass.val('');
                $pass_again.tooltip('show');
                $pass_again.focus();
                return false;
            }
            else {
                return true;
            }
        }]
    });
    pass_check.run();
});