
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetDiscountsQuery } from '../../api/apiSlice'
import DiscountItem from "./DiscountItem";
import { Discount } from "../../models/discount.model";
import DiscountNew from "./DiscountNew";

const DiscountList = () => {
    const { 
        data,
        isLoading,
        isSuccess,
        isError,
        error } = useGetDiscountsQuery(undefined, { refetchOnMountOrArgChange: true});
    let content
    if (isLoading) {
      content = <></>
    } else if (isSuccess) {
      content = data.map((discount:Discount) => <DiscountItem key={discount.id} discount={discount} />)
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    return (
        <DashboardLayout>
        <div className="container mx-auto flex flex-row">
            <DiscountNew/>
            <div className="w-full ml-2">
            <div className="flex flex-row justify-between p-3 w-[100%]">
                <div>ID</div>
                <span>Процент</span>
                <span>Дії</span>
            </div>
            {content}
            </div>
            
        </div>
        </DashboardLayout>
    )
}
export default DiscountList;