import axiosNoAuth from "./axios/axios";
const fetchData=async ()=>{
  try{
    const res= await axiosNoAuth.get("/user");
    return res.data
  }
  catch(error){
    console.log("Error fetching data:", error);
  }
};

const onSubmit = async (data) => {
  try {
    const response = await axiosNoAuth.post("/user", data);
    console.log("data from axios=>", response);
    // if (response) {
    //   notifyCreate("created successfully");
    //   setTimeout(() => {
    //     navigate("/view");
    //   }, 3500);
    // }
    return response.data
  } catch (error) {
    console.error("error in axios=>", error);
  }
};




export {fetchData,onSubmit};