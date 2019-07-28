$(document).ready(function() {
    if($("#datatable_ajax_contacts").length > 0){
         loadAjaxData("datatable_ajax_contacts","ajaxcontactsdata");
         $(".table-responsive").prev().closest('div').hide();
         $(".table-responsive").next(".row").css("float","right");
         $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
    }
    if($("#frmcontact").length > 0){
        $('#frmcontact').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[firstName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter First Name'
                        }
                    }
                },
                'form[lastName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Last Name'
                        }
                    }
                },
                'form[streetNumber]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Street Number'
                        },
                    },
                },
                'form[street]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Street Name'
                        },
                    },
                },
                'form[zipcode]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Zipcode'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\-\s.]+$/i,
                            message: 'Please enter valid Zipcode'
                        },
                    }
                },
                'form[city]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter City'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid City'
                        },
                    }
                },
                'form[country]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Country'
                        },
                        regexp: {
                            regexp: /^[a-z0-9\\\/\_\-\s.,:]+$/i,
                            message: 'Please enter valid Country'
                        },
                    }
                },
                'form[phoneNumber]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Phone Number'
                        },
                        regexp: {
                            regexp: /^[0-9+()\-\s.]+$/i,
                            message: 'Please enter valid Phone Number'
                        },
                    },
                },
                'form[email]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Email Address'
                        },
                        emailAddress: {
                            message: 'Please enter valid Email Address'
                        },
                    },
                },
                'form[profilePicture]': {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png',
                            maxSize: 2048 * 1024,
                            message: 'Please upload Picture with png, jpg, jpeg and max file size 2MB only'
                        }
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
var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
if ($(".datepicker").length > 0) {
    $('.datepicker').datepicker({         
        //locale: moment().local(),
        format: 'mm/dd/yyyy',
        endDate: '+0d',
        autoclose: true
    });
}
if ($(".fancybox").length > 0) {
    $(".fancybox").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });
}