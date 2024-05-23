import './App.css';
import {React,useState,useEffect} from 'react';

function App() {

  const [name,setName]= useState("");
  const [roll,setRoll] = useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [data, setData] = useState([]); 
  const [editingUserId, setEditingUserId] = useState(null);
  
  const addData = async(e)=>{
    e.preventDefault();
   let result = await fetch("http://localhost:4500/add",{
     method:"POST",
     body:JSON.stringify({name,roll,email,password}),
  headers:{
     "Content-Type":"application/json"
    },
 });

   result = await result.json();
   console.warn(result);
  // localStorage.setItem("user",JSON.stringify(result))

  setName("");
    setRoll("");
    setEmail("");
    setPassword("");

    fetchData();
   }

   useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async ()=>{
    let result = await fetch("http://localhost:4500/data");
    const jsonData = await result.json();
    setData(jsonData);
  }
  
  const deleteData = async (userId) => {
    let result = await fetch(`http://localhost:4500/delete/${userId}`, {
      method: "DELETE"
    });
    result = await result.json();
    console.warn(result);
    fetchData();
  }

  const editUser = (user) => {
    setEditingUserId(user._id);
    setName(user.name);
    setRoll(user.roll);
    setEmail(user.email);
    setPassword(user.password);
   
  }

  const updateData = async () => {
    let result = await fetch(`http://localhost:4500/update/${editingUserId}`, {
      method: "PUT",
      body: JSON.stringify({ name, roll, email, password }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    result = await result.json();
    console.warn(result);
    setEditingUserId(null); // Clear editing user state
    fetchData();

    setName("");
  setRoll("");
  setEmail("");
  setPassword("");
  }
 

  return (
    <div className="App">
     <h1 style={{textAlign:'center'}}>Add Your Details Here!</h1>
     <input className="inputbox" type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name'/>
     <input className="inputbox" type='text' value={roll} onChange={(e)=>setRoll(e.target.value)}  placeholder='Enter roll number'/>
     <input className="inputbox" type='text' value= {email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter email'/>
     <input className="inputbox" type='password' value= {password} onChange={(e)=>setPassword(e.target.value)}   placeholder='Enter password'/>

     {editingUserId ? (
        <button onClick={updateData} className='button' type="button">Update</button>
      ) : (  
     <button onClick={addData}  className='button' type="button">Submit</button>
    )}
     <h1 style={{ textAlign: 'center' }}>Display Data</h1>
      <ul>
        {data.map(users => (
          <li key={users._id}>
            Name: {users.name}, Roll Number: {users.roll}, Email: {users.email}
            
            <button onClick={() => deleteData(users._id)} className='button' type="button">Delete</button>
            <button onClick={() => editUser(users)} className='button' type="button">Edit</button>
          </li>
        ))}
      </ul>

           
    
    </div>
  );
}

export default App;
