import { Size } from "../../../models/size.model"
import { useDeleteSizesMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const SizeItem = ({ sizeItem }: { sizeItem: Size }) => {
    const notifyDelete = () => toast("Розмір видалено!")
    const [deleteSize] = useDeleteSizesMutation();
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{sizeItem.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {sizeItem.CM}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {sizeItem.EU}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {sizeItem.USA}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {sizeItem.Length}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/sizes/${sizeItem?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteSize(sizeItem.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default SizeItem