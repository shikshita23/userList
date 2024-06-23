import { useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const useDeleteUser = () => {

    const deleteUser =async ({id})=>{
      try{
            const res=await axiosNoAuth.delete(`/user/${id}`);
            console.log("data after deletion =>",res);
            if(res){
              console.log("Deleted successfully", id);
            }
          }
          catch(error){
            console.error(error);
          }
      };

    const mutation = useMutation(deleteUser)

    return {
      mutation,
          }
}