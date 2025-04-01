export interface MobileViewFrameProps {
    children: React.ReactNode;
    backgroundColor?: string;
    containerBackgroundColor?: string;
    onScroll?: (event: Event) => void;
    getMobileContentRef?: (ref: HTMLDivElement | null) => void;
} 