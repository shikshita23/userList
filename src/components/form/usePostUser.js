import { useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";

export const usePostUser = () => {

    const postUser = async (data)=>{
        try{
          const res= await axiosNoAuth.post("/user",data);
          return res.data
        }
        catch(error){
          console.log("Error fetching data:", error);
        }
      };

    const mutation = useMutation(postUser)

    return {
        mutation
    }
}
