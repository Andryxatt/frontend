import DashboardLayout from "../../layouts/DashboardLayout";
import CategoryNew from "./CategoryNew";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from '../../api/apiSlice'
import { useState } from "react";
import { Category } from "../../models/category.model";
type CategoriesApiResponse = {
  data: any[],
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: string | null
}
const CategoryList = () => {

  const [showCategoryNew, setShowCategoryNew] = useState(false)
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError } = useGetCategoriesQuery<CategoriesApiResponse>(undefined, { refetchOnMountOrArgChange: true });
  let content

  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = categories?.map((category: Category) => <CategoryItem key={category.id} category={category} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowCategoryNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати категорію</button>
      {showCategoryNew && <CategoryNew />}
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
export default CategoryList;