import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Dashboard from './pages/Dashboard.tsx'
import BrandList from './components/brand/BrandList.tsx'
import ProductList from './components/products/ProductList.tsx'
import CategoryList from './components/category/CategoryList.tsx'
import SubCategoryList from './components/subCategory/SubCategoryList.tsx'
import SizeList from './components/size/SizeList.tsx'
import ProductEdit from './components/products/ProductEdit.tsx'
import Main from './pages/Main.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import AccountInformation from './pages/acount/AccountInformation.tsx'
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'
import ProductDetails from './components/main-shop/ProductDetails.tsx'
import Products from './components/main-shop/Products.tsx'
import SeasonesList from './components/seasone/SeasoneList.tsx'
import ColorList from './components/color/ColorList.tsx'
import GenderList from './components/gender/GenderList.tsx'
import FeatureList from './components/feature/FeatureList.tsx'
import DiscountList from './components/discount/DiscountList.tsx'
import BrandEdit from './components/brand/BrandEdit.tsx'
import CategoryEdit from './components/category/CategoryEdit.tsx';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} index />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/brands" element={<BrandList />} />
          <Route path="/dashboard/brands/:id" Component={BrandEdit} />
          <Route path="/dashboard/categories/:id" element={<CategoryEdit />} />
          <Route path="/dashboard/categories" element={<CategoryList />} />
          <Route path="/dashboard/sub-categories" element={<SubCategoryList />} />
          <Route path="/dashboard/sizes" element={<SizeList />} />
          <Route path="/dashboard/seasones" element={<SeasonesList />} />
          <Route path="/dashboard/genders" element={<GenderList />} />
          <Route path="/dashboard/colores" element={<ColorList />} />
          <Route path="/dashboard/features" element={<FeatureList />} />
          <Route path="/dashboard/discounts" element={<DiscountList />} />
          <Route path="/dashboard/products" element={<ProductList />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/products/:id" Component={ProductDetails} />
          <Route path="/dashboard/products/:id" Component={ProductEdit} />
          <Route path="/acount" Component={AccountInformation} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
