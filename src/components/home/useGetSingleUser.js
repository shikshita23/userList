import { useQuery } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const useGetSingleUser=()=>{
    const getSingleUser=async(id)=>{
        try {
            const res = await axiosNoAuth.get(`/user/${id}`);
            return res.data;
          } catch (error) {
            console.error('Error fetching user data:', error);
            throw new Error('Failed to fetch user data');
          };
        }
        const{data,refetch}=useQuery({
          queryKey:["singleUser"],
          queryFn:getSingleUser
        })
        return{
            data,refetch
        }
}
