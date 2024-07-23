import { useQuery } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const useGetSingleUser = (id) => {
  
  console.log("id inside hook",id)
  const getSingleUser = async (id) => {
    try {
      console.log("id inside hook",id)
      const res = await axiosNoAuth.put(`/update`, {
        project_id:{id}});
      console.log("res from singler user",res)
      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };
  const { data,isLoading,error } = useQuery({
    queryKey: ["getSingleUser", id],
    queryFn: getSingleUser(id),
    select: (data) => data,
  });
  return {
    isLoading,
    error,
    data,
  };
};
