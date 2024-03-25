import DashboardLayout from "../../../layouts/DashboardLayout";
import { useParams } from "react-router";
import { useGetDiscountQuery, useUpdateDiscountsMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import CustomInput from "../../UI/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
const DiscountEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const { data: discount, isSuccess } = useGetDiscountQuery<any>(id, { refetchOnMountOrArgChange: true });
    const [updateCategory] = useUpdateDiscountsMutation();
    const notifySuccess = () => toast("Категорія оновлена!");
    const onSubmit = methods.handleSubmit((data: any) => {
        const { percentage } = data
        try {
            updateCategory({ id: discount.id, percentage }).unwrap();
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
                                label="Процент"
                                type="number"
                                value={discount?.percentage}
                                id="percentage"
                                defaultValue={discount?.percentage}
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
export default DiscountEdit;