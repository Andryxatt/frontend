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
        <tr className="p-3 bg-gray-200">
            <td>{brand.id}</td>
            <td>
                {brand.name}
            </td>
            <td>
                <p className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{brand.description}</p>
            </td>
            <td>
                <img className="w-[50px] h-[50px]" src={`${import.meta.env.VITE_LOCALHOST_URL}${brand.iconPath}`} alt={brand.name} />
            </td>
            <td>
                <Link to={`/dashboard/brands/${brand?.id}`} className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteBrand(brand.id).then(() => {
                  notifyDelete()
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default BrandItem;