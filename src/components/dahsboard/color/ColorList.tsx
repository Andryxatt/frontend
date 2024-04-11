
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { useGetColoresQuery } from '../../../api/apiSlice'
import ColorItem from "./ColorItem";
import { Color } from "../../../models/color.model";
import ColorNew from "./ColorNew";
import { useState } from "react";
type ColoresApiResponse = {
  data: any[],
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: string | null
}
const ColorList = () => {
  const [showColorNew, setShowColorNew] = useState(false)
  const {
    data,
    isLoading,
    isSuccess,
    isError } = useGetColoresQuery<ColoresApiResponse>(undefined, { refetchOnMountOrArgChange: true });
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = data?.map((color: Color) => <ColorItem key={color.id} color={color} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowColorNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати колір</button>
      {showColorNew && <ColorNew />}
      <table className="min-w-full text-left text-sm font-ligh">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr className="flex flex-row justify-between p-3 w-[100%]">
            <th>ID</th>
            <th>Назва</th>
            <th>Hex колір</th>
            <th>Дії</th>
          </tr>
          {content}
        </thead>
      </table>
    </DashboardLayout>
  )
}
export default ColorList;