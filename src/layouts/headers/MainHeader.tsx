import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LinkNavMenu from "../../components/UI/LinkNavMenu";
import searchIcon from '../../assets/icons/search.png';
import phoneIcon from '../../assets/icons/phone-call.png';
import userIcon from '../../assets/icons/user.png';
import heartIcon from '../../assets/icons/heart.png';
import CartIcon from "../../components/main-shop/CartIcon";
import menuIcon from "../../assets/icons/menu.png";
import CustomModal from "../../components/UI/CustomModal";
import { fetchProductSuccess } from "../../store/slices/product.slice";
import './MainHeader.sass'
const MainHeader: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const urlApi = import.meta.env.REACT_APP_API_URL;

    useEffect(() => {   
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const user = useAppSelector((state) => state.userSlice.user);
    const dispatch = useAppDispatch();
    const headerClass = isVisible ? 'header' : 'header hidden';
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const getNewProducts = () => {
        fetch(urlApi + '/products/newProducts')
            .then((res) => res.json())
            .then((res) => {
                dispatch(fetchProductSuccess(res))
            })
    }
    return (
        <header className={headerClass}>
            {isSearchOpen && <CustomModal isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />}
            <div className="wrapper">
                <button className="custom_button" onClick={() => { setIsOpen(true) }}>
                    <img src={menuIcon} />
                </button>
                <button className="custom_button" onClick={() => setIsSearchOpen(true)}>
                    <img className="icon" src={searchIcon} />
                </button>
            </div>

            <h1 className="logo"><Link to="/">Step In Style</Link></h1>
            <nav className="">
                <LinkNavMenu to="/" popUpChildren={<>He</>}><p onClick={getNewProducts}>Новинки</p></LinkNavMenu>
                <LinkNavMenu to="/" popUpChildren={<>Hs</>}><p>Чоловікам</p></LinkNavMenu>
                <LinkNavMenu to="/" popUpChildren={<>Hc</>}><p>Жінкам</p></LinkNavMenu>
                <LinkNavMenu to="/" popUpChildren={<>Hz</>}><p>Дітям</p></LinkNavMenu>
                <LinkNavMenu to="/" popUpChildren={<>He</>}><p>Знижки</p></LinkNavMenu>
                <LinkNavMenu to="/" popUpChildren={<>He</>}><p>Бренди</p></LinkNavMenu>
                {
                    user?.roles?.filter((role: string) => {
                        return role === 'user'
                    })[0] === 'user' && <LinkNavMenu popUpChildren={<>He</>} to="/dashboard"><p>Dash</p></LinkNavMenu>
                }
            </nav>
            <ul className="">
                <li><img onClick={() => setIsSearchOpen(true)} className="icon" src={searchIcon} /></li>
                <li><img className="icon" src={phoneIcon} /></li>
                <Link to={`${user.roles ? "/acount" : "/login"}`}><img className="icon" src={userIcon} /></Link>
                <li><img className="icon" src={heartIcon} /></li>
                <li><CartIcon /></li>
            </ul>
            <div className="wrapper">
                <CartIcon />
            </div>
            <div className={`${isOpen ? "open" : "mobile_menu"} `}>
                <h2>Мобіла</h2>
                <NavLink to="/"><p className="text-black" onClick={getNewProducts}>Новинки</p></NavLink>
                {
                    user?.roles?.filter((role: string) => {
                        return role === 'user'
                    })[0] === 'user' && <NavLink to="/dashboard"><p>Dash</p></NavLink>
                }
                <button onClick={() => setIsOpen(false)}>Close menu</button>
                
            </div>
        </header>
    );
}
export default MainHeader;