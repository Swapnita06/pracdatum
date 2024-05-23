const express = require ('express');
const cors = require("cors");
const app = express();
require('./db/config');
const User = require("./db/User")

app.use(express.json()); 
app.use(cors());

app.get('/data', async(req, resp) => {
   const users = await User.find();
   resp.json(users);
   
});

app.post("/add", async (req,resp)=>{
   const user = new User(req.body);
   let result = await user.save();
   result = result.toObject();
   delete result.password;
   console.log(result);
   resp.send(result);

})

app.delete("/delete/:userId", async(req,resp)=>{
   const userId = req.params.userId;
   
      const result = await User.deleteOne({ _id: userId });
      resp.send(result);
   
   
})

app.put("/update/:userId",async(req,resp)=>{
   const userId = req.params.userId;
   const user = req.body;
   const result = await User.findByIdAndUpdate(userId, user, {new:true});
   resp.send(result);
})
app.listen(4500)