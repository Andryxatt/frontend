import {  useGetCategoriesQuery, useNewSubCategoryMutation } from "../../api/apiSlice";
const SubCategoryNew = () => {
    const [newSubCategory] = useNewSubCategoryMutation();
    const {data:categories,} = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any;
    const createNewCategory = (e: any) => {
        e.preventDefault();
        const name = e.target.namecategory.value;
        const description = e.target.description.value;
        const categoryId = e.target.categoryId.value;
        console.log(name, description, categoryId)
       newSubCategory({ name, description, categoryId }).unwrap()
    }
   
    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e)=>createNewCategory(e)}>
            <h1 className="font-bold mb-4">Create new category</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="namecategory">Name</label>
                    <input className="rounded-sm p-1" type="text" name="namecategory" id="namecategory" />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="description">Description</label>
                    <textarea className="rounded-sm p-2 text-sm" name="description" id="description" ></textarea>
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="categoryId">Category</label>
                    <select className="rounded-sm p-2 text-sm" name="categoryId" id="categoryId" >
                       {
                        categories?.map((category:any) => <option key={category.id} value={category.id}>{category.name}</option>)
                       }
                    </select>
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}
export default SubCategoryNew;