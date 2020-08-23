const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser);
let x = true;

const server = app.listen(4200,() => {
    console.log('Started in 4200');
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    sendData(socket);
})

function sendData(socket){
    
    if(x){
        socket.emit('data1', Array.from({length: 14}, () => Math.floor(Math.random() * 590)+ 10));
        x = !x;
    }else{
        socket.emit('data2', Array.from({length: 14}, () => Math.floor(Math.random() * 590)+ 10));
        x = !x;
    }
    console.log(`data is ${x}`);
    setTimeout(() => {
        sendData(socket);
    }, 3000);
}