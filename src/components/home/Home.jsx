import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import "../../Css/Home.css";
import Nav from "../navbar/Nav";
import { useGetUsers } from "./useGetUsers";
import { useDeleteUser } from "./useDeleteUser";
import { useGetSingleUser } from "./useGetSingleUser";

export default function Home() {
  const { data, error, isLoading, refetch: refetchUsers } = useGetUsers();
  console.log("data from reactQuery==>", data);
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
  const onSuccess = () => {
    notifyDel();
  };
  const { mutation:deleteMutation } = useDeleteUser(onSuccess);
  const { mutation:updateMutation } = useGetSingleUser();

  useEffect(() => {
    if (deleteMutation?.isSuccess === true) {
      refetchUsers();
    }
  }, [deleteMutation?.isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <Nav />
      <div className="grid grid-cols-6 border-2 border-black tableSize mt-12 mx-auto bg-white">
        <div className="borderElement bg-sky-100">ID</div>
        <div className="borderElement bg-sky-100">Project Name</div>
        <div className="borderElement bg-sky-100">Project Description</div>
        <div className="borderElement col-span-3 start bg-sky-100">Date of Creation</div>
        {data?.map((projects) => (
          <React.Fragment key={projects.id}>
            <div className="borderElement">{projects.id}</div>
            <div className="borderElement">{projects.name}</div>
            <div className="borderElement">{projects.description}</div>
            <div className="borderElement">{projects.created_at}</div>
            <div className="borderElement">
              {/* <Link to={`/update/${projects.id}`}>
                <FontAwesomeIcon
                  icon={faPenSquare}
                  className="cursor-pointer"
                />
              </Link> */}
              <Link to={`/update`}>
                <FontAwesomeIcon
                  icon={faPenSquare}
                  className="cursor-pointer"
                  onClick={()=>updateMutation.mutate({project_id:projects.id})}
                />
              </Link>
            </div>
            <div className="borderElement">
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer"
                onClick={() => deleteMutation.mutate({ project_id: projects.id })}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}