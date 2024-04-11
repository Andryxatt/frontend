import { useEffect, useState } from 'react';
import './AccordionPrice.sass';
import PropTypes from "prop-types";
import MultiRangeSlider from './../../UI/multi-range-slider/MultiRangeSlider';
import { useAppSelector } from '../../../store/hooks';
const AccordionPriceRange = ({title} : {title:string} ) => {
  const minPrice = useAppSelector((state) => state.blackListSlice.filters.minPrice);
  const maxPrice = useAppSelector((state) => state.blackListSlice.filters.maxPrice);
  const [range, setRange] = useState([minPrice, maxPrice]);
  const [isOpen, setIsOpen] = useState(true);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    setRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (

    <div>
      <div>
        <button onClick={handleAccordionClick} type="button">{title}</button>
      </div>
      {
        isOpen && (
          <MultiRangeSlider
            classes={{ root: 'multi-range-slider' }}
            isShowTooltip={true}
            max={10000}
            min={0}
            onChange={setRange}
            step={1}
            value={range}
            
          />
        )
      }
     
    </div>
  );
};

AccordionPriceRange.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AccordionPriceRange;
