import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import requestApi from '../helpers/api'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import * as actions from '../redux/actions/index'

const Login = () => {
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const onChange = (event) => {
        let target = event.target;
        setLoginData({
            ...loginData, [target.name]: target.value
        });
    }

    const onSubmit = () => {
        let valid = validateForm();
        if (valid) {
            dispatch(actions.controlLoading(true));
            requestApi('/auth/login', 'POST', loginData).then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                dispatch(actions.controlLoading(false));
                navigate('/');
            }).catch(err => {
                dispatch(actions.controlLoading(false));
                if (typeof err.response !== "undefined") {
                    if (err.response.status !== 201) {
                        toast.error(err.response.data.message, { position: 'top-right' })
                    } else {
                        toast.error('loi', { position: 'top-right' })
                    }
                }
            })
        }
        setIsSubmitted(true);
    }

    useEffect(() => {
        if (isSubmitted) {
            validateForm();
        }
    }, [loginData])

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (loginData.email === '' || loginData.email === undefined) {
            errors.email = 'nhap email';
        } else {
            let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email);
            if (!valid) {
                errors.email = 'email khong hop le';
            }
        }

        if (loginData.password === '' || loginData.password === undefined) {
            errors.password = 'nhap password';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false;
        } else {
            setFormErrors({});
        }
        return isValid;
    }

    return (
        <div id="layoutAuthentication" className='bg-primary'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="email" name='email' placeholder="name@example.com" onChange={onChange} />
                                                <label>Email address</label>
                                                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name='password' type="password" placeholder="Password" onChange={onChange} />
                                                <label>Password</label>
                                                {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <button className="btn btn-primary" type='button' onClick={onSubmit} >Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to='/register'>Đăng ký</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login
