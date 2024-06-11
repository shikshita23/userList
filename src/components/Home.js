import "../Css/Home.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare ,faTrash} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from "react-router-dom";
import Nav from "./Nav";
export default function Home() {
const [data,setData]=useState([]);
const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:8000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
        });
        const data = await res.json();
        setData(data);
        } catch (error) {
          console.log("Error fetching data:", error);
          
          }
          };
          
useEffect(() => {
  fetchData();
}, []);

const handleDelete = (id) => {
    fetch(`http://localhost:8000/user/${id}`, {
      method: "DELETE"
    })
    .then(()=>{
        fetchData();
      console.log("Deleted successfully", id);
    })
    // .then(data => console.log("dataaa",data))
    .catch(error => console.error(error));
  }

// const handleEdit = (id) => {
    
//     fetch(`http://localhost:8000/user/${id}`, {
//       method: "PUT",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       // body: JSON.stringify(userData)
//     })
//     .then(response =>{
//       if(!response.ok){
//         throw new Error("Failed to update");
//       }
//       return response.json();
//     })
//     .then(data=>{
//       console.log("update successfully");
//     })
//     .catch(error =>{
//       console.log("error while updating");
//     })
//     setEditClicked(true)
//   }

  return (
    <>
    <Nav></Nav>
    {/* {editClicked?<Update></Update>: */}

    <div className="grid grid-cols-6 border-2 border-black tableSize mt-12 mx-auto bg-white ">
                <div className="borderElement bg-sky-100">ID</div>
                <div className="borderElement bg-sky-100">Name</div>
                <div className="borderElement bg-sky-100">Username</div>
                <div className="borderElement start bg-sky-100 ">Address</div>
                <div className="borderElement col-span-2 start bg-sky-100 ">Action</div>      
        {data.map((user)=>{
            return(
                <React.Fragment key={user.id}> 
                {console.log("user id==>",user.id)}
                <div className="borderElement">{user.id}</div>
                <div className="borderElement">{user.name}</div>
                <div className="borderElement">{user.username}</div>
                <div className="borderElement"> {user.address}</div> 
                <div className="borderElement "> <Link to={`/edit/${user.id}`}><FontAwesomeIcon icon={faPenSquare} className="cursor-pointer" /></Link></div>
                <div className="borderElement ">
                  <FontAwesomeIcon icon={faTrash} className="cursor-pointer" onClick={()=>handleDelete(user.id)}/>
                </div> 
                </React.Fragment>
            )
        })}
    </div>
     {/* }  */}
    </>
  );

}
