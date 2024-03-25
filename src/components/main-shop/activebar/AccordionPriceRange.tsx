import { useState, useRef, useCallback, useEffect } from 'react';
import './AccordionPrice.sass';
import PropTypes from "prop-types";
import { setMinPrice, setMaxPrice } from '../../../store/slices/blacklist.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
const AccordionPriceRange = ({ min, max, title }: { min: number, max: number, title: string }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const handleAccordionClick = () => {
    // Close all other AccordionItems
    setIsOpen(!isOpen);
  }
  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      (range.current as HTMLElement).style.left = `${minPercent}%`;
      (range.current as HTMLElement).style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      (range.current as HTMLElement).style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);
  

  return (
    <div className="border-b">
      <button
        className="w-full text-left py-2 px-4 text-lg font-semibold bg-transparent focus:outline-none"
        onClick={handleAccordionClick}>
        {title}
      </button>
      {isOpen && <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            dispatch(setMinPrice(value));
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            dispatch(setMaxPrice(value));
            maxValRef.current = value;
            // Clear previous timeout
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">
            <input
              onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 1);
                setMinVal(value);
                dispatch(setMinPrice(value));
                minValRef.current = value;
              }}
              className='slider__input'
              type="number"
              value={minVal} />
          </div>
          <div className="slider__right-value">
            <input
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), minVal + 1);
                setMaxVal(value);
                dispatch(setMaxPrice(value));
                maxValRef.current = value;
              }}
              className='slider__input'
              type="number"
              value={maxVal} />
          </div>
        </div>
      </div>}
    </div>

  );
};

AccordionPriceRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default AccordionPriceRange;
