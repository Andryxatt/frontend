import MainLayout from "../../layouts/MainLayout";
import { useAppSelector } from "../../store/hooks";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  return (
    <MainLayout>
      <h2>Cart</h2>
      {
        cartItems?.map((item, index) => {
          return (
            <div key={index}>
              <p>Product ID: {item.productId}</p>
            </div>
          )
        })
      }
    </MainLayout>
  );
}
export default Cart;