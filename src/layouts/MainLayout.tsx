import { ReactNode } from "react";
import MainFooter from "./footers/MainFooter";
import MainHeader from "./headers/MainHeader";
import React from "react";
import { ToastContainer } from "react-toastify";
import ActiveBar from "../components/main-shop/activebar/ActiveBar";
type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> =  React.memo(({ children }) => {
// 
    return (
        <div className="flex flex-col min-h-screen">
            <MainHeader />
            <ActiveBar/>
            <div className="md:px-[2.5rem] px-[0.5rem] flex-grow">{children}</div>
            <MainFooter />
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
});
export default MainLayout;