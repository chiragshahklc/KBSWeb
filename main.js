var express = require("express");
var path = require("path");
var app = express();

app.use("/assets", express.static(__dirname + "/assets"));



app.get("/", function(req, resp){
    resp.sendFile("index.html", {root: path.join(__dirname, "/files")});
})

app.get(/^(.+)$/, function(req, resp) {
    console.log(req.params[0]);
    resp.sendFile(req.params[0] + ".html", {root: path.join(__dirname + "/files")});
})

app.post("/index3", function(req, resp){
    console.log("this is post method");
    resp.redirect("/index3");
})

app.listen(80, function(){
    console.log("Listening on Port 80.");
})