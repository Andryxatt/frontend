import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import LogoBlue from '../../assets/Logo.gif'
import { useCallback, useState } from "react";
import DashboardNavMenu from "./DashboardNavMenu";
const DashboardNavigation = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const toggleMenu = useCallback(() => {
        setIsOpenMenu((prevIsOpenMenu) => !prevIsOpenMenu);
      }, []);
    return (
        <div className={`${isOpenMenu ? "w-[80px]" : "w-[280px]"} h-auto overflow-auto transition-all flex flex-col max-w-[280px] relative bg-blue-500`}>
            <div className="flex flex-row justify-between p-3">
                <img className={`${!isOpenMenu ? "w-[72px]" : "w-[34px]"}`} src={LogoBlue}/>
                <button className="absolute right-1 top-4" onClick={() => toggleMenu()}>
                    {
                        isOpenMenu ? 
                        <FaArrowLeft size={16} style={{ color: "#ffffff", background:"black", padding: "2px", width:"22px", height:"22px", borderRadius:"50%"}}  /> : 
                        <FaArrowRight style={{ color: "#ffffff", background:"black", padding: "2px", width:"22px", height:"22px", borderRadius:"50%"}} onClick={() => toggleMenu()} />
                    }
                </button>
            </div>
            <DashboardNavMenu isOpen={isOpenMenu} />

        </div>
    )
}
export default DashboardNavigation;