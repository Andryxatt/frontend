import { useGetSizesQuery } from "../../api/apiSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Size } from "../../models/size.model";
import SizeItem from "./SizeItem";
import SizeNew from "./SizeNew";

const SizeList = () => {
    const { 
        data: sizes,
         isLoading,
        isSuccess,
        isError,
        error } = useGetSizesQuery({});
    let content
    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = sizes.map((sizeItem:Size) => <SizeItem key={sizeItem.id} sizeItem={sizeItem} />)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return (
        <DashboardLayout>
        <div className="container mx-auto flex flex-row">
            <SizeNew/>
            <div className="w-full ml-2">
            <div className="flex flex-row justify-between p-3 w-[100%]">
                <div>ID</div>
                <span>CM</span>
                <span>EU</span>
                <span>USA</span>
                <span>Устілка</span>
                <span>Action</span>
            </div>
            {content}
            </div>
            
        </div>
        </DashboardLayout>
    )
}
export default SizeList