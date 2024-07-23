import React, { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import axios from "axios"
axios.defaults.withCredentials = true


const Root = () => {
    const { isAuthenticated } = useContext(AuthContext)
    if (isAuthenticated) {
        return <Outlet/>
    }
    return <Navigate to="/login"/>
    
}
export default Root