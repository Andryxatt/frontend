import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetSeasonesQuery } from '../../api/apiSlice'
import SeasoneItem from "./SeasoneItem";
import SeasoneNew from "./SeasoneNew";
import { useState } from "react";
const SeasonesList = () => {
  const [showSeasoneNew, setShowSeasoneNew] = useState(false)
  const {
    data: seasones,
    isLoading,
    isSuccess,
    isError } = useGetSeasonesQuery(undefined, { refetchOnMountOrArgChange: true });
  let content

  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = seasones.map((seasone: any) => <SeasoneItem key={seasone.id} seasone={seasone} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowSeasoneNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати сезон</button>
      {showSeasoneNew && <SeasoneNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr className="flex flex-row justify-between p-3 w-[100%]">
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
export default SeasonesList;