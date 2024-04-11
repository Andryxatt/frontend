import { FaXmark } from "react-icons/fa6";
import { useAppSelector } from "../../../store/hooks";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { clearFilters, setActiveFilters } from "../../../store/slices/blacklist.slice";
import FlushAccordion from "./FlushAccordion";

const ActiveBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isActiveFilter = useAppSelector((state) => state.blackListSlice.isActive);
  const activeBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isActiveFilter && activeBarRef.current && !activeBarRef.current.contains(event.target)) {
        dispatch(setActiveFilters(false));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isActiveFilter]);
  return (
    <div className={`fixed top-0 right-0 bottom-0 left-0 opacity-0 pointer-events-none transition-opacity ease-in-out duration-300 z-10 ${isActiveFilter ? 'opacity-100 backdrop-blur-md pointer-events-auto' : ''}`}>
      <div ref={activeBarRef} className="flex flex-col w-64 bg-#ccc h-screen absolute z-10 right-0 transform transition-transform ease-in-out duration-300 translate-x-0">
        <button type="button" className="self-end mt-2 mr-2" onClick={() => dispatch(setActiveFilters(false))}><FaXmark size="32px" /></button>
        <FlushAccordion />
        <button 
        type="button" 
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium mx-2 text-sm px-5 py-2.5 text-center" 
        onClick={() => dispatch(clearFilters())}>Очистити</button>
      </div>
    </div>
  );
};

export default ActiveBar;
