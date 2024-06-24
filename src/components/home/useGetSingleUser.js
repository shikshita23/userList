import { useQuery } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const useGetSingleUser = (id) => {
  const getSingleUser = async (id) => {
    try {
      const res = await axiosNoAuth.get(`/user/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };
  const { data } = useQuery({
    queryKey: ["users", id],
    queryFn: getSingleUser(id),
    select: (data) => data,
  });
  return {
    data,
  };
};
