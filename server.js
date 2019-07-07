/*var http = require('http');
var server = http.createServer();
var qs = require('querystring');*/

/*server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));
    console.log(params);
    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.demo2.com;HttpOnly'   // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end(()=>{
        console.log(1);
    })
});

server.listen('8088');
console.log('Server is running at port 8088...');*/

let express = require('express');
let Mock = require('mockjs');
let app = express();
let fs = require('fs');
/*
app.all('/test.action',function(req,res){
    res.json(Mock.mock({
        'status': 200,
        'data|30': [{  // 随机返回1-9条
            'name|5-8': /[a-zA-Z]/,
            'id|+1': 1,
            'value|0-500': 20
        }]
    }))
});
*/
fs.readdir('./testData',function(err,files){
    if(err){
        console.log(err);
    }else{
        files.forEach(function(v,i){
            console.log(v,i);
            app.all(`/${v.replace(/json/,'action')}/`,function(req,res){
                fs.readFile(`./testData/${v}`,'utf-8',function(err,data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                        res.json(Mock.mock(JSON.parse(data))); // 将mock对象中的数据生成规则放到json文件中  在读取出来返回客户端
                    }
                })
            })
        })
    }
});

// 允许跨域
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});*/
app.listen('8888');
