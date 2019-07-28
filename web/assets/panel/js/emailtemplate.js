var site_url = $(location).attr('href');
function strstr(haystack, needle, bool) {
    // Finds first occurrence of a string within another
    //
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strstr    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strstr(‘Kevin van Zonneveld’, ‘van’);
    // *     returns 1: ‘van Zonneveld’    // *     example 2: strstr(‘Kevin van Zonneveld’, ‘van’, true);
    // *     returns 2: ‘Kevin ‘
    // *     example 3: strstr(‘name@example.com’, ‘@’);
    // *     returns 3: ‘@example.com’
    // *     example 4: strstr(‘name@example.com’, ‘@’, true);    // *     returns 4: ‘name’
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
$(window).load(function() {
    $(".loader").fadeOut("slow");
});
$(document).ready(function() {

	 if($(".select2-multiple").length > 0)
    {
        $("#language").select2({
            placeholder: "Select Language",
        });
		$("#form_lang").select2({
            placeholder: "Select Language",
        });

    }
	 if($(".select2").length > 0)
    {
        $("#language").select2({
            placeholder: "Select Language",
        });
		$("#form_lang").select2({
            placeholder: "Select Language",
        });

    }
	 if($('.wysihtml5').size() > 0)
    {
        $('.wysihtml5').wysihtml5();
    }
	if($(".popovers").size() > 0)
    {
        $(".popovers").popover();
    }
	 if($("#emailtemplate_add_edit_form").size() > 0)
    {
    	$( "#language" ).focus();
    	$("#form_lang").focus();
        var lngId = "";
        site_url = site_url.replace(/addemailtemplate/g, "..");
        site_url = site_url.replace(/editemailtemplate/g, "..");
        site_url1 = strstr(site_url,'..',true);
        var encId = $("#encId").val();
		$('#emailtemplate_add_edit_form').bootstrapValidator({
			feedbackIcons: {
				valid: 'fa',
				invalid: 'err',
				validating: 'fa'
			},
			fields: {
				'language[]': {
					validators: {
						notEmpty: {
							message: 'Please select Language'
						}
					}
				},
				'form[name]': {
					validators: {
						notEmpty: {
							message: 'Please enter Email Template Name'
						},
						stringLength: {
							min: 2,
							max: 255,
							message: 'Email Template Name must be at least 2 and max 255 characters'
						}
					}
				},
				'form[subject]': {
					validators: {
						notEmpty: {
							message: 'Please enter Subject'
						},
						stringLength: {
							min: 2,
							max: 255,
							message: 'Subject must be at least 2 and max 255 characters'
						}
					}
				},
				'form[slug]': {
					validators: {
						notEmpty: {
							message: 'Please enter Slug'
						},
						stringLength: {
								min: 2,
								max:50,
								message: 'Slug must be at least 2 and max 50 character'
							}
							,
						remote: {
								type: 'POST',
								url: site_url1+"checkunique",
								data: function(validator, $field, value) {
									if(encId){
										lngId = $("#form_lang").val();
									}else{
										lngId = validator.getFieldElements('language[]').val();
									}
									return {
										id: encId,
										lngId: lngId,
									};
								},
								message: 'Slug is already exist',
								delay: 500
						},
					}

				},
				'form[template]': {
					validators: {
						notEmpty: {
							message: 'Please enter Email Template'
						},
						stringLength: {
								min: 2,
								message: 'Email Template must be at least 2 characters'
							}
					}
				},
			},
			submitHandler:function(validator, form, submitButton){
			}
		});
	}
    //TableDatatablesAjax.init();
	loadAjaxData("datatable_ajax_emailtemplate","ajaxemailtemplatedata");
    $(".table-responsive").prev().closest('div').hide();
    $(".table-responsive").next(".row").css("float","right");
    $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
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
$("#form_name").change(function(){
    var name = $("#form_name").val();
    if(name != "")
    {
        var slug = slugify(name);
        $("#form_slug").val(slug);
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