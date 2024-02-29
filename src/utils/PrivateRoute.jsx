import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';
const PrivateRoute =({children})=>{
    
    let {user} = useContext(AuthContext)  
    const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;

}
// const PrivateRoute = ({children, ...rest}) => {
//     const isAuthenticated = true
//     return (!isAuthenticated ? <Navigate to="/login"/> : children)
   
    
// }
// const PrivateRoute = ({children, ...rest}) => {
//     const isAuthenticated = true
//     return (
//     <Route {...rest}>{!isAuthenticated ? <Navigate to="/login"/> : children}</Route>
//     )
// }

export default PrivateRoute;