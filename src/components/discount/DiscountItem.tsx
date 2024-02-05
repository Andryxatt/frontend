import { useDeleteDiscountsMutation} from "../../api/apiSlice";
import { Discount } from "../../models/discount.model";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const DiscountItem = ({ discount }: { discount: Discount}) => {
    const notifyDelete = () => toast("Знижку видалено!")
    const [deleteDiscount] = useDeleteDiscountsMutation();
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{ discount.id }</td>
            <td>
                    {discount.percentage}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/discounts/${discount?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteDiscount(discount.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default DiscountItem;