import { useState } from "react";
import { useGetSizesQuery } from "../../../api/apiSlice";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Size } from "../../../models/size.model";
import SizeItem from "./SizeItem";
import SizeNew from "./SizeNew";

const SizeList = () => {
  const [showSizeNew, setShowSizeNew] = useState(false)
  const {
    data: sizes,
    isLoading,
    isSuccess,
    isError } = useGetSizesQuery({});
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = sizes?.map((sizeItem: Size) => <SizeItem key={sizeItem.id} sizeItem={sizeItem} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowSizeNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати розмір</button>
      {showSizeNew && <SizeNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">CM</th>
            <th scope="col" className="px-6 py-4">EU</th>
            <th scope="col" className="px-6 py-4">USA</th>
            <th scope="col" className="px-6 py-4">Устілка</th>
            <th scope="col" className="px-6 py-4">Action</th>
          </tr>
          {content}
        </thead>

      </table>
    </DashboardLayout>
  )
}
export default SizeList