socket.on("sendquestion", function(data) {
  $("#ques").html(data[0].question);
  $("#ques").css("fontFamily", "gujFont");
  $("#ques").css({ "font-size": "5vh" });
});

$(document).ready(function() {
  //Populate combobox with total number of questions
  socket.emit("myName", $("#hidName").val());
});

socket.on("optionToPublic", function(data) {
  console.log(data);
  $("#ansA").val(data[0].A).css("fontFamily", "gujFont");
  $("#ansB").val(data[0].B).css("fontFamily", "gujFont");
  $("#ansC").val(data[0].C).css("fontFamily", "gujFont");
  $("#ansD").val(data[0].D).css("fontFamily", "gujFont");
});

socket.on("ansToPublic", function(data) {
  console.log(data);
  console.log(data[0][data[0].ans1]);
  $("#ans1").val(data[0][data[0].ans1]).css("fontFamily", "gujFont");
  $("#ans2").val(data[0][data[0].ans2]).css("fontFamily", "gujFont");
  $("#ans3").val(data[0][data[0].ans3]).css("fontFamily", "gujFont");
  $("#ans4").val(data[0][data[0].ans4]).css("fontFamily", "gujFont");
  $("#divOPT").attr("hidden", true);
  $("#divANS").attr("hidden", false);
});

socket.on("winnerToPublic", function(data) {
  console.log("i m here");
  $("#winnerList").html(data).attr("hidden", false);

});
