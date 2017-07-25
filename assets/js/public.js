socket.on("sendquestion", function(data) {
  $("#ques").html(data[0].question);
  $("#ques").css("fontFamily","gujFont");
  $("#ques").css({ 'font-size': '5vh' });
});

$(document).ready(function() {
  //Populate combobox with total number of questions
  socket.emit("myName", $("#hidName").val());
});

socket.on("optionToPublic", function(data) {
  console.log(data);
  $("#ansA").val(data[0].A).css("fontFamily","gujFont");
  $("#ansB").val(data[0].B).css("fontFamily","gujFont");
  $("#ansC").val(data[0].C).css("fontFamily","gujFont");
  $("#ansD").val(data[0].D).css("fontFamily","gujFont");
});