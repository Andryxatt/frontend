import { Product } from "../../models/product.model";
import { useNavigate } from "react-router-dom";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty"
import { IoMdHeart } from "@react-icons/all-files/io/IoMdHeart"
import { likeProduct } from "../../store/slices/product.slice";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

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
        <div className="">
            <div className="cursor-pointer relative" onClick={() => {
                showProductDetails(product)
            }}>
                <img src={`${product?.images?.length > 0 ? import.meta.env.VITE_API_URL + product?.images[0]?.imagePath : import.meta.env.VITE_API_URL + "uploads/files/products/default.png"}`} alt="Sunset in the mountains" />
                <button onTouchStart={toggleLike} onClick={toggleLike} className="absolute right-2 top-2 cursor-pointer">
                    {!isLiked ? <IoMdHeartEmpty size="24px" /> : <IoMdHeart size="24px" />}
                </button>
                <div className="px-6 py-4">
                    <div className="md:text-xl text-sm mb-2">{product?.name}</div>
                    <p className="text-gray-700 font-bold">
                        {product?.price}
                    </p>
                </div>
            </div>
            <div className="px-2 pt-1 pb-2">
                {/* <h3> {product.subCategories[0]?.name} - {product?.brand?.name}</h3> */}
                <article
                    className="text-gray-700 text-base 
                    overflow-hidden whitespace-nowrap max-w-full
                     truncate transition-all duration-900 ease-in-out hover:whitespace-normal  hover:max-w-none">
                    {product?.description}
                </article>
                <ul className="flex flex-row">
                    {product?.sizes?.map((size: any) => (
                        <li className="px-1 border-2 border-gray-200 mr-1" key={size.id}>
                            {size?.size.CM}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default SingleProduct;