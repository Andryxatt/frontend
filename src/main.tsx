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
import SubCategoryEdit from './components/subCategory/SubCategoryEdit.tsx';
import ColorEdit from './components/color/ColorEdit.tsx';
import DiscountEdit from './components/discount/DiscountEdit.tsx';
import SizeEdit from './components/size/SizeEdit.tsx';
import FeatureEdit from './components/feature/FeatureEdit.tsx';
import GenderEdit from './components/gender/GenderEdit.tsx';
import SeasoneEdit from './components/seasone/SeasoneEdit.tsx';
import LoadDataWithFile from './components/products/LoadDataWithFile.tsx';
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
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/dashboard/products/edit/:id" element={<ProductEdit/>} />
          <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/dashboard/products/:id" element={<ProductEdit/>} />
          <Route path="/acount" element={<AccountInformation/>} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
