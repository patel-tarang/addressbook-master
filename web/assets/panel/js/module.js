var site_url = $(location).attr('href');
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
//Font awesome icon in select2 option Start
function iformat(icon) {
    var originalOption = icon.element;
    return '<i class="fa ' + $(originalOption).data('icon') + '"></i> ' + icon.text;
}
$(document).ready(function() {
    if($(".select2").length > 0)
    {
        $("#form_icon").select2({
            placeholder: "Select Module Icon",
            allowClear: true,
            width:'100%',
            templateSelection: iformat,
            templateResult: iformat,
            escapeMarkup: function(text) {
                return text;
            }
        });
        $("#form_parentId").select2({
            placeholder: "Select Parent Module",
            allowClear: true,
            width:'100%'
        });
    }
    site_url = site_url.replace(/addmodule/g, "..");
    site_url = site_url.replace(/editmodule/g, "..");
    site_url1 = strstr(site_url,'..',true);
    if($("#frmmodule").size() > 0)
    {
        $('#frmmodule').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[moduleName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Module Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Module Name between 3 to 100 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9()+\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Module Name'
                        },
                    }
                },
                'form[slug]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Module Slug'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Module Slug between 3 to 255 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\\\/\_\-&àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Module Slug'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1 + "checkunique",
                            data: function (validator, $field, value) {
                                modName = $("#form_moduleName").val();
                                return {
                                    mod_name: modName,
                                };
                            },
                            message: 'Module Slug is alreday exist',
                            delay: 500
                        },
                    }
                },
                'form[currentVersion]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Module Version'
                        },
                    },
                    
                },
                'form[country]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Retailer Country'
                        },
                    }
                },
                'form[zipcode]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Zipcode'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\-\s.]+$/i,
                            message: 'Please enter valid Retailer Zipcode'
                        },
                    }
                },
                'form[businessPhone]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Business Phone'
                        },
                        regexp: {
                            regexp: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                            message: 'Please enter valid Retailer Business Phone'
                        }
                    },                
                },
                'form[businessFax]': {
                    validators: {
                        regexp: {
                            regexp: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                            message: 'Please enter valid Retailer Business Fax'
                        }
                    },                
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
    if($("#datatable_ajax_module").size() > 0){
        loadAjaxData("datatable_ajax_module","ajaxmoduledata");
        $(".table-responsive").prev().closest('div').hide();
        $(".table-responsive").next(".row").css("float","right");
        $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
    }
    if($("#frmhunterdouglas").size() > 0)
    {
        $('#frmhunterdouglas').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[methodName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Method Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Method Name between 3 to 100 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9()+\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Method Name'
                        },
                    }
                },
                'form[catalogSyncUrl]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Catalog Sync Url'
                        },
                        uri: {
                            message: 'Please enter valid Catalog Sync Url'
                        },
                    }
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
    if($("#frmabandonedcart").size() > 0)
    {
        $('#frmabandonedcart').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[methodName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Method Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Method Name between 3 to 100 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9()+\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Method Name'
                        },
                    }
                },
                'form[perCartEmailSend]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Per Abandoned Entry Email Send'
                        },
                    }
                },
                'form[abandonedEntryLimit]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Unique Abandoned Entry Limit'
                        },
                    }
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
    if($("#frmguardianwarranty").size() > 0)
    {
        $('#frmguardianwarranty').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[methodName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Method Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Method Name between 3 to 100 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9()+\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Method Name'
                        },
                    }
                },
                'form[guardianApiUrl]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Guardian Api Url'
                        },
                        uri: {
                            message: 'Please enter valid Guardian Api Url'
                        },
                    }
                },
                'form[guardianUsername]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Guardian Username'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Guardian Username between 3 to 50 character long'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9()+\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Guardian Username'
                        },
                    }
                },
                'form[guardianPassword]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Guardian Password'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Guardian Password between 3 to 50 character long'
                        },
                    }
                },
                'form[guardianKey]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Guardian Api Key'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Guardian Api Key between 3 to 100 character long'
                        },
                    }
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
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
    if (key == null)
        return true;
    // get character
    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    goods = goods.toLowerCase();
    // check goodkeys
    if (goods.indexOf(keychar) != -1)
        return true;
    // control keys
    if (key == null || key == 0 || key == 8 || key == 9 || key == 13 || key == 27)
        return true;
    // else return false
    return false;
}
$("#form_moduleName").blur(function () {
    var name = $("#form_moduleName").val();
    if (name != "")
    {
        var slug = slugify(name);
        if ($("#form_slug").val().trim() == "") {
            $("#form_slug").val(slug);
        }
        $("#frmmodule").bootstrapValidator('revalidateField', "form[slug]");
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
$("#form_perCartEmailSend").change(function(){
    var emailsend = $(this).val();
    if(emailsend > 0){
        if(emailsend == 1){
            $(".emailtime2").addClass('hide');
            $(".emailtime2").removeClass('show');
            $(".emailtime3").addClass('hide');
            $(".emailtime3").removeClass('show');
            $(".emailtime4").addClass('hide');
            $(".emailtime4").removeClass('show');
        }
        else if(emailsend == 2){
            $(".emailtime2").addClass('show');
            $(".emailtime2").removeClass('hide');
            $(".emailtime3").addClass('hide');
            $(".emailtime3").removeClass('show');
            $(".emailtime4").addClass('hide');
            $(".emailtime4").removeClass('show');
        }
        else if(emailsend == 3){
            $(".emailtime2").addClass('show');
            $(".emailtime2").removeClass('hide');
            $(".emailtime3").addClass('show');
            $(".emailtime3").removeClass('hide');
            $(".emailtime4").addClass('hide');
            $(".emailtime4").removeClass('show');
        }
        else if(emailsend == 4){
            $(".emailtime2").addClass('show');
            $(".emailtime2").removeClass('hide');
            $(".emailtime3").addClass('show');
            $(".emailtime3").removeClass('hide');
            $(".emailtime4").addClass('show');
            $(".emailtime4").removeClass('hide');
        }
    }
})