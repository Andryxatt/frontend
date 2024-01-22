import { Product } from "../../models/product.model";
import { useNavigate } from "react-router-dom";
const priceInUAH = (price: number) => {
    return `${Math.round(Math.ceil(price * 38) / 50) * 60} UAH`;
}

const SingleProduct = ({ product }: any) => {
    const navigate = useNavigate();
    const showProductDetails = (product: Product) => {
        navigate(`/products/${product.id}`);
    }
    return (
        <div className="rounded overflow-hidden shadow-lg w-full col-span-1 ">
            <div className="cursor-pointer" onClick={()=>showProductDetails(product)}>
                <img className="w-full" src={`${import.meta.env.VITE_API_URL}${product?.images[0]?.imagePath}`} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product?.name}</div>
                    <p className="text-gray-700 text-base">
                        {priceInUAH(product.price)}
                    </p>
                </div>
            </div>
            <div className="px-6 pt-1 pb-2">
                <ul className="flex flex-row">
                    {product?.sizes.map((size: any) => (
                        <li className="px-1 border-2 border-gray-200 mr-1" key={size.id}>
                            {size.size.CM} cм
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default SingleProduct;