//module import
import { useState,useContext } from "react";
import { context } from "../ContextApi/ContextApi";
//style import
import styles from "../styles/Login.module.css"
import { Navigate } from "react-router-dom";
//initial variables
const initialState={
    email:'',
    password:''
}
export const Login = () => {
    const [user,setUser]=useState(initialState);
    const [loading,setLoading]=useState(false);
    const {logged,setLogged}=useContext(context);
    // submit form
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const res=await fetch(`http://localhost:5050/user/login`,{
                method:"POST",
                body:JSON.stringify(user),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data=await res.json();
           if(data.ok&&data.msg=="Login Successful"){
            localStorage.setItem("token",data.token);
            setLogged(true)
           }else{
            alert(data.msg)
           }
        } catch (err) {
            alert("Error While Connecting To The Server")
        }
        setLoading(false)
    }
  return (
    <>
    {
        logged?<Navigate to="/"></Navigate>:<div className={styles.login}>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" value={user.email} name="email" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={user.password} name="password" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            </div>
            <div>
                <input type="submit" value={loading?"Loading...":"Login"} />
            </div>
        </form>
    </div>
    }
    </>
  )
}
