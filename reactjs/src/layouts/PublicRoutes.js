import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    let access_token = localStorage.getItem('access_token') || false;
    return (
        !access_token ? <Outlet /> : <Navigate to='/' />
    )
}

export default PublicRoutes