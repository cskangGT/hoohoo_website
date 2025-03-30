import { useEffect, useState } from 'react';

interface UseWindowResizeOptions {
    maxWidth?: number;
}

const useWindowResize = (options: UseWindowResizeOptions = {}) => {
    const { maxWidth } = options;

    const [resizedWidth, setResizedWidth] = useState<number>(
        window.innerWidth > (maxWidth || Infinity) ? (maxWidth as number) : window.innerWidth
    );

    useEffect(() => {
        const handleResize = () => {
            setResizedWidth(
                window.innerWidth > (maxWidth || Infinity) ? (maxWidth as number) : window.innerWidth
            );
        };

        // 초기 실행
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [maxWidth]);

    return resizedWidth;
};

export default useWindowResize; 