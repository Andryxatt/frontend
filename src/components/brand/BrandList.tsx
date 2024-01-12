import BrandNew from "./BrandNew";
import BrandItem from "./BradnItem";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetBrandsQuery } from '../../api/apiSlice'
import { Brand } from "../../models/brand.model";
import { useState } from "react";

const BrandList = () => {

  const [showBrandNew, setShowBrandNew] = useState(false)
  const {
    data: brands,
    isLoading,
    isSuccess,
    isError,
    error } = useGetBrandsQuery(undefined, { refetchOnMountOrArgChange: true }) as any;
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = brands?.map((brand: Brand) => <BrandItem key={brand.id} brand={brand} />)
  } else if (isError) {
    content = <><tr><td>Немає данних</td></tr></>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowBrandNew(cur => !cur)} className="bg-slate-600 text-white p-2 rounded-sm">Додати бренд</button>
      {showBrandNew && <BrandNew />}
      <table className="border-separate border border-spacing-2 border-slate-500 w-full">
        <thead className="">
          <tr>
            <th className="border border-sborder border-slate-600">ID</th>
            <th className="border border-sborder border-slate-600">Назва</th>
            <th className="border border-sborder border-slate-600">Опис</th>
            <th className="border border-sborder border-slate-600">Логотип</th>
            <th className="border border-sborder border-slate-600">Дії</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {content}
        </tbody>
      </table>
   
    </DashboardLayout>
  )
}
export default BrandList;