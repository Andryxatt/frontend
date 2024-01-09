/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useUpdateDiscountsMutation, useDeleteDiscountsMutation} from "../../api/apiSlice";
import { Discount } from "../../models/discount.model";
const DiscountItem = ({ discount }: { discount: Discount}) => {
    const [percentage, setPercentage] = useState(discount.percentage);
    const [updateDiscount] = useUpdateDiscountsMutation();
    const [deleteDiscount] = useDeleteDiscountsMutation();
    const [isEdit, setIsEdit] = useState(false);
    const changeToEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (discount:Discount)=>{
        updateDiscount({id:discount.id, percentage}).unwrap();
    }

    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ discount.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setPercentage(+e.target.value)} type="number" defaultValue={discount.percentage} /> : <p>{discount.percentage}</p>
                }

            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={changeToEdit}>Рудагувати</button> : null
                }
                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(discount)
                        setIsEdit(!isEdit);
                    }}>Оновити</button> <button onClick={()=>setIsEdit(!isEdit)} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Відмінити</button> </>: null
                }
                <button onClick={()=>deleteDiscount(discount.id).then(()=>{
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </div>
        </div>
    )
}
export default DiscountItem;