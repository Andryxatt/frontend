import { Category } from "../../models/category.model";
import { useDeleteCategoryMutation } from "../../api/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const CategoryItem = ({ category }: { category: Category }) => {
    const notifyDelete = () => toast("Категорію та всі підкатегорії видалено!")
    const [deleteCategory] = useDeleteCategoryMutation();
    return (
        <tr className="p-3 bg-gray-200">
            <td>{category.id}</td>
            <td>
                {category.name}
            </td>
            <td>
                {category.description}
            </td>
            <td>
                <Link to={`/dashboard/categories/${category?.id}`} className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteCategory(category.id).then(() => {
                    notifyDelete()
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default CategoryItem;