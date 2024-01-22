import { useState } from "react";
import { useGetProductsQuery } from "../../api/apiSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Product } from "../../models/product.model";
import ProductItem from "./ProductItem";
import ProductNew from "./ProductNew";
import React from "react";
const ProductList = () => {
  const [page,] = useState(1);
  const [search,] = useState('');
  const [limit, setLimit] = useState(1);
  const loadButtonRef = React.useRef<HTMLButtonElement>(null)
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error } = useGetProductsQuery({ page, limit, search });
  React.useEffect(() => {
    if (!isLoading) {
      // Focus the button after data is loaded
      if (loadButtonRef.current) {
        loadButtonRef.current.focus();
      }
    }
  }, [isLoading]);
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = data.products?.map((product: Product) =>
      <ProductItem key={product.id} product={product} />
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full">
        <ProductNew />
        <div className="w-full border-2 border-gray-300 mt-4 p-4 rounded-md shadow-md">
          <div className="flex flex-row justify-between p-3 border-b-2 border-gray-200">
            <span className="font-bold">ID</span>
            <span>Name</span>
            <span>Model</span>
            <span>Brand</span>
            <span>Categories</span>
            <span>Sizes</span>
            <span>Images</span>
            <span>Actions</span>
          </div>
          {content}
        </div>
        <button
          ref={loadButtonRef}
          disabled={isLoading || data.total <= data.products?.length}
          className={`w-[220px] self-center mt-4 p-4 rounded-lg ${isLoading || data.total <= data.products?.length ? "bg-gray-400" : "bg-green-400"
            }`}
          onClick={() => { setLimit((cur) => data.total > data.products?.length ? cur += 10 : cur) }}
        >
          {isLoading ? (
            // Show a loading spinner when the data is loading
            <div className="spinner">
              Loading...
            </div>
          ) : (
            // Show "Load More" text when not loading
            'Завантажити ще'
          )}
        </button>
      </div>
    </DashboardLayout>
  )
}
export default ProductList;

