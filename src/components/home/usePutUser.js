import { useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const usePutUser=()=>{
    const putUser=async(id,data)=>{
        try{
            const res=await axiosNoAuth.put(`/user/${id}`,data);
            if(res){
            console.log("res>>>", res);
            console.log("Successfully Updated");
            }
        }catch(error){
            console.log("Error while updating data",error);
        }
    };
    const mutation=useMutation(putUser)
    return{
        mutation
    }
}