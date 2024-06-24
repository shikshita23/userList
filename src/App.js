import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./components/form/CreateUser";
import Layout from "./components/Layout";
import Update from "./components/home/Update";
import Home from "./components/home";
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from "./login/Login";
function App() {
  const  queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/create" element={<CreateUser/>}></Route>
        <Route path="/view" element={<Home/>}></Route>
        <Route path="/edit/:id" element={<Update/>}></Route>
        <Route path="/" element={<Layout/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
