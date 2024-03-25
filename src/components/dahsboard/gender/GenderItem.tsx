import {useDeleteGenderMutation } from "../../../api/apiSlice";
import { Gender } from "../../../models/gender.model";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const GenderItem = ({ gender }: { gender: Gender }) => {
    const [deleteGender] = useDeleteGenderMutation();
    const notifyDelete = () => toast("Стать видалено!")
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{gender.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {gender.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/genders/${gender?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteGender(gender.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default GenderItem;