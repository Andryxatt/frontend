import { useState } from "react";
import { useUpdateBrandMutation } from "../../api/apiSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useParams } from "react-router";
import { useGetBrandQuery } from "../../api/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import { CustomInput } from "../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextarea } from "../UI/CustomTextarea";
type BrandResponse = {
    data: any,
    isSuccess: boolean,
}
const BrandEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const [file, setFile] = useState(null) as any;
    const { data: brand, isSuccess } = useGetBrandQuery<any>(id, { refetchOnMountOrArgChange: true });
    const [updateBrand] = useUpdateBrandMutation();
    const notifySuccess = () => toast("Brand updated!");

    const onFileChange = (fileChangeEvent: any) => {
        setFile(fileChangeEvent.target.files[0]);
    }
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description } = data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('iconPath', brand.iconPath);
        formData.append('id', brand.id);
        if (file !== null) {
            formData.append('file', file, file.name);
        }
        try {
            updateBrand({ id: brand.id, formData }).unwrap();
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
                                value={brand?.name}
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
                            value={brand?.description}
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
                            <input onChange={onFileChange} className="edit-input" type="file" />
                        </div>
                        <img src={`${import.meta.env.VITE_LOCALHOST_URL}${brand?.iconPath}`} alt={brand?.name} />
                        <button className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={onSubmit}>Оновити</button>
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
export default BrandEdit;