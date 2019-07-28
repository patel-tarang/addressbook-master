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
var storemodule = "";
var mastermodule = "";
var OKtoCascadeUp = 0;
var OKtoCascadeDown = 0;
function CascadeUp(inNode, inCommand, nodeName) {
    if (OKtoCascadeUp < 1) {
        ParentNode = $('#'+nodeName).jstree('get_parent', inNode);
        $('#'+nodeName).jstree(inCommand, ParentNode);
    }
}
function CascadeDown(inNode, inCommand, nodeName) {
    if (OKtoCascadeDown < 1) {
        ChildrenNodes = jQuery.makeArray($('#'+nodeName).jstree('get_children_dom', inNode));
        $('#'+nodeName).jstree(inCommand, ChildrenNodes);
    }
}
$(document).ready(function(){
    if ($(".select2-multiple").length > 0){
        $(".store").select2({
            placeholder: "Select Stores",
            allowClear: true,
        });
    }
    if ($(".select2").length > 0){
        $(".usergroup").select2({
            placeholder: "Select User Group",
            allowClear: true,
        });
    }
    if($("#master_access_tree").size() > 0){
        master_access_id = $("#master_access_assign_module").val();
        if($("#hdn_master_module").val() != ""){
            mastermodule = $("#hdn_master_module").val();
            $("#master_access_tree").jstree({
                'plugins': ["checkbox"],
                'core' : {
                    'data' : JSON.parse(mastermodule),
                },
                'checkbox' : {       
                    three_state : false, // to avoid that fact that checking a node also check others
                    whole_node : false,  // to avoid checking the box just clicking the node 
                    cascade: ''
                },
            });
            // Access Selection Actions
            /*$('#master_access_tree').on("select_node.jstree", function (e, data) {
                $('#master_access_tree').jstree('open_node', data.node);
                OKtoCascadeDown++;
                CascadeUp(data.node, 'select_node', 'master_access_tree');
                OKtoCascadeDown--;
                CascadeDown(data.node, 'open_node' , 'master_access_tree');
                CascadeDown(data.node, 'select_node', 'master_access_tree');
            });
            // Access Deselection Actions
            $('#master_access_tree').on("deselect_node.jstree", function (e, data) {
                $('#master_access_tree').jstree('open_node', data.node); //need this to have it deselect hidden nodes
                CascadeDown(data.node, 'open_node', 'master_access_tree');
                CascadeDown(data.node, 'deselect_node', 'master_access_tree');
                CascadeDown(data.node, 'close_node', 'master_access_tree');
                $('#master_access_tree').jstree('close_node', data.node); //need this to have it deselect hidden nodes
            });*/
            $("#master_modify_tree").jstree({
                'plugins': [ "checkbox"],
                'core' : {
                    'data' : JSON.parse(mastermodule),
                },
                'checkbox' : {
                    three_state : false, // to avoid that fact that checking a node also check others
                    whole_node : false,  // to avoid checking the box just clicking the node 
                    cascade: ''
                },
            });
            // Modify Selection Actions
            /*$('#master_modify_tree').on("select_node.jstree", function (e, data) {
                $('#master_modify_tree').jstree('open_node', data.node);
                OKtoCascadeDown++;
                CascadeUp(data.node, 'select_node', 'master_modify_tree');
                OKtoCascadeDown--;
                CascadeDown(data.node, 'open_node' , 'master_modify_tree');
                CascadeDown(data.node, 'select_node', 'master_modify_tree');
            });

            // Modify Deselection Actions
            $('#master_modify_tree').on("deselect_node.jstree", function (e, data) {
                $('#master_modify_tree').jstree('open_node', data.node); //need this to have it deselect hidden nodes
                CascadeDown(data.node, 'open_node', 'master_modify_tree');
                CascadeDown(data.node, 'deselect_node', 'master_modify_tree');
                CascadeDown(data.node, 'close_node', 'master_modify_tree');
                $('#master_modify_tree').jstree('close_node', data.node); //need this to have it deselect hidden nodes
            });*/
            if($("#encId").size() > 0){
                var master_access_id = "";
                if($("#master_access_assign_module").val() != ""){
                    master_access_id = $("#master_access_assign_module").val();
                    master_access_id = master_access_id.split(",");
                    $("#master_access_tree").on("loaded.jstree", function(){
                        $.each(master_access_id,function(i,val){
                            $('#master_access_tree').jstree(true).select_node(val);
                            if(strstr(site_url,'details/') != false){
                                $('#master_access_tree').jstree(true).disable_node(val);
                            }
                        });
                    });
                }
                var master_modify_id = "";
                if($("#master_modify_assign_module").val() != ""){
                    master_modify_id = $("#master_modify_assign_module").val();
                    master_modify_id = master_modify_id.split(",");
                    $("#master_modify_tree").on("loaded.jstree", function(){
                        $.each(master_modify_id,function(i,val){
                            $('#master_modify_tree').jstree(true).select_node(val);
                            if(strstr(site_url,'details/') != false){
                                $('#master_modify_tree').jstree(true).disable_node(val);
                            }
                        });
                    });
                }
            }
        }
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
                    cascade: ''
                },
            });
            // Access Selection Actions
            /*$('#store_access_tree').on("select_node.jstree", function (e, data) {
                $('#store_access_tree').jstree('open_node', data.node);
                OKtoCascadeDown++;
                CascadeUp(data.node, 'select_node', 'store_access_tree');
                OKtoCascadeDown--;
                CascadeDown(data.node, 'open_node' , 'store_access_tree');
                CascadeDown(data.node, 'select_node', 'store_access_tree');
            });
            // Access Deselection Actions
            $('#store_access_tree').on("deselect_node.jstree", function (e, data) {
                $('#store_access_tree').jstree('open_node', data.node); //need this to have it deselect hidden nodes
                CascadeDown(data.node, 'open_node', 'store_access_tree');
                CascadeDown(data.node, 'deselect_node', 'store_access_tree');
                CascadeDown(data.node, 'close_node', 'store_access_tree');
                $('#store_access_tree').jstree('close_node', data.node); //need this to have it deselect hidden nodes
            });*/
            $("#store_modify_tree").jstree({
                'plugins': [ "checkbox"],
                'core' : {
                    'data' : JSON.parse(storemodule)
                },
                'checkbox' : {
                    three_state : false, // to avoid that fact that checking a node also check others
                    whole_node : false,  // to avoid checking the box just clicking the node 
                    cascade: ''
                },
            });
            // Access Selection Actions
            /*$('#store_modify_tree').on("select_node.jstree", function (e, data) {
                $('#store_modify_tree').jstree('open_node', data.node);
                OKtoCascadeDown++;
                CascadeUp(data.node, 'select_node', 'store_modify_tree');
                OKtoCascadeDown--;
                CascadeDown(data.node, 'open_node' , 'store_modify_tree');
                CascadeDown(data.node, 'select_node', 'store_modify_tree');
            });
            // Access Deselection Actions
            $('#store_modify_tree').on("deselect_node.jstree", function (e, data) {
                $('#store_modify_tree').jstree('open_node', data.node); //need this to have it deselect hidden nodes
                CascadeDown(data.node, 'open_node', 'store_modify_tree');
                CascadeDown(data.node, 'deselect_node', 'store_modify_tree');
                CascadeDown(data.node, 'close_node', 'store_modify_tree');
                $('#store_modify_tree').jstree('close_node', data.node); //need this to have it deselect hidden nodes
            });*/
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
    if($("#user_form").size() > 0)
    {
        $( "#form_name" ).focus();
        var name = "";
        site_url = site_url.replace(/adduser/g, "..");
        site_url = site_url.replace(/edituser/g, "..");
        site_url1 = strstr(site_url,'..',true);
        var encId = $("#encId").val();
        $('#user_form').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[name]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 150,
                            message: 'Name between 3 to 150 character long'
                        },
                        regexp: {
                           regexp: /^[^-\s][a-z0-9\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                           message: 'Please enter valid Name'
                        },
                    }
                },
                'form[email]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter User Email'
                        },
                        emailAddress: {
                            message: 'Please enter valid User Email'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1+"checkunique",
                            data: function(validator, $field, value) {
                                return {
                                    id: encId,
                                };
                            },
                            message: 'User Email is alreday exist',
                            delay: 500
                        },
                    }
                },
                'form[profilePic]': {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png',
                            maxSize: 2097152,   // 2048 * 1024
                            message: 'Please upload Profile Image with png, jpg, jpeg only and max 2MB size'
                        }
                    }
                },
                'usergroup': {
                    validators: {
                        notEmpty: {
                            message: 'Please select User Group'
                        },
                    }
                },
                'accessmodule[]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Access Module'
                        },
                    }
                },
                'modifymodule[]': {
                    validators: {
                        notEmpty: {
                            message: 'Please select Modify Module'
                        },
                    }
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        });
    }
    if($("#user_profile_form").size() > 0)
    {
        $( "#form_name" ).focus();
        var name = "";
        site_url = site_url.replace(/editprofile/g, "..");
        site_url1 = strstr(site_url,'..',true);
        var encId = $("#encId").val();
        $('#user_profile_form').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[name]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 150,
                            message: 'Name between 3 to 150 character long'
                        },
                        regexp: {
                           regexp: /^[^-\s][a-z0-9\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                           message: 'Please enter valid Name'
                        },
                    }
                },
                'form[email]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter User Email'
                        },
                        emailAddress: {
                            message: 'Please enter valid User Email'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1+"checkunique",
                            data: function(validator, $field, value) {
                                return {
                                    id: encId,
                                };
                            },
                            message: 'User Email is alreday exist',
                            delay: 500
                        },
                    }
                },
                'form[profilePic]': {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png',
                            maxSize: 2097152,   // 2048 * 1024
                            message: 'Please upload Profile Image with png, jpg, jpeg only and max 2MB size'
                        }
                    }
                }
            },
            submitHandler:function(validator, form, submitButton){
            }
        }).on('success.form.bv', function(e) {
            $('.loader').css('display', 'block');
        });
    }
    if($("#datatable_ajax_user").size() > 0){
        loadAjaxData("datatable_ajax_user","ajaxuserdata");
        $(".table-responsive").prev().closest('div').hide();
        $(".table-responsive").next(".row").css("float","right");
        $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
    }
});
$("#selectstore").bootstrapSwitch({
    'onSwitchChange': function(event, state){
        if(state == false){
            $(".showstore").addClass("show");
            $(".showstore").removeClass("hide");
        }else{
            $(".store").val('').trigger('change');
            $(".showstore").addClass("hide");
            $(".showstore").removeClass("show");
            
        }
        return false;
    },
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
$(".exporttocsv").click(function(e){
    e.preventDefault();
    $('#frmdatatable').attr('action', site_url+'/exportcsv').submit();

});
$("#usergroup").change(function(){
    var gid = "";
    var encId = "";
    gid = $(this).val();
    if(gid > 0 && gid != undefined){
        if($("#encId").val()){
            encId = $("#encId").val();
        }
        if(encId){
            site_url = site_url.replace(/edituser/g, "..");
            site_url = strstr(site_url,'..',true);
            site_url = site_url+'checkgroupaccess';
        }else{
            site_url = site_url+'/users/checkgroupaccess';
        }
        $.ajax({
            url: site_url,
            type: 'post',
            data: 'grpid='+gid,
            success: function(result) {
                if(result){
                    var allmodule = result.split("||");
                    var master_access_id = allmodule[0];
                    var master_modify_id = allmodule[1];
                    var store_access_id  = allmodule[2];
                    var store_modify_id  = allmodule[3];
                    master_access_id = master_access_id.split(",");
                    $.each(master_access_id,function(i,val){
                        $('#master_access_tree').jstree(true).select_node(val);
                    });
                    master_modify_id = master_modify_id.split(",");
                    $.each(master_modify_id,function(i,val){
                        $('#master_modify_tree').jstree(true).select_node(val);
                    });
                    store_access_id = store_access_id.split(",");
                    $.each(store_access_id,function(i,val){
                        $('#store_access_tree').jstree(true).select_node(val);
                    });
                    store_modify_id = store_modify_id.split(",");
                    $.each(store_modify_id,function(i,val){
                        $('#store_modify_tree').jstree(true).select_node(val);
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return false;
            }
        });
    }
    else{
        $('#master_access_tree').jstree(true).deselect_all();
        $('#master_modify_tree').jstree(true).deselect_all();
        $('#store_access_tree').jstree(true).deselect_all();
        $('#store_modify_tree').jstree(true).deselect_all();
    }
})
$("#master_access_select_all").click(function(){
    if($(this).prop("checked") == true){
        $('#master_access_tree').jstree(true).select_all();
    }else{
        $('#master_access_tree').jstree(true).deselect_all();
    }
});
$("#master_modify_select_all").click(function(){
    if($(this).prop("checked") == true){
        $('#master_modify_tree').jstree(true).select_all();
    }else{
        $('#master_modify_tree').jstree(true).deselect_all();
    }
});
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
$('body').on('success.form.bv', '#user_form', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var master_access_module = "";
    master_access_module = $('#master_access_tree').jstree('get_selected');
    if(master_access_module != ""){
        $("#form_master_access_module").val(master_access_module);
    }
    var master_modify_module = $('#master_modify_tree').jstree('get_selected');
    if(master_modify_module != ""){
        $("#form_master_modify_module").val(master_modify_module);
    }
    var store_access_module = $('#store_access_tree').jstree('get_selected');
    if(store_access_module != ""){
        $("#form_store_access_module").val(store_access_module);
    }
    var store_modify_module = $('#store_modify_tree').jstree('get_selected');
    if(store_modify_module != ""){
        $("#form_store_modify_module").val(store_modify_module);
    }
    $('.loader').css('display', 'block');
    document.getElementById("user_form").submit();
});