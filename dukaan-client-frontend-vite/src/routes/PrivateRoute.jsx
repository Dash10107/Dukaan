import {Navigate, Route } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        return <Navigate to="/login" replace={true} />
    }
    return children;
    }