import { useState } from "react";
import { useAddNewColoresMutation } from "../../api/apiSlice";
import { ChromePicker, ColorResult } from 'react-color';
const ColorNew = () => {
    const [addNewColor] = useAddNewColoresMutation()
    const [color, setColor] = useState<string>('#ffffff'); // Initial color

  const handleColorChange = (newColor: ColorResult) => {
    setColor(newColor.hex);
  };
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = event.currentTarget.nameColor.value;
      
        await addNewColor({name, hexColor: color}).unwrap()
    }
    return (
        <div>
            <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={(e) => submitForm(e)}>
                <h1 className="font-bold mb-4">Додати новий колір</h1>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="nameColor">Назва</label>
                    <input className="rounded-sm p-1" type="text" name="nameColor" id="nameColor" />
                </div>
                <div className="mb-2 flex flex-col">
                    <label className="mb-2" htmlFor="hexColor">Hex Колір</label>
                    <ChromePicker color={color} onChange={handleColorChange} />
                </div>
                <div className="self-end">
                    <button className="rounded-md bg-green-400 px-2 py-1" type="submit">Створити</button>
                </div>
            </form>
        </div>
    );
}
export default ColorNew;
