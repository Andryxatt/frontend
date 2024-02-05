import { ChangeEvent } from "react";
import { setFilters } from "../../store/slices/blacklist.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const ActiveBarFilter = ({ elements, filterName }: { elements: any[], filterName: string })=> {
    const dispatch = useDispatch<AppDispatch>();
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value } = event.target;

        // Construct the filter object
        const filterItem = { id: value, name, status: checked };
    
        // Dispatch action to update filters state
        dispatch(setFilters({ filterName, element: filterItem }));
    }
    return (
        <div>
            {
                elements?.map((item: any) => (
                    <div key={item.name}>
                        <label >
                            <input
                                type="checkbox"
                                value={item.id}
                                name={item.name} // Use a unique identifier as the name
                                onChange={handleCheckboxChange}
                            />
                            {item.name}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveBarFilter;