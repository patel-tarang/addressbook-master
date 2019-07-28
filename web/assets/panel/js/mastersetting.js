$(document).ready(function() {	
	$("#form_mainName").focus();
    $('#frmadmin_panelinfo').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
			'form[mainName]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Master Panel Name'
                    },
                    stringLength: {
                        min: 3,
                        max: 100,
                        message: 'Master Panel Name Min 3 and Max 100 characters'
                    },
                    regexp: {
                       regexp: /^[^-\s][a-z0-9.,:\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                       message: 'Please enter valid Master Panel Name'
                    },
                }
            },
            'form[supportEmail]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Support Email'
                    },
                    emailAddress: {
                        message: 'Please enter valid Support Email'
                    },
                }
            },
            'form[pageSetting]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Default Paging'
                    },
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'Default Paging Min 1 and Max 5 digits'
                    },
                    numeric: {
                        message: 'Default Paging must be numerical',
                    },
                }
            },
            'form[apiUrl]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Master API URL'
                    },
                    stringLength: {
                        min: 3,
                        max: 255,
                        message: 'Master API URL Min 3 and Max 255 characters'
                    },
                    uri: {
                        message: 'Please enter valid Master API URL'
                    },
                }
            },
            'form[contactName]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Persone Name'
                    },
                    stringLength: {
                        min: 3,
                        max: 100,
                        message: 'Persone Name Min 3 and Max 100 characters'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\\\/\_\-\s.àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                        message: 'Please enter valid Persone Name'
                    },
                }
            },
            'form[contactEmail]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Persone Email'
                    },
                    stringLength: {
                        min: 3,
                        max: 250,
                        message: 'Persone Email Min 3 and Max 250 characters'
                    },
                    emailAddress: {
                        message: 'Please enter valid Persone Email'
                    },
                }
            },
            'form[contactPhone]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Persone Phone'
                    },
                    stringLength: {
                        min: 10,
                        max: 25,
                        message: 'Persone Phone Min 10 and Max 25 characters'
                    },
                    regexp: {
                        regexp: /^[0-9+()\-\s.]+$/i,
                        message: 'Please enter valid Persone Phone'
                    },
                }
            },
            'form[contactFax]': {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 25,
                        message: 'Persone Fax Min 10 and Max 25 characters'
                    },
                    regexp: {
                        regexp: /^[0-9+()\-\s.]+$/i,
                        message: 'Please enter valid Persone Fax'
                    },
                }
            },
        },
    }).on('success.form.bv', function(e) {
        $('.loader').css('display', 'block');
    });
    $('#frmadmin_storesmtp').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[smtpHost]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-:.]+$/i,
                        message: 'Please enter valid SMTP Host/IP'
                    },
                }
            },
            'form[smtpPort]': {
                validators: {
                    regexp: {
                        regexp: /^[0-9]+$/i,
                        message: 'Please enter valid SMTP Port'
                    },
                }
            },
            'form[smtpUsername]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9@\-\s:.]+$/i,
                        message: 'Please enter valid SMTP Username'
                    },
                }
            },
            'form[smtpPassword]': {
                validators: {
                    stringLength: {
                        min: 4,
                        max: 20,
                        message: 'SMTP Password Min 4 and Max 20 characters'
                    },
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
        }
    }).on('success.form.bv', function(e) {
        $('.loader').css('display', 'block');
    });
});

function getkey(e)
{
    if (window.event)
    return window.event.keyCode;
    else if (e)
    return e.which;
    else
    return null;
}
function goodchars(e, goods)
{
    var key, keychar;
    key = getkey(e);
    if (key == null) return true;
    // get character
    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    goods = goods.toLowerCase();
    // check goodkeys
    if (goods.indexOf(keychar) != -1)
    return true;
    // control keys
    if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 )
    return true;
    // else return false
    return false;
}

function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
$(".showpass").click(function(){
    $("#form_smtp_password").attr("type","text");
    $(this).removeClass('fa-eye showpass');
    $(this).addClass("fa-eye-slash hidepass");
});