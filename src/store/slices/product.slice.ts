import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductInformation } from '../../models/product.model';
import ProductDataService from '../../services/products.service';
import { FindProductDto } from './blacklist.slice';
interface ProductPagination {
  total: number;
  products: ProductInformation[];
  isLoading: boolean;
  error: string | null;
  selectedProduct: ProductInformation | null;
  likedProducts: Product[];
}
const initialState: ProductPagination = {
  products: [],
  isLoading: true,
  error: null,
  total: 0,
  selectedProduct: null,
  likedProducts: []
};
//create thunk to load products from api
export const fetchProducts = createAsyncThunk<ProductPagination, FindProductDto>(
  'products/fetchProducts',
  async (args: FindProductDto, thunkAPI) => {
    try {
      const response = await ProductDataService.getProducts(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action: PayloadAction<ProductPagination>) {
      state.isLoading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
    fetchProductFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectProduct(state, action: PayloadAction<string>) {
      const selectedProduct = state.products.find((product) => product.id === action.payload);
      state.selectedProduct = selectedProduct || null;
    },
    likeProduct(state, action: PayloadAction<Product[]>){
      state.likedProducts = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  }
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailure, selectProduct, likeProduct } =
  productSlice.actions;
export const limitProduct = (state: any) => state.product.limit;
export default productSlice.reducer;


