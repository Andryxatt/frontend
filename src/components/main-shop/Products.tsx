import { Product } from "../../models/product.model";
import SingleProduct from "./SingleProduct";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/product.slice";
import { AppDispatch } from "../../store/store";
import { loadMoreProduct, setActiveFilters } from "../../store/slices/blacklist.slice";
import { useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa6";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import MainLayout from "../../layouts/MainLayout";
import ActiveBar from "./ActiveBar";
import Breadcrumb from "./Breadcrumb";
const Products = () => {
  const location = useLocation();
  const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);
  const products = useAppSelector((state) => state.productSlice.products);
  const limit = useAppSelector((state) => state.blackListSlice.limit);
  const filters = useAppSelector((state) => state.blackListSlice.filters);
  const search = useAppSelector((state) => state.blackListSlice.search);
  const [gridSize, setGridSize] = useState(3);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const products = fetchProducts({ page: 1, limit: 10, search, filters: JSON.stringify(filters) });
    dispatch(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, filters]);
  const loadMore = () => {
    dispatch(loadMoreProduct(limit + 10));
  }
  return (
    <MainLayout>
      <div className="flex flex-row justify-between items-center">
        <span> {products.length} Товарів </span>
        <div className="flex flex-row items-center justify-between">
          <button onClick={() => setGridSize(3)} className="pr-2"><BsFillGrid3X3GapFill /></button>
          <button onClick={() => setGridSize(4)} className="pr-2"><BsFillGridFill /></button>
        </div>

      </div>
      <hr className="mb-4" />
      <div className="flex flex-row">
        <div className={`sm:flex flex-wrap md:grid ${gridSize === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {
            products?.map((product: Product) => <SingleProduct key={product.id} product={product} />)
          }
        </div>
        <ActiveBar />
      </div>

      <button onClick={() => { loadMore() }}>Load More</button>
    </MainLayout>
  );

}

export default Products;