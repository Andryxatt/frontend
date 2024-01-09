/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Season } from "../../models/seasone.model";
import { useUpdateSeasonMutation, useDeleteSeasonMutation } from "../../api/apiSlice";
const SeasoneItem = ({ seasone }: { seasone: Season}) => {
    const [name, setName] = useState(seasone.name);
    const [updateSeasone] = useUpdateSeasonMutation();
    const [deleteSeasone] = useDeleteSeasonMutation();
    const [isEdit, setIsEdit] = useState(false);
    const changeToEdit = () => {
        setIsEdit(!isEdit);
    }
    const cancelEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (seasone:any)=>{
        updateSeasone({id: seasone.id, name: name})
    }

    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ seasone.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setName(e.target.value)} type="text" defaultValue={seasone.name} /> : <p>{seasone.name}</p>
                }

            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={changeToEdit}>Рудагувати</button> : null
                }
                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(seasone)
                        setIsEdit(!isEdit);
                    }}>Оновити</button> <button onClick={cancelEdit} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Відмінити</button> </>: null
                }
                <button onClick={()=>deleteSeasone(seasone.id).then(()=>{
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </div>
        </div>
    )
}
export default SeasoneItem;