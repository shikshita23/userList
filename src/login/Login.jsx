import {useForm} from "react-hook-form"
import "../Css/Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const navigate=useNavigate();
    const {
        register,
        control,
        handleSubmit,
        formState:{errors},
    }=useForm();
    const notifyLoginFailed = (msg) => {
        toast.error(msg, 
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      };
    const onSubmit =async(data)=>{
        try{
           console.log("Data==>",data)
            const res= await axios.post("https://trout-romantic-broadly.ngrok-free.app/login",data);
            console.log("response==>",res)
            if(res){
                localStorage.setItem("access_token",res?.data?.access_token);
                // localStorage.setItem("refresh_token",res?.data?.refresh_token);
                console.log("the token ==>",res.data.access_token)
                navigate("/show");
            }
        }catch(error){
            console.log("error==>",error)
            notifyLoginFailed("Login failed")
        }
    }

    const onError =()=>{
        console.log("Error while logging")
    }
    return(
        < div className="flex justify-center text-left">
        <div className="login h-[400px] w-[330px]  mt-28 border-2 rounded px-5">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="title flex justify-center mb-12 mt-10 font-semibold text-2xl underline underline-offset-1">LOGIN</div>
                    <div className="email">
                        <input 
                            type="email"
                            placeholder="abc@gmail.com"
                            {...register ("email",{
                                required:"email is required",
                            })}
                            className="border-2 border-black mb-2 rounded ps-3 w-full"
                        />
                        <div className="mb-5">
                            {errors.email &&(
                                <div>{errors.email.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="Password">
                        <input
                            type="password"
                            placeholder="********"
                            {
                                ...register("password",{
                                    required:"password is required",
                                    // minLength:8,
                                    // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
                                })
                            }
                              className="border-2 border-black rounded ps-3 mb-2 w-full"
                        />
                          <div className="mb-5">
                            {/* {errors.password &&(
                                <div>{errors.password.message}</div>
                            )} */}
                            {errors.password?.type==="required"&&"password is required"}
                            {/* {errors.password?.type==="minLength"&&"password must be atleast 8 character"}
                            {errors.password?.type==="pattern"&&"password must include at least on lowercase, one uppercase, one number and one special character"} */}


                        </div>
                        <div className="flex justify-center">

                        < button type="Submit" className="px-4 py-2 rounded  me-5 bg-sky-400 mt-5 "> SUBMIT</button>
                        </div>
                    </div>
                </form>
        </div>
        <ToastContainer />
        </div>
    )
}