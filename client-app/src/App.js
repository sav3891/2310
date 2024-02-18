
import './App.css';
import Signup from './components/Signup';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Tasks from './components/Tasks';
import Logout from './components/Logout';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import Leaves from './components/Leaves';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup></Signup>} ></Route>
        <Route path="/Home" element={<Home></Home>} ></Route>
        <Route path="/tasks" element={<Tasks></Tasks>} ></Route>
        <Route path="/leaves" element={<Leaves></Leaves>}></Route>
        <Route path="/logout" element={<Logout></Logout>} ></Route>
        <Route path="/editProfile" element={<EditProfile></EditProfile>}></Route>
        <Route path="/"element={<Login></Login>} ></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
