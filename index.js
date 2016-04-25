'use strict';

var koa = require('koa');
var multer = require('koa-multer');
var route = require('koa-route');
var fs = require('fs');

var app = koa();
var upload = multer({dest: 'uploads/'})

var readFileForService = function(src) {
  return new Promise(function(resolve, reject) {
    fs.readFile(src, {'encoding': 'utf-8'}, function(err, data) {
      if (err) { return reject(err); }
      resolve(data);
    })
  })
}

app.use(multer({ dest: './uploads' }));

app.use( function *() {
  
  if (this.method === 'GET') {
    this.body = yield readFileForService(__dirname + '/index.html');
  }

  else if (this.method === 'POST') {
    this.body = {
      size: this.req.files.file.size
    }; 
  }

});

app.listen(process.env.PORT || 3000);