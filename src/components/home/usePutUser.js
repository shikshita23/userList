import { useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const usePutUser = (onSuccess) => {
  const updateUserFn = async ({ id, data }) => {
    try {
      const res = await axiosNoAuth.put(`/update/${id}`, data);
      console.log("response from update",res);
      if (res) {
        console.log("res>>>", res);
        console.log("Successfully Updated");
      }
    } catch (error) {
      console.log("Error while updating data", error);
    }
  };
  const mutation = useMutation(updateUserFn, {
    onSuccess,
  });
  return {
    mutation,
  };
};
