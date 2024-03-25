import DashboardLayout from "../../../layouts/DashboardLayout";
import { useParams } from "react-router";
import { useGetColorQuery, useUpdateColoresMutation } from "../../../api/apiSlice";
import CustomInput from "../../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
import { ChromePicker } from "react-color";
import { useState } from "react";
import { toast } from "react-toastify";
const ColorEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: color, isSuccess } = useGetColorQuery(id, { refetchOnMountOrArgChange: true });
    const [updateColor] = useUpdateColoresMutation();
    const [colorNew, setColorNew] = useState<string>(color?.hexColor); 
    const notifySuccess = () => toast("Колыр оновлена!");
    const handleColorChange = (newColor: any) => {
        setColorNew(newColor.hex);
    };
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name } = data
        try {
            updateColor({ id: color.id, name, hexColor: colorNew }).unwrap();
            notifySuccess();
        } catch (error) {
            console.log(error);
        }
    })
    return (
        <DashboardLayout>
            <FormProvider {...methods}>
                {
                    isSuccess && <form onSubmit={e => e.preventDefault()}
                        noValidate
                        autoComplete="off">
                        <div>
                            <CustomInput
                                label="Назва"
                                value={color?.name}
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
                            <ChromePicker color={colorNew} onChange={handleColorChange} />
                        </div>
                        <button className="bg-blue-400 hover:bg-blue-200 mr-2 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Оновити</button>
                    </form>
                }
            </FormProvider>

        </DashboardLayout>
    )
}
export default ColorEdit;