import {  useAddNewDiscountsMutation } from "../../api/apiSlice";
const DiscountNew = () => {
    const [addNewDiscount] = useAddNewDiscountsMutation()
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const percentage = event.currentTarget.percentage.value;
        await addNewDiscount({percentage: +percentage}).unwrap()
    }
    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e) => submitForm(e)}>
                <h1 className="font-bold mb-4">Додати знижку</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="percentage">Процент</label>
                    <input className="rounded-sm p-1" type="number" name="percentage" id="percentage" />
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Створити</button>
                </div>
            </form>
        </div>
    );
}
export default DiscountNew;
