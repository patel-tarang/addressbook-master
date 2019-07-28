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
$(document).ready(function() {
    if($(".fancybox").size() > 0)
    {
        $(".fancybox").fancybox({
            openEffect  : 'elastic',
            closeEffect : 'elastic',
            helpers : {
                title : {
                    type : 'inside'
                }
            }
        });
    }
    if($(".select2").length > 0)
    {
        $("#form_retailer").select2({
            placeholder: "Select Retailer",
            allowClear: true,
            width:'100%',
        });
        $("#form_language").select2({
            placeholder: "Select Store Default Language",
            allowClear: true,
            width:'100%',
        });
        $("#form_timezone").select2({
            placeholder: "Select Store Timezone",
            allowClear: true,
            width:'100%',
        });
        $("#form_industry").select2({
            placeholder: "Select Store Industry",
            allowClear: true,
            width:'100%',
        });
        /*$("#form_country").select2({
            placeholder: "Select Store Country",
            allowClear: true,
            width:'100%',
        });*/
        $("#form_user").select2({
            placeholder: "Select Store User",
            allowClear: true,
            width:'100%',
        });
        $("#form_storeType").select2({
            //placeholder: "Select Store Type",
            allowClear: true,
            width:'100%',
        });      
    }
    if ($(".select2-multiple").length > 0){
        $("#form_otrlanguage").select2({
            placeholder: "Select Store Other Languages",
            allowClear: true,
            width:'100%',
        });
    }
    if($("#frmstoreprofile").size() > 0){
        $('#frmstoreprofile').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[retailer]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Retailer'
                        },
                    }
                },
                'form[storeName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Store Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'Store Name Min 3 and Max 100 characters'
                        },
                        regexp: {
                           regexp: /^[^-\s][a-z0-9.,:;\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                           message: 'Please enter valid Store Name'
                        },
                    }
                },
                'form[language]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Store Default Language'
                        },
                    }
                },
                'form[industry]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Store Industry'
                        },
                    }
                },
                'form[timezone]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Store Timezone'
                        },
                    }
                },
                /*'form[address]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Store Address'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:;àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Store Address'
                        },
                        stringLength: {
                            min: 3,
                            max: 300,
                            message: 'Store Address Min 3 and Max 300 characters'
                        }
                    }
                },
                'form[city]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter City'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:;àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid City'
                        },
                        stringLength: {
                            min: 3,
                            max: 100,
                            message: 'City Min 3 and Max 100 characters'
                        }
                    }
                },
                'form[state]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter State'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:;àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid State'
                        },
                        stringLength: {
                            min: 3,
                            max: 150,
                            message: 'State Min 3 and Max 150 characters'
                        }
                    }
                },
                'form[zipcode]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Zipcode'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\-\s.]+[^-\s]$/i,
                            message: 'Please enter valid Zipcode'
                        },
                        stringLength: {
                            min: 4,
                            max:10,
                            message: 'Zipcode Min 4 and Max 10 characters'
                        },

                    }
                },
                'form[country]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Store Country'
                        },
                    }
                },*/
                'form[contactName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Person Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Person Name Min 3 and Max 50 characters'
                        },
                        regexp: {
                            regexp: /^[^-\s][a-z0-9\\\/\_\-\s.àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                            message: 'Please enter valid Person Name'
                        },
                    }
                },
                'form[contactEmail]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Person Email Address'
                        },
                        stringLength: {
                            min: 3,
                            max: 200,
                            message: 'Person Email Address Min 3 and Max 200 characters'
                        },
                        emailAddress: {
                            message: 'Please enter valid Person Email Address'
                        },
                    }
                },
                'form[contactPhone]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Person Phone'
                        },
                        stringLength: {
                            min: 10,
                            max: 25,
                            message: 'Person Phone Min 10 and Max 25 characters'
                        },
                        regexp: {
                            regexp: /^[0-9+()\-\s.]+$/i,
                            message: 'Please enter valid Person Phone'
                        },
                    }
                },
                'form[storeFax]': {
                    validators: {
                        stringLength: {
                            min: 10,
                            max: 25,
                            message: 'Person Fax Min 10 and Max 25 characters'
                        },
                        regexp: {
                            regexp: /^[0-9+()\-\s.]+$/i,
                            message: 'Please enter valid Person Fax'
                        },
                    }
                },
            },
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
    if($("#frmstoreserver").size() > 0){
        //site_url = site_url.replace(/addretailer/g, "..");
        site_url = site_url.replace(/editstore/g, "..");
        site_url1 = strstr(site_url,'..',true);
        $('#frmstoreserver').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[serverName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Server Name'
                        },
                        regexp: {
                            regexp: /^[a-z0-9//_\-:.]+$/i,
                            message: 'Please enter valid Server Name'
                        },
                    }
                },
                'form[storeDomainName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Store Domain Name'
                        },
                        regexp: {
                            regexp: /^[a-z0-9//_\-:.]+$/i,
                            message: 'Please enter valid Store Domain Name'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1+"checkunique",
                            data: function(validator, $field, value) {
                                return {
                                    id: encId,
                                }; 
                            },
                            message: 'Store Domain Name is already exist',
                            delay: 500
                        },
                    }
                },
                'form[addonDomainName]': {
                    validators: {
                        regexp: {
                            regexp: /^[a-z0-9//_\-:.]+$/i,
                            message: 'Please enter valid Addon Domain Name'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1+"checkuniquedomain",
                            data: function(validator, $field, value) {
                                return {
                                    id: encId,
                                }; 
                            },
                            message: 'Addon Domain Name is already exist',
                            delay: 500
                        },
                    }
                },
                'form[serverRoot]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Store Document Root/Path'
                        },
                        regexp: {
                            regexp: /^[a-z0-9//_\-:.]+$/i,
                            message: 'Please enter valid Store Document Root/Path'
                        },
                    }
                },
                'form[gitrepoUrl]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Store GIT Repository URL'
                        },
                        regexp: {
                            regexp: /^[a-z0-9//_\-:.]+$/i,
                            message: 'Please enter valid Store GIT Repository URL'
                        },
                    }
                },
                'form[storeUrl]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Store Live URL'
                        },
                        stringLength: {
                            min: 5,
                            max: 250,
                            message: 'Store Live URL Min 5 and Max 250 characters'
                        },
                        uri: {
                            message: 'Please enter valid Store Live URL'
                        },
                    }
                },
                'form[mailForward]': {
                    validators: {
                        stringLength: {
                            min: 3,
                            max: 200,
                            message: 'Mail Forward Min 3 and Max 200 characters'
                        },
                        emailAddress: {
                            message: 'Please enter valid Mail Forward'
                        },
                    }
                },
                'form[databaseHost]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Database Host/IP'
                        },
                        regexp: {
                            regexp: /^[a-z0-9//\-:.]+$/i,
                            message: 'Please enter valid Database Host/IP'
                        },
                    }
                },
                'form[databasePort]': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9//\-:.]+$/i,
                            message: 'Please enter valid Database Port'
                        },
                    }
                },
                'form[databaseUser]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Database Username'
                        },
                        stringLength: {
                            min: 3,
                            max: 200,
                            message: 'Database Username Min 3 and Max 200 characters'
                        },
                        regexp: {
                           regexp: /^[^-\s][a-z0-9.,:;\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                           message: 'Please enter valid Database Username'
                        },
                    }
                },
                'form[databasePassword]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Database Password'
                        },
                        stringLength: {
                            min: 4,
                            max: 25,
                            message: 'Database Password Min 4 and Max 25 characters'
                        },
                    }
                },
                'form[databaseName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Database Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 200,
                            message: 'Database Name Min 3 and Max 200 characters'
                        },
                        regexp: {
                           regexp: /^[^-\s][a-z0-9.,:;\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                           message: 'Please enter valid Database Name'
                        },
                    }
                },
                'form[ftpHost]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter FTP Host/IP'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\-:.]+$/i,
                            message: 'Please enter valid FTP Host/IP'
                        },
                    }
                },
                'form[ftpPort]': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9]+$/i,
                            message: 'Please enter valid FTP Port'
                        },
                    }
                },
                'form[ftpUsername]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter FTP Username'
                        },
                        regexp: {
                            regexp: /^[a-z0-9@_\-\s:.]+$/i,
                            message: 'Please enter valid FTP Username'
                        },
                    }
                },
                'form[ftpPassword]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter FTP Password'
                        },
                        stringLength: {
                            min: 4,
                            max: 25,
                            message: 'FTP Password Min 4 and Max 25 characters'
                        },
                    }
                },
                'form[ftpFolder]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter FTP Folder Name'
                        },
                        regexp: {
                            regexp: /^[a-z0-9_@\-\s:.]+$/i,
                            message: 'Please enter valid FTP Folder Name'
                        },
                    }
                },
                'form[smtpHost]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter SMTP Host/IP'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\-:.]+$/i,
                            message: 'Please enter valid SMTP Host/IP'
                        },
                    }
                },
                'form[smtpPort]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter SMTP Port'
                        },
                        regexp: {
                            regexp: /^[0-9]+$/i,
                            message: 'Please enter valid SMTP Port'
                        },
                    }
                },
                'form[smtpUsername]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter SMTP Username'
                        },
                        regexp: {
                            regexp: /^[a-z0-9_@\-\s:.]+$/i,
                            message: 'Please enter valid SMTP Username'
                        },
                    }
                },
                'form[smtpPassword]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter SMTP Password'
                        },
                        stringLength: {
                            min: 4,
                            max: 25,
                            message: 'SMTP Password Min 4 and Max 25 characters'
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
    /*if($("#frmstoretheme").size() > 0){
        $('#frmstoretheme').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'assign_store_theme[]': {
                    validators: {
                        notEmpty: {
                            message: 'Please assign any one Theme'
                        },
                    }
                },
            },
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }*/
    /*if($("#frmstoremodule").size() > 0){
        $('#frmstoremodule').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form_store_access_module': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Store Module'
                        },
                    }
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        });   
    }*/
    /*$('#submit_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[storeName]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Store Name'
                    },
                    stringLength: {
                        min: 3,
                        max: 100,
                        message: 'Store Name Min 3 and Max 100 characters'
                    },
                    regexp: {
                       regexp: /^[^-\s][a-z0-9.,:\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                       message: 'Please enter valid Store Name'
                    },
                }
            },
            'industry': {
                validators: {
                    notEmpty: {
                        message: 'Please select Store Industry'
                    },
                }
            },
            'form[address]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Store Address'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                        message: 'Please enter valid Store Address'
                    },
                    stringLength: {
                        min: 3,
                        max: 300,
                        message: 'Store Address Min 3 and Max 300 characters'
                    }
                }
            },
            'form[city]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter City'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                        message: 'Please enter valid City'
                    },
                    stringLength: {
                        min: 3,
                        max: 100,
                        message: 'City Min 3 and Max 100 characters'
                    }
                }
            },
            'form[state]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter State'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                        message: 'Please enter valid State'
                    },
                    stringLength: {
                        min: 3,
                        max: 150,
                        message: 'State Min 3 and Max 150 characters'
                    }
                }
            },
            'form[zipcode]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Zipcode'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\-\s.]+[^-\s]$/i,
                        message: 'Please enter valid Zipcode'
                    },
                    stringLength: {
                        min: 4,
                        max:10,
                        message: 'Zipcode Min 4 and Max 10 characters'
                    },

                }
            },
            'country': {
                validators: {
                    notEmpty: {
                        message: 'Please select Store Country'
                    },
                }
            },
            'timezone': {
                validators: {
                    notEmpty: {
                        message: 'Please select Store Timezone'
                    },
                }
            },
            'currency': {
                validators: {
                    notEmpty: {
                        message: 'Please select default Currency'
                    },
                }
            },
            'form[storeHours]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Store Opening Hours'
                    },
                    stringLength: {
                        min: 2,
                        max: 250,
                        message: 'Store Opening Hours Min 2 and Max 250 characters'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\\\/\_\-\s.,:]+[^-\s]$/i,
                        message: 'Please enter valid Store Opening Hours'
                    },
                }
            },
            'form[storeSupportEmail]': {
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
                        max: 6,
                        message: 'Default Paging Min 1 and Max 6 digits'
                    },
                    numeric: {
                        message: 'Default Paging must be numerical',
                    },
                }
            },
            'form[storeUrl]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Store Live URL'
                    },
                    stringLength: {
                        min: 5,
                        max: 250,
                        message: 'Store Live URL Min 5 and Max 250 characters'
                    },
                    uri: {
                        message: 'Please enter valid Store Live URL'
                    },
                }
            },
            'form[contactName]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Person Name'
                    },
                    stringLength: {
                        min: 3,
                        max: 50,
                        message: 'Person Name Min 3 and Max 50 characters'
                    },
                    regexp: {
                        regexp: /^[^-\s][a-z0-9\\\/\_\-\s.àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                        message: 'Please enter valid Person Name'
                    },
                }
            },
            'form[contactEmail]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Person Email'
                    },
                    stringLength: {
                        min: 3,
                        max: 200,
                        message: 'Person Email Min 3 and Max 200 characters'
                    },
                    emailAddress: {
                        message: 'Please enter valid Person Email'
                    },
                }
            },
            'form[contactPhone]': {
                validators: {
                    notEmpty: {
                        message: 'Please enter Person Phone'
                    },
                    stringLength: {
                        min: 10,
                        max: 25,
                        message: 'Person Phone Min 10 and Max 25 characters'
                    },
                    regexp: {
                        regexp: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                        message: 'Please enter valid Person Phone'
                    },
                }
            },
            'form[storeFax]': {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 25,
                        message: 'Person Fax Min 10 and Max 25 characters'
                    },
                    regexp: {
                        regexp: /^[^-\s][0-9()+\-\s.]+[^-\s]$/i,
                        message: 'Please enter valid Person Fax'
                    },
                }
            },
        },
    });
    $('#frmadmin_storelogo').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[mainlogo]': {
                validators: {
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png',
                        //maxSize: 2097152,   // 2048 * 1024
                        message: 'Please upload Store Main Logo with png, jpg, jpeg only'
                    }
                }
            },
            'form[loginlogo]': {
                validators: {
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png',
                        //maxSize: 2097152,   // 2048 * 1024
                        message: 'Please upload Store Login Logo with png, jpg, jpeg only'
                    }
                }
            },
            'form[topbarlogo]': {
                validators: {
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png',
                        //maxSize: 2097152,   // 2048 * 1024
                        message: 'Please upload Store Topbar Logo with png, jpg, jpeg only'
                    }
                }
            },
            'form[favicon]': {
                validators: {
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png',
                        //maxSize: 2097152,   // 2048 * 1024
                        message: 'Please upload Store Favicon with png, jpg, jpeg only'
                    }
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
        }
    });
    $('#frmadmin_storemarkup').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[defaultMarkup]': {
                validators: {
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'Store Default Markup Min 1 and Max 5 characters'
                    },
                }
            },
            'form[payaslawasMarkup]': {
                validators: {
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'Pay as Law as Markup Min 1 and Max 5 characters'
                    },
                }
            },
            'form[lawawayMarkup]': {
                validators: {
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'Layaway Markup Min 1 and Max 5 characters'
                    },
                }
            },
            'form[clearanceMarkup]': {
                validators: {
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'Clearance Markup Min 1 and Max 5 characters'
                    },
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
        }
    });
    $('#frmadmin_storewebmaster').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[googleWebmaster]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-\s:.]+$/i,
                        message: 'Please enter valid Google Webmaster Code'
                    },
                }
            },
            'form[bingWebmaster]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-\s:.]+$/i,
                        message: 'Please enter valid Bing Webmaster Code'
                    },
                }
            },
            'form[yahooWebmaster]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-\s:.]+$/i,
                        message: 'Please enter valid Yahoo Webmaster Code'
                    },
                }
            },
            'form[googlePlusProfile]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9.,:\\\/\_\-\s&\']+$/i,
                        message: 'Please enter valid Google Plus Profile'
                    },
                }
            },
            'form[googleAnalyticId]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-\s]+$/i,
                        message: 'Please enter valid Google Analytics Id'
                    },
                }
            },
            'form[googleApikey]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9:._&\-\s]+$/i,
                        message: 'Please enter valid Google API Key'
                    },
                }
            },
            'form[youtubeVideoCode]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-.&?]+$/i,
                        message: 'Please enter valid Youtube Video Code'
                    },
                }
            },
            'form[taxipixelTracking]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-.&?]+$/i,
                        message: 'Please enter valid Ads. Taxi Pixel Tracking'
                    },
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
        }
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
    });
    $('#frmadmin_storeftp').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[ftpHost]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9\-:.]+$/i,
                        message: 'Please enter valid FTP Host/IP'
                    },
                }
            },
            'form[ftpPort]': {
                validators: {
                    regexp: {
                        regexp: /^[0-9]+$/i,
                        message: 'Please enter valid FTP Port'
                    },
                }
            },
            'form[ftpUsername]': {
                validators: {
                    regexp: {
                        regexp: /^[a-z0-9@\-\s:.]+$/i,
                        message: 'Please enter valid FTP Username'
                    },
                }
            },
            'form[ftpPassword]': {
                validators: {
                    stringLength: {
                        min: 4,
                        max: 20,
                        message: 'FTP Password Min 4 and Max 20 characters'
                    },
                }
            },
        },
        submitHandler:function(validator, form, submitButton){}
    });
    $('#frmadmin_storemetainfo').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[metaTitle]': {
                validators: {
                    regexp: {
                       regexp: /^[a-z0-9A-Z\,\_\.\-\&\s\'\"/()=:;?!]+$/i,
                       message: 'Please enter valid Meta Title'
                    }
                }
            },
            'form[metaKeyword]': {
                validators: {
                    regexp: {
                       regexp: /^[a-z0-9A-Z\,\_\.\-\&\s\'\"/()=:;?!]+$/i,
                       message: 'Please enter valid Meta Keyword'
                    }
                }
            },
            'form[metaDescription]': {
                validators: {
                    regexp: {
                       regexp: /^[a-z0-9A-Z\,\_\.\-\&\s\'\"/()=:;?!]+$/i,
                       message: 'Please enter valid Meta Description'
                    }
                }
            },
        },
        submitHandler:function(validator, form, submitButton){
        }
    });
    $('#frmadmin_storeorderstatus').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa',
            invalid: 'err',
            validating: 'fa'
        },
        fields: {
            'form[defaultOrderStatus]': {
                validators: {
                    notEmpty: {
                        message: 'Please select Default Order Status'
                    },
                }
            },
            'form[paymentSuccessStatus]': {
                validators: {
                    notEmpty: {
                        message: 'Please select Payment Success Status'
                    },
                }
            },
            'form[paymentFailedStatus]': {
                validators: {
                    notEmpty: {
                        message: 'Please select Payment Failed Status'
                    },
                }
            },
        },
        submitHandler:function(validator, form, submitButton){}
    });*/
    if($("#datatable_ajax_store").size() > 0){
        loadAjaxStoreData("datatable_ajax_store","ajaxstoredata");
        $(".table-responsive").prev().closest('div').hide();
        $(".table-responsive").next(".row").css("float","right");
        $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
    }
    if($("#store_access_tree").size() > 0){
        if($("#hdn_store_module").val() != ""){
            storemodule = $("#hdn_store_module").val();
            $("#store_access_tree").jstree({
                'plugins': [ "checkbox"],
                'core' : {
                    'data' : JSON.parse(storemodule)
                },
                'checkbox' : {       
                    three_state : false, // to avoid that fact that checking a node also check others
                    whole_node : false,  // to avoid checking the box just clicking the node 
                    cascade: 'up'
                },
            }).bind("loaded.jstree", function (event, data) {
                $(this).jstree("open_all");
            });
            $("#store_modify_tree").jstree({
                'plugins': [ "checkbox"],
                'core' : {
                    'data' : JSON.parse(storemodule)
                },
                'checkbox' : {       
                    three_state : false, // to avoid that fact that checking a node also check others
                    whole_node : false,  // to avoid checking the box just clicking the node 
                    cascade: 'up'
                },
            }).bind("loaded.jstree", function (event, data) {
                $(this).jstree("open_all");
            });
        }
        if($("#encId").size() > 0){
            var store_access_id = "";
            if($("#store_access_assign_module").val() != ""){
                store_access_id = $("#store_access_assign_module").val();
                store_access_id = store_access_id.split(",");
                $("#store_access_tree").on("loaded.jstree", function(){
                    $.each(store_access_id,function(i,val){
                        $('#store_access_tree').jstree(true).select_node(val);
                        if(strstr(site_url,'details/') != false){
                            $('#store_access_tree').jstree(true).disable_node(val);
                        }
                    });
                });
            }
            var store_modify_id = "";
            if($("#store_modify_assign_module").val() != ""){
                store_modify_id = $("#store_modify_assign_module").val();
                store_modify_id = store_modify_id.split(",");
                $("#store_modify_tree").on("loaded.jstree", function(){
                    $.each(store_modify_id,function(i,val){
                        $('#store_modify_tree').jstree(true).select_node(val);
                        if(strstr(site_url,'details/') != false){
                            $('#store_modify_tree').jstree(true).disable_node(val);
                        }
                    });
                });
            }
        }
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
$(".showpass").click(function(){
    $(this).attr("type","text");
    $(this).removeClass('fa-eye showpass');
    $(this).addClass("fa-eye-slash hidepass");
})
$("#form_sent_email_from").change(function(){
    var ef = $(this).val();
    if(ef == 'smtp_email'){
        $(".smtpemail").addClass('show');
        $(".smtpemail").removeClass('hide');
    }else{
        $(".smtpemail").addClass('hide');
        $(".smtpemail").removeClass('show');
    }
})
$("#store_access_select_all").click(function(){
    if($(this).prop("checked") == true){
        $('#store_access_tree').jstree(true).select_all();
    }else{
        $('#store_access_tree').jstree(true).deselect_all();
    }
});
$("#store_modify_select_all").click(function(){
    if($(this).prop("checked") == true){
        $('#store_modify_tree').jstree(true).select_all();
    }else{
        $('#store_modify_tree').jstree(true).deselect_all();
    }
});
$(".btncheckmod").click(function(){
    var store_access_module = $('#store_access_tree').jstree('get_selected');
    var store_modify_module = $('#store_modify_tree').jstree('get_selected');
    if(store_access_module == "" && store_modify_module == ""){
        $(".thumbnail.treebox").addClass("has-feedback has-error");
        $(".accmod").removeClass("hide");
        $(".accmod").addClass("show");
    }else{
        $(".thumbnail.treebox").removeClass("has-feedback has-error");
        $(".accmod").addClass("hide");
        $(".accmod").removeClass("show");
        if(store_access_module != ""){
            $("#form_store_access_module").val(store_access_module);
        }
        if(store_modify_module != ""){
            $("#form_store_modify_module").val(store_modify_module);
        }
        $('.loader').css('display', 'block');
        document.getElementById("frmstoremodule").submit();
    }
    return false;
})
$(".btncheckthm").click(function(){
    var chk = 0;
    var def = 0;
    $(".asstheme").each(function() {
        if($(this).prop('checked') == true){
            chk = 1;
        }
    });
    if(chk <= 0){
        swal('Error!','Please assign at least one Theme','error');
        return false;
    }else{
        $(".assthemerd").each(function() {
            if($(this).prop('checked') == true){
                def = 1;
            }
        });
        if(def <= 0){
            swal('Error!','Please set at least one Default Theme','error');
            return false;
        }
    }

    $('.loader').css('display', 'block');
    document.getElementById("frmstoretheme").submit();
});
$(".checkdbconn").click(function(){
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[databaseHost]');
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[databaseUser]');
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[databasePassword]');
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[databaseName]');
    var dbHost = "";
    var dbPort = "";
    var dbUser = "";
    var dbPass = "";
    var dbName = "";
    
    dbHost = $("#form_database_host").val();
    dbPort = $("#form_database_port").val();
    dbUser = $("#form_database_user").val();
    dbPass = $("#form_database_password").val();
    dbName = $("#form_database_name").val();

    if(dbHost != "" && dbUser != "" && dbPass != "" && dbName != ""){
        $(".db_loading").addClass('show');
        $(".db_loading").removeClass('hide');
        var site_url1 = $(location).attr('href');
        site_url1 = site_url.replace(/editstore/g, "..");
        site_url1 = strstr(site_url1,'..',true);
        site_url1 = site_url1+'checkdbconnection';
        $.ajax({
            url: site_url1,
            type: 'post',
            data: 'db_host='+dbHost+'&db_port='+dbPort+'&db_user='+dbUser+'&db_pass='+dbPass+'&db_name='+dbName,
            success: function(result) {
                $(".db_loading").addClass('hide');
                $(".db_loading").removeClass('show');
                if(result == 1){
                    swal("Success!", "Database connection successfully.", "success");
                }else{
                    swal('Failed!','Could not connect to database. Please check Database Information','error');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return false;
            }
        });
    }
});
$(".checkftpconn").click(function(){
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[ftpHost]');
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[ftpUsername]');
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[ftpPassword]');
    $("#frmstoreserver").bootstrapValidator('revalidateField','form[ftpFolder]');
    var ftpHost = "";
    var ftpPort = "";
    var ftpEncp = "";
    var ftpUser = "";
    var ftpPass = "";
    var ftpFldr = "";
    
    ftpHost = $("#form_ftp_host").val();
    ftpPort = $("#form_ftp_port").val();
    ftpEncp = $("#form_ftp_encryption").val();
    ftpUser = $("#form_ftp_username").val();
    ftpPass = $("#form_ftp_password").val();
    ftpFldr = $("#form_ftp_folder").val();

    if(ftpHost != "" && ftpUser != "" && ftpPass != "" && ftpFldr != ""){
        $(".ftp_loading").addClass('show');
        $(".ftp_loading").removeClass('hide');
        var site_url1 = $(location).attr('href');
        site_url1 = site_url.replace(/editstore/g, "..");
        site_url1 = strstr(site_url1,'..',true);
        site_url1 = site_url1+'checkftpconnection';
        $.ajax({
            url: site_url1,
            type: 'post',
            data: 'ftp_host='+ftpHost+'&ftp_port='+ftpPort+'&ftp_encp='+ftpEncp+'&ftp_user='+ftpUser+'&ftp_pass='+ftpPass+'&ftp_fldr='+ftpFldr,
            success: function(result) {
                $(".ftp_loading").addClass('hide');
                $(".ftp_loading").removeClass('show');
                if(result == 1){
                    swal("Success!", "FTP connection successfully.", "success");
                }else{
                    swal('Failed!','Could not connect to FTP. Please check FTP Information','error');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return false;
            }
        });
    }
});
/*$('#frmstoreprofile').submit(function() {
    if ($('#frmstoreprofile').bootstrapValidator('validate').has('.has-error').length === 0) {
        $('.loader').css('display', 'block');
    }
});*/
/*$('#frmstoreserver').submit(function() {
    $('.loader').css('display', 'block');
});*/
$('#frmstoremodule').submit(function() {
    $('.loader').css('display', 'block');
});
$('#frmstoretheme').submit(function() {
    $('.loader').css('display', 'block');
});
/*$("#form_language").change(function(){
    var lang = "";
    lang = $(this).val();
    if(lang != "" && lang > 0){
        $("#form_otrlanguage option[value='"+lang+"']").remove();
    }
})*/
$("#form_storeDomainName").blur(function(){
    var domname = $("#form_storeDomainName").val();
    var storurl = $("#form_storeUrl").val();
    var docroot = "/var/www/sites/";
    if(domname != ""){
        docroot = docroot+domname+"/web";
        $("#form_server_root").val(docroot);
        if($("#form_enable_ssl").prop("checked") == true){
        storurl = 'https://'+domname+'/';
        }else{
            storurl = 'http://'+domname+'/';
        }
        $("#form_storeUrl").val(storurl);
    }
});
$("#form_enable_ssl").bootstrapSwitch({
    'onSwitchChange': function(event, state){
        if(state == false){
            var domname = $("#form_storeDomainName").val();
            if(domname != ""){
                storurl = 'http://'+domname+'/';
                $("#form_storeUrl").val(storurl);
            }
        }else{
            var domname = $("#form_storeDomainName").val();
            if(domname != ""){
                storurl = 'https://'+domname+'/';
                $("#form_storeUrl").val(storurl);
            }
        }
        return false;
    },
});
$(".asstheme").bootstrapSwitch({
    'onSwitchChange': function(event, state){
        var id = $(this).data('id');
        if(state == true){
            $(".themedef"+id).removeClass('hide');
            $(".themedef"+id).addClass('show');
        }else{
            $(".defrad"+id).attr('checked' , false);
            $(".defrad"+id).bootstrapSwitch('state', true);
            $(".themedef"+id).removeClass('show');
            $(".themedef"+id).addClass('hide');
        }
        return false;
    },
});
$("#form_store_operation").change(function(){
    if($(this).val() != "" && $(this).val() == 'addondomain'){
        if($("#form_addonDomainName").val() == ""){
            swal('Error!','Please enter Addon Domain Name','error');
            $(this).val('');
        }
    }
})