import { Product } from "../../models/product.model";
import SingleProduct from "./SingleProduct";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { fetchProducts } from "../../store/slices/product.slice";
import { AppDispatch } from "../../store/store";
import { loadMoreProduct, setActiveFilters } from "../../store/slices/blacklist.slice";
import { useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa6";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import MainLayout from "../../layouts/MainLayout";
const Products = () => {
  const location = useLocation();
  const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);
  const products = useAppSelector((state) => state.productSlice.products);
  const limit = useAppSelector((state) => state.blackListSlice.limit);
  const total = useAppSelector((state) => state.productSlice.total);
  const [gridSize, setGridSize] = useState(4);
  const columnClass = `grid grid-cols-${gridSize} gap-4 mt-4 mb-4`;
  const dispatch = useDispatch<AppDispatch>();
  // const fetchData = useCallback(async () => {
  //   const params = { page: 1, limit: limit !== undefined ? limit : 10, search: "" };
  //   await dispatch(fetchProducts(params));
  // }, [limit]);

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [limit]);
  const loadMore = () => {
    dispatch(loadMoreProduct(limit + 10));
  }
  

  // Define the dynamic column class using Tailwind CSS classes
  
  return (
    <MainLayout>
      <p>Головна {location.pathname} </p>
      <hr className="mt-4" />
      <div className="flex flex-row justify-between items-center">
        <span> {total} Товарів </span>
        <div className="flex flex-row items-center justify-between">
          <button className="flex p-4 items-center mr-3" onClick={() => dispatch(setActiveFilters(!isActiveFilter))}><FaFilter /> <span className="pl-2">Фільтри і сортування</span></button>
          <button onClick={()=>setGridSize(4)} className="pr-2"><BsFillGrid3X3GapFill/></button>
          <button onClick={()=>setGridSize(2)} className=""><BsFillGridFill /></button>
        </div>

      </div>
      <hr className="mb-4" />
      <div className={columnClass}>
        {
          products?.map((product: Product) => <SingleProduct key={product.id} product={product} />)
        }
      </div>
      <button onClick={() => { loadMore() }}>Load More</button>
    </MainLayout>
  );

}

export default Products;