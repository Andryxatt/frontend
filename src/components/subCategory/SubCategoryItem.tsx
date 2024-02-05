import { useDeleteSubCategoryMutation } from "../../api/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const SubCategoryItem = (subCategory:any) => {
    const [deleteCategory] = useDeleteSubCategoryMutation();
    const notifyDelete = () => toast("Підкатегорію видалено!")
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{ subCategory?.subCategory?.id }</td>
            <td>
                   {subCategory?.subCategory?.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                
                    {subCategory?.subCategory?.description}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                     {subCategory?.subCategory?.category?.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/sub-categories/${subCategory?.subCategory?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteCategory(subCategory?.subCategory?.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default SubCategoryItem;