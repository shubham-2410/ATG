import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/updatePassword";
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <div className="w-screen min-h-[100vh] bg-slate-900" >

      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>

        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
        
      </Routes>

    </div>
  );
}

export default App;
