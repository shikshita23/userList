import {useForm} from "react-hook-form"
import "../Css/Login.css";
export default function Login(){
    const {
        register,
        control,
        handleSubmit,
        formState:{errors},
    }=useForm();

    return(
        < div className="flex justify-center ">
        <div className="login h-[350px] w-[320px] flex justify-center mt-28 border-2 ">
                <form>
                    <div className="title flex justify-center mb-12 mt-10 font-semibold text-2xl underline underline-offset-1">LOGIN</div>
                    <div className="email">
                        <input 
                            type="email"
                            placeholder="abc@gmail.com"
                            {...register ("email",{
                                required:"email is required",
                            })}
                            className="border-2 border-black mb-10 rounded ps-3"
                        />
                        <div>
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
                                    minLength:8,
                                    pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
                                })
                            }
                              className="border-2 border-black rounded ps-3 mb-10"
                        />
                          <div>
                            {/* {errors.password &&(
                                <div>{errors.password.message}</div>
                            )} */}
                            {errors.password?.type==="required"&&"password is required"}
                            {errors.password?.type==="minLength"&&"password must be atleast 8 character"}
                            {errors.password?.type==="pattern"&&"password must include at least on lowercase, one uppercase, one number and one special character"}


                        </div>
                        <div className="flex justify-center">

                        < button type="Submit" className="px-4 py-2 rounded  me-5 bg-sky-400 mt-5 "> SUBMIT</button>
                        </div>
                    </div>
                </form>
        </div>
        </div>
    )
}