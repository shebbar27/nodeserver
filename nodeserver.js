const express = require('express');
const multer = require('multer');
const path = require('path');
const server = express();
const uploadFolder = "/uploaded_files/";

// View Engine Setup
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
	
server.get("/", function(req, res){
	res.render("home");
});

// uploaded files are saved in the folder specified by uploadFolder
const upload = multer({
  dest: __dirname + uploadFolder
});

server.use(express.static('public'));

// "dbfiles" is the key of the http payload
server.post('/uploadFiles', upload.array('dbfiles', 5), function(request, respond) {
  if(request.files) {
	request.files.forEach(file => {
		console.log(file);

		// save the file
		var fs = require('fs');
		fs.rename(__dirname + uploadFolder + file.filename, __dirname + uploadFolder + file.originalname, function(err) {
			if (err) console.log('ERROR: ' + err);
		});
	});
  }

  respond.end('Files uploaded!');
});

const PORT = 8027;
const hostname = '0.0.0.0';
server.listen(PORT, hostname, function(error) {
  if (error) throw error
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
