import { useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";
export const usePutUser = (id, data) => {
  const putUser = async () => {
    try {
      console.log("finalFormdata", data);
      const res = await axiosNoAuth.put(`/user/${id}`, data);
      if (res) {
        console.log("res>>>", res);
        console.log("Successfully Updated");
      }
    } catch (error) {
      console.log("Error while updating data", error);
    }
  };
  const mutation = useMutation(putUser);
  return {
    mutation,
  };
};
