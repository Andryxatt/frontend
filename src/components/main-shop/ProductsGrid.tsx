import { ProductInformation } from "../../models/product.model";
import SingleProduct from "./SingleProduct";

const ProductsGrid = ({products} : {products: ProductInformation[]}) => {
    return (
        <>
            {products.map((product: ProductInformation) => <SingleProduct key={product.id} product={product} />)}
        </>
    );
}
export default ProductsGrid;