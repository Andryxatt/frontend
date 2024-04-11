import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { useParams } from "react-router";
import { useGetCategoryQuery, useUpdateCategoryMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import  CustomInput  from "../../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextarea } from "../../UI/CustomTextarea";
const CategoryEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: category, isSuccess } = useGetCategoryQuery<any>(id, { refetchOnMountOrArgChange: true });
    const [updateCategory] = useUpdateCategoryMutation();
    const notifySuccess = () => toast("Категорія оновлена!");
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description } = data
        try {
            updateCategory({ id: category.id, name, description }).unwrap();
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
                                value={category?.name}
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
                        <div>
                            <CustomTextarea
                            value={category?.description}
                             label="Опис"
                              id="description" 
                              placeholder="Опис" 
                              validation={{
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
                        <button className="bg-blue-400 hover:bg-blue-200 mr-2 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Оновити</button>
                    </form>
                }
            </FormProvider>
         
        </DashboardLayout>
    )
}
export default CategoryEdit;