import {Route,Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
export const Navigation = () => {
    
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  )
}
