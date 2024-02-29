import AuthContext from "../../context/AuthContext"
import "./auth.css"
// import {background} from './images/login.png'
import { useContext} from "react"

export default function Login(){

    let {loginUser} = useContext(AuthContext)
    

   
    let {user} = useContext(AuthContext)
    return(
        < section className='login-container' >
        <div className="login-form">
        { user && <h1 className="text-white text-2xl">Hello {user.username}</h1>}
            <div className="form">
                <h3 className="form-header">Author Login Form</h3>
                <form onSubmit={loginUser}>
                <div className="form-username">
                    <label htmlFor="Username"> Username: </label>
                    <input type="email" name="username" required id="username" />
                </div>
                <div className="form-password">
                    <label htmlFor="Password"> Password: </label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div className="submit-btn">
                    <div className="forgot-password">
                    <a href="nas">Forgot password?</a>
                    </div>
                    <button type="submit" value="Login">Login</button>
                </div>
                </form>
                <p id="ele1"></p>
                <p id="ele2"></p>
            </div>
        </div>
        </section>
    )
} 



// const Login = () => {
//     let {loginUser} = useContext(AuthContext)
//     return (
//         <div className="login-container">
//             <div className="login-form">
//                 <h2>Sign in to your account</h2>
//                 <form onSubmit={loginUser}>
//                     <label htmlFor="email">Email address</label>
//                     <input id="email" name="email" type="email" required />

//                     <label htmlFor="password">Password</label>
//                     <input id="password" name="password" type="password" required />

//                     <div className="remember-me">
//                         <input id="remember_me" name="remember_me" type="checkbox" />
//                         <label htmlFor="remember_me">Remember me</label>
//                     </div>

//                     <a href="#" className="forgot-password">Forgot your password?</a>

//                     <button type="submit" className="submit-button">Sign in</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;