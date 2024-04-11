import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { useGetGendersQuery } from '../../../api/apiSlice'
import { Gender } from "../../../models/gender.model";
import GenderItem from "./GenderItem";
import GenderNew from "./GenderNew";
import { useState } from "react";
const GenderList = () => {
  const [showGenderNew, setShowGenderNew] = useState(false)
  const {
    data,
    isLoading,
    isSuccess,
    isError } = useGetGendersQuery(undefined, { refetchOnMountOrArgChange: true });
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = data.map((gender: Gender) => <GenderItem key={gender.id} gender={gender} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowGenderNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати стать</button>
      {showGenderNew && <GenderNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">Назва</th>
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
export default GenderList;