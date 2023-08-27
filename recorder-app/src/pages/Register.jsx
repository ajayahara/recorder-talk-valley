//module import
import { useState,useContext } from "react";
import { context } from "../ContextApi/ContextApi";
import { Navigate } from "react-router-dom";
//style import
import styles from "../styles/Register.module.css"
// initial value
const initialState={
    email:'',
    password:'',
    name:''
}
export const Register = () => {
    const [user,setUser]=useState(initialState);
    const [loading,setLoading]=useState(false);
    const {logged}=useContext(context)
    // submit form
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const res=await fetch(`https://talkvalley.onrender.com/user/resister`,{
                method:"POST",
                body:JSON.stringify(user),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data=await res.json();
           alert(data.msg)
        } catch (err) {
            console.log(err)
            alert("Error While Connecting To The Server")
        }
        setLoading(false)
    }
  return (
    <>
    {logged?<Navigate to="/"></Navigate>:<div className={styles.register}>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" value={user.name} id="name" name="name" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" value={user.email} name="email" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={user.password} name="password" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            </div>
            <div>
                <input type="submit" value={loading?"Loading...":"Register"} disabled={loading}/>
            </div>
        </form>
    </div>}
    </>
  )
}
