$(document).ready(function() {
  //Populate combobox with total number of questions
  //
  socket.emit("myName", $("#hidName").val());

  $("#basic-addonA").text("A").css("border", "1px solid #ccc");
  $("#basic-addonB").text("B").css("border", "1px solid #ccc");
  $("#basic-addonC").text("C").css("border", "1px solid #ccc");
  $("#basic-addonD").text("D").css("border", "1px solid #ccc");
});

var counter = 0;
$(".input-group-addon").click(spanBind);

function spanBind() {
  if (counter < 4) {
    counter++;
    console.log(counter);
    var x = this.id;
    $("#" + x + "").unbind("click");
    $(this).text(counter);
    this.style.borderColor = "red";
    this.style.borderWidth = "2px";

    if (counter == 4) {
      $("#btnSubmit").prop("disabled", false);
    }
  }
}

$("#btnClear").click(function() {
  $("#basic-addonA").text("A");
  $("#basic-addonA").css("border", "1px solid #ccc");
  $("#basic-addonA").unbind("click");
  $("#basic-addonA").bind("click", spanBind);
  $("#basic-addonB").text("B").css("border", "1px solid #ccc");
  $("#basic-addonB").unbind("click");
  $("#basic-addonB").bind("click", spanBind);
  $("#basic-addonC").text("C").css("border", "1px solid #ccc");
  $("#basic-addonC").unbind("click");
  $("#basic-addonC").bind("click", spanBind);
  $("#basic-addonD").text("D").css("border", "1px solid #ccc");
  $("#basic-addonD").unbind("click");
  $("#basic-addonD").bind("click", spanBind);
  $("#btnSubmit").prop("disabled", true);

  counter = 0;
  console.log(counter);
});

$("#btnSubmit").click(function() {
  var x = {};

  x[$("#basic-addonA").text()] = "A";
  x[$("#basic-addonB").text()] = "B";
  x[$("#basic-addonC").text()] = "C";
  x[$("#basic-addonD").text()] = "D";
  x.name = $("#hidName").val();
  $("#btnSubmit").attr("disabled", "true");
  $("#btnSubmit").hide();
  $("#btnClear").attr("disabled", "true");
  $("#btnClear").hide();
  // $("#divHide").attr("hidden", true);
  console.log(x);

  socket.emit("calculate", x);
});

socket.on("optionToPlayer", function(data) {
  console.log(data);
  $("#ansA").val(data[0].A).css("fontFamily", "gujFont");
  $("#ansB").val(data[0].B).css("fontFamily", "gujFont");
  $("#ansC").val(data[0].C).css("fontFamily", "gujFont");
  $("#ansD").val(data[0].D).css("fontFamily", "gujFont");
});

socket.on("sendquestion", function(data) {
  $("#ques").html(data[0].question);
  $("#ques").css("fontFamily", "gujFont");
  $("#ques").css({ "font-size": "5vh" });
});

socket.on("winnerToPublic", function(data) {
  $("#winnerList").html(data).attr("hidden", false);

});
