import DashboardLayout from "../../layouts/DashboardLayout";
import SubCategoryItem from "./SubCategoryItem";
import SubCategoryNew from "./SubCategoryNew";
import { useGetSybCategoriesQuery } from "../../api/apiSlice";
const SubCategoryList = () => {
    const { 
        data: subCategories,
         isLoading,
        isSuccess,
        isError,
        error } = useGetSybCategoriesQuery(undefined, { refetchOnMountOrArgChange: true});

    let content
    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = subCategories.map((subCategory:any) => <SubCategoryItem  key={subCategory.id} subCategory={subCategory}/>)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return(
        <DashboardLayout>
            <div className="container mx-auto flex flex-row">
                <SubCategoryNew/>
                <div className="w-full ml-2">
                    <div className="flex flex-row justify-between p-3 w-[100%]">
                        <div>ID</div>
                        <span>Name</span>
                        <span>Description</span>
                        <span>Category</span>
                        <span>Action</span>
                    </div>
                  {content}
                </div>

            </div>
        </DashboardLayout>
    )
}
export default SubCategoryList;


