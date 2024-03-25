
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useGetFeaturesQuery } from '../../../api/apiSlice'
import { Feature } from "../../../models/feature.model";
import FeatureItem from "./FeatureItem";
import FeatureNew from "./FeatureNew";
import { useState } from "react";
const FeatureList = () => {
  const [showFeatureNew, setShowFeatureNew] = useState(false)
  const {
    data,
    isLoading,
    isSuccess,
    isError } = useGetFeaturesQuery(undefined, { refetchOnMountOrArgChange: true });
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = data?.map((feature: Feature) => <FeatureItem key={feature.id} feature={feature} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowFeatureNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати характеристику</button>
      {showFeatureNew && <FeatureNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">Назва</th>
            <th scope="col" className="px-6 py-4">Опис</th>
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
export default FeatureList;