const http = require('http');
const data = { title: 'fountend',password: '123456' };
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.end(JSON.stringify(data))
    }
});
server.listen(4000, ()=>{
    console.log('The server is running at http://localhost:4000')
});