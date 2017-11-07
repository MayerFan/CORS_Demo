"use strict"

var http = require("http")
var fs = require("fs")
var path = require("path")

var root = path.resolve(process.argv[2] || ".")

var server = http.createServer(function(req, res) {
    var filePath = path.join(root, "cors.html")
    fs.stat(filePath, function(err, stats) {
        if(!err && stats.isFile()) {
            res.writeHead(200, {"Content-Type": "text/html"});
            fs.createReadStream(filePath).pipe(res)
        }else {
            console.log(err)
        }
    })
})

server.listen(4000)
console.log("server is running at http://172.0.2.218:4000/")