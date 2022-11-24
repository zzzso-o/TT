import { Link} from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { removeToken } from "../features/user/loginSlice"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import Login from "../pages/User/LogIn"
import "./Home.css"
export default function Home() {
  const isLoggedIn = useSelector((state:RootState) => state.login.isLoggedIn)
  const token = useSelector((state:RootState) => state.login.token)
  const currentUser = useSelector((state:RootState) => state.login.currentUser)
  const userCode = useSelector((state:RootState) => state.user.userCode)
  const dispatch = useAppDispatch()
  const logoutRequest: any = () => {
    dispatch(removeToken())
  }
    return (
        <div id="home"  className="container">
          <div id="home-1" className="home1">
            <Link className="imglogo" to="/about"><img className="logo" src="/dice.png" alt="dice" /></Link>
            <div className="menus">
              {token === '' ? <span><Link className="menu" to="/login">Login</Link><Link className="menu" to="/signup">SignUp</Link></span> : <span><span className="logout" onClick={logoutRequest}>Logout</span><Link className="menu" to={`/profile/${currentUser}`}>Profile</Link></span>}
              <Link className="menu" to="/notice">Notice</Link>
              <Link className="menu" to="/meeting">Meeting</Link>
              <Link className="menu" to="/share">Information</Link>
            </div>            
          </div>
        </div>
  );
}