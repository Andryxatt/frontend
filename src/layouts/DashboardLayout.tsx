import React, { ReactNode } from "react";
import DashboardNavigation from "./headers/DashboardNavigation";
import { ToastContainer } from "react-toastify";

type DashboardLayoutProps = {
    children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-row">
            <DashboardNavigation />
            <div className="p-5 w-full">
                {children}
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
