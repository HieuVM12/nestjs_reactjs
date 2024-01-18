import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import requestApi from '../../helpers/api'
import { toast } from 'react-toastify'

const UpdateProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState([]);
    const idProduct = useParams();
    const handleSubmitFormAdd = async (data) => {
        let formData = new FormData();
        for (let key in data) {
            if (key == 'image') {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        try {
            const res = await requestApi('/product/create', 'POST', formData, 'json', 'multipart/form-data');
            toast.success('them san pham thanh cong', { position: 'top-right', autoClose: 2000 });
            navigate('/products');
        } catch (error) {
            toast.error('loi roi', { position: 'top-right', autoClose: 2000 });
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            const renderData = async () => {
                const res = await requestApi('/category', 'GET');
                setCategories(res.data.data);
                const detailProduct = await requestApi(`/product/${idProduct.id}`, 'GET');
                console.log(detailProduct);
                const fields = ['name', 'description', 'image', 'category'];
            }
        } catch (error) {

        }
    }, [])

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage(reader.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Cap nhat san pharm</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to='/products'>Sản phẩm</Link></li>
                        <li className='breadcrumb-item active'>Cap nhat sản phẩm</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            cap nhat
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Ten san pham</label>
                                            <input {...register('name', { required: 'nhap ten san pham' })} type='text' className='form-control' placeholder='nhap ten san pham' />
                                            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>mo ta san pham</label>
                                            <input {...register('description', { required: 'nhap mo ta san pham' })} type='text' className='form-control' placeholder='nhap mo ta san pham' />
                                            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Anh san pham</label>
                                            <br />
                                            {image && <img src={image} className='mb-2' alt='.' style={{ width: '300px' }} />}
                                            <input {...register('image', { required: 'them anh san pham', onChange: onImageChange })} type='file' className='form-control' accept='image/*' />
                                            {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Danh mục</label>
                                            <select {...register('category', { required: 'chonj danh muc' })} className='form-select'>
                                                <option value="">--chọn danh mục--</option>
                                                {categories.map(category => {
                                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                                })}
                                            </select>
                                            {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
                                        </div>
                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Them san pham</button>
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

export default UpdateProduct