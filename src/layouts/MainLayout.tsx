import { ReactNode } from "react";
import ActiveBar from "../components/main-shop/ActiveBar";
import MainFooter from "./footers/MainFooter";
import MainHeader from "./headers/MainHeader";
type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="h-[100%]">
            <MainHeader />
            <ActiveBar />
            <div className="mt-[5em]">
                {children}
            </div>
            <MainFooter />
        </div>
    );
}
export default MainLayout;