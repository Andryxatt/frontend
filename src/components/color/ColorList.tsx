
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetColoresQuery } from '../../api/apiSlice'
import ColorItem from "./ColorItem";
import { Color } from "../../models/color.model";
import ColorNew from "./ColorNew";
const ColorList = () => {
    const { 
        data,
        isLoading,
        isSuccess,
        isError,
        error } = useGetColoresQuery(undefined, { refetchOnMountOrArgChange: true});
    let content
    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = data.map((color:Color) => <ColorItem key={color.id} color={color} />)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return (
        <DashboardLayout>
        <div className="container mx-auto flex flex-row">
            <ColorNew/>
            <div className="w-full ml-2">
            <div className="flex flex-row justify-between p-3 w-[100%]">
                <div>ID</div>
                <span>Назва</span>
                <span>Hex колір</span>
                <span>Дії</span>
            </div>
            {content}
            </div>
            
        </div>
        </DashboardLayout>
    )
}
export default ColorList;