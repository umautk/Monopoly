var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('socket.io')();
var Player = require('./player.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = app.listen(8080, function() {
  console.log("サーバー起動");
});

// socket.ioを設定
io.attach(server);

var store = {};
io.sockets.on('connection', function(socket) {
  console.log("接続されました");
  io.emit('message', '接続完了してまーす');

  // Shake the dice and move
  socket.on('move', ()=>{
    console.log("駒を動かします");
    move(socket.id);
    var msg = {name:"", dst:""};
    console.log(store[socket.id].player.getPos());
    io.emit('move', msg);//全員に位置を送信(イベント情報も？)
  });

  // Join to room and store users
  socket.on('join',function(msg){
    usrobj = {
      'room':msg.roomid,
      'player':new Player(msg.name,socket.id)
    };
    store[socket.id] = usrobj;
    console.log(store[socket.id].player.getPos());
    move(socket.id);
    console.log(store[socket.id].player.getPos());
    socket.join(msg.roomid);
  })

  socket.on('purchase',(msg)=>{});

  socket.on('pay',(msg)=>{
    store[socket.id].payMoney(msg.val);
  });

  socket.on('sell',(msg)=>{});

  socket.on('getAllData',()=>{});

  socket.on('build',(msg)=>{});

  socket.on('mortgage',(msg)=>{});

  socket.on('out_prison',()=>{});

  socket.on('log',(msg)=>{});

  socket.on('allLog',()=>{});

  socket.on('end_turn',()=>{});

  socket.on('ready',()=>{});

  socket.on('disconnect', function() {
    console.log("切断されました");
  });

  socket.on('message', (message) => {
    console.log("メッセージ受信");
    io.emit('message', message);
  });

});

//駒を動かす
function move(sessionid){
  var res = diceRoll();
  if(res > 100){
    //現在のマスの処理
    store[sessionid].player.addPos(Math.floor(res/100));
    console.log("Double");
  }
  else {
    //コマを進める処理
    store[sessionid].player.addPos(res);
    //movePlayer(res, プレイヤーの番号？);
  }
}

function diceRoll(){
  var dice1 = getDiceVal();
  var dice2 = getDiceVal();
  if(dice1 == dice2){
    return (dice1+dice2)*100;
  }
  return dice1 + dice2;
}
//1~6までの値を返す
function getDiceVal(){
  return Math.floor( Math.random() * 6) + 1;
}