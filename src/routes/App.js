import "../Css/App.css";
import { Routes, Route } from "react-router-dom";
import CreateUser from "../components/form/CreateUser";
import Update from "../components/home/Update";
import Home from "../components/home/Home";
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from "../login/Login";
import Protected from "./Protected";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/show" element={<Home />} />
          <Route path="/add" element={<CreateUser />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;