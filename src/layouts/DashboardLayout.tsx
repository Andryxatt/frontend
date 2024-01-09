import { ReactNode, useMemo } from "react";
import DashboardNavigation from "./headers/DashboardNavigation";
import { ToastContainer } from "react-toastify";
type DashboardLayoutProps = {
    children: ReactNode;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const memoizedChildren = useMemo(() => children, [children]);
    return (
        <div className="flex flex-row">
            <DashboardNavigation />
            <div className="p-5 w-full">
                {memoizedChildren}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default DashboardLayout;