import { Navigate } from "react-router-dom";

export const OpenRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    return user?.token === undefined ? children : (<Navigate to="/" replace={true} />)
    
}