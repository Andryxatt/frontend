import { useNewSizesMutation } from "../../api/apiSlice";
const SizeNew = () => {

    const [addNewSize] = useNewSizesMutation()
    const submitForm = async (event: any) => {
        event.preventDefault();
        const CM = event.currentTarget.cm.value;   
        const EU = event.currentTarget.eu.value;
        const USA = event.currentTarget.usa.value;
        const Length = event.currentTarget.length.value;
        await addNewSize({CM, EU, USA, Length}).unwrap()
    }
    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e) => submitForm(e)}>
                <h1 className="font-bold mb-4">Create new Size</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="cm">CM</label>
                    <input className="rounded-sm p-1" type="text" name="cm" id="cm" />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="eu">EU</label>
                    <input className="rounded-sm p-1" type="text" name="eu" id="eu" />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="namebrand">USA</label>
                    <input className="rounded-sm p-1" type="text" name="usa" id="usa" />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="length">Довжина устілки</label>
                    <input className="rounded-sm p-1" type="text" name="length" id="length" />
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}
export default SizeNew


