import { ReactNode } from "react";
import ActiveBar from "../components/main-shop/ActiveBar";
import MainFooter from "./footers/MainFooter";
import MainHeader from "./headers/MainHeader";
import React from "react";
type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> =  React.memo(({ children }) => {
// 
    return (
        <div className="h-[100%]">
            <MainHeader />
            <div className="mt-[5em]">
                {children}
            </div>
            <MainFooter />
        </div>
    );
});
export default MainLayout;