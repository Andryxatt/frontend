/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddNewGenderMutation } from "../../api/apiSlice";

const GenderNew = () => {
    const [addNewGender] = useAddNewGenderMutation()
    const submitForm = async (event: any) => {
        event.preventDefault();
        const name = event.currentTarget.nameGender.value;
        addNewGender({ name }).unwrap();        
    }
    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e) => submitForm(e)}>
                <h1 className="font-bold mb-4">Додати нову стать</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="nameGender">Назва</label>
                    <input className="rounded-sm p-1" type="text" name="nameGender" id="nameGender" />
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Створити</button>
                </div>
            </form>
        </div>
    );
}
export default GenderNew;
