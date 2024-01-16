import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi('/product', 'GET', []).then(response => {
      console.log(response);
      setProducts(response.data.data);
      dispatch(actions.controlLoading(false));
    }).catch(err => {
      console.log(err);
      dispatch(actions.controlLoading(false));
    })
  }, [])
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>
          <div className='mb-3'>
            <button type='button' className='btn btn-sm btn-success me-2'><i className="fa fa-plus"></i> Add new</button>
          </div>
          <DataTable />
        </div>

      </main>
    </div>
  )
}

export default ProductList