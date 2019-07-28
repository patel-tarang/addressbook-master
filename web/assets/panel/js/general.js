var site_url = $(location).attr('href');
var grid = new Datatable({"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>'});
var grid1 = new Datatable({"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>'});
$(document).ready(function () {
    if ($(".filter-cancel").size() > 0) {
        $(window).load(function () {
            $(".filter-cancel").trigger("click");
        });
    }
    window.setTimeout(function () {
        $(".alert").fadeTo(1000, 0).slideUp(1000, function () {
            $(this).remove();
        });
    }, 2500);
});
function showMainImage() {
    if ($(".fancybox").size() > 0)
    {
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
}
function loadAjaxData(objId, rootName)
{
    //$(".loader").html('');
    $(".loader").css('display','none');
    grid.init({
        src: $("#" + objId),
        onSuccess: function (grid, response) {
            // grid:        grid object
            // response:    json object of server side ajax response
            // execute some code after table records loaded
        },
        onError: function (grid) {
            // execute some code on network or other general error
        },
        onDataLoad: function (grid) {
            // execute some code on ajax data load
            $("input[class=make-switch]").bootstrapSwitch();
            delonerows();
            updatestatus();
            showMainImage();
            installmodule();
            welcomestoremail();
        },
        loadingMessage: 'Loading...',
        dataTable: {
            "bStateSave": true,
            // save custom filters to the state
            "fnStateSaveParams": function (oSettings, sValue) {
                $("#" + objId + " tr.filter .form-control").each(function () {
                    sValue[$(this).attr('name')] = $(this).val();
                });
                return sValue;
            },
            // read the custom filters from saved state and populate the filter inputs
            "fnStateLoadParams": function (oSettings, oData) {
                //Load custom filters
                $("#" + objId + " tr.filter .form-control").each(function () {
                    var element = $(this);
                    if (oData[element.attr('name')]) {
                        element.val(oData[element.attr('name')]);
                    }
                });
                return true;
            },

            "lengthMenu": [
                [10, 20, 50, 100, 150, -1],
                [10, 20, 50, 100, 150, "All"] // change per page values here
            ],
            "pageLength": 20, // default record count per page
            "ajax": {
                "url": site_url + "/" + rootName, // ajax source
            },
            "ordering": false,
            "order": [
                [1, "asc"]
            ]// set first column as a default sort by asc
                    /*,"buttons": [
                     {
                     extend: 'collection',
                     text: 'Export',
                     buttons: [
                     'copy',
                     'excel',
                     'csv',
                     'pdf',
                     'print'
                     ]
                     }
                     ], dom: 'Bfrtip',*/
        }
    });
}
$(".delrows").click(function () {
    var allrows = [];
    $(".rowcheckbox:checked").each(function () {
        allrows.push($(this).val());
    });
    if (allrows.length <= 0)
    {
        swal(
            'Error!',
            'Please select at least one record to delete',
            'error'
        )
    }
    else
    {
        swal({
            title: 'Are you sure you want to delete this records?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, Cancel'
        }, function () {
            $('.loader').css('display', 'block');
            var delid = allrows.join(",");
            var url = "deleterows";
            var tablec = $(".table-container table").attr("id");
 
            if ($("#hdn_mode").size() > 0) {
                var mode = $("#hdn_mode").val();
            }
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'delid=' + delid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for delete action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0)
                        { 
                            swal("Deleted!", "Selected records has been deleted", "success");
                            $("#" + tablec).DataTable().clear().draw();
                            $(".group-checkable-product").prop("checked", false);
                        } else{
                            swal("Error!", "There is some problam in delete records", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    }
});
function delonerows()
{
    $(".delonerows").click(function () {
        var delid = $(this).attr("data-id");
        swal({
            title: 'Are you sure you want to delete this record?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, Cancel',
            closeOnConfirm: true,
            closeOnCancel: true
        }, function () {
            $('.loader').css('display', 'block');
            // var delid = $(".delonerows").attr("data-id");
            var url = "deleteonerows";
            var tablec = $(".table-container table").attr("id");

            if ($("#hdn_mode").size() > 0) {
                var mode = $("input[name='hdn_mode']").val();
            }
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'delid=' + delid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for delete action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0){
                            swal("Deleted!", "Selected record has been deleted.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                            $(".group-checkable-product").prop("checked", false);
                        } else{
                            swal("Error!", "There is some problam in delete record.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    })
}
function updatestatus()
{
    $(".status").bootstrapSwitch({
        'onSwitchChange': function (event, state) {
            $('.loader').css('display', 'block');
            var status = 0;
            var catid = $(this).attr("data-id");
            var url = "statusonerows";
            var tablec = $(".table-container table").attr("id");
            if ($("#hdn_mode").size() > 0) {
                var mode = $("#hdn_mode").val();
            }
            if ($($(this)).is(':checked')) {
                status = 1;
            } else {
                status = 0;
            }
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'updid=' + catid + "&upsts=" + status,
                success: function (response)
                { 
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for status update action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0) {
                            swal("Updated!", "Selected record has been updated.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                        } else{
                            swal("Error!", "There is some problam in update record.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        },
    });
}
function installmodule()
{
    $(".install_new").on("click", function () {
        var catid = $(this).attr("data-id");
        swal({
            title: 'Are you sure you want to install this module?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, install',
            cancelButtonText: 'No, Cancel'
        }, function () {
            $('.loader').css('display', 'block');
            var url = "install";
            var tablec = $(".table-container table").attr("id");
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'updid=' + catid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for install action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0)
                        {
                            swal("Installed!", "Selected module has been installed.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                        } else
                        {
                            swal("Error!", "There is some problam in install record.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    });
}
function welcomestoremail()
{
    $(".welcomemail").click(function () {
        $('.loader').css('display', 'block');
        var storeid = $(this).attr("data-id");
        var url = "welcometostoremail";
        $.ajax({
            type: "POST",
            url: site_url + "/" + url,
            cache: false,
            data: 'delid=' + storeid,
            success: function (response)
            {
                $(".loader").fadeOut("slow");
                if (response > 0){
                    swal("Success!", "Welcome email sent to retailer.", "success");
                } else{
                    swal("Error!", "There is some problam in sent email to retailer.", "error");
                }
            }
        });
        return false;
    })
}
function loadAjaxStoreData(objId, rootName)
{
    //$(".loader").html('');
    $(".loader").css('display','none');
    grid.init({
        src: $("#" + objId),
        onSuccess: function (grid, response) {
            // grid:        grid object
            // response:    json object of server side ajax response
            // execute some code after table records loaded
        },
        onError: function (grid) {
            // execute some code on network or other general error
        },
        onDataLoad: function (grid) {
            // execute some code on ajax data load
            $("input[class=make-switch]").bootstrapSwitch();
            delonestore();
            updatestorestatus();
            welcomestoremail();
            storegitpull();
            storedatabasesync();
        },
        loadingMessage: 'Loading...',
        dataTable: {
            "bStateSave": true,
            // save custom filters to the state
            "fnStateSaveParams": function (oSettings, sValue) {
                $("#" + objId + " tr.filter .form-control").each(function () {
                    sValue[$(this).attr('name')] = $(this).val();
                });
                return sValue;
            },
            // read the custom filters from saved state and populate the filter inputs
            "fnStateLoadParams": function (oSettings, oData) {
                //Load custom filters
                $("#" + objId + " tr.filter .form-control").each(function () {
                    var element = $(this);
                    if (oData[element.attr('name')]) {
                        element.val(oData[element.attr('name')]);
                    }
                });
                return true;
            },

            "lengthMenu": [
                [10, 20, 50, 100, 150, -1],
                [10, 20, 50, 100, 150, "All"] // change per page values here
            ],
            "pageLength": 20, // default record count per page
            "ajax": {
                "url": site_url + "/" + rootName, // ajax source
            },
            "ordering": false,
            "order": [
                [1, "asc"]
            ]
            // set first column as a default sort by asc
            /*,"buttons": [{
                extend: 'collection',
                text: 'Export',
                buttons: [
                    'copy',
                    'excel',
                    'csv',
                    'pdf',
                    'print'
                ]
            }], dom: 'Bfrtip',*/
        }
    });
}
function updatestorestatus()
{
    $(".status").bootstrapSwitch({
        'onSwitchChange': function (event, state) {
            var eleid = $(this).attr("data-id");
            var msgval = "";
            var prests = true;
            var status = 0;
            if(state == true){
                msgval = "Unsuspend";
                prests = false;
                status = 1;
            }else{
                msgval = "Suspend";
                prests = true;
                status = 0;
            }
            swal({
                title: 'Are you sure you want to '+msgval+' this store?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, '+msgval,
                cancelButtonText: 'No, Cancel'
            }, function (isConfirm) {
                if (isConfirm) {
                    $('.loader').css('display', 'block');
                    var url = "statusonerows";
                    var tablec = $(".table-container table").attr("id");
                    $.ajax({
                        type: "POST",
                        url: site_url + "/" + url,
                        cache: false,
                        data: 'updid=' + eleid + "&upsts=" + status,
                        success: function (response)
                        { 
                            $(".loader").fadeOut("slow");
                            if (response == 403) {
                                swal("403 Access Denied!", "You don't have permission for "+msgval+" store action.", "error");
                                $("#" + tablec).DataTable().clear().draw();
                            } else {
                                if (response > 0) {
                                    swal("Updated!", "Selected store has been updated.", "success");
                                    $("#" + tablec).DataTable().clear().draw();
                                } else{
                                    swal("Error!", "There is some problam in update store.", "error");
                                    $("#" + tablec).DataTable().clear().draw();
                                }
                            }
                        }
                    });
                    return false;    
                } else {
                    $("input[data-id="+eleid+"]").bootstrapSwitch('state',prests);
                    return false;
                }
            });
        },
    });
}
function delonestore()
{
    $(".delonerows").click(function () {
        var delid = $(this).attr("data-id");
        swal({
            title: 'Are you sure you want to delete this store? This may take a while depending on the size of the docroot and database.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, Cancel',
            closeOnConfirm: true,
            closeOnCancel: true
        }, function () {
            $('.loader').css('display', 'block');
            // var delid = $(".delonerows").attr("data-id");
            var url = "deleteonerows";
            var tablec = $(".table-container table").attr("id");

            if ($("#hdn_mode").size() > 0) {
                var mode = $("input[name='hdn_mode']").val();
            }
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'delid=' + delid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for execute delete store action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0){
                            swal("Deleted!", "Selected store has been deleted with database and docroot.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                            $(".group-checkable-product").prop("checked", false);
                        } else{
                            swal("Error!", "There is some problam in delete store.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    })
}
$(".delstores").click(function () {
    var allrows = [];
    $(".rowcheckbox:checked").each(function () {
        allrows.push($(this).val());
    });
    if (allrows.length <= 0){
        swal('Error!','Please select at least one store to delete','error');
    }else{
        swal({
            title: 'Are you sure you want to delete this store? This may take a while depending on the size of the docroot and database.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, Cancel'
        }, function () {
            $('.loader').css('display', 'block');
            var delid = allrows.join(",");
            var url = "deleterows";
            var tablec = $(".table-container table").attr("id");
            if ($("#hdn_mode").size() > 0) {
                var mode = $("#hdn_mode").val();
            }
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'delid=' + delid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for execute delete store action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0)
                        { 
                            swal("Deleted!", "Selected store has been deleted with database and docroot.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                            $(".group-checkable-product").prop("checked", false);
                        } else{
                            swal("Error!", "There is some problam in delete store.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    }
});
function storegitpull()
{
    $(".gitpull").on("click", function () {
        var storeid = $(this).attr("data-id");
        swal({
            title: 'Are you sure you want to pull latest code from Git Repository?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Git Pull',
            cancelButtonText: 'No, Cancel'
        }, function () {
            $('.loader').css('display', 'block');
            var url = "storegitpull";
            var tablec = $(".table-container table").attr("id");
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'storeid=' + storeid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for take latest from Git action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0){
                            swal("Success!", "Selected store has been take latest from Git successfully.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                        } else{
                            swal("Error!", "There is some problam in take latest from Git.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    });
}
function storedatabasesync()
{
    $(".syncdatabase").on("click", function () {
        var storeid = $(this).attr("data-id");
        swal({
            title: 'Are you sure you want to update latest database with Store?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update Database',
            cancelButtonText: 'No, Cancel'
        }, function () {
            $('.loader').css('display', 'block');
            var url = "storedatabasesync";
            var tablec = $(".table-container table").attr("id");
            $.ajax({
                type: "POST",
                url: site_url + "/" + url,
                cache: false,
                data: 'storeid=' + storeid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response == 403) {
                        swal("403 Access Denied!", "You don't have permission for update database action.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    } else {
                        if (response > 0)
                        {
                            swal("Success!", "Selected store database has been updated successfully.", "success");
                            $("#" + tablec).DataTable().clear().draw();
                        } else
                        {
                            swal("Error!", "There is some problam in update database from store.", "error");
                            $("#" + tablec).DataTable().clear().draw();
                        }
                    }
                }
            });
            return false;
        });
    });
}
