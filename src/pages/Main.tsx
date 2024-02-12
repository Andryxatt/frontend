
import Products from "../components/main-shop/Products";
import MainLayout from "../layouts/MainLayout";

const Main = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 flex-row">
                <Products />
            </div>
        </MainLayout>
    );
}
export default Main;