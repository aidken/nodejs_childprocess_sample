var express = require('express');
var app     = express();

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/python', function(req, res) {
    var python = require('child_process').spawn(
	'python',
	['./tmp.py']
    );
    var output = '';
    python.stdout.on('data', function(data){ output += data });
    python.on('close', function(code){
	if (code !== 0) { return res.send(500).send(code); }
	return res.status(200).send(output);
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});
