/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAddNewBrandMutation } from "../../api/apiSlice";
import { FormProvider, useForm } from "react-hook-form";
import { CustomInput } from "../UI/CustomInput";
import { CustomTextarea } from "../UI/CustomTextarea";
import { toast } from "react-toastify";
import { CustomInputFile } from "../UI/custom-elements/CustomInputFile";

const BrandNew = () => {
    const methods = useForm()
    const [imgPreview, setImgPreview] = useState(null) as any
    const [fileAdded, setFileAdded] = useState(null) as any
    const [addNewBrand] = useAddNewBrandMutation()
    const notifySuccess = () => toast("Бренд додано!")
  
    const onFileChange = (fileChangeEvent: any) => {
        console.log("fileEvent")
        console.log(fileChangeEvent.target.files[0]);
        setFileAdded(fileChangeEvent.target.files[0])
        setImgPreview(URL.createObjectURL(fileChangeEvent.target.files[0]))
    }
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description, file } = data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('iconPath', "iconPath");
        if (fileAdded !== null) {
            formData.append('file', fileAdded, fileAdded.name);
        }
        try {
            addNewBrand(formData).unwrap()
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
                    <h1 className="font-bold mb-4">Додати новий бренд</h1>
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
                    <div className="mb-2 flex flex-col">
                        <label className="mb-2" htmlFor="image">Логотип</label>
                        <CustomInputFile 
                        type="file" 
                        label="image" 
                        id="image" 
                        onChangeEvent={onFileChange}
                        validation={{
                            required: {
                                value: true,
                                message: 'Обовязкове поле'
                            },
                            
                        }}
                        />
                        {/* <input onChange={(e) => { onFileChange(e) }} type="file" name="image" id="image" /> */}
                        <img className="rounded-sm mt-2 w-[145px] h-[145px] self-center" src={imgPreview} id="imgPreview" />
                    </div>
                    <div className="self-end">
                        <button className="rounded-md bg-green-400 px-2 py-1" onClick={onSubmit}>Створити</button>
                    </div>
                </form>
            </FormProvider>
          
        </div>
    );
}
export default BrandNew;
