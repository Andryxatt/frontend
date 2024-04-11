import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setSubCategories } from "../../../store/slices/blacklist.slice";
import { useAppSelector } from "../../../store/hooks";
const AccordionItemSubCat = ({ elements, title, filterName }: { elements: any[], title: string, filterName: string }) => {
    const dispatch = useDispatch();
    interface FindProductDto {
        [key: string]: any;
    }

    const [isOpen, setIsOpen] = useState(true);
    const activeFilters = useAppSelector((state: { blackListSlice: FindProductDto }) => state.blackListSlice.filters[filterName]);
    const categories = useAppSelector((state: { blackListSlice: FindProductDto }) => state.blackListSlice.filters.categories);
    const handleAccordionClick = () => {
        // Close all other AccordionItems
        setIsOpen(!isOpen);
    }
    const checkIfActive = (id: number) => {
        return activeFilters?.findIndex((item: any) => item.item.id === id) !== -1;
    }
    const isDisabled = (id: number) => {
        return categories?.findIndex((item: any) => item.item.id === id) === -1;
    }
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, item:any) => {
        dispatch(setSubCategories({item, status: event.target.checked}));
    }
    return (
        <div className="border-b">
            <button
                className="w-full text-left py-2 px-4 text-lg font-semibold bg-transparent focus:outline-none"
                onClick={handleAccordionClick}>
                {title}
            </button>
            {isOpen && (
                <div className="px-4 py-2">
                    {elements?.map((item: any) => (
                        <div key={uuidv4()}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    name={item.name}
                                    checked={checkIfActive(item.id)}
                                    disabled={isDisabled(item.category.id)}
                                    onChange={(e)=>handleCheckboxChange(e,item)}
                                />
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccordionItemSubCat;
