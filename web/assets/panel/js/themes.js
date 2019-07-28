var site_url = $(location).attr('href');
var encId = $("#encId").val();
function strstr(haystack, needle, bool) {
    var pos = 0;
    haystack += "";
    pos = haystack.indexOf(needle); if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}
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
$("#frmSubmit2").click(function(){
    OnlinePHPEditor.submitCode('1');
    return false;
})
$(document).ready(function() {
    //Load customer list
    if($("#datatable_ajax_themes").size() > 0){
         loadAjaxData("datatable_ajax_themes","ajaxthemesdata");
         $(".table-responsive").prev().closest('div').hide();
         $(".table-responsive").next(".row").css("float","right");
         $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
    }
    //Select2 box
    if($(".select2").length > 0)
    {
        $("#form_themeType").select2({
            placeholder: "Select Theme Type",
            allowClear: true,
            width:'100%',
        });        
    }
    site_url = site_url.replace(/addtheme/g, "..");
    site_url = site_url.replace(/edittheme/g, "..");
    site_url1 = strstr(site_url,'..',true);
    if($("#frmtheme").size() > 0)
    {
        //Validation Theme Information
    	$('#frmtheme').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[themeType]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Theme Type'
                        }
                    }
                },
                'form[name]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Theme Name between 3 to 50 character long'
                        },
                    }
                },
                'form[slug]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Slug'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Theme Slug between 3 to 50 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\\\/\_\-&àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Theme Slug'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1 + "checkunique",
                            data: function (validator, $field, value) {
                                return {
                                    id: encId,
                                };
                            },
                            message: 'Theme Slug is alreday exist',
                            delay: 500
                        },
                    }
                },
                'form[description]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Description'
                        },
                        regexp: {
                            regexp: /^[a-z0-9:'"?*()@!\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Theme Description'
                        },
                    }
                },
                'form[themeVersion]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Version'
                        },
                        regexp: {
                            regexp: /^[a-z0-9:'"?*()@!\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Theme Description'
                        },
                    },  
                },
                'form[mainImage]': {
                    validators: {
                        notEmpty: {
                            message: 'Please upload Theme Image'
                        },
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png',
                            maxSize: 5242880,   // 5110 * 1024
                            message: 'Please upload Theme Image with png, jpg, jpeg only and max 5MB size'
                        }
                    }
                },
                'form[price]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Price'
                        },
                        regexp: {
                            regexp: /^[1-9]\d*(\.\d+)?$/i,
                            message: 'Please enter valid Theme Price'
                        },
                    },
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
    if($("#frmthemeedit").size() > 0)
    {
        //Validation Theme Information
        $('#frmthemeedit').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[themeType]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Theme Type'
                        }
                    }
                },
                'form[name]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Theme Name between 3 to 50 character long'
                        },
                    }
                },
                'form[description]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Description'
                        },
                        regexp: {
                            regexp: /^[a-z0-9:'"?*()@!\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Theme Description'
                        },
                    }
                },
                'form[themeVersion]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Version'
                        },
                        regexp: {
                            regexp: /^[a-z0-9:'"?*()@!\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Theme Description'
                        },
                    },  
                },
                'form[mainImage]': {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png',
                            maxSize: 5242880,   // 5110 * 1024
                            message: 'Please upload Theme Image with png, jpg, jpeg only and max 5MB size'
                        }
                    }
                },
                'form[price]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Theme Price'
                        },
                        regexp: {
                            regexp: /^[1-9]\d*(\.\d+)?$/i,
                            message: 'Please enter valid Theme Price'
                        },
                    },
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
});
$("#form_name").blur(function () {
    var name = $("#form_name").val();
    if (name != "")
    {
        var slug = slugify(name);
        if ($("#form_slug").val().trim() == "") {
            $("#form_slug").val(slug);
        }
        $("#frmtheme").bootstrapValidator('revalidateField', "form[slug]");
        $("#frmthemeedit").bootstrapValidator('revalidateField', "form[slug]");
    }
});
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
$(".exporttocsv").click(function (e) {
    e.preventDefault();
    $('#frmdatatable').attr('action', site_url+'/exportcsv').submit();
});
$(".exporttopdf").click(function (e) {
    e.preventDefault();
    $('#frmdatatable').attr('action', site_url+'/exportpdf').submit();
});