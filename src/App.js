import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Layout from "./components/Layout";
import Update from "./components/Update";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/create" element={<CreateUser />}></Route>
        <Route path="/view" element={<Home></Home>}></Route>
        <Route path="/edit/:id" element={<Update></Update>}></Route>
        <Route path="/" element={<Layout></Layout>}></Route>
      </Routes>
    </>
  );
}

export default App;
