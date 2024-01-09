import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetGenderQuery } from '../../api/apiSlice'
import { Gender } from "../../models/gender.model";
import GenderItem from "./GenderItem";
import GenderNew from "./GenderNew";
const GenderList = () => {
    const { 
        data,
        isLoading,
        isSuccess,
        isError,
        error } = useGetGenderQuery(undefined, { refetchOnMountOrArgChange: true});
    let content
    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = data.map((gender:Gender) => <GenderItem key={gender.id} gender={gender} />)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return (
        <DashboardLayout>
        <div className="container mx-auto flex flex-row">
            <GenderNew/>
            <div className="w-full ml-2">
            <div className="flex flex-row justify-between p-3 w-[100%]">
                <div>ID</div>
                <span>Назва</span>
                <span>Дії</span>
            </div>
            {content}
            </div>
            
        </div>
        </DashboardLayout>
    )
}
export default GenderList;