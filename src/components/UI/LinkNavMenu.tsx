import { FC, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './LinkNavMenu.module.sass';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps {
    to: string;
    children: React.ReactElement;
    popUpChildren: React.ReactElement;
}

const LinkNavMenu: FC<LinkProps> = ({ to, children, popUpChildren }: LinkProps) => {
    const [show, setShow] = useState(false);
    const showBlock = () => {
        setShow(true);
    }
    const hideBlock = () => {
        setShow(false);
    }
    return (
        <div onMouseLeave={hideBlock} onMouseOver={showBlock} className={styles.wrappLink}>
            <Link to={to}>{children}</Link>
            {/* <Link  className={show ? styles.navMenuItem : ""} to={to}>{children}</Link> */}
            {/* <div className={show ? styles.popUp : styles.hiddenPopUp}>{popUpChildren}</div> */}
        </div>

    )
}
export default LinkNavMenu;