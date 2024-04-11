import { ProductInformation } from "../../models/product.model";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/product.slice";
import { AppDispatch } from "../../store/store";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import styles from "./Products.module.sass";
import ProductsGrid from "./ProductsGrid";
import { setActiveFilters, setLimit } from "../../store/slices/blacklist.slice";
import useDebounce from "../../customHooks/useDebounce";
import MainLayout from "../../layouts/MainLayout";
const Products = () => {
  const products = useAppSelector((state: { productSlice: { products: ProductInformation[]; }; }) => state.productSlice.products);
  const dispatch = useDispatch<AppDispatch>();
  const filters = useAppSelector((state) => state.blackListSlice.filters);
  const isActive = useAppSelector((state) => state.blackListSlice.isActive);
  const [gridSize, setGridSize] = useState(4);

  const throttledFiltersObject = useDebounce(filters, 1000);
  const loadMore = () => {  
    dispatch(setLimit());
  }
  useEffect(() => {
    const fetchAndDispatchProducts = async () => {
      dispatch(fetchProducts(throttledFiltersObject));
    };
    fetchAndDispatchProducts();
  }, [throttledFiltersObject, dispatch]);
  return (
    <MainLayout>
      <div className="flex flex-row justify-between items-center">
        <span> {products?.length} Товарів </span>
        <div className={styles.gridControlls}>
          <button onClick={() => setGridSize(3)} className="pr-2"><BsFillGrid3X3GapFill /></button>
          <button onClick={() => setGridSize(4)} className="pr-2"><BsFillGridFill /></button>
        </div>
        <button onClick={() => dispatch(setActiveFilters(!isActive))} >
          Фільтри та сортування
        </button>
      </div>
      <hr className="mb-4 sm:items-center" />
      <div className={styles.wrapper}>
        <div className={`${styles.productsWrapper} ${gridSize === 3 ? styles.gridCol3 : styles.gridCol4}`}>
      { products?.length > 0 ? 
            <ProductsGrid products={products} />
           : 
            <h1>Не знайдено товарів за заданними критеріями!</h1>
          }
        </div>
      </div>
      <button onClick={loadMore}>Показати ще</button>
    </MainLayout>
  );
}

export default Products;