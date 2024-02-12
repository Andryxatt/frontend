import MainLayout from "../../layouts/MainLayout"
import { useAppSelector } from "../../store/hooks";

const LikedProducts = () => {
    const likedProducts = useAppSelector((state) => state.productSlice.likedProducts);
    console.log(likedProducts)
    return (
        <MainLayout>
            <div>
                <h2>Ви зацікавились цими товарами</h2>
                {
                    likedProducts?.map((element: any, index:number) => {
                       return <div key={index}>{element.name}</div>
                    })
                }
            </div>
        </MainLayout>
    )
}
export default LikedProducts;