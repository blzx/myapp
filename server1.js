const http = require('http');
const server = http.createServer((request,response) => {
    //  接受客户端请求
    response.writeHead(200,{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    // 将请求转发给服务器
    const proxyRequest = http.request(
        {
            host: '127.0.0.1',
            port: 4000,
            url: '/',
            method: request.method,
            headers: request.headers
        },
        serverResponse => {
            // 收到服务器的响应
            var body = '';
            serverResponse.on('data',chunk => {
                //console.log(chunk); //<Buffer 7b 22 74 69 74 6c 65 22 3a 22 66 6f 75 6e 74 65 6e 64 22 2c 22 70 61 73 73 77 6f 72 64 22 3a 22 31 32 33 34 35 36 22 7d>
                body += chunk;
            });
            serverResponse.on('end',() => {
                console.log('The data is' + body);
                console.log(request.method); // options:允许客户端查看服务器的性能   post: ...
                console.log(request.headers);
                // 将相应发送给服务器
                response.end(body)
            });
        }
    ).end()
});
server.listen(3000,()=>{
    console.log('The proxyServer is running at http://localhost:3000')
});
