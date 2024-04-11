import { Brand } from "../../../models/brand.model";
import { useDeleteBrandMutation } from "../../../api/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const BrandItem = ({ brand }: { brand: Brand }) => {
    const notifyDelete = () => toast("Бренд видалено!")
    const [deleteBrand] = useDeleteBrandMutation();
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap font-medium">{brand.id}</td>
            <td className="whitespace-nowrap">
                {brand.name}
            </td>
            <td className="whitespace-nowrap">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{brand.description}</p>
            </td>
            <td className="whitespace-nowrap">
                <img className="w-[50px] h-[50px]" src={`${import.meta.env.VITE_API_URL}${brand.iconPath}`} alt={brand.name} />
            </td>
            <td className="whitespace-nowrap">
                <Link to={`/dashboard/brands/${brand?.id}`} className="dark:bg-orange-600 dark:hover:bg-orange-600 bg-orange-300 hover:bg-orange-200 text-white font-bold py-2 px-4 mr-2">Рудагувати</Link>
                <button onClick={() => deleteBrand(brand.id).then(() => {
                    notifyDelete()
                })} className="dark:bg-red-800 bg-red-300 hover:bg-red-400 dark:hover:bg-red-500 text-white font-bold py-2 px-4">Видалити</button>
            </td>
        </tr>
    )
}
export default BrandItem;