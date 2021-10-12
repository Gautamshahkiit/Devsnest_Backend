const express = require('express'); // it passes fxn def, so it needs to be called.
const app = express(); // now this needs to run on localhost, port required

// CRUD -> GET, POST, PUT, DELETE

const fxn = (req, res) => {
  // request and response
  res.send("Hello!");
};

app.get('/', fxn)

app.listen(5000);