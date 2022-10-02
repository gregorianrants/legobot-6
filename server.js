const express = require('express')
var app = express()
const cors = require('cors')
app.use(cors())
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")
const { spawn } = require('child_process');
const motorsFactory = require('./motors.js');
const Raspi = require('raspi-io').RaspiIO;
const {Board} = require("johnny-five");


const Redis = require('ioredis')

const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const redis_s = new Redis()
const CAMERA_CHANNEL = 'camera'
redis_s.subscribe(CAMERA_CHANNEL )

const redis_p = new Redis()

function setUpMotors(socket){
  const speed = 60
  
  motors = motorsFactory()

  socket.on('drive',(msg)=>{
    if(msg==='forward'){
      motors.forward(speed)
    }
    if(msg==='stop'){
      motors.stop(speed)
    }
  })
}

function setUpCamera(socket){
  redis_s.on('message',(channel,message)=>{
    if(channel=='camera'){
      socket.emit('data', "data:image/jpeg;base64," + message.toString("base64"));
    }
  })
}

function handleDisconnect(socket){
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}

async function onConnection(socket){
    console.log('a user connected')
    setUpMotors(socket)
    setUpCamera(socket)
    handleDisconnect(socket)
 }

function setUpSocket(){
  io.on('connection',onConnection)
}

const board = new Board({
  io: new Raspi()
});

board.on('ready',()=>{
  setUpSocket()
})

server.listen(3000, '0.0.0.0',() => {
  console.log('listening on *:3000');
});