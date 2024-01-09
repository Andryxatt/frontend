
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetFeaturesQuery } from '../../api/apiSlice'
import { Feature } from "../../models/feature.model";
import FeatureItem from "./FeatureItem";
import FeatureNew from "./FeatureNew";
const FeatureList = () => {
    const { 
        data,
        isLoading,
        isSuccess,
        isError,
        error } = useGetFeaturesQuery(undefined, { refetchOnMountOrArgChange: true});
    let content
    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = data.map((feature:Feature) => <FeatureItem key={feature.id} feature={feature} />)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return (
        <DashboardLayout>
        <div className="container mx-auto flex flex-row">
            <FeatureNew/>
            <div className="w-full ml-2">
            <div className="flex flex-row justify-between p-3 w-[100%]">
                <div>ID</div>
                <span>Назва</span>
                <span>Опис</span>
                <span>Дії</span>
            </div>
            {content}
            </div>
            
        </div>
        </DashboardLayout>
    )
}
export default FeatureList;