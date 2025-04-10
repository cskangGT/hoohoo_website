import { useRef, useState } from "react";

export const useLongPress = (callback: () => void, ms: number = 500) => {
  const [pressing, setPressing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = (e: React.TouchEvent | React.MouseEvent) => {
    setPressing(true);
    timeoutRef.current = setTimeout(() => {
      setPressing(false);
      callback();
    }, ms);
  };

  const stop = () => {
    setPressing(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  console.log('pressing', pressing);

  return {
    pressing,
    handlers: {
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    },
  };
};
