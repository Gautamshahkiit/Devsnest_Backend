var express = require("express");
var app = express();

// respond with "hello world" when a GET request is made to the homepage
// app.get("/", function (req, res) {
//   res.send("hello world");
// });

const call = (req, res) => {
  res.send("GET request to the homepage");
};
// GET method route
app.get("/", call);
app.post("/", call);
app.put("/", call);
app.delete("/", call);

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});
