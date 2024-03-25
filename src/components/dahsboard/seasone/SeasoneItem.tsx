/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Season } from "../../../models/seasone.model";
import { useDeleteSeasonMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const SeasoneItem = ({ seasone }: { seasone: Season}) => {
    const [deleteSeasone] = useDeleteSeasonMutation();
    const notifyDelete = () => toast("Сезон видалено!")
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{ seasone.id }</td>
            <td className="whitespace-nowrap px-6 py-4">
              {seasone.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/seasones/${seasone?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteSeasone(seasone.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default SeasoneItem;