/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Color } from "../../models/color.model";
import { useUpdateColoresMutation, useDeleteColoresMutation } from "../../api/apiSlice";
const ColorItem = ({ color }: { color: Color}) => {
    const [name, setName] = useState(color.name);
    const [hexColor, setHexColor] = useState(color.hexColor);
    const [updateColor] = useUpdateColoresMutation();
    const [deleteColor] = useDeleteColoresMutation();
    const [isEdit, setIsEdit] = useState(false);
    const changeToEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (color:Color)=>{
        updateColor({id:color.id, name, hexColor}).unwrap();
    }
    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ color.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setName(e.target.value)} type="text" defaultValue={color.name} /> : <p>{color.name}</p>
                }

            </div>
            <div>
                {
                    isEdit ? <input style={{backgroundColor: color.hexColor}} className={`edit-input`} onChange={(e)=>setHexColor(e.target.value)} type="text" defaultValue={color.hexColor} /> : <p style={{backgroundColor: color.hexColor}}>{color.hexColor}</p>
                }

            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={changeToEdit}>Рудагувати</button> : null
                }
                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(color)
                        setIsEdit(!isEdit);
                    }}>Оновити</button> <button onClick={()=>setIsEdit(!isEdit)} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Відмінити</button> </>: null
                }
                <button onClick={()=>deleteColor(color.id).then(()=>{
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </div>
        </div>
    )
}
export default ColorItem;
'#ffff'