$(document).ready(function() {
  //Populate combobox with total number of questions
  socket.emit("numOfQues");
  socket.on("numOfQuesReceived", function(data) {
    var x = data[0].count;
    for (i = 1; i <= x; i++) {
      $(".selectpicker").html(function(ind, oldtext) {
        return oldtext + "<option>" + i + "</option>";
      });
    }
  });

  //
  socket.emit("myName", $("#hidName").val());
});

var counter = 0;
$(".input-group-addon").click(function() {
  if (counter < 4) {
    counter++;

    $(this).text(counter);
    this.style.borderColor = "red";
    this.style.borderWidth = "2px";
  }
});
// var spans = document.getElementsByClassName("input-group-addon");
// // spans.addEventListener("click",spanClicked);
// for (var i = 0; i < spans.length; i++) {
//   spans[i].addEventListener("click", spanClicked);
// }

// function spanClicked() {
//   if (counter < 4) {
//     var x = document.getElementById(this.id);
//     counter++;
//     x.innerHTML = counter;
//     x.style.borderColor = "red";
//     x.style.borderWidth = "2px";
//   }
// }
