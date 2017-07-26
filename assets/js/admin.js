var btnQues = document.getElementById("btnLoadQues");
btnQues.addEventListener("click", LoadQues);

function LoadQues() {
  var txtQues = document.getElementById("txtQues");
  socket.emit("loadques", $(".selectpicker").val());
  socket.on("quesrecv", function(data) {
    console.log(data);
    var x = document.getElementById("txtQues");
    x.innerHTML = data[0].question;
    x.style.fontFamily = "gujFont";
    // x.style.fontSize = "30px";
    var xA = document.getElementById("ansA");
    xA.value = data[0].A;
    xA.style.fontFamily = "gujFont";
    // xA.style.fontSize = "15px";
    var xB = document.getElementById("ansB");
    xB.value = data[0].B;
    xB.style.fontFamily = "gujFont";
    // xB.style.fontSize = "15px";
    var xC = document.getElementById("ansC");
    xC.value = data[0].C;
    xC.style.fontFamily = "gujFont";
    // xC.style.fontSize = "15px";
    var xD = document.getElementById("ansD");
    xD.value = data[0].D;
    xD.style.fontFamily = "gujFont";
    // xD.style.fontSize = "15px";

    $("#finalAnswer")
      .attr("hidden", false)
      .html(
        "<li> <b>Ans: </b>" +
          data[0].ans1 +
          " " +
          data[0].ans2 +
          " " +
          data[0].ans3 +
          " " +
          data[0].ans4 +
          "</li>"
      );
  });
}

socket.on("sendMyName", function(data) {
  $("#connectedUsers").html(function(ind, oldtext) {
    return (
      oldtext +
      '<div class="input-group">' +
      '<span class="input-group-addon"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>' +
      '<input type="text" class="form-control" name="name" id="name" value="' +
      data +
      '" readonly />' +
      "</div>"
    );
  });
});

var winner = 0;
socket.on("calculate", function(data) {
  $("#answerCalculate").attr("hidden", false);
  $("#answerCalculate").html(function(ind, oldtext) {
    var answer =
      data["1"] + " " + data["2"] + " " + data["3"] + " " + data["4"];

    var sty = "";
    if ($("#finalAnswer").html().indexOf(answer) !== -1) {
      if (winner === 0) {
        console.log("This is winner");
        winner++;
        sty = ' style="color:green;"';
      }
    }
    var t = new Date();
    var time =
      t.getHours() +
      ":" +
      t.getMinutes() +
      ":" +
      t.getSeconds() +
      ":" +
      t.getMilliseconds();
    return (
      oldtext +
      "<li" +
      sty +
      ">Name<b>: " +
      data.name +
      "</b><br/>" +
      answer +
      "<br/>" +
      "Time: " +
      time +
      "</li><br/>"
    );
  });
});

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

// Applied globally on all textareas with the "autoExpand" class
$(document)
  .one("focus.autoExpand", "textarea.autoExpand", function() {
    var savedValue = this.value;
    this.value = "";
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  })
  .on("input.autoExpand", "textarea.autoExpand", function() {
    var minRows = this.getAttribute("data-min-rows") | 0,
      rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
    this.rows = minRows + rows;
  });

$("#btnSendAllQuestion").click(function() {
  socket.emit("sendQuestion", $(".selectpicker").val());
});

$("#btnSendPlayerOption").click(function() {
  socket.emit("optionToPlayer", $(".selectpicker").val());
});

$("#btnSendPublicOption").click(function() {
  socket.emit("optionToPublic", $(".selectpicker").val());
});

$("#btnSendAllAnswer").click(function() {
  socket.emit("ansToPublic", $(".selectpicker").val());
});

$("#btnShowAnswer").click(function() {
  socket.emit("winnerToPublic", $("#answerCalculate").html());
});
