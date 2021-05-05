const express = require("express");
var ejs = require("ejs");
const { v4: uuidv4 } = require("uuid");
var app = express();
var Server = require('http').Server(app);
const io = require("socket.io")(Server);

app.set("view engine","ejs");
app.use(express.static("public"));
app.get('/chat', (req, res) => {
  res.redirect(`/chat/${uuidv4()}$`);
});

app.get("/chat/:room",(req,res)=>{
    res.render("call",{ roomId: req.params.room });
});

io.on('connection',socket=>{
    socket.on('join-room',(roomId)=>{
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected');
    });
});

Server.listen(3000);

