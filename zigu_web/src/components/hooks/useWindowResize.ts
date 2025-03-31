import { useEffect, useState } from 'react';

interface LayoutCalculation {
    width: number;
    containerGap: number;
    paddingWidth: number;
    cellContainerWidth: number;
    cellSize: number;
    itemWidth: number;
    itemHeight: number;
    longItemWidth: number;
    bigItemHeight: number;
}

interface UseWindowResizeOptions {
    maxWidth?: number;
}

const calculateLayout = (width: number): LayoutCalculation => {
    const CONTAINER_GAP = 24;
    const PADDING_WIDTH = width * 0.06;
    const CELL_CONTAINER_WIDTH = width - 2 * PADDING_WIDTH - 4;
    const CELL_SIZE = ((CELL_CONTAINER_WIDTH - CONTAINER_GAP) / 2 - CONTAINER_GAP * 2) / 3;
    const ITEM_WIDTH = CELL_SIZE * 3 + CONTAINER_GAP * 2;
    const ITEM_HEIGHT = CELL_SIZE - 2;
    const LONG_ITEM_WIDTH = CELL_CONTAINER_WIDTH;
    const BIG_ITEM_HEIGHT = ITEM_WIDTH;

    return {
        width,
        containerGap: CONTAINER_GAP,
        paddingWidth: PADDING_WIDTH,
        cellContainerWidth: CELL_CONTAINER_WIDTH,
        cellSize: CELL_SIZE,
        itemWidth: ITEM_WIDTH,
        itemHeight: ITEM_HEIGHT,
        longItemWidth: LONG_ITEM_WIDTH,
        bigItemHeight: BIG_ITEM_HEIGHT,
    };
};

const useWindowResize = (options: UseWindowResizeOptions = {}) => {
    const { maxWidth = 600 } = options;

    const [layout, setLayout] = useState<LayoutCalculation>(() => {
        const initialWidth = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
        return calculateLayout(initialWidth);
    });

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
            setLayout(calculateLayout(newWidth));
        };

        // 초기 실행
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [maxWidth]);

    return layout;
};

export default useWindowResize; 