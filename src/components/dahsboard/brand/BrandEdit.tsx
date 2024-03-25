import React, { useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import DashboardLayout from "../../../layouts/DashboardLayout";
import CustomInput from "../../UI/CustomInput";
import { CustomTextarea } from "../../UI/CustomTextarea";

import { useGetBrandQuery, useUpdateBrandMutation } from "../../../api/apiSlice";
type BrandResponse = {
    data: any
    isSuccess: boolean
}

const BrandEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    useLayoutEffect(() => {
        console.log(id, "id layout effect");
    }, []);
    const methods = useForm()
    const [file, setFile] = useState<File | null>(null);
    const { data: brand, isSuccess } = useGetBrandQuery<BrandResponse>(id, {
        refetchOnMountOrArgChange: true
    });

    const [updateBrand] = useUpdateBrandMutation();

    const notifySuccess = () => toast("Бренд оновлено");

    const onFileChange = (fileChangeEvent: React.ChangeEvent<HTMLInputElement>) => {
        if (fileChangeEvent.target.files && fileChangeEvent.target.files.length > 0) {
            setFile(fileChangeEvent.target.files[0]);
        }
    };
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description } = data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('iconPath', brand?.iconPath);
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
                        <img src={`${import.meta.env.VITE_API_URL}${brand?.iconPath}`} alt={brand?.name} />
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
export default BrandEdit;