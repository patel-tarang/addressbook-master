var site_url = $("#site_url").val();
jQuery('#forget-password').click(function() {
    $("#frmadmin_login").data('bootstrapValidator').resetForm();
    $("#frmadmin_login")[0].reset();
    jQuery('.login-form').hide();
    jQuery('.forget-form').show();
});
jQuery('#back-btn').click(function() {
    $("#frmadmin_forgotpassword").data('bootstrapValidator').resetForm();
    $("#frmadmin_forgotpassword")[0].reset();
    jQuery('.login-form').show();
    jQuery('.forget-form').hide();
});
$(document).ready(function(){
    var msg = $(".alert").html();
    if(msg != undefined && msg == 'Please enter valid Admin email address'){
        $("#frmadmin_forgotpassword")[0].reset();
        jQuery('.login-form').hide();
        jQuery('.forget-form').show();
    }
    window.setTimeout(function() {
        $(".alert").fadeTo(1000, 0).slideUp(1000, function(){
            $(this).remove();
        });
    }, 2500);
    $("#username").focus();
    $('#frmadmin_login').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: 'Please enter Username'
                    },
                    emailAddress: {
                        message: 'Please enter valid Username'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Please enter Password'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: 'Password between 6 to 16 character long'
                    }
                }
            },
            user_type: {
                validators: {
                    notEmpty: {
                        message: 'Please select Type'
                    }
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
            /*loadingBar(submitButton,"show");
            var formdata = $(form).serializeArray();
            var data = FormObj.callAction("create",formdata).getResponse();
            loadingBar(submitButton,"hide");
             if(data.status == 1){
                $("#error_forgot_message").hide();
                $("#popup_forgot_pwd_section").hide();
                $("#popup_reset_sent_section").show();
            }
            else{
                $("#error_forgot_message").show();
            }*/

        }
    });
    $('#frmadmin_forgotpassword').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            admin_emailid: {
                validators: {
                    notEmpty: {
                        message: 'Please enter Admin email address'
                    },
                    regexp: {
                        regexp: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/,
                        message: 'Please enter valid Module Name'
                    },
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
            /*loadingBar(submitButton,"show");
            var formdata = $(form).serializeArray();
            var data = FormObj.callAction("create",formdata).getResponse();
            loadingBar(submitButton,"hide");
             if(data.status == 1){
                $("#error_forgot_message").hide();
                $("#popup_forgot_pwd_section").hide();
                $("#popup_reset_sent_section").show();
            }
            else{
                $("#error_forgot_message").show();
            }*/

        }
    });
});