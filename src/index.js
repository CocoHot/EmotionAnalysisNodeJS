var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.post('/post', function (req, res) {
    var body = "";
    req.on('data', function(data) {
        body += data;
        fs.writeFile("score.json", data, function(err){
            if(err){
                return console.log(err);
            }
            console.log("The file was saved");
        });
    });

    req.on('end', function() {
        io.sockets.emit('post data', body);
        res.send('OK');
    });
});

io.on('connection', function (socket) {
    console.log('received connection');
});

http.listen(3000, '0.0.0.0', function() {
    console.log('listening on *:3000');
});
