const express = require ('express');
const app = express();

app.get("/",(req,resp)=>{
    resp.send("HELLO BABY!")
});
app.listen(5000);