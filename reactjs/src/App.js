import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoutes from './layouts/PrivateRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import Layout from './layouts/Layout';
import 'react-toastify/dist/ReactToastify.css'
import ProductList from './components/product/ProductList';
import CreateProduct from './components/product/CreateProduct';
import './css/style.css';
import UpdateProduct from './components/product/UpdateProduct';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>


          </Route>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/product/create' element={<CreateProduct />} />
          <Route path='/product/edit/:id' element={<UpdateProduct />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
