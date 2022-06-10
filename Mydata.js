
$("#btnAdd").click(function () {
    $("#myModal").css("display", "block");

})

$(".close").click(function () {
    $("#myModal").css("display", "none");
})

$(".close-modal").click(function () {
    $("#myModal").hide();
})
$("#btnModalCancel").click(function () {
    $("#myModal").hide();
})

$("#edit").click(function () {
    $("#myModal2").css("display", "block");
})
$("#btnModalCancel2").click(function () {
    $("#myModal2").css("display", "none");
})





var arrEle;
function loadData() {
    $("#tblAct tbody").empty();
    var strResult = "";
    //Tự động tải dữ liệu khi tải trang 
    $.ajax(
        {
            url: "https://62874cbde9494df61b35fb64.mockapi.io/dataUser",
            type: "GET",
            dataType: "json",
            success: function (data) {
                arrEle = data;
                for (var i = 0; i < data.length; i++) {
                    strResult = strResult + "<tr> <th scope='row'>" + data[i].id + "</th>" +
                        "<td>" + data[i].name + "</td>" +
                        "<td>" + data[i].action + "</td>" +
                        "<td>" + data[i].createdAt + "</td>" +
                        "<td>" +
                        '<img class="actionIcon" src="2496733.png" onclick="deleteE(' + data[i].id + ')" alt="Delete" srcset=" ">' +
                        '<img class="actionIcon" id="edit" src="download.png" onclick="editE(' + data[i].id + ')" alt="Edit" srcset=" ">' +
                        "</td>" +
                        "</tr>";
                }
                console.log(strResult);
                $("#tblAct tbody").append(strResult);
            }
        }
    );
}

$("#btnModalAdd").click(function () {
    var data = {};
    data.createdAt = $("#txtCreatedAt").val();
    data.action = $("#txtAction").val();
    data.name = $("#txtName").val();

    $.ajax({
        url: "https://62874cbde9494df61b35fb64.mockapi.io/dataUser",
        type: "POST",
        data: data,
        success: function (result) {
            $("#myModal").css("display", "none");
            $("#tbody").empty();
            loadData();
        }
    })
    console.log(data);
});



//Fixed Function
function editE(id) {
    $("#myModal2").css("display", "block");
    for (var i = 0; i < arrEle.length; i++) {

        if (arrEle[i].id == id) {
            $("#txtId").val(arrEle[i].id);
            $("#txtCreatedAtUpdate").val(arrEle[i].createdAt);
            $("#txtActionUpdate").val(arrEle[i].action);
            $("#txtNameUpdate").val(arrEle[i].name);
            break;
        }
    }
    loadData();
}

$("#btnModalUpdate").click(function () {

    var dataUpdate = {};
    dataUpdate.createdAt = $("#txtCreatedAtUpdate").val();
    dataUpdate.action = $("#txtActionUpdate").val();
    dataUpdate.name = $("#txtNameUpdate").val();
    var id = $("#txtId").val();
    console.log(dataUpdate);

    $.ajax({
        url: "https://62874cbde9494df61b35fb64.mockapi.io/dataUser/" + id,
        type: "PUT",
        data: dataUpdate,
        success: function () {
            //dong form
            $("#myModal2").css("display", "none");
            loadData();
        }
    })

});

//Delete Function
function deleteE(id) {
    $.ajax({
        url: "https://62874cbde9494df61b35fb64.mockapi.io/dataUser/" + id,
        type: "DELETE",
        success: function (data) {
            console.log(data);
            loadData();
        }
    })
}
