const mongoose = require('mongoose');
const Chat = require("./model/chat.js")

main().then((res) =>{
    console.log("whatsapp connection successful")})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChat = [
    {
        from: "ram",
        to: "shyam",
        msg: "How was the day today?",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "sumit",
        msg: "all the best",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "megha",
        msg: "this is my pen",
        created_at: new Date()
    },
    {
        from: "chelsi",
        to: "radhika",
        msg: "you are looking good",
        created_at: new Date()
    },
    {
        from: "keshav",
        to: "rahul",
        msg: "where are you going",
        created_at: new Date()
    }
]
Chat.insertMany(allChat);