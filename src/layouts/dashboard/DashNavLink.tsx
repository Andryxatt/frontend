import { ReactNode } from "react";
import { NavLinkProps, NavLink } from "react-router-dom";

interface CustomNavLinkProps extends NavLinkProps {
    icon: ReactNode;
    children: ReactNode;
  }
  
  const DashNavLink: React.FC<CustomNavLinkProps> = ({ to, end, children, icon }) => {
    return (
      <NavLink 
        to={to} 
        end={end}
        className={({ isActive }) => isActive 
          ? "bg-dark-light flex-col items-center dark:bg-dark-dark py-2 text-dark-dark dark:text-dark-light w-full flex justify-center hover:bg-dark-light dark:hover:bg-dark-dark hover:text-dark-dark dark:hover:text-dark-light" 
          : "w-full flex flex-col justify-center items-center py-2 transition-colors duration-200 hover:bg-dark-light dark:hover:bg-dark-dark hover:text-dark-dark dark:hover:text-dark-light"
        }
      >
        {icon}
        <span className="sm:block hidden">{children}</span>
      </NavLink>
    )
  }
  
  export default DashNavLink;