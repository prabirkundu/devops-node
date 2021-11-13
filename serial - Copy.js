//var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var store = require('store');
const Readline = require('@serialport/parser-readline')
var port = 8887;

//Server start
//const server = app.listen(port, () => console.log('on port:' + port));

//user server
///app.use(express.static(__dirname + '/public'));



const server = app.listen(port, () => {
  console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
});
// Socket Layer over Http Server
const socket = require('socket.io')(server);
// On every Client Connection
// setInterval(() => {
//   socket.on('connection', socket => {
//     console.log('Socket: client connected');
//     socket.emit('scanData',1111);
//   });
// },5000)






// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

var SerialPort = require("serialport");
var serialPort = SerialPort.SerialPort; // localize object constructor
var portName = "COM4";

var sp = new SerialPort(portName, {
  baudRate: 9600,
  dataBits: 7,
  parity: 'odd',
  stopBits: 1,
  parser: new SerialPort.parsers.Readline('\r'),
  autoOpen: false
});

sp.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  
})

// The open event is always emitted
var receiveData = "";
sp.on('open', function() {
  

  sp.set({ dtr: true, rts: true });
  var receiveData = "";
  //const parser = sp.pipe(new Readline({ delimiter: '\r\n' }))
  sp.on('data', function(data) {
    receiveData += data.toString(); 
    console.log('data received: ' + String(data));   
    //console.log(receiveData);
    //socket.emit('scanData',receiveData);
    if(receiveData.length == 18)
    {
      //console.log("test");
      socket.emit('scanData',receiveData);
      receiveData = "";
    }
  });
  // socket.on("connection", socket1 => {
  //   console.log('sent11111');
  //     // either with send()
  //     //socket.send("Hello!");
  //     socket1.emit('scanData',"testtttttt");
  //   })
 // socket.on("connection", socket1 => {
 //  console.log('sent');
 //      // either with send()
 //      //socket.send("Hello!");
 //      socket1.emit('scanData',receiveData);
 //    })

 // setTimeout(() => {
 //    console.log(receiveData);  
 //    socket.emit('scanData',receiveData);
 //  }, 5000);
  
  
})

// 









// io.on('connection', socket => {
//     console.log('Socket: client connected');
//     io.emit("scanData", 11111);
// });


// sp.open(function (error) {
//   sp.on('data', function(data) {
//       console.log('data received: ' + String(data));
//       //io.emit('scanData',String(data));
//     });
// });

//sp.set({ dtr: true, rts: true });
      // sp.on("data", function(data) {
      //   receiveData += data.toString(); 
      //   console.log("data received: " + data);
      // }); 

// sp.open('data', function(data) {
//       console.log('data received: ' + String(data));
//       //io.emit('scanData',String(data));
//     });
