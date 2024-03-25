
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useGetDiscountsQuery } from '../../../api/apiSlice'
import DiscountItem from "./DiscountItem";
import { Discount } from "../../../models/discount.model";
import DiscountNew from "./DiscountNew";
import { useState } from "react";
const DiscountList = () => {
  const [showDiscountNew, setShowDiscountNew] = useState(false)
  const {
    data,
    isLoading,
    isSuccess,
    isError } = useGetDiscountsQuery(undefined, { refetchOnMountOrArgChange: true });
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = data?.map((discount: Discount) => <DiscountItem key={discount.id} discount={discount} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowDiscountNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати знижку</button>
      {showDiscountNew && <DiscountNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr className="flex flex-row justify-between p-3 w-[100%]">
            <td scope="col" className="px-6 py-4">ID</td>
            <td scope="col" className="px-6 py-4">Процент</td>
            <td scope="col" className="px-6 py-4">Дії</td>
          </tr>
          {content}
        </thead>
      </table>
    </DashboardLayout>
  )
}
export default DiscountList;