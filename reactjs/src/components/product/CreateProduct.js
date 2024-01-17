import React from 'react'
import { Link } from 'react-router-dom'

const CreateProduct = () => {
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Create Product</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to='/products'>Sản phẩm</Link></li>
                        <li className='breadcrumb-item active'>Thêm sản phẩm</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Theem
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Ten san pham</label>
                                            <input type='text' className='form-control' placeholder='nhap ten san pham' required />
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>mo ta san pham</label>
                                            <input type='text' className='form-control' placeholder='nhap mo ta san pham' required />
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Anh san pham</label>
                                            <input type='file' className='form-control' />
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Danh mục</label>
                                            <select></select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateProduct