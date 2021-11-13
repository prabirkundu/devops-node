var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/on11', function (req, res) {
   io.on('connection', function(socket){
      setTimeout(() => {
         socket.emit('scanData',"S111234");
         socket.send('Sent a message 4seconds after connection!');
       }, 500);
   
      // Send a message after a timeout of 4seconds
      // setTimeout(function(){
      //    socket.emit('scanData',"S111234");
      //    //socket.send('Sent a message 4seconds after connection!');
      // }, 4000);
      // socket.on('disconnect', function () {
      //    console.log('A user disconnected');
      // });
   });
});

var count = 0;
io.on('connection', function(socket){
   console.log('A user connected');
   count++;
   //socket.emit('userConnected',count);
   //var receiveData1 = "S111234";
   setInterval(() => {
      //socket.emit('scanData',"08A8908008268298");  
      socket.emit('scanData',"08A8906091431247");      
      console.log(1);
    }, 20000);

   socket.on('connectionCheck', function(data){
      socket.emit('userConnected',true);
      //socket.disconnect();
   });

   // Send a message after a timeout of 4seconds
   // setTimeout(function(){
   //    socket.emit('scanData',"S111234");
   //    //socket.send('Sent a message 4seconds after connection!');
   // }, 4000);
   // socket.on('disconnect', function () {
   //    console.log('A user disconnected');
   // });
});

app.get('/on', function (req, res) {
   var receiveData1 = "S111234";
   setTimeout(() => {
      //console.log("test"+receiveData1);
         res.json(receiveData1);
         weight = receiveData1;
         receiveData = "";
         //receiveData1 = "";
         // sp.flush(function(err) {
         //     console.log(err);
         //     console.log('resume...');
         //     sp.resume();
         // });
         //sp.close();
      }, 500);
});

app.get('/on1', function (req, res) {
   io.on('connection', function(socket){
      console.log('A user connected');
      var receiveData1 = "S111234";
      setTimeout(() => {
         //console.log("test"+receiveData1);
           res.json(receiveData1);
           weight = receiveData1;
           receiveData = "";
           //receiveData1 = "";
           // sp.flush(function(err) {
           //     console.log(err);
           //     console.log('resume...');
           //     sp.resume();
           // });
           //sp.close();
       }, 500);
   
      // Send a message after a timeout of 4seconds
      // setTimeout(function(){
      //    socket.emit('scanData',"S111234");
      //    //socket.send('Sent a message 4seconds after connection!');
      // }, 4000);
      // socket.on('disconnect', function () {
      //    console.log('A user disconnected');
      // });
   });
});
http.listen(8887, function(){
   console.log('listening on *:8887');
});