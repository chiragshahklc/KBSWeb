var express = require("express");
var path = require("path");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var bodyParser = require("body-parser");
var sessions = require("express-session");
var connection = require("./db");

var urlEncodedparser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(urlEncodedparser);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(sessions({ secret: "xxx" }));

var sess;
var listSocket = {
  name: "",
  id: ""
};
var persons = [];

var socketCount = 0;
io.sockets.on("connection", function(socket) {
  //TMP
  socketCount++;
  persons.push({ name: "", id: socket.id });

  //This is for requesting question from admin
  socket.on("loadques", function(id) {
    connection.getConnection(function(err, tmpCon) {
      if (err) {
        console.log(err);
        tmpCon.release();
      } else {
        connection.query("select * from fff where id=" + id, function(
          err,
          rows,
          cols
        ) {
          if (err) {
            throw err;
          } else {
            socket.emit("quesrecv", rows);
          }
          tmpCon.release();
        });
      }
    });
  });

  //
  socket.on("myName", function(data) {
    persons[persons.findIndex(x => x.id === socket.id)].name = data;
    //socket.join(data);
    if (data !== "shadev2012" && data !== "public") {
      socket.join("player");
      socket.in("shadev2012").emit("sendMyName", data);
    } else if (data == "shadev2012") {
      socket.join("shadev2012");
    } else {
      socket.join("public");
    }
  });

  //This is for requesting numberOfQuestion from admin
  socket.on("numOfQues", function() {
    connection.getConnection(function(err, tmpCon) {
      if (err) {
        console.log(err);
        tmpCon.release();
      } else {
        connection.query("select count(*) as count from fff", function(
          err,
          rows,
          cols
        ) {
          if (err) {
            throw err;
          } else {
            socket.emit("numOfQuesReceived", rows);
          }
          tmpCon.release();
        });
      }
    });
  });

  socket.on("sendQuestion", function(data) {
    connection.getConnection(function(err, tmpCon) {
      if (err) {
        console.log(err);
        tmpCon.release();
      } else {
        connection.query("select * from fff where id = " + data, function(
          err,
          rows,
          cols
        ) {
          if (err) {
            throw err;
          } else {
            socket.in("player").emit("sendquestion", rows);
            socket.in("public").emit("sendquestion", rows);
          }
          tmpCon.release();
        });
      }
    });
  });

  socket.on("optionToPlayer", function(data) {
    connection.getConnection(function(err, tmpCon) {
      if (err) {
        console.log(err);
        tmpCon.release();
      } else {
        connection.query("select * from fff where id = " + data, function(
          err,
          rows,
          cols
        ) {
          if (err) {
            throw err;
          } else {
            socket.in("player").emit("optionToPlayer", rows);
          }
          tmpCon.release();
        });
      }
    });
  });

  socket.on("optionToPublic", function(data) {
    connection.getConnection(function(err, tmpCon) {
      if (err) {
        console.log(err);
        tmpCon.release();
      } else {
        connection.query("select * from fff where id = " + data, function(
          err,
          rows,
          cols
        ) {
          if (err) {
            throw err;
          } else {
            socket.in("public").emit("optionToPublic", rows);
          }
          tmpCon.release();
        });
      }
    });
  });

  socket.on("ansToPublic", function(data) {
    connection.getConnection(function(err, tmpCon) {
      if (err) {
        console.log(err);
        tmpCon.release();
      } else {
        connection.query("select * from fff where id = " + data, function(
          err,
          rows,
          cols
        ) {
          if (err) {
            throw err;
          } else {
            socket.in("public").emit("ansToPublic", rows);
          }
          tmpCon.release();
        });
      }
    });
  });

  socket.on("calculate", function(data) {
    socket.in("shadev2012").emit("calculate", data);
  });

  socket.on("winnerToPublic", function(data) {
    socket.in("public").emit("winnerToPublic", data);
    socket.in("player").emit("winnerToPublic", data);
  });
});

app.get("/favicon.ico", function(req, res) {
  res.status(204);
});

app.get("/", function(req, resp) {
  //   resp.sendFile("index.html", { root: path.join(__dirname, "/files") });

  sess = req.session;

  if (sess.name) {
    if (sess.name == "shadev2012") {
      resp.redirect("admin");
    } else if (sess.name == "public") {
      resp.redirect("public");
    } else {
      resp.redirect("player");
    }
  } else {
    resp.render("index");
  }
});

app.get(/^(.+)$/, function(req, resp) {
  // console.log(req.params[0]);
  var tmp = req.params[0];
  var x = tmp.replace("/", "");
  sess = req.session;
  // socket.join(sess.name);
  // io.sockets.in("shadev2012").emit(sess.name);
  // console.log(x);
  // resp.sendFile(req.params[0] + ".html", {
  //   root: path.join(__dirname + "/files")
  // });
  resp.render(x, { data: sess }, function(err, html) {
    if (err) {
      resp.redirect("/");
    } else {
      resp.send(html);
    }
  });
});

app.post("/login", urlEncodedparser, function(req, resp) {
  sess = req.session;
  sess.name = req.body.name;
  sess.pass = req.body.password;
  if (sess.name === "shadev2012" && sess.pass === "") {
    resp.redirect("admin");
  } else if (sess.pass === "xx") {
    resp.redirect("player");
  } else if (sess.name === "public") {
    resp.redirect("public");
  } else {
    resp.redirect("/");
  }
});

// var listener = app.listen(process.env.PORT || 80, function() {
//   console.log("Express listening on Port " + listener.address().port);
// })

var socketListener = server.listen(process.env.PORT || 80, function() {
  console.log("Socket.IO listening on Port " + socketListener.address().port);
});
