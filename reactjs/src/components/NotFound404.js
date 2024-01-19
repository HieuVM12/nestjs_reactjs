import React from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
    return (
        <div className="text-center">
            <img
                src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                alt="not-found"
            />
            <Link to="/" className="link-home mt-2 d-block">
                Go Home
            </Link>
        </div>
    )
}

export default NotFound404