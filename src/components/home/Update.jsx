import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";

import Nav from "../navbar/Nav";
import { useGetSingleUser } from "./useGetSingleUser";

export default function Update() {
  const { id } = useParams();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  // const { append, remove, fields } = useFieldArray({
  //   control,
  //   name: "experience",
  // });
console.log("id of update==>",id)
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

  const onSuccess = () => {
    notifyUpdate();
  };

  const {data:userData,isLoading,error} = useGetSingleUser(id)
  console.log("single userdata >>>",userData)
  
  // const getUser = async (id) => {
  //   try {
  //     const res = await axiosNoAuth.get(`/update/${id}`);
  //     return res.data;
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     throw new Error("Failed to fetch user data");
  //   }
  // };
  // Use React Query to fetch user data
  // const { data: userData, isLoading, error } = useQuery(["user", id], () => (id), {
  //   onSuccess: (data) => {
      
  //     // Set form values after fetching user data
  //     setValue("project_name", data.project_name);
  //     setValue("project_description", data.project_description);
  //     setValue("owner_id", data.owner_id.toString()); // Assuming owner_id is a number
  //   },
  // });

  // Function to fetch single user data

  // Use React Query and useMutation for update operation
  const updateUser = useMutation((data) => axiosNoAuth.put(`/update/${id}`, data), {
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      // Handle error notifications or fallback
    },
  });

  const onSubmit = async (data) => {
    updateUser.mutate(data); // Trigger the update mutation
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center">
        <form
          className="flex-col w-96 justify-between mt-20 p-10 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Project Name:</label>
              <input
                id="project_name"
                name="project_name"
                type="text"
                defaultValue={userData?.project_name}
                className="bg-white border-2 rounded border-black ps-2"
                {...register("project_name", {
                  required: "Project name is required",
                })}
              />
            </div>
            {errors.project_name && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.project_name.message}
              </div>
            )}
          </div>
          <br />
          <br />
          <div className="flex flex-col justify-between bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Project Description:</label>
              <input
                id="project_description"
                name="project_descriptionme"
                type="text"
                defaultValue={userData?.project_description}
                className="bg-white border-2 rounded border-black ps-2"
                {...register("project_description", {
                  required: "project description is required",
                })}
              />
            </div>
            {errors.project_description && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.project_description.message}
              </div>
            )}
          </div>
          <br />
          <br />
          {/* <div className="flex flex-col justify-between bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Address:</label>
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={userData?.address}
                className="bg-white border-2 rounded border-black ps-2"
                {...register("address")}
              />
            </div>
          </div> */}
          {/* <br />
          <br /> */}
          <div className="flex flex-col justify-between bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Owner Id:</label>
              <input
                id="owner_id"
                name="owner_id"
                type="number"
                defaultValue={userData?.owner_id}
                className="bg-white border-2 rounded border-black ps-2"
                {...register("owner_id", {
                  required: "Owner ID is required",
                })}
              />
            </div>
            {errors.owner_id && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.owner_id.message}
              </div>
            )}
          </div>
          <div className="bg-white mt-10 flex justify-center">
            <button
              type="submit"
              className="bg-sky-200 px-5 py-2 rounded"
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
