import { useGetBrandsQuery, useGetCategoriesQuery, useGetSubCategoriesQuery } from "../../../api/apiSlice";
import { FaXmark } from "react-icons/fa6";
import { useAppSelector } from "../../../store/hooks";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from './ActiveBar.module.sass';
import FlushAccordion from "./FlushAccordion";
import { fetchProducts } from "../../../store/slices/product.slice";
import { clearFilters, setActiveFilters } from "../../../store/slices/blacklist.slice";

const ActiveBar = ({ toggleFilters, showFilters }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useAppSelector((state) => state.blackListSlice);
    const {
        data: brands,
        isSuccess: isBrandsLoaded,
    } = useGetBrandsQuery<any>(undefined, { refetchOnMountOrArgChange: true }) as any
    const {
        data: categories,
        isSuccess: isCategoriesLoaded,
    } = useGetCategoriesQuery<any>(undefined, { refetchOnMountOrArgChange: true }) as any;

    const {
        data: subCategories,
        isSuccess: isSubCategoriesLoaded,
    } = useGetSubCategoriesQuery<any>(undefined, { refetchOnMountOrArgChange: true }) as any;
    const prepareFilters = (elements: any[], filterName: string) => {
        return elements?.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                status: false,
                filterName
            }
        })
    }
    const prepareFiltersSubCats = (elements: any[], filterName: string) => {
        return elements?.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                status: false,
                filterName,
                categoryId: item.category.id
            }
        })
    }
    useEffect(() => {
        if (isBrandsLoaded && isCategoriesLoaded && isSubCategoriesLoaded) {
            const br = prepareFilters(brands, 'brand');
            const cat = prepareFilters(categories, 'categories');
            const subCat = prepareFiltersSubCats(subCategories, 'subCategories');
        }
    }, [isBrandsLoaded, isCategoriesLoaded, isSubCategoriesLoaded])
    const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);
    const applayFilters = () => {
        const products = fetchProducts(filters);
        dispatch(products);
        toggleFilters()
    }
    return (
        <div className={`${styles.activeBarWrapper} ${showFilters ? '' : styles.hide}`}>
            <div className="flex flex-row justify-between">
                <button onClick={() => dispatch(clearFilters())} className={styles.activeBarButton}>Очистити</button>
                <span>Фільтри</span>
                <button onClick={() => {
                    dispatch(setActiveFilters(!isActiveFilter))
                    toggleFilters()
                }}><FaXmark /></button>
            </div>
            <FlushAccordion/>

            <button onClick={applayFilters}>Застосувати</button>
        </div>
    )
}
export default ActiveBar;