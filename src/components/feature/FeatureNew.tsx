import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNewFeaturesMutation } from "../../api/apiSlice";
import CustomInput from "../UI/CustomInput";
import { CustomTextarea } from "../UI/CustomTextarea";
const FeatureNew = () => {
    const [addNewFeature] = useAddNewFeaturesMutation()
    const methods = useForm()
    const notifySuccess = () => toast("Категорія додана!")
    const notifyError = () => toast.error("Помилка при додаванні категорії!")
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description } = data
        try {
            addNewFeature({ name, description }).unwrap()
            notifySuccess()
        } catch (error) {
            notifyError()
            console.log(error);
        }
    })
    return (
        <div>
            <FormProvider {...methods}>
                <form  className="p-5 bg-yellow-200 flex flex-col justify-start"
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off">
                    <h1 className="font-bold mb-4">Додати новиу характеристику</h1>
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
                    <CustomTextarea label="Опис" id="description" placeholder="Опис" validation={{
                            required: {
                                value: true,
                                message: 'Обовязкове поле'
                            },
                            minLength: {
                                value: 10,
                                message: 'Мінімум 10 символів'
                            }
                        }} />
                    </div>
                    <div className="self-end">
                        <button className="bg-green-400 hover:bg-green-200 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Створити</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
export default FeatureNew;
