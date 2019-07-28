var site_url = $(location).attr('href');
var grid = new Datatable({"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>'});
var grid1 = new Datatable({"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>'});
$(document).ready(function () {
    if ($(".filter-cancel").length > 0) {
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
            delonerows();
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
                [10, 20, 50, 100, 150, 200, 250, 500, 1000],
                [10, 20, 50, 100, 150, 200, 250, 500, 1000] // change per page values here
            ],
            "pageLength": 10, // default record count per page
            "ajax": {
                "url": site_url + rootName, // ajax source
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
    if (allrows.length <= 0){
        swal(
            'Error!',
            'Please select at least one record to delete',
            'error'
        )
    }else{
        swal({
            title: 'Are you sure you want to delete this records?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'No, Cancel'
        }, function () {
            $('.loader').css('display', 'block');
            var conid = allrows.join(",");
            var url = "deletecontacts";
            var tablec = $(".table-container table").attr("id");
            $.ajax({
                type: "POST",
                url: site_url + url,
                cache: false,
                data: 'conid=' + conid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response > 0){ 
                        swal("Deleted!", "Selected records has been deleted", "success");
                        $("#" + tablec).DataTable().clear().draw();
                        $(".group-checkable-product").prop("checked", false);
                    } else{
                        swal("Error!", "There is some problam in delete records", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    }
                }
            });
            return false;
        });
    }
});
function delonerows(){
    $(".delonerows").click(function () {
        var conid = $(this).attr("data-id");
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
            var url = "deleteonecontact";
            var tablec = $(".table-container table").attr("id");
            $.ajax({
                type: "POST",
                url: site_url + url,
                cache: false,
                data: 'conid=' + conid,
                success: function (response)
                {
                    $(".loader").fadeOut("slow");
                    if (response > 0){
                        swal("Deleted!", "Selected record has been deleted.", "success");
                        $("#" + tablec).DataTable().clear().draw();
                        $(".group-checkable-product").prop("checked", false);
                    } else{
                        swal("Error!", "There is some problam in delete record.", "error");
                        $("#" + tablec).DataTable().clear().draw();
                    }
                }
            });
            return false;
        });
    })
}