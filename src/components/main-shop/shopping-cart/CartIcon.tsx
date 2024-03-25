import { FC } from "react";
import cartIcon from './../../../assets/icons/shopping-cart.png'
const CartIcon: FC = () => {
    return (
        <>
            <img className="w-[24px] h-[24px] mr-[20px]" src={cartIcon} />
        </>
    )
}
export default CartIcon;