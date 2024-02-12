import { useGetBrandsQuery, useGetCategoriesQuery } from "../../api/apiSlice";
import { setActiveFilters, clearFilters, loadInitialData } from '../../store/slices/blacklist.slice';
import { FaXmark } from "react-icons/fa6";
import { useAppSelector } from "../../store/hooks";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import ActiveBarFilter from "./ActiveBarFilter";
import { useEffect } from "react";
import styles from './ActiveBar.module.sass';
type Filter = {
    data: any[],
    isSucces: boolean
}
const ActiveBar = ({ toggleFilters, showFilters }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: brands,
        isSuccess: isBrandsLoaded,
    } = useGetBrandsQuery<any>(undefined, { refetchOnMountOrArgChange: true }) as any
    const {
        data: categories,
        isSuccess: isCategoriesLoaded,
    } = useGetCategoriesQuery<any>(undefined, { refetchOnMountOrArgChange: true }) as any;

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
    useEffect(() => {
        if (isBrandsLoaded && isCategoriesLoaded) {
            const br = prepareFilters(brands, 'brand');
            const cat = prepareFilters(categories, 'subCategories');
            dispatch(loadInitialData([{ name: 'brand', elements: br }, { name: 'subCategories', elements: cat }]))
        }
    }, [isBrandsLoaded, isCategoriesLoaded])
    const { filters, isLoaded } = useAppSelector((state) => state.blackListSlice);
    const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);
    const applayFilters = () => {
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
            <div>
                <h3>Бренди</h3>
                <ActiveBarFilter elements={filters} isLoaded={isLoaded!} filterName="brand" />
            </div>
            <div>
                <h3>Категорії</h3>
                <ActiveBarFilter elements={filters} isLoaded={isLoaded!} filterName="subCategories" />
            </div>
            <button onClick={applayFilters}>Застосувати</button>
        </div>
    )
}
export default ActiveBar;