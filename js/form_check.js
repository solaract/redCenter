/**
 * Created by zxy on 2015/5/31.
 */
//form_date = {
//    form:'String',
//    check:'Array',//[fun,fun]
//    success:'function',
//    fail:'function'
//};
var form_check = (function(){
    var Constructor = function(form_data){
        var check_arr,success,fail;
        if(typeof form_data.form === 'string'&&form_data.form !== ''){
            this.form = $(form_data.form);
        }
        else{
            throw "form_data.form should be string && not ''";
        }
        if(Object.prototype.toString.call(form_data.check) === "[object Array]"){
            check_arr = form_data.check;
        }
        else{
            throw "form_data.check_arr should be array";
        }
        if(form_data.success){
            if(typeof form_data.success === "function"){
                success = form_data.success;
            }
            else{
                throw "form_data.success should be function";
            }
        }
        if(form_data.fail){
            if(typeof form_data.fail === "function"){
                fail = form_data.fail;
            }
            else{
                throw "form_data.fail should be function";
            }
        }

        this.getCheck = function(){
            return check_arr;
        };
        this.getSuccess = function(){
            if(success === undefined){
                return false;
            }
            return success;
        };
        this.getFail = function(){
            if(success === undefined){
                return false;
            }
            return fail;
        }
    };
    var form_sub = function(target,check,success,fail){
        target.bind('submit.form_check',function(){
            var is_checked = true;
            $.each(check,function(index,fun){
                if(!fun()){
                    is_checked = false;
                    return false;
                }
            });
            if(is_checked){
                if(success){
                    var suc_re = success();
                    if(suc_re === false){
                        return false;
                    }
                }
            }
            else{
                if(fail){
                    fail();
                }
                return false;
            }
        })
    };
    Constructor.prototype.run = function(){
        var target = this.form;
        var check = this.getCheck();
        var success = this.getSuccess();
        var fail = this.getFail();
//        var is_checked = true;
        form_sub(target,check,success,fail);
    };
    return Constructor;
})();