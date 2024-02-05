import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddNewSeasonMutation } from "../../api/apiSlice";
import CustomInput from "../UI/CustomInput";
const SeasoneNew = () => {
    const [newSeasone] = useAddNewSeasonMutation();
    const methods = useForm()
    const notifySuccess = () => toast("Сезон додано!")
    const notifyError = () => toast.error("Помилка при додаванні сезону!")
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name } = data
        try {
            newSeasone({ name }).unwrap()
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
                    <h1 className="font-bold mb-4">Створити новий сезон</h1>
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
                    <div className="self-end">
                        <button className="bg-green-400 hover:bg-green-200 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Створити</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
export default SeasoneNew;
