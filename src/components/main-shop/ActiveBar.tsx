import { useGetBrandsQuery, useGetCategoriesQuery } from "../../api/apiSlice";
import { setActiveFilters } from '../../store/slices/blacklist.slice';
import { IBrand } from "../../store/slices/brand.slice";
import style from './ActiveBar.module.sass';
import { FaXmark } from "react-icons/fa6";
import { useAppSelector } from "../../store/hooks";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import ActiveBarFilter from "./ActiveBarFilter";
const ActiveBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: brands,
    } = useGetBrandsQuery(undefined, { refetchOnMountOrArgChange: true }) as any
    const {
        data: categories,
    } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any;

    const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);
    return (
        <div className={style.activeBarWrapper}>
            <div className="flex flex-row justify-between">
                <button>Очистити</button>
                <span>Фільтри</span>
                <button onClick={() => dispatch(setActiveFilters(!isActiveFilter))}><FaXmark /></button>
            </div>
            <div>
                <h3>Бренди</h3>
              <ActiveBarFilter elements={brands} filterName="brand" />
            </div>
            <div>
                <h3>Категорії</h3>
                <ActiveBarFilter elements={categories} filterName="subCategories" />
            </div>
            <button>Застосувати</button>
        </div>
    )
}
export default ActiveBar;