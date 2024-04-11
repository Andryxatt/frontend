import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { useParams } from "react-router";
import { useGetCategoriesQuery, useUpdateSubCategoryMutation, useGetSubCategoryQuery } from "../../../api/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import CustomInput from "../../UI/CustomInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CustomTextarea } from "../../UI/CustomTextarea";
import Select from 'react-select';
const CategoryEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: subCategory, isSuccess: isSuccesSubCat } = useGetSubCategoryQuery<any>(id, { refetchOnMountOrArgChange: true }) as any;
    const { data: categoryies} = useGetCategoriesQuery<any>(null, { refetchOnMountOrArgChange: true }) as any;
    const [updateSubCategory] = useUpdateSubCategoryMutation();
    const notifySuccess = () => toast("Категорія оновлена!");
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description, categoryId } = data
       
        try {
            updateSubCategory({ id: subCategory.id, name, description, categoryId: categoryId.value}).unwrap();
            notifySuccess();
        } catch (error) {
            console.log(error);
        }
    })
    return (
        <DashboardLayout>
            <FormProvider {...methods}>
                {
                    isSuccesSubCat && <form onSubmit={e => e.preventDefault()}
                        noValidate
                        autoComplete="off">
                        <div>
                            <CustomInput
                                label="Назва"
                                value={subCategory?.name}
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
                                value={subCategory?.description}
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
                        <div>
                            <label className="mb-2" htmlFor="categoryId">Category</label>
                            <Controller
                                name="categoryId"
                                defaultValue={{
                                    label: subCategory?.category?.name,
                                    value: subCategory?.category?.id,
                                }}
                                render={({ field }:any) => (
                                    <Select
                                        {...field}
                                        options={
                                            categoryies?.map((value: any) => ({
                                                label: value.name,
                                                value: value.id,
                                            }))
                                        }
                                    />
                                )}
                            />
                            {/* <Select
                                name="sizes"
                                id="categoryId"
                                options={categoryies?.map((value: any) => ({
                                    label: value.name,
                                    value: value.id,
                                }))}
                                defaultValue={{
                                    label: subCategory.category.name,
                                    value: subCategory.category.id,
                                }}
                                className="rounded-sm text-sm"
                                classNamePrefix="select"
                            /> */}
                        </div>
                        <button className="bg-blue-400 hover:bg-blue-200 mr-2 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Оновити</button>
                    </form>
                }
            </FormProvider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </DashboardLayout>
    )
}
export default CategoryEdit;