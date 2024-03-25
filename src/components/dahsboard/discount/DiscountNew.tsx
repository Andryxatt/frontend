import { FormProvider, useForm } from "react-hook-form";
import { useAddNewDiscountsMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import CustomInput from "../../UI/CustomInput";
const DiscountNew = () => {
    const methods = useForm()
    const [addNewDiscount] = useAddNewDiscountsMutation()
    const notifySuccess = () => toast("Знижка додана!")
    const notifyError = () => toast.error("Помилка при додаванні знижки!")
    const onSubmit = methods.handleSubmit((data: any) => {
        const { percentage, description } = data
        try {
            addNewDiscount({ percentage: +percentage, description }).unwrap()
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
                    <h1 className="font-bold mb-4">Додати знижку</h1>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="Процент"
                            type="number"
                            id="percentage"
                            placeholder="0"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                }
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
export default DiscountNew;
