import React, { useState } from 'react';
import { useInView } from "react-intersection-observer";

const OptimizedImage = ({ src, alt, style } : {src : string; alt: string; style?: React.CSSProperties}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div ref={ref} style={{ minHeight: '200px', position: 'relative' }}>
            {!isLoaded && <div style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 2s linear infinite'
            }} />}
            {inView && <img src={src} alt={alt} onLoad={handleLoad} style={{ display: isLoaded ? 'block' : 'none', ...style }} />}
        </div>
    );
};
export default OptimizedImage;