import DashboardLayout from "../../layouts/DashboardLayout";
import CategoryNew from "./CategoryNew";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from '../../api/apiSlice'
import { useState } from "react";
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
        isError,
        error } = useGetCategoriesQuery<CategoriesApiResponse>(undefined, { refetchOnMountOrArgChange: true});
    let content

    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = categories.map((category:any) => <CategoryItem  key={category.id} category={category}/>)
    } else if (isError) {
      content = <div>{error?.toString()}</div>
    }
    return (
        <DashboardLayout>
          <button onClick={() => setShowCategoryNew(cur => !cur)} className={"bg-slate-600 text-white p-2 rounded-sm"}>Додати категорію</button>
          {showCategoryNew && <CategoryNew/>}
            <table className="border-separate border border-spacing-2 border-slate-500 w-full">
                <thead className="">
                    <tr className="">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
               
                </thead>
      <tbody className="w-full">
        {content}
      </tbody>
            </table>
        </DashboardLayout>
    )
}
export default CategoryList;