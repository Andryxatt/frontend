import {  useAddNewFeaturesMutation } from "../../api/apiSlice";
const FeatureNew = () => {
    const [addNewFeature] = useAddNewFeaturesMutation()
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = event.currentTarget.nameFeature.value;
        const description = event.currentTarget.description.value;
        await addNewFeature({name, description}).unwrap()
    }
    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e) => submitForm(e)}>
                <h1 className="font-bold mb-4">Додати новиу характеристику</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="nameFeature">Назва</label>
                    <input className="rounded-sm p-1" type="text" name="nameFeature" id="nameFeature" />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="description">Опис</label>
                    <textarea className="rounded-sm p-1" name="description" id="description" cols={30} rows={10}></textarea>
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Створити</button>
                </div>
            </form>
        </div>
    );
}
export default FeatureNew;
