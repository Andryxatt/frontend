/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useUpdateFeaturesMutation, useDeleteFeaturesMutation} from "../../api/apiSlice";
import { Feature } from "../../models/feature.model";
const FeatureItem = ({ feature }: { feature: Feature}) => {
    const [name, setName] = useState(feature.name);
    const [description, setDescription] = useState(feature.description);
    const [updateFeature] = useUpdateFeaturesMutation();
    const [deleteFeature] = useDeleteFeaturesMutation();
    const [isEdit, setIsEdit] = useState(false);
    const changeToEdit = () => {
        setIsEdit(!isEdit);
    }
    const update = async (feature:Feature)=>{
        updateFeature({id:feature.id, name, description}).unwrap();
    }

    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{ feature.id }</div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setName(e.target.value)} type="text" defaultValue={feature.name} /> : <p>{feature.name}</p>
                }

            </div>
            <div>
                {
                    isEdit ? <input className="edit-input" onChange={(e)=>setDescription(e.target.value)} type="text" defaultValue={feature.description} /> : <p>{feature.description}</p>
                }

            </div>
            <div>
                {
                    !isEdit ? <button className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={changeToEdit}>Рудагувати</button> : null
                }
                {
                    isEdit ? <><button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                        update(feature)
                        setIsEdit(!isEdit);
                    }}>Оновити</button> <button onClick={()=>setIsEdit(!isEdit)} className="bg-purple-200 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2">Відмінити</button> </>: null
                }
                <button onClick={()=>deleteFeature(feature.id).then(()=>{
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Видалити</button>
            </div>
        </div>
    )
}
export default FeatureItem;