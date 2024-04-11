import React, { ReactNode } from "react";
import DashboardSideBar from "./DashboardSideBar";
import { ToastContainer } from "react-toastify";
import DashboardNavMenu from "./DashboardNavMenu";
import { ThemeProvider } from "../../contexts/ThemeProvider";

type DashboardLayoutProps = {
    children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <div className="flex h-screen overflow-hidden">
                <div className="w-16 sm:w-64">
                    <DashboardSideBar />
                </div>
                <div className="flex-1 overflow-auto">
                    <DashboardNavMenu />
                    <div className="p-4">
                        {children}
                    </div>
                </div>
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
        </ThemeProvider>
    );
}

export default DashboardLayout;