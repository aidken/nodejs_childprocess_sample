var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var busboy     = require('connect-busboy');
var fs         = require('fs');
var app        = express();

app.use(busboy());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/python', function(req, res) {
    var python = require('child_process').spawn(
	'python3',
	['./tmp.py']
    );
    var output = '';
    python.stdout.on('data', function(data){ output += data });
    python.on('close', function(code){
	if (code !== 0) { return res.send(500).send(code); }
	return res.status(200).send(output);
    });
});

app.get('/upload', function(req, res) {
    res.render('upload');
});

app.post('/upload', function(req, res) {

    var fstream;
    req.pipe(req.busboy);

    req.busboy.on('file', function(fieldname, file, filename){
    	// console.log(req.busboy);
    	fstream = fs.createWriteStream(__dirname + 'files' + filename);
    	file.pipe(fstream);
    	fstream.on('close', function(){
    	    var python = require('child_process').spawn(
    		'python3',
    		['./tmp2.py',
		 __dirname + 'files' + filename
    		]);
    	    var output = '';
    	    python.stdout.on('data', function(data){ output += data });
    	    python.on('close', function(code){
    		if (code !== 0) { return res.send(500).send(code); }
    		return res.status(200).send(output);
    	    });
	}); // end fstream.on
    }); // end req.busboy.on

}); // end app.post /upload

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('host ' + host + ', port ' + port)
});
