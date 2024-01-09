/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useUpdateGenderMutation, useDeleteGenderMutation } from "../../api/apiSlice";
import { Gender } from "../../models/gender.model";
const GenderItem = ({ gender }: { gender: Gender}) => {
    const [name, setName] = useState(gender.name);
    const [updateGender] = useUpdateGenderMutation();
    const [deleteGender] = useDeleteGenderMutation();
    const [isEdit, setIsEdit] = useState(false);
    const changeToEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (gender:Gender)=>{
        updateGender({id:gender.id, name}).unwrap();
    }

    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ gender.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setName(e.target.value)} type="text" defaultValue={gender.name} /> : <p>{gender.name}</p>
                }

            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={changeToEdit}>Рудагувати</button> : null
                }
                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(gender)
                        setIsEdit(!isEdit);
                    }}>Оновити</button> <button onClick={()=>setIsEdit(!isEdit)} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Відмінити</button> </>: null
                }
                <button onClick={()=>deleteGender(gender.id).then(()=>{
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </div>
        </div>
    )
}
export default GenderItem;