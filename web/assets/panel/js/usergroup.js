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
    if($("#usergroup_form").size() > 0)
    {
        $( "#form_groupName" ).focus();
        var name = "";
        site_url = site_url.replace(/addusergroup/g, "..");
        site_url = site_url.replace(/editusergroup/g, "..");
        site_url1 = strstr(site_url,'..',true);
        var encId = $("#encId").val();
        $('#usergroup_form').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa',
                invalid: 'err',
                validating: 'fa'
            },
            fields: {
                'form[groupName]': {
                    validators: {
                        notEmpty: {
                            message: 'Please enter User Group Name'
                        },
                        stringLength: {
                            min: 3,
                            max: 150,
                            message: 'User Group Name between 3 to 150 character long'
                        },
                        regexp: {
                           regexp: /^[^-\s][a-z0-9\\\/\_\-\s&\'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜåÅæÆçÇðÐøØ¿¡ßē]+[^-\s]$/i,
                           message: 'Please enter valid User Group Name'
                        },
                        remote: {
                            type: 'POST',
                            url: site_url1+"checkunique",
                            data: function(validator, $field, value) {
                                if(encId){
                                    lngId = $("#language").val();
                                }else{
                                    lngId = validator.getFieldElements('language[]').val();
                                }
                                return {
                                    id: encId,
                                    lngId: lngId,
                                };
                            },
                            message: 'User Group Name is alreday exist',
                            delay: 500
                        },
                    }
                },
            },
            submitHandler:function(validator, form, submitButton){
            }
        });
    }
    if($("#datatable_ajax_usergroup").size() > 0){
        loadAjaxData("datatable_ajax_usergroup","ajaxusergroupdata");
        $(".table-responsive").prev().closest('div').hide();
        $(".table-responsive").next(".row").css("float","right");
        $(".table-responsive").next().find("div.col-md-8").addClass('col-md-12').removeClass('col-md-8');
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
$('body').on('success.form.bv', '#usergroup_form', function(event) {
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
    document.getElementById("usergroup_form").submit();
});