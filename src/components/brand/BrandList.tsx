import BrandNew from "./BrandNew";
import BrandItem from "./BradnItem";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetBrandsQuery } from '../../api/apiSlice'
import { Brand } from "../../models/brand.model";
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
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = brands?.map((brand: Brand) => <BrandItem key={brand.id} brand={brand} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowBrandNew(cur => !cur)} className="bg-slate-600 text-white p-2 rounded-sm">Додати бренд</button>
      {showBrandNew && <BrandNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">Назва</th>
            <th scope="col" className="px-6 py-4">Опис</th>
            <th scope="col" className="px-6 py-4">Логотип</th>
            <th scope="col" className="px-6 py-4">Дії</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>

    </DashboardLayout>
  )
}
export default BrandList;