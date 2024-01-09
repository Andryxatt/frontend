import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetSeasonesQuery } from '../../api/apiSlice'
import SeasoneItem from "./SeasoneItem";
import SeasoneNew from "./SeasoneNew";
const SeasonesList = () => {
    const { 
        data: seasones,
         isLoading,
        isSuccess,
        isError,
        error } = useGetSeasonesQuery(undefined, { refetchOnMountOrArgChange: true});
    let content

    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = seasones.map((seasone:any) => <SeasoneItem  key={seasone.id} seasone={seasone}/>)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return (
        <DashboardLayout>
            <div className="container mx-auto flex flex-row">
                <SeasoneNew/>
                <div className="w-full ml-2">
                    <div className="flex flex-row justify-between p-3 w-[100%]">
                        <div>ID</div>
                        <span>Name</span>
                        <span>Action</span>
                    </div>
                  {content}
                </div>

            </div>
        </DashboardLayout>
    )
}
export default SeasonesList;