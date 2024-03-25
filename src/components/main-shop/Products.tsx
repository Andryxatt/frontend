import { ProductInformation } from "../../models/product.model";
import SingleProduct from "./SingleProduct";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/product.slice";
import { AppDispatch } from "../../store/store";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import ActiveBar from "./activebar/ActiveBar";
import styles from "./Products.module.sass";
import { Grid } from "react-loader-spinner";
const Products = () => {
  const products = useAppSelector((state: { productSlice: { products: any; }; }) => state.productSlice.products);
  const isLoaded = useAppSelector((state: { productSlice: { loading: boolean; }; }) => state.productSlice.loading);
  const dispatch = useDispatch<AppDispatch>();
  const filters = useAppSelector((state) => state.blackListSlice);
  const [gridSize, setGridSize] = useState(4);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    
     const products = fetchProducts(filters);
    dispatch(products);
  }, []);
  const loadMore = () => {
    // Fetch +10 more products
  }

  return (
    <>
      <div onClick={toggleFilters} className={`${showFilters === true ? styles.backdropshadow + ' ' + styles.active : ''}`}>  </div>
      <div className="flex flex-row justify-between items-center">
        <span> {products?.length} Товарів </span>
        <div className={styles.gridControlls}>
          <button onClick={() => setGridSize(3)} className="pr-2"><BsFillGrid3X3GapFill /></button>
          <button onClick={() => setGridSize(4)} className="pr-2"><BsFillGridFill /></button>
        </div>
      </div>
      <hr className="mb-4 sm:items-center" />
      <div className={styles.wrapper}>
      <div className={`${styles.productsWrapper} ${gridSize === 3 ? styles.gridCol3 : styles.gridCol4}`}>
        {isLoaded ? (
          <div className={styles.centeredLoading}> {/* Centered loading indicator */}
            <Grid
              visible={true}
              height="80"
              width="80"
              color="#ffcc33"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}} // You can add additional styles here if needed
              wrapperClass="grid-wrapper"
            />
          </div>
        ) : products?.length > 0 ? (
          products.map((product: ProductInformation) => <SingleProduct key={product.id} product={product} />)
        ) : (
          <h1>Не знайдено товарів за заданними критеріями!</h1>
        )}
      </div>
        <ActiveBar toggleFilters={toggleFilters} showFilters={showFilters} />
        <button onClick={toggleFilters} className={styles.toggleFiltersButton}>
          Фільтри
        </button>
      </div>
      <button onClick={loadMore}>Load More</button>

    </>
  );
}

export default Products;