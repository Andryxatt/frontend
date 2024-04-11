import clsx from 'clsx';
import {
    type Dispatch,
    type SetStateAction,
    type FC,
    useRef, useState, useEffect
} from 'react';
import './MultiRangeSlider.sass';
import { setMaxPrice, setMinPrice } from '../../../store/slices/blacklist.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
type IProps = {
    classes?: TClasses;
    isShowTooltip?: boolean;
    max: number;
    min: number;
    onChange: Dispatch<SetStateAction<number[]>>;
    step: number;
    value: number[];
}
type TClasses = {
    root?: string;
}
const MultiRangeSlider: FC<IProps> = ({
    classes,
    isShowTooltip,
    max,
    min,
    onChange,
    step,
    value,
}) => {
    const [minVal, setMinVal] = useState(value[0]);
    const [maxVal, setMaxVal] = useState(value[1]);
    const [minTooltip, setMinTooltip] = useState(value[0]);
    const [maxTooltip, setMaxTooltip] = useState(value[1]);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const minInputRef = useRef<HTMLInputElement | null>(null);
    const maxInputRef = useRef<HTMLInputElement | null>(null);
    const minTooltipRef = useRef<HTMLDivElement | null>(null);
    const maxTooltipRef = useRef<HTMLDivElement | null>(null);
    const minPrice = useAppSelector((state) => state.blackListSlice.filters.minPrice);
    const maxPrice = useAppSelector((state) => state.blackListSlice.filters.maxPrice);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (trackRef && trackRef.current && minTooltipRef && minTooltipRef.current && maxTooltipRef && maxTooltipRef.current) {
            const minLeft = `${((minVal - min) / (max - min)) * 100}%`;
            const maxRight = `${((max - maxVal) / (max - min)) * 100}%`;
            trackRef.current.style.left = minLeft;
            trackRef.current.style.right = maxRight;
            minTooltipRef.current.style.left = minLeft;
            minTooltipRef.current.style.transform = `trranslateX(-${minLeft})`;
            maxTooltipRef.current.style.right = maxRight;
            maxTooltipRef.current.style.transform = `translateX(${maxRight})`;
        }
        else {
            console.log('trackRef is null')
        }
    }, [max, min, minVal, maxVal])
    useEffect(() => {
        setMinVal(minPrice);
        setMaxVal(maxPrice);
        setMinTooltip(minPrice);
        setMaxTooltip(maxPrice);
    }, [minPrice, maxPrice])
    const handleChangeMin = (event?: any) => {
        if (minInputRef && minInputRef.current && maxInputRef && maxInputRef.current) {
            minInputRef.current.style.zIndex = "10";
            maxInputRef.current.style.zIndex = "5";
        }
        if (minTooltipRef && minTooltipRef.current && maxTooltipRef && maxTooltipRef.current) {
            minTooltipRef.current.style.zIndex = "10";
            maxTooltipRef.current.style.zIndex = "5";
        }
        const value = Number(event.target.value);
        if (value <= max) {
            setMinVal(value);
            setMinTooltip(value);
            dispatch(setMinPrice(value))
            if (onChange) {
                onChange?.([value, max]);
            }
        }
    };
    const handleChangeMax = (event?: any) => {
        if (minInputRef && minInputRef.current && maxInputRef && maxInputRef.current) {
            minInputRef.current.style.zIndex = "5";
            maxInputRef.current.style.zIndex = "10";
        }
        if (minTooltipRef && minTooltipRef.current && maxTooltipRef && maxTooltipRef.current) {
            minTooltipRef.current.style.zIndex = "5";
            maxTooltipRef.current.style.zIndex = "10";
        }
        const value = Number(event.target.value);
        if (value >= min) {
            setMaxVal(value);
            setMaxTooltip(value);
            dispatch(setMaxPrice(value))
            onChange?.([min, value]);
        }
    };

    return (
        <div className={clsx("MultiRangeSlider", classes?.root)}>
            <div className="MultiRangeSlider-Slider">
                <div className="MultiRangeSlider-Slider-Track" ref={trackRef} />
                <input
                    className="MultiRangeSlider-Slider-Input MultiRangeSlider-Slider-Input-Min"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    name='min'
                    onChange={handleChangeMin}
                    ref={minInputRef}
                    value={minVal}
                />
                <input
                    className="MultiRangeSlider-Slider-Input MultiRangeSlider-Slider-Input-Max"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    name='max'
                    onChange={handleChangeMax}
                    ref={maxInputRef}
                    value={maxVal}
                />
                {
                    isShowTooltip && (
                        <>
                            <div className='MultiRangeSlider-Slider-WrapperTooltip' ref={minTooltipRef}>
                                <div className='MultiRangeSlider-Slider-Tooltip MultiRangeSlider-Slider-Tooltip-Min'>
                                    {minTooltip}
                                </div>
                            </div>
                            <div className='MultiRangeSlider-Slider-WrapperTooltip' ref={maxTooltipRef}>
                                <div className='MultiRangeSlider-Slider-Tooltip MultiRangeSlider-Slider-Tooltip-Max'>
                                    {maxTooltip}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
export default MultiRangeSlider;