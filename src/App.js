import Nav from './components/Nav';
import './App.css';
import{Routes,Route} from 'react-router-dom'
import CreateUser from './components/CreateUser';
import HomeLayout from './components/HomeLayout';

function App() {
  return (
    <>
      <Nav></Nav>
      {/* <Routes>
        <Route path="/create" element={<CreateUser></CreateUser>}></Route>
        <Route path="/" element={<HomeLayout></HomeLayout>}></Route>
      </Routes> */}
    </>
  );
}

export default App;
