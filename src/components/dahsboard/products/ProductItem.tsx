import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../../../api/apiSlice";
import { Link } from "react-router-dom";
const ProductItem = ({ product }: { product: any }) => {
    const notifyDelete = () => toast("Товар видалено!")
    const [deleteProduct] = useDeleteProductMutation();
    return (
        <tr className="border-b dark:border-neutral-500 w-full border-2 hover:border-gray-300 hover:mt-4 hover:p-4 hover:rounded-md hover:shadow-md">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{product.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {product.model}
            </td>
           
            {/* <td className="whitespace-nowrap px-6 py-4">
                {
                    <img className="w-[50px]" src={`${import.meta.env.VITE_FILE_URL}${product?.images[0]?.imagePath}`} />
                }
            </td> */}
            <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/dashboard/products/edit/${product?.id}`} className="bg-orange-400 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded mr-2">Рудагувати</Link>
                <button onClick={() => deleteProduct(product.id).then(() => {
                    notifyDelete()
                })} className="bg-red-400 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </td>
        </tr>
    )
}
export default ProductItem;