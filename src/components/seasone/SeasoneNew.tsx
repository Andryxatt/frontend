import { useAddNewSeasonMutation } from "../../api/apiSlice";
const SeasoneNew = () => {
    const [newCategory] = useAddNewSeasonMutation();
    const createNewCategory = (e: any) => {
        e.preventDefault();
        const name = e.target.namecategory.value;
        newCategory({ name }).unwrap()
    }

    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e)=>createNewCategory(e)}>
            <h1 className="font-bold mb-4">Create new category</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="namecategory">Name</label>
                    <input className="rounded-sm p-1" type="text" name="namecategory" id="namecategory" />
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}
export default SeasoneNew;
