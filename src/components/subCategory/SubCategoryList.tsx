import DashboardLayout from "../../layouts/DashboardLayout";
import SubCategoryItem from "./SubCategoryItem";
import SubCategoryNew from "./SubCategoryNew";
import { useState } from "react";
import { useGetSybCategoriesQuery } from "../../api/apiSlice";
type SubCategoriesApiResponse = {
  data: any[],
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: string | null
}
const SubCategoryList = () => {
  const [showSubCategoryNew, setShowSubCategoryNew] = useState(false)
  const {
    data: subCategories,
    isLoading,
    isSuccess,
    isError } = useGetSybCategoriesQuery<SubCategoriesApiResponse>(undefined, { refetchOnMountOrArgChange: true });
  let content
  if (isLoading) {
    content = <></>
  } else if (isSuccess) {
    content = subCategories?.map((subCategory: any) => <SubCategoryItem key={subCategory.id} subCategory={subCategory} />)
  } else if (isError) {
    content = <tr><td>Немає данних</td></tr>
  }
  return (
    <DashboardLayout>
      <button onClick={() => setShowSubCategoryNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати підкатегорію</button>
      {showSubCategoryNew && <SubCategoryNew />}
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr className="flex flex-row justify-between p-3 w-[100%]">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
          {content}
        </thead>
      </table>
    </DashboardLayout>
  )
}
export default SubCategoryList;


