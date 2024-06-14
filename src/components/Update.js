import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";
export default function Update() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();


  const notifyUpdate = () => {
    toast.success("Updated Successfully", {
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
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("data==>", data);
    fetch(` http://localhost:8000/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("res>>>", response);
      console.log("Successfully Updated");
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
        console.log("userData==>", userData);
        setValue('name',userData.name);
        setValue('username',userData.username);
        setValue('address',userData.address);
        userData.experience.map((experience, index) => {
          setValue(`experience[${index}]`, experience.experience);
        });
        } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id,setValue]);
  

  console.log("user Data outside the useEffect", userData);
  const onError = (errors) => {
    console.log("form Errors==>", errors);
  };

  const data = userData?.experience?.map(item=>
    item.experience
  )
  console.log("updated data>>>",data)

  return (
    <>
      <Nav></Nav>
      <div className="flex justify-center">
        <form
          className=" flex-col w-96 justify-between mt-20 p-10 bg-white"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Name:</label>
              {userData && (
                <input
                  id="name"
                  name="name"
                  type="text"
                  // defaultValue={userData.name}
                  className=" bg-white border-2 rounded border-black ps-2"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              )}
            </div>
            {errors.name && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.name.message}
              </div>
            )}
          </div>
          <br />
          <br />
          <div className="flex flex-col justify-between bg-white ">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Username</label>
              {userData && (
                <input
                  id="username"
                  name="username"
                  type="text"
                  // defaultValue={userData.username}
                  className="bg-white border-2 rounded border-black ps-2"
                  {...register("username", {
                    required: "username is reqquired",
                  })}
                />
              )}
            </div>
            {errors.username && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.username.message}
              </div>
            )}
          </div>
          <br />
          <br />
          <div className="flex flex-col justify-between bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Address</label>
              {userData && (
                <input
                  id="address"
                  name="address"
                  type="text"
                  // defaultValue={userData.address}
                  className="bg-white border-2 rounded border-black ps-2"
                  {...register("address", {
                    required: "Address is reqquired",
                  })}
                />
              )}
            </div>
            {errors.address && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.address.message}
              </div>
            )}
          </div>
          <br/>
          <br/>
          <div className="flex flex-col justify-between bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Experience</label>
              <div>

              {userData && (
                userData?.experience?.map((item,index)=>{
                  
                  return(
                    <input
                    key={index}
                      type="text"
                      className="bg-white border-2 rounded border-black ps-2"
                      {...register(`experience[${index}]`, {
                        required: "experience is reqquired",
                        })}
                        />
        
                  )
                })
                
              )}
              
              </div>
            </div>
            {errors.address && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.address.message}
              </div>
            )}
          </div>
          <div className="bg-white mt-10  flex justify-center">
            <button
              type="submit"
              className="bg-sky-200 px-5 py-2 rounded "
              disabled={!isDirty}
              onClick={notifyUpdate}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
