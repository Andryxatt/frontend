import { useState } from "react";
import { IconType } from "react-icons";
import { NavLink, useLocation } from "react-router-dom";
type DashboardNavItemProps = {
    to: string;
    text: string;
    isOpenMenu: boolean;
    IconItem: IconType;
}
const DashboardNavItem = ({ to, text, isOpenMenu, IconItem }: DashboardNavItemProps) => {
    const location = useLocation();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const onFucusIn = () => {
        setIsFocused(true)
    }
    const onFucusOut = () => {
        setIsFocused(false)
    }
    return (
        <NavLink
            onMouseEnter={onFucusIn}
            onMouseLeave={onFucusOut}
            className={
                `${location.pathname === text ? "bg-blue-300 text-black" : ""} text-white p-4 border-b-2 border-blue-950 shadow-md`}
            to={to}>
            <span className={`flex flex-row items-center relative`}>
                <IconItem style={{ color: "#ffffff" }} />
                <p className={`
            ${isOpenMenu ? "hidden" : "block"} 
             ml-2`}>{text}</p>
                <p className={`${isOpenMenu && isFocused ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
              duration-300 ease-in-out transform fixed left-[76px] text-white p-5 bg-gradient-to-r from-blue-900 to-blue-600 text-lg shadow-md`}>{text}</p>
            </span>
        </NavLink>
    )
}
export default DashboardNavItem;