import { ChangeEvent } from "react";
import { setFilter } from "../../store/slices/blacklist.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const ActiveBarFilter = ({ elements, filterName,isLoaded }: { elements: any[], filterName: string,isLoaded:boolean })=> {
    const dispatch = useDispatch<AppDispatch>();
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value } = event.target;
        // Construct the filter object
        const filterItem = { id: value, name, status: checked };
        // Dispatch action to update filters state
        dispatch(setFilter({ filterName, element: filterItem }));
    }
    return (
        <div>
            {
          isLoaded && elements?.filter((elem:any)=> elem.name === filterName)[0].elements?.map((item: any) => (
                <div key={item.name}>
                    <label >
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
            ))
            }
        </div>
    )
}
export default ActiveBarFilter;