import LogoBlue from '../../assets/Logo.gif'
import DashboardNavMenu from "./DashboardNavMenu";
const DashboardNavigation = () => {

    return (
        <div className='h-full w-[240px] bg-slate-400 items-center flex flex-col'>
            <img className="w-[36px] mt-4 mb-4" src={LogoBlue} />
            <div>User Information</div>
            <DashboardNavMenu />
        </div>
    )
}
export default DashboardNavigation;