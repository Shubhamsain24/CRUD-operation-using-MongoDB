const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path")
const Chat = require("./model/chat.js")
const methodOverride = require("method-override")

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true }));
app.use(methodOverride("_method"))

main().then((res) =>{
    console.log("successful connection")})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(8080,() =>{
    console.log(`listening port 8080`)
})

app.get("/", (req,res) =>{
   res.send("success")
})

app.get("/chats", async (req,res) =>{
    let chats  = await Chat.find();
    // console.log(chats)
    res.render("index.ejs", {chats})
})

//New Route
app.get("/chats/new", (req,res) =>{
  res.render("new.ejs")
})

// Create Route
app.post("/chats", (req,res) =>{
  let {from, msg, to} = req.body;
  let newchat = new Chat({
    from: from,
    msg: msg,
    to: to,
    created_at: new Date()
  });
  newchat.save()
  .then((res) =>{ 
    console.log("newdata created")})
    .catch(err => { console.log(err)});
    res.redirect("/chats")
})

//Edit Routes
app.get("/chats/:id/edit", async (req,res) =>{
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat})
})

//Update Route
app.put("/chats/:id", async (req,res)=> {
  let { id } = req.params;
  let { msg : newmsg } = req.body;
  let updatedchat = await Chat.findByIdAndUpdate(
    id,{msg : newmsg}, {
    runValidators:true, new:true}
    );
  // console.log(updatedchat)
  res.redirect("/chats");
})

// Delete Route
app.delete("/chats/:id", async (req,res) => {
  let { id } = req.params;
  let delchat = await Chat.findByIdAndDelete(id);
  console.log(delchat);
  res.redirect("/chats")
})