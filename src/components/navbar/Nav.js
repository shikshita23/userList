import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav className=" bg-white py-7 flex flex-row-reverse bg-white">
        <Link to="/create">
          <button className="px-4 py-2 rounded me-5 bg-sky-400">
            Create List
          </button>
        </Link>
        <Link to="/view">
          <button className="px-4 py-2 rounded  me-5 bg-sky-400">
            View User
          </button>
        </Link>
      </nav>
    </>
  );
}
