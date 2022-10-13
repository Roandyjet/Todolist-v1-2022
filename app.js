const express = require("express");
const app = express();
const date = require(__dirname + "/views/date.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const items = ["Buy food", "cook food", "eat food"];
const workItems = [];
app.get("/", (req, res) => {
  let day = date.getDay();
  res.render("list", { route: req.url, listTitle: day, newListItems: items });
  //   res.send(String(today));
});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  // ____________another method for the route____________

  // if (req.body.button === "Work") {
  //   workItems.push(item);

  //   res.redirect("/work");
  // } else {
  //   items.push(item);

  //   res.redirect("/");
  // }

  items.push(item);

  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("list", {
    route: req.url,
    listTitle: "Work",
    newListItems: workItems,
  });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;

  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
