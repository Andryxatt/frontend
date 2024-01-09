import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { useNewCategoryMutation } from "../../api/apiSlice";
import  CustomInput  from "../UI/CustomInput";
import { CustomTextarea } from "../UI/CustomTextarea";
const CategoryNew = () => {
    const methods = useForm()
    const [addNewCategory] = useNewCategoryMutation()
    const notifySuccess = () => toast("Категорія додана!")
  
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description } = data

        try {
            addNewCategory({name, description}).unwrap()
            notifySuccess();
        } catch (error) {
            console.log(error);
        }

    })
    return (
        <div>
            <FormProvider {...methods}>
                <form className="p-5 bg-yellow-200 flex flex-col justify-start" onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off">
                    <h1 className="font-bold mb-4">Додати категорію товару</h1>
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
                        <button className="rounded-md bg-green-400 px-2 py-1" onClick={onSubmit}>Створити</button>
                    </div>
                </form>
            </FormProvider>
          
        </div>
    );
}
export default CategoryNew;
