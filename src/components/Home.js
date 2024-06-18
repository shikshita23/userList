import "../Css/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
   const [data, setData] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/user", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     setData(data);
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  const fetchData=async ()=>{
    try{
      const res= await axios.get("http://localhost:8000/user");
      setData(res.data);
    }
    catch(error){
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

console.log("data>>>",data)
  const notifyDel = () => {
    toast.success("User Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // const handleDelete = (id) => {
  //   fetch(`http://localhost:8000/user/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       fetchData();
  //       notifyDel();
        
  //       console.log("Deleted successfully", id);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const handleDelete=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:8000/user/${id}`);
      console.log("data after deletion =>",res);
      if(res){
        fetchData();
        notifyDel();
        console.log("Deleted successfully", id);
      }
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <Nav/>

      <div className="grid grid-cols-7 border-2 border-black tableSize mt-12 mx-auto bg-white ">
        <div className="borderElement bg-sky-100">ID</div>
        <div className="borderElement bg-sky-100">Name</div>
        <div className="borderElement bg-sky-100">Username</div>
        <div className="borderElement start bg-sky-100 ">Address</div>
        <div className="borderElement start bg-sky-100 ">Experience</div>
        <div className="borderElement col-span-2 start bg-sky-100 ">Action</div>
        {data?.map((user) => {
          return (
            <React.Fragment key={user.id}>
              {console.log("user id==>", user.id)}
              <div className="borderElement">{user.id}</div>
              <div className="borderElement">{user.name}</div>
              <div className="borderElement">{user.username}</div>
              <div className="borderElement"> {user.address}</div>
              <div className="border-y-[1px] border-black flex flex-col ">

              {user.experience?.map((item,index)=>(
                 <div key={index} className="list-none "> {item.experience}</div>
              )
              
              )}
              </div>
              <div className="borderElement ">
                {" "}
                <Link to={`/edit/${user.id}`}>
                  <FontAwesomeIcon
                    icon={faPenSquare}
                    className="cursor-pointer"
                  />
                </Link>
              </div>
              <div className="borderElement ">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer"
                  onClick={() => handleDelete(user.id)}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
}
