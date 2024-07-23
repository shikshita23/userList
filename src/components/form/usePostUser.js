import { useMutation } from "react-query";
// import axiosNoAuth from "../../axios/axios";
import axiosAuth from "../../axios/axiosAuth";

export const usePostUser = (onSuccess) => {
  
  const postUser = async (data) => {
    console.log("data after creating",data)
    try {
      // const res = await axiosNoAuth.post("/user", data);
      const res = await axiosAuth.post("/add", data);
      return res.data;
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const mutation = useMutation(postUser, {
    onSuccess,
  });
  return {
    mutation,
  };
};
