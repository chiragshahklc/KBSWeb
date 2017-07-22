var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var sessions = require("express-session");

var urlEncodedparser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(urlEncodedparser);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(sessions({ secret: "xxx" }));

var sess;

app.get("/", function(req, resp) {
  //   resp.sendFile("index.html", { root: path.join(__dirname, "/files") });

  sess = req.session;

  if (sess.name) {
    if (sess.name == "shadev2012") {
      resp.render("admin");
    } else if (sess.name == "public") {
      resp.render("public");
    } else {
      resp.render("player");
    }
  } else {
    resp.render("index");
  }
});

app.get(/^(.+)$/, function(req, resp) {
  // console.log(req.params[0]);
  var tmp = req.params[0];
  var x = tmp.replace("/", "");
  // console.log(x);
  // resp.sendFile(req.params[0] + ".html", {
  //   root: path.join(__dirname + "/files")
  // });
  resp.render(x, { data: req.body });
});

app.post("/login", urlEncodedparser, function(req, resp) {
  sess = req.session;
  sess.name = req.body.name;
  sess.pass = req.body.password;
  if (sess.name === "shadev2012" && sess.pass === "") {
    resp.render("admin", { data: req.body });
  } else if (sess.pass === "") {
    resp.render("player", { data: req.body });
  } else if (sess.name === "public") {
    resp.render("public", { data: req.body });
  }
  else
    {
      resp.render("index", { data: req.body });
    }
});

app.listen(process.env.PORT || 88, function() {
  console.log("Listening on Port 80.");
});
