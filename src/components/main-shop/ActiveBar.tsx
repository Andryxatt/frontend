import { ChangeEvent } from "react";
import { useGetBrandsQuery, useGetCategoriesQuery } from "../../api/apiSlice";
import { setActiveFilters } from '../../store/slices/blacklist.slice';
import { IBrand } from "../../store/slices/brand.slice";
import style from './ActiveBar.module.sass';
import { FaXmark } from "react-icons/fa6";
import { useAppSelector } from "../../store/hooks";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
const ActiveBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        isSuccess: isSuccessBrands,
        data: brands,
    } = useGetBrandsQuery(undefined, { refetchOnMountOrArgChange: true }) as any
    const {
        isSuccess: isSuccessCategories,
        data: categories,
    } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any;
    const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        console.log(name, checked);
    };
    const checkboxesBrands = isSuccessBrands && brands?.map((item: IBrand) => (
        <div  key={item.name}>
            <label>
                <input
                    type="checkbox"
                    name={item.id.toString()} // Use a unique identifier as the name
                    onChange={handleCheckboxChange}
                />
                {item.name}
            </label>
        </div>
    ));
    const checkboxesCategories = isSuccessCategories && categories.map((item: any) => (
        <div key={item.name}>
            <label >
                <input
                    type="checkbox"
                    name={item.name} // Use a unique identifier as the name
                    onChange={handleCheckboxChange}
                />
                {item.name}
            </label>
        </div>
    ));
    const classesActiveBar = `${style.activeBarWrapper} ${isActiveFilter ? style.active : ''}`;
    return (
        <div className={classesActiveBar}>
            <div className="flex flex-row justify-between">
                <button>Очистити</button>
                <span>Фільтри</span>
                <button onClick={() => dispatch(setActiveFilters(!isActiveFilter))}><FaXmark /></button>
            </div>
            <div>
                <h3>Бренди</h3>
                {checkboxesBrands}
            </div>
            <div>
                <h3>Категорії</h3>
                {checkboxesCategories}
            </div>
            <button>Застосувати</button>
        </div>
    )
}
export default ActiveBar;