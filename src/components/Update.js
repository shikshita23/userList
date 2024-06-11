import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Update() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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
      navigate("/view");
    });
  };
  const onError = (errors) => {
    console.log("form Errors==>", errors);
  };
  return (
    <>
      <div className="flex justify-center">
        <form
          className=" flex-col w-96 justify-between mt-20 p-10 bg-white"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col bg-white">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                className=" bg-white border-2 rounded border-black"
                {...register("name", {
                  required: "name is required",
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
          <div className="flex flex-col justify-between bg-white ">
            <div className="flex justify-between bg-white">
              <label className="bg-white">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                className="bg-white border-2 rounded border-black"
                {...register("username", {
                  required: "username is reqquired",
                })}
              />
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
              <input
                id="address"
                name="address"
                type="text"
                className="bg-white border-2 rounded border-black"
                {...register("address", {
                  required: "Address is reqquired",
                })}
              />
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
              disabled={isSubmitting}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </>
  );
}