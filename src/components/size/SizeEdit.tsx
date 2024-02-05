import DashboardLayout from "../../layouts/DashboardLayout";
import { useParams } from "react-router";
import { useGetSizeQuery, useUpdateCategoryMutation, useUpdateSizesMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import  CustomInput  from "../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
const SizeEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: size, isSuccess } = useGetSizeQuery<any>(id, { refetchOnMountOrArgChange: true });
    const [updateSize] = useUpdateSizesMutation();
    const notifySuccess = () => toast("Розмір оновлено!");
    const onSubmit = methods.handleSubmit((data: any) => {
        const {CM, EU, USA, Length } = data
      
        try {
            updateSize({  id: size.id, CM, EU, USA, Length }).unwrap();
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
                                label="Сантиметри"
                                value={size?.CM}
                                type="text"
                                id="CM"
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Обовязкове поле',
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <CustomInput
                                label="EU"
                                value={size?.EU}
                                type="text"
                                id="EU"
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Обовязкове поле',
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <CustomInput
                                label="US"
                                value={size?.USA}
                                type="text"
                                id="USA"
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Обовязкове поле',
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <CustomInput
                                label="Довжина устілки"
                                value={size?.Length}
                                type="text"
                                id="Length"
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Обовязкове поле',
                                    }
                                }}
                            />
                        </div>
                        <button className="bg-blue-400 hover:bg-blue-200 mr-2 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Оновити</button>
                    </form>
                }
            </FormProvider>
         
        </DashboardLayout>
    )
}
export default SizeEdit;