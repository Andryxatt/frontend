import http from "../utils/axios.config";

class ProductDataService {
    getProducts = async (page: number, limit: number, search: string, filters:any) => {
        const url = `/products?page=${page}&limit=${limit}&search=${search}&filters=${filters}`;
        const response = await http.get(url)
        return response.data;
    }

}
export default new ProductDataService();