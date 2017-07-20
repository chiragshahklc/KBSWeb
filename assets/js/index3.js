var spans = document.getElementsByClassName("input-group-addon");
// spans.addEventListener("click",spanClicked);
for (var i = 0; i < spans.length; i++) {
  spans[i].addEventListener("click", spanClicked);
}
var counter = 0;

function spanClicked() {
  if (counter < 4) {
    var x = document.getElementById(this.id);
    counter++;
    x.innerHTML = counter;
    x.style.backgroundColor = "grey";
  }
}

// $(".ct").click(function() {
//     debugger
// var SpanId='';
//   if (counter < 4 ) {
//     counter++;

//     var ClickText = $(this).text();
//     SpanId=this.id;
//     alert(SpanId);
//     alert($(SpanId).text());
//     $(SpanId).text();
//     alert(counter);
//   }
// });

// loop nu banavelu che ?

// taro avaj km nthi aavto?
