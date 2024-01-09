import { useState } from "react";
import { Size } from "../../models/size.model"
import { useUpdateSizesMutation, useDeleteSizesMutation } from "../../api/apiSlice";
const SizeItem = ({ sizeItem }: { sizeItem: Size}) => {
    const [CM, setCM] = useState(sizeItem.CM);
    const [EU, setEU] = useState(sizeItem.EU);
    const [USA, setUSA] = useState(sizeItem.USA);
    const [Length, setLength] = useState(sizeItem.Length);
    const [updateSize] = useUpdateSizesMutation();
    const [deleteSize] = useDeleteSizesMutation();
    const [isEdit, setIsEdit] = useState(false);
    const switchEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (size:any)=>{
        await updateSize({id: size.id, CM, EU, USA, Length}).unwrap()
    }

    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ sizeItem.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setCM(e.target.value)} type="text" defaultValue={sizeItem.CM} /> : <p>{sizeItem.CM}</p>
                }

            </div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setEU(e.target.value)} defaultValue={sizeItem.EU} /> : <p>{sizeItem.EU}</p>
                }
            </div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setUSA(e.target.value)} defaultValue={sizeItem.USA} /> : <p>{sizeItem.USA}</p>
                }
            </div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setLength(e.target.value)} defaultValue={sizeItem.Length} /> : <p>{sizeItem.Length}</p>
                }
            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={switchEdit}>Edit</button> : null
                }
                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(sizeItem)
                        setIsEdit(!isEdit);
                    }}>Update</button> <button onClick={switchEdit} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button> </>: null
                }
                <button onClick={()=>deleteSize(sizeItem.id).then(()=>{
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
        </div>
    )
}
export default SizeItem