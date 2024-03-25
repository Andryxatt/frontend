import { Link } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { useAppSelector } from "../../../store/hooks";
import CartItem from "./CartItem";
import './Cart.sass'
import type { CartElement } from "../../../store/slices/cart.slice";
const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartSlice.cartElements);
  return (
    <MainLayout>
      <div className="flex flex-col">
        <Link to="/">До каталогу</Link>
        <h2>Мій кошик ({cartItems?.length})</h2>
        <div className="flex flex-row justify-between gap-4">
          <div className="shadow-custom rounded-md w-[65%] p-4">
            {
              cartItems?.map((item: CartElement, index) => {
                return (
                  <div key={index}>
                    <CartItem productId={item.productId} sizes={item.sizes} />
                    <hr className="border-dashed border-[1px] mb-5" />
                  </div>
                )
              })
            }
          </div>
          <div className="shadow-custom  rounded-md w-[35%] p-4">
            <h3>Сума замовлення</h3>
            <span>Сума замовлення: 0 грн</span>
            <span>До сплати: 0 грн</span>
            <h3>Оформити замовлення</h3>
            <span>Отримуй додаткову знижку за клубною карткою при першому та кожному наступному замовленні</span>
          </div>
        </div>
      </div>

    </MainLayout>
  );
}
export default Cart;