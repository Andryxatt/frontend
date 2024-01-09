import { AiOutlineDashboard } from "@react-icons/all-files/ai/AiOutlineDashboard";
import DashboardNavItem from "./DashboardNavItem";
type DashboardNavMenuProps = {
    isOpen: boolean;
};

import { FaBoxes } from "@react-icons/all-files/fa/FaBoxes";
import { FaClipboardList } from "@react-icons/all-files/fa/FaClipboardList";
import { FaCapsules } from "react-icons/fa6";
const DashboardNavMenu = ({ isOpen }: DashboardNavMenuProps) => {
    
    return (
        <nav className="flex flex-col h-screen">
            <DashboardNavItem to="/" text="Головна сторінка" isOpenMenu={isOpen} IconItem={FaBoxes} />
            <DashboardNavItem to="/dashboard" text="Панель статистики" isOpenMenu={isOpen} IconItem={AiOutlineDashboard} />
            <DashboardNavItem to="/dashboard/brands" text="Бренди" isOpenMenu={isOpen} IconItem={FaCapsules} />
            <DashboardNavItem to="/dashboard/categories" text="Категорії товару" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/sub-categories" text="Підкатегорії товару" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/sizes" text="Розміри" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/products" text="Товари" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/seasones" text="Сезони" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/colores" text="Кольори товару" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/genders" text="Стать" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/features" text="Характеристики" isOpenMenu={isOpen} IconItem={FaClipboardList} />
            <DashboardNavItem to="/dashboard/discounts" text="Знижки" isOpenMenu={isOpen} IconItem={FaClipboardList} />
        </nav>
    )
}
export default DashboardNavMenu;