var http = require('http');
var fs = require('fs');
var url = require('url');
var uc = require('upper-case');
var fs = require('fs');
var formidable = require('formidable');
http.createServer(function (req, res) {
  var q = url.parse(req.url,true);
  var filename = "." + q.pathname;
  if(filename == './'){
    filename = "./index.html"
  }
  if(filename == './fileupload'){
    var form = formidable.IncomingForm();
    form.parse(req, function (err, fields, files){
      if (err) return res.end("Error occured");
      var oldpath = files.filetoupload.path;
      var newpath = 'E:/Projects/LearningNode/LearningNode/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) return res.end("Error occured");
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  }
  fs.readFile(filename, function(err, data) {
    if(err){
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(uc("404 Page not found, dawg"));
      res.write(filename)
      return res.end();
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
    
  });
}).listen(8080);