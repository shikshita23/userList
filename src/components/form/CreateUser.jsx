import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { usePostUser } from "./usePostUser";

export default function CreateUser() {
  const navigate = useNavigate();
  //Destructuring
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  // const { append, fields, remove } = useFieldArray({
  //   control,
  //   name: "experience",
  // });
  const notifyCreate = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        backgroundColor: "white",
      },
    });
  };
  const onSuccess = () => {
    notifyCreate("Created Successfully");
    setTimeout(() => {
      navigate("/show");
    }, 3500);
  };

  const { mutation } = usePostUser(onSuccess);
  // const onSubmit = (data) => {
  //   console.log("data==>", data);
  //   fetch(" http://localhost:8000/user", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   }).then((response) => {
  //     if (response.ok) {
  //       notifyCreate("created successfully");
  //       setTimeout(() => {

  //         navigate("/view");
  //       },3500);
  //       console.log("res>>>", response);
  //       console.log("Successfully submitted");
  //     }
  //   });
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axiosNoAuth.post("/user", data);
  //     console.log("data from axios=>", response);
  //     if (response) {
  //       notifyCreate("created successfully");
  //       setTimeout(() => {
  //         navigate("/view");
  //       }, 3500);
  //     }
  //   } catch (error) {
  //     console.error("error in axios=>", error);
  //   }
  // };

  // const { mutate: mutateCreateUser } = useMutation(
  //   async (data) => {
  //     const response = await axiosNoAuth.post('/user', data);
  //     return response.data;
  //   },
  //   {
  //     onSuccess: () => {
  //       notifyCreate('User created successfully');
  //       setTimeout(() => {
  //         navigate('/view');
  //       }, 3500);
  //     },
  //     onError: (error) => {
  //       console.error('Error creating user:', error);
  //       toast.error('Failed to create user');
  //     },
  //   }
  // );

  const onSubmit = async (data) => {
    // mutate trigger the mutation operation defined in your useMutation setup.
    mutation.mutate(data);
  };

  const onError = (errors) => {
    console.log("form Errors==>", errors);
  };
  const hasErrors = Object.keys(errors).length > 0;
  console.log("has errors", hasErrors);
  return (
    <>
      <div className="flex justify-center">
        <form
          className=" flex-col w-96  mt-20 p-10 bg-white"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">project Name:</label>
              <input
                id="project_name"
                name="project_name"
                type="text"
                className=" bg-white border-2 rounded border-black ps-2"
                {...register("project_name", {
                  required: "project_name is required",
                })}
              />
            </div>
            {errors.name && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.name.message}
              </div>
            )}
          </div>
          <br />
          <br />
          <div className="flex flex-col  bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Description</label>
              <input
                id="project_description"
                name="project_description"
                type="text"
                className="bg-white border-2 rounded border-black ps-2"
                {...register("project_description", {
                  required: "description is reqquired",
                })}
              />
            </div>

            {errors.description && (
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.description.message}
              </div>
            )}
          </div>
          <br />
          <br />
          {/* <div className="flex flex-col justify-between bg-white">
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
                        defaultValue={item.experience}
                        className="bg-white border-2 rounded border-black ps-2"
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
            {errors.experience && ( //if errors.experience is there it executes the statements behind it
              <div className="bg-white flex mt-3 text-red-500 justify-end">
                {errors.experience.message}
              </div>
            )}
          </div> */}

          <div className="flex flex-col justify-between bg-white ">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Owner Id:</label>
              <input
                id=" owner_id"
                name=" owner_id"
                type="number"
                className="bg-white border-2 rounded border-black ps-2"
                {...register("owner_id", {
                  required: true,
                  // minLength: 3,
                })}
              />
            </div>

            <div className="bg-white flex mt-3 text-red-500 justify-end">
              {errors.owner_id && (
                <div className="bg-white flex mt-3 text-red-500 justify-end">
                  {errors.owner_id.message}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white mt-10  flex justify-center">
            <button
              type="submit"
              className="bg-sky-200 px-5 py-2 rounded "
              disabled={!isValid}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
