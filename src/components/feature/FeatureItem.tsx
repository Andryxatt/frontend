import { Link } from "react-router-dom";
import { useDeleteFeaturesMutation } from "../../api/apiSlice";
import { Feature } from "../../models/feature.model";
import { toast } from "react-toastify";
const FeatureItem = ({ feature }: { feature: Feature}) => {
    const [deleteFeature] = useDeleteFeaturesMutation();
    const notifyDelete = () => toast("Характеристику видалено!")
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{ feature.id }</td>
            <td className="whitespace-nowrap px-6 py-4">
                  {feature.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                    {feature.description}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/features/${feature?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteFeature(feature.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default FeatureItem;