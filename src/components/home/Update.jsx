import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axiosNoAuth from "../../axios/axios";

import Nav from "../navbar/Nav";
import { usePutUser } from "../home/usePutUser";

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
  const { append, remove, fields } = useFieldArray({
    control,
    name: "experience",
  });
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

  // const onSubmit = (data) => {
  //   console.log("data==>", data);
  //   fetch(` http://localhost:8000/user/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   }).then((response) => {
  //     console.log("res>>>", response);
  //     console.log("Successfully Updated");
  //   });
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/user/${id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user data");
  //       }
  //       const userData = await response.json();
  //       setUserData(userData);
  //       console.log("userData==>", userData);
  //       setValue('name',userData.name);
  //       setValue('username',userData.username);
  //       setValue('address',userData.address);
  //       // userData.experience.map((experience, index) => {
  //       //   setValue(`experience.${index}.experience`, experience.experience);
  //       // });
  //       setValue('experience', userData.experience)
  //       } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [id,setValue]);
  // const UserDataComponent=({id})=>{
  //   const{data:updateUser,error,isLoading}=useQuery({
  //     queryKey:["user",id],
  //     queryFn:()=>
  //       axiosNoAuth.get(`/user/${id}`).then((res)=>res.data)
  //   })
  // }

  //  const fetchData=async()=>{
  //     try{
  //       const res=await axiosNoAuth.get(`/user/${id}`);
  //       console.log("response from uspdate==>",res)
  //       if(!res){
  //        throw new Error("Failed to fetch user data");
  //       }
  //       const userData = res.data;
  //         setUserData(userData);
  //         console.log("userData==>", userData);
  //         setValue('name',userData.name);
  //         setValue('username',userData.username);
  //        setValue('address',userData.address);
  //       setValue('experience', userData.experience)
  //     }
  //    catch{
  //       console.error("Error fetching user data:", errors);
  //     }
  //   }
  //   useEffect(()=>{
  //     fetchData();
  //   },[id,setValue])

  const getSingleUser = async (id) => {
    try {
      const res = await axiosNoAuth.get(`/user/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };
  const { data: user } = useQuery(["users", id], () => getSingleUser(id), {
    select: (user) => user,
  });

  console.log("userNew", user);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setValue("name", user?.name);
      setValue("username", user?.username);
      setValue("address", user?.address);
      setValue("experience", user?.experience);
    }
  }, [user, setValue, id]);

  // const updateUserFn = async (data) => {
  //   try {
  //     const res = await axiosNoAuth.put(`/user/${id}`, data);
  //     if (res) {
  //       console.log("res>>>", res);
  //       console.log("Successfully Updated");
  //     }
  //   } catch (error) {
  //     console.log("Error while updating data", error);
  //   }
  // };

  // const editMutation = useMutation(updateUserFn, {
  //   onSuccess: () => {
  //     notifyUpdate();
  //   },
  //   onError: (error) => {},
  // });

  const onSuccess = () => {
    notifyUpdate();
  };
  const { mutation } = usePutUser(onSuccess);

  const onSubmit = async (data) => {
    mutation.mutate({ id, data });
  };

  // const fetchSingleData = async () => {
  //     try {
  //       const res = await axiosNoAuth.get(`/user/${id}`);
  //       setUserData(res.data)
  //       return res.data;
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       throw new Error('Failed to fetch user data');
  //     }
  // };

  console.log("user Data outside the useEffect", userData);
  const onError = (errors) => {
    console.log("form Errors==>", errors);
  };

  const data = userData?.experience?.map((item) => item.experience);
  console.log("updated data>>>", data);

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
          <br />
          <br />
          <div className="flex flex-col justify-between bg-white">
            <div className="flex flex-col bg-white">
              <div className="flex justify-between">
                <label className="bg-white">Experience</label>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="cursor-pointer me-2 ms-2 mt-1"
                  onClick={() => append({ experience: "" })}
                />
              </div>
              <br />
              <div className="flex flex-col ">
                {fields.map((item, index) => (
                  <>
                    {console.log("fields==>", fields)}
                    <div key={item.id} className="flex justify-end">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer me-4"
                        onClick={() => remove(index)}
                      />
                      <input
                        name={`experience[${index}].experience`}
                        type="text"
                        //  defaultValue={item.experience}
                        className="bg-white border-2 rounded border-black"
                        {...register(`experience[${index}].experience`)}
                      />
                    </div>
                    <br />
                  </>
                ))}
              </div>
            </div>
            <br />
            <br />
            {errors.experience && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.experience.message}
              </div>
            )}
          </div>
          <div className="bg-white mt-10  flex justify-center">
            <button
              type="submit"
              className="bg-sky-200 px-5 py-2 rounded "
              disabled={!isDirty}
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
