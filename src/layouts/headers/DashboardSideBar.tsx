import LogoBlue from '../../assets/Logo.gif'
import DashboardSideBarMenu from "./DashboardSideBarMenu";
const DashboardNavigation = () => {

    return (
        <div className='w-[240px] bg-slate-400 items-center flex flex-col'>
            <img className="w-[36px] mt-4 mb-4" src={LogoBlue} />
            <div>User Information</div>
            <DashboardSideBarMenu />
        </div>
    )
}
export default DashboardNavigation;