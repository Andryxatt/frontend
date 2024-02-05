/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from "../../models/color.model";
import { useDeleteColoresMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const ColorItem = ({ color }: { color: Color }) => {
    const notifyDelete = () => toast("Колір видалено видалено!")
    const [deleteColor] = useDeleteColoresMutation();

    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{color.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {color.name}
            </td>
            <td className={`bg-[${color?.hexColor}] whitespace-nowrap px-6 py-4`}>
                {color.hexColor}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/colores/${color?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteColor(color.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default ColorItem;
'#ffff'