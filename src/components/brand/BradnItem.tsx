/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Brand } from "../../models/brand.model";
import { useDeleteBrandMutation } from "../../api/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const BrandItem = ({ brand }: { brand: Brand }) => {
    const notifyDelete = () => toast("Бренд видалено!")
    const [deleteBrand] = useDeleteBrandMutation();
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{brand.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {brand.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{brand.description}</p>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <img className="w-[50px] h-[50px]" src={`${import.meta.env.VITE_API_URL}${brand.iconPath}`} alt={brand.name} />
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/brands/${brand?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteBrand(brand.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default BrandItem;