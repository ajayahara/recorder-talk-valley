import {Route,Routes} from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { ScreenJsx } from "../pages/ScreenJsx"
export const NavigationJsx = () => {
    
  return (
    <Routes>
        <Route path="/" element={<ScreenJsx/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/resister" element={<Register/>} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  )
}
