const express = require('express')

const app = express();

const http = require('http').createServer(app);

const PORT = process.env.PORT || 8080;

http.listen(PORT,(err)=>{
    console.log(`LIstening on port ${PORT}`);
})

// to render all static file like css 
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//socket

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('connected');

    socket.on("new-user",(user)=>{
        socket.broadcast.emit('new-user',user);
    })

    socket.on('message',(msg)=>{
        //Send back to all sockets(connections except sender)
        //It will go back cliend
        socket.broadcast.emit('message',msg);
    })
})