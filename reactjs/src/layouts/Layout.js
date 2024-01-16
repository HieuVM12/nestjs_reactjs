import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PacmanLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

const Layout = () => {
    const statusLoading = useSelector(state => state.globalLoading.status)
    return (
        <div>
            <PacmanLoader loading={statusLoading} cssOverride={cssOverride} color='#36d7b7' />
            <Outlet />
            <ToastContainer />
        </div>
    )
}

export default Layout

const cssOverride = {
    position: "absolute",
    top: "0",
    left: "0",
    textAlign: "center",
    right: "0",
    bottom: "0",
    backgroundColor: "rgb(0 0 0 / 30%)",
    zIndex: "9999",
}