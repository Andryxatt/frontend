import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Dashboard from './pages/Dashboard.tsx'
import BrandList from './components/dahsboard/brand/BrandList.tsx'
import ProductList from './components/dahsboard/products/ProductList.tsx'
import CategoryList from './components/dahsboard/category/CategoryList.tsx'
import SubCategoryList from './components/dahsboard/subCategory/SubCategoryList.tsx'
import SizeList from './components/dahsboard/size/SizeList.tsx'
import ProductEdit from './components/dahsboard/products/ProductEdit.tsx'
import Main from './pages/Main.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Account from './pages/Account.tsx'
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'
import ProductDetails from './components/main-shop/ProductDetails.tsx'
import Products from './components/main-shop/Products.tsx'
import SeasonesList from './components/dahsboard/seasone/SeasoneList.tsx'
import ColorList from './components/dahsboard/color/ColorList.tsx'
import GenderList from './components/dahsboard/gender/GenderList.tsx'
import FeatureList from './components/dahsboard/feature/FeatureList.tsx'
import DiscountList from './components/dahsboard/discount/DiscountList.tsx'
import BrandEdit from './components/dahsboard/brand/BrandEdit.tsx'
import CategoryEdit from './components/dahsboard/category/CategoryEdit.tsx';
import SubCategoryEdit from './components/dahsboard/subCategory/SubCategoryEdit.tsx';
import ColorEdit from './components/dahsboard/color/ColorEdit.tsx';
import DiscountEdit from './components/dahsboard/discount/DiscountEdit.tsx';
import SizeEdit from './components/dahsboard/size/SizeEdit.tsx';
import FeatureEdit from './components/dahsboard/feature/FeatureEdit.tsx';
import GenderEdit from './components/dahsboard/gender/GenderEdit.tsx';
import SeasoneEdit from './components/dahsboard/seasone/SeasoneEdit.tsx';
import LoadDataWithFile from './components/dahsboard/products/LoadDataWithFile.tsx';
import LikedProducts from './components/main-shop/LikedProducts.tsx';
import NotFound from './components/errors/NotFound.tsx';
import Cart from './components/main-shop/shopping-cart/Cart.tsx';
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
          <Route path="/dashboard/brands/:id" element={<BrandEdit />} />
          <Route path="/dashboard/categories/:id" element={<CategoryEdit />} />
          <Route path="/dashboard/categories" element={<CategoryList />} />
          <Route path="/dashboard/sub-categories" element={<SubCategoryList />} />
          <Route path="/dashboard/sub-categories/:id" element={<SubCategoryEdit />} />
          <Route path="/dashboard/sizes" element={<SizeList />} />
          <Route path="/dashboard/sizes/:id" element={<SizeEdit />} />
          <Route path="/dashboard/seasones" element={<SeasonesList />} />
          <Route path="/dashboard/seasones/:id" element={<SeasoneEdit />} />
          <Route path="/dashboard/genders" element={<GenderList />} />
          <Route path="/dashboard/genders/:id" element={<GenderEdit />} />
          <Route path="/dashboard/colores" element={<ColorList />} />
          <Route path="/dashboard/colores/:id" element={<ColorEdit />} />
          <Route path="/dashboard/features" element={<FeatureList />} />
          <Route path="/dashboard/features/:id" element={<FeatureEdit />} />
          <Route path="/dashboard/discounts" element={<DiscountList />} />
          <Route path="/dashboard/discounts/:id" element={<DiscountEdit />} />
          <Route path="/dashboard/products" element={<ProductList />} />
          <Route path="/dashboard/loadexcel" element={<LoadDataWithFile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard/products/edit/:id" element={<ProductEdit/>} />
          <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/dashboard/products/:id" element={<ProductEdit/>} />
          <Route path="/acount" element={<Account/>} />
          <Route path="/liked" element={<LikedProducts/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
