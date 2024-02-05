import { AiOutlineDashboard } from "@react-icons/all-files/ai/AiOutlineDashboard";

import { FaBoxes } from "@react-icons/all-files/fa/FaBoxes";
import { FaClipboardList } from "@react-icons/all-files/fa/FaClipboardList";
import { FaCapsules } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
const DashboardSideBarMenu = () => {
    return (
        <nav className="flex flex-col h-screen   w-full overflow-hidden">
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/">
                <AiOutlineDashboard size={'24px'} style={{ color: "" }} /> 
                <span>Головна</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard">
                <FaClipboardList size={'24px'} style={{ color: "" }} /> 
                <span>Статистика</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/brands">
                <FaCapsules size={'24px'} style={{ color: "" }} />
                <span>Бренди</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/categories">
                <FaCapsules size={'24px'} style={{ color: "" }} /> 
                <span>Категорії</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/sub-categories">
                <FaCapsules size={'24px'} style={{ color: "" }} /> 
                <span>Підкатегорії</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/sizes">
                <FaCapsules size={'24px'} style={{ color: "" }} /> 
                <span>Розміри</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/products">
                <FaBoxes size={'24px'} style={{ color: "" }} /> 
                <span>Товари</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/seasones">
                <FaBoxes size={'24px'} style={{ color: "" }} />
                <span>Сезони</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/colores">
                <FaBoxes size={'24px'} style={{ color: "" }} /> 
                <span>Кольори товару</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/genders">
                <FaBoxes size={'24px'} style={{ color: "" }} /> 
                <span>Стать</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/features">
                <FaBoxes size={'24px'} style={{ color: "" }} /> 
                <span>Характеристики</span>
            </NavLink>
            <NavLink className="font-medium p-4 flex flex-row justify-between w-full transition-all duration-300 hover:ml-4 hover:bg-white hover:rounded-[20px]" to="/dashboard/discounts">
                <FaBoxes size={'24px'} style={{ color: "" }} /> 
                <span>Знижки</span>
            </NavLink>
        </nav>
    )
}
export default DashboardSideBarMenu;