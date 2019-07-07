const express = require('express');
const app = express();

app.get('/say',function(req,res){
    let {wd,callback} = req.query;
    console.log(wd);
    console.log(callback);
    res.end(`${callback}('asdfa')`)
});

app.listen(3001,() => {
    console.log('Example app listen on port 3001!')
});