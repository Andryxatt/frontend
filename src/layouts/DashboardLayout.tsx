import React, { ReactNode } from "react";
import DashboardSideBar from "./headers/DashboardSideBar";
import { ToastContainer } from "react-toastify";
import DashboardNavMenu from "./headers/DashboardNavMenu";
type DashboardLayoutProps = {
    children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="grid grid-rows-3 grid-cols-4 overflow-hidden">
            <div className="row-span-5 col-end-1">
                <DashboardSideBar />
            </div>
            <div className="col-start-1 col-span-4 row-end-1 w-full">
                <DashboardNavMenu />
            </div>
            <div className="w-full col-start-1 row-start-1 row-span-4 col-span-4">
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
