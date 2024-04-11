import BrandNew from "./BrandNew";
import BrandItem from './BradnItem';
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { useGetBrandsQuery } from '../../../api/apiSlice'
import { Brand } from "../../../models/brand.model";
import { useState } from "react";

type BrandsApiResponse = {
  data: any[],
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: string | null
}

const BrandList = () => {
  const [showBrandNew, setShowBrandNew] = useState(false)
  const {
    data: brands,
    isLoading,
    isSuccess,
    isError
  } = useGetBrandsQuery<BrandsApiResponse>(undefined, { refetchOnMountOrArgChange: true }) as any;
  const renderContent = () => {
    if (isLoading) {
      return <></>;
    } else if (isSuccess) {
      return brands?.map((brand: Brand) => <BrandItem key={brand.id} brand={brand} />);
    } else if (isError) {
      return <tr><td>Немає данних</td></tr>;
    }
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => setShowBrandNew(cur => !cur)}
        className="bg-slate-600 text-white p-2 rounded-sm">
        Додати бренд
      </button>
      {showBrandNew && <BrandNew />}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-dark-dark uppercase bg-dark-light dark:bg-dark-dark dark:text-dark-light">
          <tr>
            <th scope="col" className="px-3 py-2">
              <div className="flex items-center">
                ID
                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg></a>
              </div>
            </th>
            <th scope="col" className="px-3 py-2">
              <div className="flex items-center">
                Назва
                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg></a>
              </div>
            </th>
            <th scope="col" className="px-3 py-2">
              <div className="flex items-center">
                Опис
              </div>
            </th>
            <th scope="col" className="px-3 py-2">
              <div className="flex items-center">
                Логотип
              </div>
            </th>
            <th scope="col" className="px-3 py-2">
              <div className="flex items-center">
                Дії
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {renderContent()}
        </tbody>
      </table>
    </DashboardLayout>
  )
}

export default BrandList;