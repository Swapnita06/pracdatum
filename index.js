const express = require ('express');
const cors = require("cors");
const app = express();
require('./db/config');
const User = require("./db/User")

app.use(express.json()); 
app.use(cors());

app.get('/', (req, resp) => {
   resp.send('Welcome!');
});

app.post("/add", async (req,resp)=>{
   const user = new User(req.body);

   let result = await user.save();
   result = result.toObject();
   resp.send(result);

})
app.listen(4500)