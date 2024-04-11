import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
const DashboardNavMenu = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Add or remove the 'dark' class based on the theme
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    return (
        <div className='w-full flex flex-row p-2'>
                     <button 
                onClick={toggleTheme} 
                className="py-2 px-4 text-2xl flex justify-center items-center transition duration-500 ease-in-out transform hover:bg-gray-300 dark:hover:bg-gray-700"
            >
                {theme === 'light' ? (
                    // Sun icon for light theme
                    <FaSun size={24} />
                ) : (
                    // Moon icon for dark theme
                    <FaMoon size={24} />
                )}
            </button>
            <button 
                className="py-2 px-4 text-2xl flex justify-center items-center transition duration-500 ease-in-out transform hover:bg-gray-300 dark:hover:bg-gray-700"
            >
                <FaUser size={24} />
            </button>
        </div>
    )
}
export default DashboardNavMenu;