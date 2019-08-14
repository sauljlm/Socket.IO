const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/public/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    }
  );
}

// websockers
io.on('connection', function (socket) {
  socket.on('my other event', function (data) {
    console.log(data);
    io.sockets.emit('news', data);
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  })
});