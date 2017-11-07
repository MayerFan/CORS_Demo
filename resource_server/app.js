"use strict"

var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")

var app = express()

console.log("dirname=="+ __dirname)
//声明试图/模板路径
app.set("views", __dirname + "/app/views/pages")
//声明视图模板引擎类型
app.set("view engine", "jade")
//增加path中间件，访问静态资源路径
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//         extended: true
//     }
// ))


//路由
app.get("/service", function(req, res) {
    var data = {
        "play": "一分钟玩转共享策略",
        "question": "清算问题",
        "rule": "A股交易规则"
    }
    res.render("home", {
        data: data
    })
})
app.get("/service/play", function(req, res) {
    res.render("play")
})
app.get("/service/question", function(req, res) {
    res.render("clearquestion")
})
app.get("/service/rule", function(req, res) {
    res.render("rule")
})
app.post("/service/protocol", function(req, res) {
    console.log("获取参数")
    // res.render("tradeProtocol", {
    //     title: "《沪深A股交易合作协议》"
    // })
})

/**
 * 临时接口
 * 处理cors跨域
 */

//配置预检请求方式1
/*
app.all("*", function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");  
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
    next();
})
app.post("/client/api/000003", function(req, res) {
    var jsonData = {
        code: "0000",
        msg: "success",
        result: [
            {
                notice_id: "18",
                notice_title: "清算问题",
                publish_date: "2017-10-30",
                publish_time: "10:34:42",
                type: "2"
            },
            {
                notice_id: "12",
                notice_title: "A股交易规则",
                publish_date: "2017-10-19",
                publish_time: "09:33:22",
                type: "2"
            }
        ]
    }
    res.json(jsonData);
})
*/

//配置预检请求方式2: 
//预检请求方法OPTIONS
app.options("/client/api/000003", function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");  
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
    next();
})
app.post("/client/api/000003", function(req, res) {
    var jsonData = {
        code: "0000",
        msg: "success",
        result: [
            {
                notice_id: "18",
                notice_title: "清算问题",
                publish_date: "2017-10-30",
                publish_time: "10:34:42",
                type: "2"
            },
            {
                notice_id: "12",
                notice_title: "A股交易规则",
                publish_date: "2017-10-19",
                publish_time: "09:33:22",
                type: "2"
            }
        ]
    }
    res.setHeader("Access-Control-Allow-Origin", "*");//单独配置跨域响应头信息
    res.json(jsonData);
})
/**
 * 方式2和方式1的不同
 * 方式1： 每次请求发起的时候都必须经过`all("*")`所以每次请求头都配置了跨域信息
 * 方式2； option仅仅是接受预检请求，只是表示浏览器前期询问跨域同意。而其他请求的时候还需要单独配置跨域响应头信息
 */

//监听端口
var port = process.env.PORT || 3000
app.listen(port)
console.log(`app is running at ${port}`)