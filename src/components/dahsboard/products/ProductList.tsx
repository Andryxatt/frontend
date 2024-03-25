import { useState } from "react";
import { useGetProductsQuery } from "../../../api/apiSlice";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Product } from "../../../models/product.model";
import ProductItem from "./ProductItem";
import ProductNew from "./ProductNew";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
const ProductList = () => {
  const [showProductNew, setShowProductNew] = useState(false)
  const loadButtonRef = React.useRef<HTMLButtonElement>(null)
  const filters = useAppSelector((state) => state.blackListSlice);
  const {
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetProductsQuery<any>(filters);
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
    content = data?.products.map((product: Product) =>
      <ProductItem key={product.id} product={product} />
    )
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  const loadMore = () => {
    // Fetch +10 more products
  }
  return (
    <DashboardLayout>
      <div className="p-4">
        <button onClick={() => setShowProductNew(cur => !cur)} className="bg-slate-600 mr-2 text-white p-2 rounded-md">Додати товар</button>
        <Link className="bg-slate-600 mr-2 text-white p-2 rounded-md" to="/dashboard/loadexcel">Завантажити за допомогою фалу</Link>
      </div>

      {showProductNew && <ProductNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="w-full border-2 border-gray-300 mt-4 p-4 rounded-md shadow-md">
          <tr>
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">Назва</th>
            <th scope="col" className="px-6 py-4">Модель</th>
            <th scope="col" className="px-6 py-4">Бренд</th>
            <th scope="col" className="px-6 py-4">Категорія</th>
            <th scope="col" className="px-6 py-4">Розміри</th>
            <th scope="col" className="px-6 py-4">Зображення</th>
            <th scope="col" className="px-6 py-4">Дії</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
      <button
        ref={loadButtonRef}
        disabled={isLoading || data?.total <= data?.products?.length}
        className={`w-[220px] self-center mt-4 p-4 rounded-lg
           ${isLoading || data.total <= data?.products?.length ? "bg-gray-400" : "bg-green-400"
          }`}
        onClick={loadMore}
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
    </DashboardLayout>
  )
}
export default ProductList;

