import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(Date.now());
  const [deleteItem, setDeleteItem] = useState(null);
  const [search, setSearch] = useState('');
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
      name: 'hinhf anh',
      element: row => <img width="100px" src={"http://localhost:5000/" + row.image} />
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
          <Link to={`/product/edit/${row.id}`} className='btn btn-warning btn-sm me-1'>Sua</Link>
          <button type='button' className='btn btn-danger btn-sm me-1' onClick={() => deleteProduct(row.id)}>Xoa</button>
        </>
      )
    }
  ]

  const deleteProduct = (id) => {
    setShowModal(true)
    setDeleteItem(id)
  }
  const requestDeleteApi = () => {
    requestApi(`/product/${deleteItem}`, 'DELETE', []).then(response => {
      setShowModal(false)
      toast.success('xoa thanh cong', { position: 'top-right' })
      setRefresh(Date.now())
    }).catch(err => {
      toast.error('loi roi', { position: 'top-right' })
      setShowModal(false)
    })
  }
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}`;
    if (search) {
      query += `&search=${search}`;
    }
    requestApi(`/product${query}`, 'GET', []).then(response => {
      setProducts(response.data.data);
      setNumOfPage(response.data.lastPage);
      dispatch(actions.controlLoading(false));
    }).catch(err => {
      dispatch(actions.controlLoading(false));
    })
  }, [itemsPerPage, currentPage, search, refresh])
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>
          <div className='mb-3'>
            <Link to='/product/create' className='btn btn-sm btn-success me-2'><i className="fa fa-plus"></i>Add new</Link>
          </div>
          <DataTable
            name="Sản phẩm"
            data={products}
            columns={columns}
            numOfPage={numOfPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onChangeItemsPerPage={setItemsPerPage}
            onChangeSearch={setSearch}
          />
        </div>
      </main>
      <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
        <Modal.Header closeButton>
          <Modal.Title>Xac nhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          banj co chac muon xoa san pham nay?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Dong</Button>
          <Button className='btn-danger' onClick={requestDeleteApi}>Xoa</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductList