import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout"
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectProduct } from "../../store/slices/product.slice"
import { useEffect } from "react";
import SlideShow from "./product-details/SlideShow";
const ProductDetails = () => {
    const priceInUAH = (price: number, curencyPrice: number) => {
        console.log(price, curencyPrice)
        return `${Math.round(Math.ceil(price * curencyPrice) / 50) * 60} UAH`;
    }
    const dispatch = useAppDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(selectProduct(Number(id)))
        console.log(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const product = useAppSelector((state) => state.productSlice.selectedProduct);
    console.log(product)
    return (
        <MainLayout>
            {
                product && 
                    <div className="container mx-auto px-4 flex flex-row">
                    <div className="mt-4">
                        <SlideShow images={product?.images} />
                    </div>
                    <div className="mt-4 ml-[4em]">
                        <h2>{product?.name}</h2>
                        <p>{product?.model}</p>
                        <p>{priceInUAH(product?.price, product?.curencyPrice)}</p>
                    </div>
                </div>
            }
           
            
        </MainLayout>
    )
}
export default ProductDetails