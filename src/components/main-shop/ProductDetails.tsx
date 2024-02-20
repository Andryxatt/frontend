import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout"
import { useAppSelector } from "../../store/hooks";
import { selectProduct } from "../../store/slices/product.slice"
import { useEffect, useState } from "react";
import { addItem } from "../../store/slices/cart.slice";
import SlideShow from "./product-details/SlideShow";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import "./product-details.sass"
import { toast } from "react-toastify";
const selectedSizeClass = 'selected-size';
const ProductDetails = () => {
  const notifySuccess = () => toast("Оберіть хочаб один розмір!");
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
  const priceInUAH = (price: number, curencyPrice: number) => {
    console.log(price, curencyPrice)
    return `${Math.round(Math.ceil(price * curencyPrice) / 50) * 60} UAH`;
  }
  const { id } = useParams();
  useEffect(() => {
    dispatch(selectProduct(Number(id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const product = useAppSelector((state) => state.productSlice.selectedProduct);
  const addToCart = () => {
    if (selectedSizes.length === 0) {
      return () => {
        notifySuccess();
      };
    } else {
      // Dispatch the addItem action with productId and selectedSizes
      dispatch(addItem({ productId: product?.id, sizes: selectedSizes }));
      setSelectedSizes([]);
    }
  };

  const handleSelectSize = (size: any) => {
    if (isSelected(size)) {
      // If the size is already selected, remove it
      setSelectedSizes(selectedSizes.filter((selectedSize) => selectedSize.id !== size.id));
    } else {
      // If the size is not selected, add it
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  const isSelected = (size: any) => {
    return selectedSizes.some((selectedSize) => selectedSize.id === size.id);
  };
  return (
    <MainLayout>
      {
        product &&
        <div className="container mx-auto px-4 flex flex-row" >
          <div className="mt-4" >
            <SlideShow images={product?.images} />
          </div>
          <div className="mt-4 ml-[4em]" >
            <h2>{product?.name} </h2>
            <p> {product?.brand.name} </p>
            <p> {product?.subCategories[0].name} </p>
            <p> {product?.status} </p>
            <p> {product?.description} </p>
            <p> {priceInUAH(product?.price, product?.curencyPrice)} </p>
            <ul className="flex flex-row">
              Доступні розміри:
              {
                product?.sizes.map((size) => (
                  <li onClick={() => handleSelectSize(size)}
                    className={`px-1 border-2 border-gray-200 mr-1 cursor-pointer ${isSelected(size) ? selectedSizeClass : ''}`}
                    key={size.id}>
                    {size.size.CM} cм
                  </li>
                ))}
            </ul>
            <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
              Додати в кошик
            </button>
          </div>
        </div>
      }
    </MainLayout>
  )
}
export default ProductDetails