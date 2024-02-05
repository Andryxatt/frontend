import { toast } from "react-toastify";
import { useGetCategoriesQuery, useNewSubCategoryMutation } from "../../api/apiSlice";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CustomInput from "../UI/CustomInput";
import { CustomTextarea } from "../UI/CustomTextarea";
import Select from 'react-select';
const SubCategoryNew = () => {
    const methods = useForm()
    const [newSubCategory] = useNewSubCategoryMutation();
    const { data: categories, } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any;
    const notifySuccess = () => toast("Підкатегорія додана!")
    const notifyError = () => toast.error("Помилка при додаванні підкатегорії!")
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description, categoryId } = data
        try {
            newSubCategory({ name, description, categoryId: categoryId.value }).unwrap()
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
                    noValidate
                    autoComplete="off"
                    onSubmit={e => e.preventDefault()}>
                    <h1 className="font-bold mb-4">Додати підкатегорію</h1>
                    <div className="mb-2 flex flex-col">
                        <CustomInput
                            label="Назва підкатегорії"
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
                    <div className="mb-2 flex flex-col">
                        <label className="mb-2" htmlFor="categoryId">Category</label>
                        <Controller
                                name="categoryId"
                                render={({ field }:any) => (
                                    <Select
                                        {...field}
                                        options={
                                            categories?.map((value: any) => ({
                                                label: value.name,
                                                value: value.id,
                                            }))
                                        }
                                    />
                                )}
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
export default SubCategoryNew;