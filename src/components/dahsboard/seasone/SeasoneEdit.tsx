import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { useParams } from "react-router";
import { useGetSeasonQuery, useUpdateSeasonMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import CustomInput from "../../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
const SeasoneEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: season, isSuccess } = useGetSeasonQuery<any>(id, { refetchOnMountOrArgChange: true });
    const [updateSeason] = useUpdateSeasonMutation();
    const notifySuccess = () => toast("Сезон оновлено!");
    const onSubmit = methods.handleSubmit((data: any) => {
        const { name } = data
        try {
            updateSeason({ id: season.id, name }).unwrap();
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
                                value={season?.name}
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
                        <button className="bg-blue-400 hover:bg-blue-200 mr-2 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Оновити</button>
                    </form>
                }
            </FormProvider>

        </DashboardLayout>
    )
}
export default SeasoneEdit;