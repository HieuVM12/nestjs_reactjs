import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import requestApi from '../helpers/api'

const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const users = requestApi('/user', 'get');
        const products = requestApi('/product', 'get');
        Promise.all([users, products]).then((res) => {
            setData({
                ...data, totalUser: res[0].data.total, totalProduct: res[1].data.total
            })
        })
    }, [])
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Tong so nguoi dung
                                    {data.totalUser && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {data.totalUser}
                                    </span>)}
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/' className="small text-white stretched-link">Nguoi dung</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Tong san pham
                                    {data.totalProduct && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {data.totalProduct}
                                    </span>)}</div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/products' className="small text-white stretched-link">San pham</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
