import { useQuery } from "react-query";
// import axiosNoAuth from "../../axios/axios";
import axiosAuth from "../../axios/axiosAuth";
export const useGetUsers = () => {
  const getusers = async () => {
    try {
      const res = await axiosAuth.get("/show",{
        headers: {
          'Accept': 'application/json',
      }
      });
      console.log("res.data from useGetUsers==>",res)
      return res.data;
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getusers,
  });
  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
