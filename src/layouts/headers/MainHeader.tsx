import { useAppSelector } from "../../store/hooks";
import { ChangeEvent, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LinkNavMenu from "../../components/UI/LinkNavMenu";
import phoneIcon from '../../assets/icons/phone-call.png';
import userIcon from '../../assets/icons/user.png';
import heartIcon from '../../assets/icons/heart.png';
import CartIcon from "../../components/main-shop/shopping-cart/CartIcon";
import menuIcon from "../../assets/icons/menu.png";
import './MainHeader.sass'
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/slices/blacklist.slice";
import { AppDispatch } from "../../store/store";
import { motion } from "framer-motion";
import { useDimensions } from "../../customHooks/useDimensionse";
const MainHeader = () => {
    const likedProducts = useAppSelector((state: any) => state.productSlice.likedProducts);
    const user = useAppSelector((state: any) => state.userSlice.user);
    const cartItems = useAppSelector((state: any) => state.cartSlice.cartElements);
    const [isOpen, setIsOpen] = useState(false);
    const filters = useAppSelector((state) => state.blackListSlice.filters);
    const [inputValue, setInputValue] = useState(filters ? filters.search : '');
    const dispatch = useDispatch<AppDispatch>();
    const containerRef = useRef(null);
    const {height} = useDimensions(containerRef);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        dispatch(setSearch(e.target.value));
    };

    return (
        <header className="header">
            <div className="wrapper">
                <button className="custom_button" onClick={() => { setIsOpen(true) }}>
                    <img src={menuIcon} />
                </button>
            </div>
            <h1 className="logo"><Link to="/">Step In Style</Link></h1>
            <nav className="flex justify-between">
                <button className="px-2">Новинки</button>
                <button className="px-2">Чоловікам</button>
                <button className="px-2">Жінкам</button>
                <button className="px-2">Дітям</button>
                <button className="px-2">Знижки</button>
                <button className="px-2">Бренди</button>
                {/* {
                    user?.roles?.filter((role: string) => {
                        return role === 'user'
                    })[0] === 'user' && <LinkNavMenu popUpChildren={<>He</>} to="/dashboard"><p>Dash</p></LinkNavMenu>
                } */}
                <LinkNavMenu popUpChildren={<>He</>} to="/dashboard"><p>Dash</p></LinkNavMenu>
            </nav>
            <div className="flex flex-row justify-center items-center gap-3">
                <input className="p-1 rounded-md" value={inputValue} type="text" onChange={handleChange} placeholder="Пошук..." />
            </div>
            <ul className="nav-main">
                <li><img className="icon mr-2" src={phoneIcon} /></li>
                <Link to={`${user.roles ? "/acount" : "/login"}`} className="mr-2"><img className="icon" src={userIcon} /></Link>
                <Link to="/liked" className="relative mr-2"><img className="icon" src={heartIcon} />{likedProducts?.length > 0 ? <span className="icon-info">{likedProducts?.length}</span> : ""}</Link>
                <Link to="/cart" className="relative"><CartIcon />{cartItems?.length > 0 ? <span className="icon-info">{cartItems?.length}</span> : ""}</Link>
            </ul>
            <motion.div
                className="mobile_menu"
                variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: "-100%" },
                }}
                custom={height}
                ref={containerRef}
            >
                <h2>Мобіла</h2>
                <NavLink to="/"><p className="text-black">Новинки</p></NavLink>
                {
                    user?.roles?.filter((role: string) => role === 'user')[0] === 'user' &&
                    <NavLink to="/dashboard"><p>Dash</p></NavLink>
                }
                <button onClick={() => setIsOpen(false)}>Close menu</button>
            </motion.div>
        </header>
    );
}
export default MainHeader;