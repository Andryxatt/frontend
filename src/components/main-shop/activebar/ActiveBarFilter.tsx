
const ActiveBarFilter = ({ elements, filterName }: { elements: any[], filterName: string })=> {
    // const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log(event.target, 'event.target')
    //     const { name, checked, value } = event.target;
    //     // Construct the filter object
    //     const filterItem = { id: value, name, status: checked };
    //     console.log(filterItem, 'filterItem')
    //     // Dispatch action to update filters state
    //     // dispatch(setFilter({ filterName, element: filterItem }));
    // }
    return (
        <div>
            {
          elements?.filter((elem:any)=> elem.name === filterName)[0].elements?.map((item: any) => (
                <div key={item.name}>
                    <label >
                        <input
                            type="checkbox"
                            value={item.id}
                            name={item.name}
                            checked={item.status}
                            // onChange={handleCheckboxChange}
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