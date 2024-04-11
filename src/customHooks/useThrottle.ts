import { useEffect, useRef, useState } from "react";

const useThrottle = (value: any, delay: number) => {
    const [throttledText, setThrottledText] = useState(value);
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        if (Date.now() - lastExecuted.current >= delay) {
          // If enough time has passed since the last execution, update the throttled text immediately
          lastExecuted.current = Date.now();
          setThrottledText(value);
        } else {
          // Otherwise, create a timer to update the throttled text after the delay
          const throttleTimer = setTimeout(() => {
            lastExecuted.current = Date.now();
            setThrottledText(value);
          }, delay);
    
          // Cleanup function: Clear the timer if the component unmounts or the input changes
          return () => clearTimeout(throttleTimer);
        }
      }, [value, delay]);
    
      return throttledText;

}
export default useThrottle;