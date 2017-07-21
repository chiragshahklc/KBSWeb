var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

var urlEncodedparser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", function(req, resp) {
//   resp.sendFile("index.html", { root: path.join(__dirname, "/files") });
    console.log("This is ejs request");
    resp.render("index");
});

app.get(/^(.+)$/, function(req, resp) {
  console.log(req.params[0]);
  resp.sendFile(req.params[0] + ".html", {
    root: path.join(__dirname + "/files")
  });
});

app.post("/trial", urlEncodedparser, function(req, resp) {
  console.log(req.body);
  resp.render("trial", { data: req.body });
});

app.listen(process.env.PORT || 80, function() {
  console.log("Listening on Port 80.");
});
