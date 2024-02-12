import { Product } from "../../models/product.model";
import { useNavigate } from "react-router-dom";
import {IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty"
import {IoMdHeart } from "@react-icons/all-files/io/IoMdHeart"
import {likeProduct} from "../../store/slices/product.slice";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
const priceInUAH = (price: number) => {
    return `${Math.round(Math.ceil(price * 38) / 50) * 60} UAH`;
}

const SingleProduct = ({ product }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const likedProducts = useAppSelector((state) => state.productSlice.likedProducts);

    const isLiked = likedProducts?.some(likedProduct => likedProduct?.id === product.id) ? true : false;
    const toggleLike = (event: any) => {
        event.stopPropagation();
        if (isLiked) {
          dispatch(likeProduct(likedProducts?.filter((likedProduct: any) => likedProduct?.id !== product.id)));
        } else {
          dispatch(likeProduct([...likedProducts, product]));
        }
      };

    const navigate = useNavigate();
    const showProductDetails = (product: Product) => {
        navigate(`/products/${product.id}`);
    }
    return (
        <div className="rounded overflow-hidden shadow-lg ">
            <div className="cursor-pointer relative" onClick={()=>{
                showProductDetails(product)
                }}>
                <img src={`${import.meta.env.VITE_API_URL}${product?.images[0]?.imagePath}`} alt="Sunset in the mountains" />
                
                    <span className="absolute top-2 left-2">{product?.status}</span>
                    <button onTouchStart={toggleLike} onClick={toggleLike} className="absolute right-2 top-2 cursor-pointer">
                    {!isLiked ? <IoMdHeartEmpty size="24px"/> : <IoMdHeart size="24px"/>}
                    </button>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product?.name}</div>
                    <p className="text-gray-700 text-base">
                        {priceInUAH(product?.price)}
                    </p>
                </div>
            </div>
            <div className="px-2 pt-1 pb-2">
                <h3>{product?.brand.name}</h3>
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