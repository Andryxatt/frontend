import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './CustomModal.module.sass';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/product.slice';
type CustomModalProps = {
    setIsSearchOpen: (isOpen: boolean) => void;
    isSearchOpen: boolean;
  };
const CustomModal: React.FC<CustomModalProps> = ({ setIsSearchOpen, isSearchOpen }) =>  {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const limit = useAppSelector((state) => state.blackListSlice.limit);
    const dispatch = useDispatch<AppDispatch>();
    // Function to handle clicks outside the input element
    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            console.log('You clicked outside of me!');
            setIsSearchOpen(false);
        }
    };
    const searchProducts = async (search: string) => {
        const params = { page: 1, limit: limit, search };
        await dispatch(fetchProducts(params));
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setInputValue(newVal);
        searchProducts(newVal);
    };
    const handleBlur = () => {
        setInputValue('');
    };
    useEffect(() => {
        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearchOpen]);
    return (
        <>
            <div className={`${isSearchOpen ? styles.darkBG : ""} ${styles.bgWrapper}`} onClick={() => setIsSearchOpen(false)} />
            <div className={styles.modal}>
                <form className={styles.form}>
                    <input ref={inputRef} onBlur={handleBlur} value={inputValue} type="text" onChange={handleChange} placeholder="Search.." />
                    <button type="button">Знайти</button>
                </form>
            </div>
        </>
    );
};
export default CustomModal;