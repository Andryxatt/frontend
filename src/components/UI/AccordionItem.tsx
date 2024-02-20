import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setFilter } from "../../store/slices/blacklist.slice";
import { AppDispatch } from "../../store/store";

const AccordionItem = ({ elements, title, isLoaded, filterName }: { elements: any[], title: string, isLoaded: boolean, filterName: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const handleAccordionClick = () => {
        // Close all other AccordionItems
        setIsOpen(!isOpen);
    }
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target, 'event.target')
        const { name, checked, value } = event.target;
        // Construct the filter object
        const filterItem = { id: value, name, status: checked };
        // Dispatch action to update filters state
        dispatch(setFilter({ filterName, element: filterItem }));
    }

    return (
        <div className="border-b">
            <button
                className="w-full text-left py-2 px-4 text-lg font-semibold bg-transparent focus:outline-none"
                onClick={handleAccordionClick}
            >
                {title}
            </button>
            {isOpen && (
                <div className="px-4 py-2">
                    {elements?.filter(elem => elem.name === filterName)[0]?.elements?.map((item: any) => (
                        <div key={uuidv4()}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    name={item.name}
                                    checked={item.status}
                                    onChange={handleCheckboxChange}
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

export default AccordionItem;
