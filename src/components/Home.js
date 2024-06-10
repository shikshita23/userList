import "../Css/Home.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare ,faTrash} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import newData from "../data.js";


export default function Home() {
const [data,setData]=useState([]);
const [userId, setUserId] = useState(null)
const [users,setUsers]=useState([]);
async function handleData(){
try{
        // const res=await fetch("http://localhost:8000/user");
        // const data=await res.json();
        setData(newData.user);
    }
    catch(error){
        console.log("error=>",error)
    }
}
useEffect(()=>{
    handleData()
},[])

const handleDelete = (userId) => {
  // Remove the user from the state
  setData(data.filter(user => user.id !== userId));
  console.log(`New data: ${JSON.stringify(newData)}`);
};

console.log("data ---->", data);

  return (
    <div className="grid grid-cols-6 border-2 border-black tableSize mt-12 mx-auto bg-white ">
                <div className="borderElement bg-sky-100">ID</div>
                <div className="borderElement bg-sky-100">Name</div>
                <div className="borderElement bg-sky-100">Username</div>
                <div className="borderElement start bg-sky-100 ">Address</div>
                <div className="borderElement col-span-2 start bg-sky-100 ">Action</div>      
                {data.map((user) => (
                  <React.Fragment key={user.id}>
                    <div className="borderElement">{user.id}</div>
                    <div className="borderElement">{user.name}</div>
                    <div className="borderElement">{user.username}</div>
                    <div className="borderElement">{user.address}</div>
                    <div className="borderElement">
                      <FontAwesomeIcon icon={faPenSquare} className="cursor-pointer" />
                    </div>
                    <div className="borderElement">
                      <FontAwesomeIcon icon={faTrash} className="cursor-pointer" onClick={() => handleDelete(user.id)} />
                    </div>
                  </React.Fragment>
                ))}
    </div>
  );
}
