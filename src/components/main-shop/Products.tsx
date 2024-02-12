// import { Product } from "../../models/product.model";
// import SingleProduct from "./SingleProduct";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/product.slice";
import { AppDispatch } from "../../store/store";
import { loadMoreProduct } from "../../store/slices/blacklist.slice";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import MainLayout from "../../layouts/MainLayout";
import ActiveBar from "./ActiveBar";
import styles from "./Products.module.sass";
const Products = () => {
  const products = useAppSelector((state) => state.productSlice.products);
  const limit = useAppSelector((state) => state.blackListSlice.limit);
  const filters = useAppSelector((state) => state.blackListSlice.filters);
  const search = useAppSelector((state) => state.blackListSlice.search);
  const dispatch = useDispatch<AppDispatch>();
  const [gridSize, setGridSize] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  useEffect(() => {
    const activeFilters = filters.map((filter: any) => ({
      name: filter.name,
      elements: filter.elements.filter(({ status }: any) => status)
    }));
    const products = fetchProducts({ page: 1, limit: 10, search, filters: JSON.stringify(activeFilters ?? '[]') });
    console.log(products);
    // dispatch(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, filters, search]);
  const loadMore = () => {
    dispatch(loadMoreProduct(limit + 10));
  }
  
  return (
    <MainLayout>
      <div className="flex flex-row justify-between items-center">
        <span> {products?.length} Товарів </span>
        <div className={styles.gridControlls}>
          <button onClick={() => setGridSize(3)} className="pr-2"><BsFillGrid3X3GapFill /></button>
          <button onClick={() => setGridSize(4)} className="pr-2"><BsFillGridFill /></button>
        </div>
      </div>
      <hr className="mb-4" />
      <div className={styles.wrapper}>
        <div className={`${styles.productsWrapper} ${gridSize === 3 ? styles.gridCol3 : styles.gridCol4}`}>
          {/* {
            products?.length > 0 ? products?.map((product: Product) => <SingleProduct key={product.id} product={product} />) : <h1>Не знайдено товарів за заданними критеріями!</h1>
          } */}
        </div>
        <ActiveBar toggleFilters={toggleFilters} showFilters={showFilters} />
        <button onClick={toggleFilters} className={styles.toggleFiltersButton}>
          Фільтри
        </button>
      </div>
      <button onClick={() => { loadMore() }}>Load More</button>
    </MainLayout>
  );

}

export default Products;