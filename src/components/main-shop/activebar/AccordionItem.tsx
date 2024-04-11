import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setBrands, setCategories } from "../../../store/slices/blacklist.slice";
const AccordionItem = ({ elements, title, filterName }: { elements: any[], title: string, filterName: string }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const activeFilters = useSelector((state: { blackListSlice: { filters: Record<string, any> } }) =>
    state.blackListSlice.filters[filterName]
  );
    const handleAccordionClick = () => {
        setIsOpen(!isOpen);
    }
    const checkIfActive = (id: number) => {
        const res = activeFilters?.findIndex((item: any) => item.item.id === id) !== -1;
        return res
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, item:any) => {
        switch(filterName){
            case 'brands':
                dispatch(setBrands({item, status: event.target.checked}));
                break;
            case 'categories':
                dispatch(setCategories({item, status: event.target.checked}));
                break;
            default:
                console.log('default');
        }
       
    }
    return (
        <>
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
                                    onChange={(e)=>handleCheckboxChange(e, item)}
                                />
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default AccordionItem;
