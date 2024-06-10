import { useState } from "react";
import CreateUser from "./CreateUser";
import Home from "./Home";
// import { Link } from "react-router-dom";
export default function Nav() {
  const [action, setAction] = useState(false);
  console.log(action)
  return (
    <>
      <nav className=" bg-white py-7 flex flex-row-reverse">
        <button
          className="px-4 py-2 rounded bg-white me-5 bg-sky-400"
          onClick={() => setAction(true)}
        >
          Create List
        </button>
        <button
          className="px-4 py-2 rounded bg-white me-5 bg-sky-400"
          onClick={() => setAction(false)}
        >
          View User
        </button>
      </nav>
      {action ? <CreateUser></CreateUser> : <Home></Home>}
    </>
  );
}
