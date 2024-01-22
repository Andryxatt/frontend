import { useState } from "react";
import { IconType } from "react-icons";
import { NavLink, useLocation } from "react-router-dom";
type DashboardNavItemProps = {
    to: string;
    text: string;
    IconItem: IconType;
}
const DashboardNavItem = ({ to, text, IconItem }: DashboardNavItemProps) => {

    return (
        <NavLink
            to={to}>
            <span className={`flex flex-row items-center relative`}>
                <IconItem className="" style={{ color: "#ffffff" }} />
                <p className={`ml-2`}>{text}</p>
            </span>
        </NavLink>
    )
}
export default DashboardNavItem;