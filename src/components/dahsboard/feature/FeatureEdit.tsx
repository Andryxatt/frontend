import DashboardLayout from "../../../layouts/DashboardLayout";
import { useParams } from "react-router";
import { useGetFeatureQuery, useUpdateFeaturesMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import CustomInput from "../../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextarea } from "../../UI/CustomTextarea";
const FeatureEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: feature, isSuccess } = useGetFeatureQuery<any>(id, { refetchOnMountOrArgChange: true });
    const [updateFeature] = useUpdateFeaturesMutation();
    const notifySuccess = () => toast("Категорія оновлена!");
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description } = data

        try {
            updateFeature({ id: feature.id, name, description }).unwrap();
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
                                value={feature?.name}
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
                                value={feature?.description}
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
export default FeatureEdit;