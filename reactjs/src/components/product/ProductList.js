import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const dispatch = useDispatch();
  const columns = [
    {
      name: "ID",
      element: row => row.id
    },
    {
      name: "ten san pham",
      element: row => row.name
    },
    {
      name: "mo ta",
      element: row => row.description
    },
    {
      name: "danh muc",
      element: row => row.category.name
    },
    {
      name: "ngay tao",
      element: row => row.created_at
    },
    {
      name: "ngay cap nhat",
      element: row => row.updated_at
    }, {
      name: "Hanh dong",
      element: row => (
        <>
          <button type='button' className='btn btn-sm btn-warning me-1'>Sua</button>
          <button type='button' className='btn btn-danger btn-sm me-1'>Xoa</button>
        </>
      )
    }
  ]
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}`;
    requestApi(`/product${query}`, 'GET', []).then(response => {
      setProducts(response.data.data);
      setNumOfPage(response.data.lastPage);
      dispatch(actions.controlLoading(false));
    }).catch(err => {
      dispatch(actions.controlLoading(false));
    })
  }, [itemsPerPage, currentPage])
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
          <DataTable
            name="Sản phẩm"
            data={products}
            columns={columns}
            numOfPage={numOfPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onChangeItemsPerPage={setItemsPerPage}
          />
        </div>

      </main>
    </div>
  )
}

export default ProductList