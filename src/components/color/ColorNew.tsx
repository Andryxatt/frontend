import { useState } from "react";
import { useAddNewColoresMutation } from "../../api/apiSlice";
import { ChromePicker, ColorResult } from 'react-color';
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomInput from "../UI/CustomInput";
const ColorNew = () => {
    const methods = useForm()
    const [addNewColor] = useAddNewColoresMutation()
    const [color, setColor] = useState<string>('#ffffff'); // Initial color
    const notifySuccess = () => toast("Колір додано!")
    const notifyError = () => toast.error("Помилка при додаванні кольору!")
    const handleColorChange = (newColor: ColorResult) => {
        setColor(newColor.hex);
    };
    // const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const name = event.currentTarget.nameColor.value;

    //     await addNewColor({name, hexColor: color}).unwrap()
    // } 
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name } = data
        try {
            addNewColor({ name, hexColor: color }).unwrap()
            notifySuccess()
        } catch (error) {
            notifyError()
            console.log(error);
        }
    })
    return (
        <div>
            <FormProvider {...methods}>
                <form className="p-5 bg-yellow-200 flex flex-col justify-start"
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off">
                    <h1 className="font-bold mb-4">Додати новий колір</h1>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="Назва"
                            type="text"
                            id="name"
                            placeholder="Назва"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Мінімум 3 символів',
                                },
                            }}
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="mb-2" htmlFor="hexColor">Hex Колір</label>
                        <ChromePicker color={color} onChange={handleColorChange} />
                    </div>
                    <div className="self-end">
                        <button className="bg-green-400 hover:bg-green-200 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Створити</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
export default ColorNew;
