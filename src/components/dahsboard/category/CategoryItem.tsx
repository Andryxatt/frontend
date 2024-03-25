import { Category } from "../../../models/category.model";
import { useDeleteCategoryMutation } from "../../../api/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const CategoryItem = ({ category }: { category: Category }) => {
    const notifyDelete = () => toast("Категорію та всі підкатегорії видалено!")
    const [deleteCategory] = useDeleteCategoryMutation();
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{category.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {category.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {category.description}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/categories/${category?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteCategory(category.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default CategoryItem;
