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
    //Load customer list
    if($("#datatable_ajax_retailers").size() > 0){
         loadAjaxData("datatable_ajax_retailers","ajaxretailerdata");
         $(".table-responsive").prev().closest('div').hide();
         $(".table-responsive").next(".row").css("float","right");
         $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
    }
    //Select2 box
    if($(".select2").length > 0)
    {
        $("#form_country").select2({
            placeholder: "Select Country",
            allowClear: true,
            width:'100%',
        });        
    }
    site_url = site_url.replace(/addretailer/g, "..");
    site_url = site_url.replace(/editretailer/g, "..");
    site_url1 = strstr(site_url,'..',true);
    if($("#frmretailer").size() > 0)
    {
        //Validation Retailer Information
    	$('#frmretailer').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[personName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Name'
                        }
                    }
                },
                'form[businessName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Business Name'
                        },
                    },
                },
                'form[personEmail]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Email Address'
                        },
                        emailAddress: {
                            message: 'Please enter valid Retailer Email Address'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1+"checkunique",
                            data: function(validator, $field, value) {
                               //Edit Time Id Send to Controller                            
                                return {
                                    id: encId,
                                }; 
                            },
                            message: 'Email Address is already exist',
                            delay: 500
                        },
                    },
                },
                'form[personPhone]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Phone'
                        },
                        regexp: {
                            regexp: /^[0-9+()\-\s.]+$/i,
                            message: 'Please enter valid Retailer Phone'
                        },
                    },
                },
                'form[businessPhone]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer Business Phone'
                        },
                        regexp: {
                            regexp: /^[0-9+()\-\s.]+$/i,
                            message: 'Please enter valid Retailer Business Phone'
                        },
                    },                
                },
                'form[businessFax]': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9+()\-\s.]+$/i,
                            message: 'Please enter valid Retailer Business Fax'
                        }
                    },                
                },
                'form[address1]': {
                    validators  : {
                        notEmpty: {
                            message: 'Please enter Retailer Address 1'
                        },
                    }
                },
                'form[city]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer City'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Retailer City'
                        },
                    }
                },
                'form[state]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Retailer State'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Retailer State'
                        },
                    }
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
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
});
$(".exporttocsv").click(function (e) {
    e.preventDefault();
    $('#frmdatatable').attr('action', site_url+'/exportcsv').submit();
});
$(".exporttopdf").click(function (e) {
    e.preventDefault();
    $('#frmdatatable').attr('action', site_url+'/exportpdf').submit();
});