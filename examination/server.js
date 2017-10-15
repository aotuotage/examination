//express_demo.js 文件
var express = require('express');
var app = express();
var iconv = require('iconv-lite');
var fs = require("fs");
 
app.use(express.static('public'));
 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
 
app.get('/process_get', function (req, res) {
   
   var data = fs.readFileSync('txt/js.txt', {encoding:'binary'});
   var buf = new Buffer(data, 'binary');
   var str = iconv.decode(buf, 'GBK');
   var title = str.match(/^(--- [1-9]).+\*/gm);
   var endString = title.toString().split("---");
   var max = endString.length-1;
   var random = parseInt(Math.random()*(max-1+1)+1,10);;
   res.end(endString.slice(random,random+1).toString());

})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})