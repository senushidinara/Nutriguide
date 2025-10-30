import React, { useState, useEffect, useRef } from 'react';

const useAnimatedValue = (endValue: number, duration = 1500) => {
    const [currentValue, setCurrentValue] = useState(0);
    // FIX: Initialize useRef with null and update type to allow null to fix hook error.
    const frameRef = useRef<number | null>(null);
    
    useEffect(() => {
        let startTime: number | null = null;
        
        const animate = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
            }
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Apply ease-out-quad easing function
            const easedProgress = progress * (2 - progress);
            
            const nextValue = Math.floor(easedProgress * endValue);
            setCurrentValue(nextValue);
            
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };
        
        frameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [endValue, duration]);
    
    return currentValue;
};

interface AnimatedScoreProps {
    value: number;
}

const AnimatedScore: React.FC<AnimatedScoreProps> = ({ value }) => {
    const animatedValue = useAnimatedValue(value);
    
    return <span>{animatedValue}</span>;
};

export default AnimatedScore;