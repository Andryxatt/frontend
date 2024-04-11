import LogoBlue from '../../assets/Logo.gif'
import { FaAd, FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa';
import DashNavLink from "./DashNavLink";
const DashboardNavigation = () => {
  return (
    <div className='w-16 sm:w-64 h-screen fixed left-0 top-0 bg-dark-dark dark:bg-dark-light text-dark-light dark:text-dark-dark transition-all duration-200'>
      <div className='flex flex-col'>
        <img className="w-full flex justify-center " src={LogoBlue} />
        <DashNavLink to="/" icon={<FaAd size={24} />} end>Магазин</DashNavLink>
        <DashNavLink to="/dashboard" icon={<FaAd size={24} />} end>Статистика</DashNavLink>
        <DashNavLink to="/dashboard/brands" icon={<FaUsers size={24} />} end>Бренди</DashNavLink>
        <DashNavLink to="/dashboard/categories" icon={<FaCog size={24} />} end>Категорії</DashNavLink>
        <DashNavLink to="/dashboard/sub-categories" icon={<FaUsers size={24} />} end>Підкатегорії</DashNavLink>
        <DashNavLink to="/dashboard/sizes" icon={<FaBox size={24} />} end>Розміри</DashNavLink>
        <DashNavLink to="/dashboard/products" icon={<FaShoppingCart size={24} />} end>Товари</DashNavLink>
      
      </div>

    </div>
  )
}
export default DashboardNavigation;
