import { useQuery } from "react-query";
import axiosNoAuth from "../../axios/axios";

export const useGetUsers = () => {
  const getusers = async () => {
    try {
      const res = await axiosNoAuth.get("/user");
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
