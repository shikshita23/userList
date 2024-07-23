import {Navigate, Outlet} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { useState, useEffect } from "react";
import dayjs from "dayjs";
const Protected =()=>{
    const [decodedToken, setDecodedToken] = useState(null);
    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          try {
            const decoded = jwtDecode(access_token);
            const isExpired = dayjs.unix(decoded.expiry).diff(dayjs())<1;
            console.log(isExpired,"expire status")
             setDecodedToken(decoded);
            console.log("decoded access token is==>",decoded.expiry)
            if(isExpired){
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
              }else{

              }
          } catch (e) {
            console.error("Invalid token", e);
          }
         
        }
      }, []);

      const access_token = localStorage.getItem("access_token");

    // const refresh_token=localStorage.getItem("refresh_token");
    // console.log("Token is==>",access_token, refresh_token);

    return access_token? <Outlet/> : <Navigate to="/"/>
}
export default Protected;
