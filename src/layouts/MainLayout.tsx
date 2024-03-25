import { ReactNode } from "react";
import MainFooter from "./footers/MainFooter";
import MainHeader from "./headers/MainHeader";
import React from "react";
import { ToastContainer } from "react-toastify";
type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> =  React.memo(({ children }) => {
// 
    return (
        <div className="">
            <MainHeader />
            <div className="md:px-10 mobile:px-0">
                {children}
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
            <MainFooter />
          
        </div>
    );
});
export default MainLayout;