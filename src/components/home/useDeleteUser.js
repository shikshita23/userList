import { useMutation } from "react-query";
import axiosNoAuth from "../../axios/axios";

export const useDeleteUser = (onSuccess) => {
  const deleteUser = async ({ project_id }) => {
    try {
      const res = await axiosNoAuth.delete("/remove", {
        data : { project_id },
      });
      console.log("data after deletion =>", res);
      if (res) {
        console.log("Deleted successfully", project_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mutation = useMutation(deleteUser, {
    onSuccess,
  });

  return {
    mutation,
  };
};