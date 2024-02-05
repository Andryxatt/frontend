import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNewSizesMutation } from "../../api/apiSlice";
import CustomInput from "../UI/CustomInput";
const SizeNew = () => {
    const [addNewSize] = useNewSizesMutation()
    const methods = useForm()
    const notifySuccess = () => toast("Розмір додано!")
    const notifyError = () => toast.error("Помилка при додаванні розміру!")
    const onSubmit = methods.handleSubmit((data: any) => {
        const { CM, EU, USA, Length} = data
        try {
            addNewSize({ CM, EU, USA, Length }).unwrap()
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
                    <h1 className="font-bold mb-4">Create new Size</h1>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="CM"
                            type="text"
                            id="CM"
                            placeholder="0"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                }
                            }}
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="EU"
                            type="text"
                            id="EU"
                            placeholder="0"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                }
                            }}
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="US"
                            type="text"
                            id="USA"
                            placeholder="0"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                }
                            }}
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="Жовжина устілки"
                            type="text"
                            id="Length"
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
export default SizeNew


