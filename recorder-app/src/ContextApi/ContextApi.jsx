import { createContext, useState } from "react"
export const context=createContext();
export const ContextProvider = ({children}) => {
    const [logged,setLogged]=useState((localStorage.getItem("token")&&localStorage.getItem("user_name"))?true:false)
  return (
    <context.Provider value={{logged,setLogged}}>
        {children}
    </context.Provider>
  )
}
