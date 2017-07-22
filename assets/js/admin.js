var btnQues = document.getElementById("btnLoadQues");
btnQues.addEventListener("click", LoadQues);

function LoadQues() {
    console.log("Conncted from admin");
    var txtQues = document.getElementById("txtQues");
    socket.emit("loadques");
    socket.on("quesrecv", function(data){
        console.log(data);
        console.log(data[0]);

        var x = document.getElementById("txtQues");
        x.innerHTML = data[0].question;
        x.style.fontFamily = "SHREE-GUJ7-1120";
        x.style.fontSize = "30px";

        var xA = document.getElementById("ansA");
        xA.value = data[0].A;
        xA.style.fontFamily = "SHREE-GUJ7-1120";
        xA.style.fontSize = "15px";
        var xB = document.getElementById("ansB");
        xB.value = data[0].B;
        xB.style.fontFamily = "SHREE-GUJ7-1120";
        xB.style.fontSize = "15px";
        var xC = document.getElementById("ansC");
        xC.value = data[0].C;
        xC.style.fontFamily = "SHREE-GUJ7-1120";
        xC.style.fontSize = "15px";
        var xD = document.getElementById("ansD");
        xD.value = data[0].D;
        xD.style.fontFamily = "SHREE-GUJ7-1120";
        xD.style.fontSize = "15px";
    })
}
