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
$(".input-group-addon").click(function() {
  if (counter < 4) {
    counter++;

    $(this).unbind("click");
    $(this).text(counter);
    this.style.borderColor = "red";
    this.style.borderWidth = "2px";

    if (counter == 4) {
      $("#btnSubmit").prop("disabled", false);
    }
  }
});

$("#btnClear").click(function() {
  $("#basic-addonA").text("A");
  $("#basic-addonA").css("border", "1px solid #ccc");
  $("#basic-addonB").text("B").css("border", "1px solid #ccc");
  $("#basic-addonC").text("C").css("border", "1px solid #ccc");
  $("#basic-addonD").text("D").css("border", "1px solid #ccc");
  $("#btnSubmit").prop("disabled", true);
  counter = 0;
});

$("#btnSubmit").click(function() {
  var x = {};

  x[$("#basic-addonA").text()] = "A";
  x[$("#basic-addonB").text()] = "B";
  x[$("#basic-addonC").text()] = "C";
  x[$("#basic-addonD").text()] = "D";
  x.name = $("#hidName").val();
  $("#btnSubmit").attr("disabled", "true");
  $("#btnClear").attr("disabled", "true");
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


