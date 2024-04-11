import { useGetProductByIdQuery } from "../../../api/apiSlice";
import { useAppDispatch } from "../../../store/hooks";
import { removeItem, updateItem } from "../../../store/slices/cart.slice";
import { FaTrash } from "react-icons/fa6";
import type { CartElement, CartElementSize } from "../../../store/slices/cart.slice";
import './CartItem.sass';
const CartItem: React.FC<CartElement> = (item) => {
    const { productId, sizes } = item;

    const {
        data: product
    } = useGetProductByIdQuery<any>(productId);

    const dispatch = useAppDispatch();
    const removeItemFromCart = (sizeId: number) => {
        dispatch(removeItem({ productId, sizeId }));
    }
    const addItemQuantity = (size: CartElementSize) => {
        if (size.quantity === product?.sizes.find((s: any) => s.id === size.id)?.quantity) {

            return;
        }
        dispatch(updateItem({ productId, sizeId: size.id, qty: 1 }));
    }
    const removeItemQuantity = (sizeId: number) => {
        dispatch(updateItem({ productId, sizeId, qty: -1 }));
    }
    return (
        <>
            <img className="w-[230px] h-[170px]" src={`${import.meta.env.VITE_API_URL}${product?.images[0]?.imagePath}`} alt="" />
            <span>{product?.price} USD</span>
            {
                sizes?.map((size: CartElementSize, index: number) => {
                    return (<div key={index} >
                       <span>{size?.CM}</span>
                        <div className="flex flex-row border-2 border-black p-2 w-[120px] text-md justify-between">
                         
                            {
                                size.quantity > 1 ? <button className="btn-remove-item" onClick={() => removeItemQuantity(size.id)}>  </button> : <button onClick={() => removeItemFromCart(size.id)}><FaTrash color="gray" /> </button>
                            }
                            <input
                                className="w-[10px] max-w-[20px] text-center text-sm"
                                type="number"
                                value={size.quantity}
                                onChange={(e) => {
                                    const newQuantity = parseInt(e.target.value) || 0;
                                    dispatch(updateItem({ productId, sizeId: size.id, qty: newQuantity }));
                                }}
                                pattern="[0-9]*"
                            />
                            <button
                                className="btn-add-item"
                                onClick={() => addItemQuantity(size)}></button>
                        </div>
                        </div>
                    )

                })
            }
        </>
    )
}
export default CartItem;