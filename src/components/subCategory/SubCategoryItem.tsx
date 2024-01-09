import { useState } from "react";
import { useDeleteSubCategoryMutation, useGetCategoriesQuery, useUpdateSubCategoryMutation } from "../../api/apiSlice";
const SubCategoryItem = (subCategory:any) => {
    const [name, setName] = useState(subCategory.subCategory.name);
    const [description, setDescription] = useState(subCategory.subCategory.description);
    const [category, setCategory] = useState(subCategory.subCategory.categoryId);
    const [isEdit, setIsEdit] = useState(false);
    const [updateCategory] = useUpdateSubCategoryMutation();
    const [deleteCategory] = useDeleteSubCategoryMutation();
    const {data:categories,} = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any;
    const changeToEdit = () => {
        setIsEdit(!isEdit);
    }
    const cancelEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (subCat:any)=>{
       updateCategory({id: subCat.id, name, description, categoryId: category}).unwrap()
    }
    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ subCategory.subCategory.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setName(e.target.value)} type="text" defaultValue={subCategory.subCategory.name} /> : <p>{subCategory.subCategory.name}</p>
                }
            </div>
            <div>
                {
                    isEdit ? <textarea className="edit-input" onChange={(e)=>setDescription(e.target.value)} defaultValue={subCategory.subCategory.description} /> : <p>{subCategory.subCategory.description}</p>
                }
            </div>
            <div>
                {
                    isEdit ? <select className="edit-input" onChange={(e)=>setCategory(e.target.value)}>
                            {
                                categories?.map((category:any) => <option key={category.id} selected={category.id === subCategory.subCategory.category.id ? true:false} value={category.id}>{category.name}</option>)

                            }
                    </select> : <p>{subCategory.subCategory.category.name}</p>
                }
            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={changeToEdit}>Edit</button> : null
                }

                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(subCategory.subCategory)
                        setIsEdit(!isEdit);
                    }}>Update</button> <button onClick={cancelEdit} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button> </>: null
                }
                <button onClick={()=>deleteCategory(subCategory.subCategory.id)} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
        </div>
    )
}
export default SubCategoryItem;