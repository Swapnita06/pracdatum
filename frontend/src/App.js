import './App.css';
import {React,useState} from 'react';

function App() {

  const [name,setName]= useState("");
  const [roll,setRoll] = useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  
  const collectData = async(e)=>{
    e.preventDefault();
   let result = await fetch("http://localhost:4500/add",{
     method:"POST",
     body:JSON.stringify({name,roll,email,password}),
  headers:{
     "Content-Type":"application/json"
    },
 })

   result = await result.json();
   console.warn(result);
  // localStorage.setItem("user",JSON.stringify(result))
   }

  return (
    <div className="App">
     <h1 style={{textAlign:'center'}}>Add Your Details Here!</h1>
     <input className="inputbox" type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name'/>
     <input className="inputbox" type='text' value={roll} onChange={(e)=>setRoll(e.target.value)}  placeholder='Enter roll number'/>
     <input className="inputbox" type='text' value= {email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter email'/>
     <input className="inputbox" type='password' value= {password} onChange={(e)=>setPassword(e.target.value)}   placeholder='Enter password'/>
       
     <button onClick={collectData} className='button' type="button">Submit</button>
           
    
    </div>
  );
}

export default App;
