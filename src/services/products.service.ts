import { FindProductDto } from "../store/slices/blacklist.slice";
import http from "../utils/axios.config";

class ProductDataService {
    getProducts = async (findProductsDto: FindProductDto) => {
        const filters = {
            ...findProductsDto,
            categories: findProductsDto.categories?.map((category) => category.item.id),
            brands: findProductsDto.brands?.map((brand) => brand.item.id),
            subCategories: findProductsDto.subCategories?.map((subCategory) => subCategory.item.id),
            colores: findProductsDto.colores?.map((color) => color.item.id),
            sizes: findProductsDto.sizes?.map((size) => size.item.id),
            features: findProductsDto.features?.map((feature) => feature.item.id),
            
        }          
        const url = `/products?findProductsDto=${JSON.stringify(filters)}`;
        const response = await http.get(url)
        return response.data;
    }

}
export default new ProductDataService();