// import { BabalButton } from "babal-ui-npm";
import { Link , useNavigate} from "react-router-dom";
// import logo from "./logo192.png"
export default function Nav() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
    navigate("/")
  }
  return (
    <>
      <nav className=" bg-white py-7 flex flex-row-reverse bg-white">
        {/* <BabalButton title="name" icon={(<><img src={logo}/></>)} hover={true} hoverStyle={{transform:"scale(1.2)" ,backgroundColor:"red"}}/> */}
        <button className="px-4 py-2 rounded  me-5 bg-sky-400" onClick={handleLogout}> Logout</button>
        <Link to="/add">
          <button className="px-4 py-2 rounded me-5 bg-sky-400">
            Create List
          </button>
        </Link>
        <Link to="/show">
          <button className="px-4 py-2 rounded  me-5 bg-sky-400">
            View User
          </button>
        </Link>
      </nav>
    </>
  );
}
