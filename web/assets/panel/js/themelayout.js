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
$(document).ready(function(){
    $("#frmconfiglayout ul.tabs-left li:first-child").addClass('active');
    $("#frmconfiglayout div.tab-content div.tab-pane:first-child").addClass('active');
    $("#frmconfiglayout ul.nav-tabs li:first-child").addClass('active');
    $("#frmconfiglayout div.tab-content div.tab-pane:first-child").addClass('active');
    /*if($("#pcolorskin").size() > 0){
        $("#pcolorskin ul.nav-tabs li:first-child").addClass('active');
        $("#pcolorskin div.tab-content div.tab-pane:first-child").addClass('active');
    }
    if($("#pfooter").size() > 0){
        $("#pfooter ul.nav-tabs li:first-child").addClass('active');
        $("#pfooter div.tab-content div.tab-pane:first-child").addClass('active');
    }*/
    $(".boxdiv").hide();
    $(".boximagediv").hide();
    $(".brand_headerimagediv").hide();
    $(".category_headerimagediv").hide();
    $(".product_headerimagediv").hide();
    $(".regl_headerimagediv").hide();
    $(".cms_headerimagediv").hide();
    $(".blog_headerimagediv").hide();
    $(".showmsrp").hide();
    if($('.wysihtml5').size() > 0){
        $('.wysihtml5').wysihtml5();
    }
    if($(".popovers").size() > 0){
        $(".popovers").popover();
    }
    if($('.colorpicker-rgba').size() > 0){
        $('.colorpicker-rgba').colorpicker({
            format: 'rgba'
        });
    }
    if($('.colorpicker-default').size() > 0){
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
    }
    if($(".fancybox").size() > 0){
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
});
function getkey(e){
    if (window.event)
    return window.event.keyCode;
    else if (e)
    return e.which;
    else
    return null;
}
function goodchars(e, goods){
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
$("#form_name").blur(function(){
    var name = $("#form_name").val();
    if(name != "")
    {
        var slug = slugify(name);
        $("#form_slug").val(slug);
        $("#form_metaTitle").val(slug);
        $("#form_metaKeyword").val(slug);
        $("#form_metaDescription").val(slug);
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
$(".exporttocsv").click(function(e){
    e.preventDefault();
    $('#frmdatatable').attr('action', site_url+'/exportcsv').submit();
});
//General Option - Layout Type
$(".boxbtn").click(function(){
    $(".fullwdtdiv").removeClass('show');
    $(".fullwdtdiv").addClass('hide');
    $(".boxdiv").removeClass('hide');
    $(".boxdiv").addClass('show');
    $(this).addClass('active');
    $(".fullwdtbtn").removeClass('active');
    $("#hdn_web_layout_option").val('boxed');
});
$(".fullwdtbtn").click(function(){
    $(".boxdiv").removeClass('show');
    $(".boxdiv").addClass('hide');
    $(".fullwdtdiv").removeClass('hide');
    $(".fullwdtdiv").addClass('show');
    $(this).addClass('active');
    $(".boxbtn").removeClass('active');
    $("#hdn_web_layout_option").val('fullwidth');
});
$("#site_background_option").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".boximagediv").removeClass('hide');
        $(".boximagediv").addClass('show');
        $(".boxcolordiv").removeClass('show');
        $(".boxcolordiv").addClass('hide');
    }else{
        $(".boximagediv").removeClass('show');
        $(".boximagediv").addClass('hide');
        $(".boxcolordiv").removeClass('hide');
        $(".boxcolordiv").addClass('show');
    }
    return false;
  },
});
//General Option - Header
$(".header-option").click(function(){
    $(".header-option img").each(function(){
        $(".header-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#hdn_header_option").val(colm);
    }
});
//General Option - Topbar
$("#show_topbar_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".shwtopbar").removeClass('show');
        $(".shwtopbar").addClass('hide');
    }else{
        $(".shwtopbar").removeClass('hide');
        $(".shwtopbar").addClass('show');
    }
    return false;
  },
});
$(".topbar-option").click(function(){
    $(".topbar-option img").each(function(){
        $(".topbar-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#hdn_topbar_option").val(colm);
    }
});
//General Option - Footer
$(".footer-col-btn").click(function(){
    $(".footer-col-btn").each(function(){
        $(".footer-col-btn").removeClass('active');
    })
    $(this).addClass('active');
    var colm = $(this).val();
    if(colm > 0){
        $("#hdn_footer_column").val(colm);
    }
});
//Page Option - Brand Page - Layout
$(".brandpage-layout-option").click(function(){
    $(".brandpage-layout-option img").each(function(){
        $(".brandpage-layout-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#brandpage_layout_option").val(colm);
    }
});
//Page Option - Brand Page - Header
$("#brandpage_show_header_title_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".brand_headertitstyle").removeClass('show');
        $(".brand_headertitstyle").addClass('hide');

    }else{
        $(".brand_headertitstyle").removeClass('hide');
        $(".brand_headertitstyle").addClass('show');
    }
    return false;
  },
});
$(".brandpage-header-title-option").click(function(){
    $(".brandpage-header-title-option img").each(function(){
        $(".brandpage-header-title-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#brandpage_header_title_option").val(colm);
    }
});
$("#brandpage_show_header_title_background_setting").bootstrapSwitch({
    'onSwitchChange': function(event, state){
        if(state == false){
            $(".brand_headerimagediv").removeClass('hide');
            $(".brand_headerimagediv").addClass('show');
            $(".brand_headercolordiv").removeClass('show');
            $(".brand_headercolordiv").addClass('hide');
        }else{
            $(".brand_headerimagediv").removeClass('show');
            $(".brand_headerimagediv").addClass('hide');
            $(".brand_headercolordiv").removeClass('hide');
            $(".brand_headercolordiv").addClass('show');
        }
        return false;
    },
});
//Page Option - Brand Page - Listbox
$(".brandpage-boxstyle-option").click(function(){
    $(".brandpage-boxstyle-option img").each(function(){
        $(".brandpage-boxstyle-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#brandpage_boxstyle_option").val(colm);
    }
});
$(".brandpage-liststyle-option").click(function(){
    $(".brandpage-liststyle-option img").each(function(){
        $(".brandpage-liststyle-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#brandpage_liststyle_option").val(colm);
        if(colm == "brand-liststyle-list"){
            $(".brand_list_item_per_raw").removeClass('show');
            $(".brand_list_item_per_raw").addClass('hide');
            $(".brand_category_box_syle").removeClass('show');
            $(".brand_category_box_syle").addClass('hide');
        }else{
            $(".brand_category_box_syle").removeClass('hide');
            $(".brand_category_box_syle").addClass('show');
            $(".brand_list_item_per_raw").removeClass('hide');
            $(".brand_list_item_per_raw").addClass('show');
        }
    }
});
//Page Option - Category Page - Layout
$(".categorypage-layout-option").click(function(){
    $(".categorypage-layout-option img").each(function(){
        $(".categorypage-layout-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#categorypage_layout_option").val(colm);
    }
});
//Page Option - Category Page - Header
$("#categorypage_show_header_title_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".category_headertitstyle").removeClass('show');
        $(".category_headertitstyle").addClass('hide');
    }else{
        $(".category_headertitstyle").removeClass('hide');
        $(".category_headertitstyle").addClass('show');
    }
    return false;
  },
});
$(".categorypage-header-title-option").click(function(){
    $(".categorypage-header-title-option img").each(function(){
        $(".categorypage-header-title-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#categorypage_header_title_option").val(colm);
    }
});
$("#categorypage_show_header_title_background_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".category_headerimagediv").removeClass('hide');
        $(".category_headerimagediv").addClass('show');
        $(".category_headercolordiv").removeClass('show');
        $(".category_headercolordiv").addClass('hide');
    }else{
        $(".category_headerimagediv").removeClass('show');
        $(".category_headerimagediv").addClass('hide');
        $(".category_headercolordiv").removeClass('hide');
        $(".category_headercolordiv").addClass('show');
    }
    return false;
  },
});
//Page Option - Category Page - Listbox
//For Category List Setting
$("#categorypage_show_sub_category_option").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".category_list_style").removeClass('show');
        $(".category_list_style").addClass('hide');
        $(".category_box_syle").removeClass('show');
        $(".category_box_syle").addClass('hide');
        $(".list_item_per_page").removeClass('show');
        $(".list_item_per_page").addClass('hide');
        $(".list_item_per_raw").removeClass('show');
        $(".list_item_per_raw").addClass('hide');
    }else{
        $(".category_box_syle").removeClass('hide');
        $(".category_box_syle").addClass('show');
        $(".category_list_style").removeClass('hide');
        $(".category_list_style").addClass('show');
        $(".list_item_per_page").removeClass('hide');
        $(".list_item_per_page").addClass('show');
        $(".list_item_per_raw").removeClass('hide');
        $(".list_item_per_raw").addClass('show');
    }
    return false;
  },
});
$(".categorypage-liststyle-option").click(function(){
    $(".categorypage-liststyle-option img").each(function(){
        $(".categorypage-liststyle-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#categorypage_liststyle_option").val(colm);
        if(colm == "category-liststyle-list"){
            $(".list_item_per_raw").removeClass('show');
            $(".list_item_per_raw").addClass('hide');
            $(".category_box_syle").removeClass('show');
            $(".category_box_syle").addClass('hide');
        }else{
            $(".list_item_per_raw").removeClass('hide');
            $(".list_item_per_raw").addClass('show');
            $(".category_box_syle").removeClass('hide');
            $(".category_box_syle").addClass('show');
        }
    }
});
$(".categorypage-boxstyle-option").click(function(){
    $(".categorypage-boxstyle-option img").each(function(){
        $(".categorypage-boxstyle-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#categorypage_boxstyle_option").val(colm);
    }
});
//For Product List Setting
$("#categorypage_show_product_option").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".product_list_style").removeClass('show');
        $(".product_list_style").addClass('hide');
        $(".product_box_syle").removeClass('show');
        $(".product_box_syle").addClass('hide');
        $(".product_list_item_per_page").removeClass('show');
        $(".product_list_item_per_page").addClass('hide');
        $(".product_list_item_per_raw").removeClass('show');
        $(".product_list_item_per_raw").addClass('hide');
    }else{
        $(".product_list_style").removeClass('hide');
        $(".product_list_style").addClass('show');
        $(".product_box_syle").removeClass('hide');
        $(".product_box_syle").addClass('show');
        $(".product_list_item_per_page").removeClass('hide');
        $(".product_list_item_per_page").addClass('show');
        $(".product_list_item_per_raw").removeClass('hide');
        $(".product_list_item_per_raw").addClass('show');
    }
    return false;
  },
});
$(".product-liststyle-option").click(function(){
    $(".product-liststyle-option img").each(function(){
        $(".product-liststyle-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#product_liststyle_option").val(colm);
        if(colm == "product-liststyle-list"){
            $(".product_list_item_per_raw").removeClass('show');
            $(".product_list_item_per_raw").addClass('hide');
            $(".product_box_syle").removeClass('show');
            $(".product_box_syle").addClass('hide');
        }else{
            $(".product_list_item_per_raw").removeClass('hide');
            $(".product_list_item_per_raw").addClass('show');
            $(".product_box_syle").removeClass('hide');
            $(".product_box_syle").addClass('show');
        }
    }
});
$(".product-boxstyle-option").click(function(){
    $(".product-boxstyle-option img").each(function(){
        $(".product-boxstyle-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#product_boxstyle_option").val(colm);
    }
});
//Page Option - Product Details Page - Layout
$(".product-layout-option").click(function(){
    $(".product-layout-option img").each(function(){
        $(".product-layout-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#product_layout_option").val(colm);
    }
});
$("#product_show_header_title_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".product_headertitstyle").removeClass('show');
        $(".product_headertitstyle").addClass('hide');
    }else{
        $(".product_headertitstyle").removeClass('hide');
        $(".product_headertitstyle").addClass('show');
    }
    return false;
  },
});
$(".product-header-title-option").click(function(){
    $(".product-header-title-option img").each(function(){
        $(".product-header-title-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#product_header_title_option").val(colm);
    }
});
$("#product_show_header_title_background_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".product_headerimagediv").removeClass('hide');
        $(".product_headerimagediv").addClass('show');
        $(".product_headercolordiv").removeClass('show');
        $(".product_headercolordiv").addClass('hide');
    }else{
        $(".product_headerimagediv").removeClass('show');
        $(".product_headerimagediv").addClass('hide');
        $(".product_headercolordiv").removeClass('hide');
        $(".product_headercolordiv").addClass('show');
    }
    return false;
  },
});
$(".product-gallery-option").click(function(){
    $(".product-gallery-option img").each(function(){
        $(".product-gallery-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#product_detail_gallery_option").val(colm);
    }
});
//Page Option - Registration Page - Header
$("#regl_show_header_title_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".regl_headertitstyle").removeClass('show');
        $(".regl_headertitstyle").addClass('hide');
    }else{
        $(".regl_headertitstyle").removeClass('hide');
        $(".regl_headertitstyle").addClass('show');
    }
    return false;
  },
});
$(".regl-header-title-option").click(function(){
    $(".regl-header-title-option img").each(function(){
        $(".regl-header-title-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#regl_header_title_option").val(colm);
    }
});
$("#regl_show_header_title_background_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".regl_headerimagediv").removeClass('hide');
        $(".regl_headerimagediv").addClass('show');
        $(".regl_headercolordiv").removeClass('show');
        $(".regl_headercolordiv").addClass('hide');
    }else{
        $(".regl_headerimagediv").removeClass('show');
        $(".regl_headerimagediv").addClass('hide');
        $(".regl_headercolordiv").removeClass('hide');
        $(".regl_headercolordiv").addClass('show');
    }
    return false;
  },
});
//Page Option - CMS Page - Header
$("#cmspage_show_header_title_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".cms_headertitstyle").removeClass('show');
        $(".cms_headertitstyle").addClass('hide');
    }else{
        $(".cms_headertitstyle").removeClass('hide');
        $(".cms_headertitstyle").addClass('show');
    }
    return false;
  },
});
$(".cmspage-header-title-option").click(function(){
    $(".cmspage-header-title-option img").each(function(){
        $(".cmspage-header-title-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#cmspage_header_title_option").val(colm);
    }
});
$("#cmspage_show_header_title_background_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".cms_headerimagediv").removeClass('hide');
        $(".cms_headerimagediv").addClass('show');
        $(".cms_headercolordiv").removeClass('show');
        $(".cms_headercolordiv").addClass('hide');
    }else{
        $(".cms_headerimagediv").removeClass('show');
        $(".cms_headerimagediv").addClass('hide');
        $(".cms_headercolordiv").removeClass('hide');
        $(".cms_headercolordiv").addClass('show');
    }
    return false;
  },
});
$(".blog-layout-option").click(function(){
    $(".blog-layout-option img").each(function(){
        $(".blog-layout-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#blog_layout_option").val(colm);
    }
});
//Page Option - Blog Page - Header
$("#blog_show_header_title_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".blog_headertitstyle").removeClass('show');
        $(".blog_headertitstyle").addClass('hide');
    }else{
        $(".blog_headertitstyle").removeClass('hide');
        $(".blog_headertitstyle").addClass('show');
    }
    return false;
  },
});
$(".blog-header-title-option").click(function(){
    $(".blog-header-title-option img").each(function(){
        $(".blog-header-title-option img").removeClass('active');
    })
    $(this).find('img').addClass('active');
    var colm = $(this).data('name');
    if(colm != ""){
        $("#blog_header_title_option").val(colm);
    }
});
$("#blog_show_header_title_background_setting").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".blog_headerimagediv").removeClass('hide');
        $(".blog_headerimagediv").addClass('show');
        $(".blog_headercolordiv").removeClass('show');
        $(".blog_headercolordiv").addClass('hide');
    }else{
        $(".blog_headerimagediv").removeClass('show');
        $(".blog_headerimagediv").addClass('hide');
        $(".blog_headercolordiv").removeClass('hide');
        $(".blog_headercolordiv").addClass('show');
    }
    return false;
  },
});
$(".productimagestyletab").click(function(){
    var prdlayopt = $("#product_layout_option").val();
    if(prdlayopt > 0 && prdlayopt == 8){
        $(".prdimgstylemsg").removeClass("hide");
        $(".prdimgstylemsg").addClass('show');
        $(".prdimgstyleopt").removeClass("show");
        $(".prdimgstyleopt").addClass("hide");
    }else{
        $(".prdimgstylemsg").removeClass("show");
        $(".prdimgstylemsg").addClass('hide');
        $(".prdimgstyleopt").removeClass("hide");
        $(".prdimgstyleopt").addClass("show");
    }
})
$("#product_show_msrp_option").bootstrapSwitch({
  'onSwitchChange': function(event, state){
    if(state == false){
        $(".hidemsrp").addClass('show');
        $(".hidemsrp").removeClass('hide');
        $(".showmsrp").addClass('hide');
        $(".showmsrp").removeClass('show');
    }else{
        $(".showmsrp").addClass('show');
        $(".showmsrp").removeClass('hide');
        $(".hidemsrp").addClass('hide');
        $(".hidemsrp").removeClass('show');
    }
    return false;
  },
});