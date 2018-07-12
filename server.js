const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 80;

// Serve any static files
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/public", "index.html"));
});

var todo_list = {
  as4trsfd: {
    title: "Wake up",
    complete: true
  },
  k5icmwof: {
    title: "Make a todo list",
    complete: true
  },
  ka6mgjaf: {
    title: "Deploy to Structure",
    complete: true
  },
  aysgc5d5: {
    title: "Sleep",
    complete: false
  },
  kcos6ktov: {
    title: "Repeat!",
    complete: false
  }
};

app.get("/list", function(req, res) {
  res.json(todo_list);
});

app.post("/list", function(req, res) {
  const key = Math.random()
    .toString(36)
    .substr(2, 9);

  const new_item = {
    title: req.query.title,
    complete: false
  };

  todo_list[key] = new_item;
  res.json(new_item);
});

app.delete("/list", function(req, res) {
  const key = req.query.key;
  delete todo_list[key];
  res.json(todo_list);
});

app.post("/update-checkmark", function(req, res) {
  const key = req.query.key;
  todo_list[key]["complete"] = !todo_list[key]["complete"];
  res.json(todo_list);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
