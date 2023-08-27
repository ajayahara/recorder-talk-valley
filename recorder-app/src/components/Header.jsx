import { Link } from "react-router-dom"
import { useContext } from "react"
import { context } from "../ContextApi/ContextApi"
import styles from "../styles/Header.module.css"
export const Header = () => {
  const { logged, setLogged } = useContext(context);
  return (
    <div className={styles.header}>
      <Link>
        Welcome To Recorder
      </Link>
      <Link to={"/"}>
        Home
      </Link>
      {
        !logged ? <>
          <Link to={"/resister"}>
            Register
          </Link>
          <Link to={"/login"}>
            Login
          </Link>
        </> : <>
          <Link>
            🙎‍♂️{localStorage.getItem("user_name")}
          </Link>
          <Link onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user_name")
            setLogged(false)
          }}>
            Logout
          </Link>
        </>
      }

    </div>
  )
}
