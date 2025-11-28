import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxWrapperProps {
    children: ReactNode;
    offset?: number;
    className?: string;
}

export const ParallaxWrapper = ({ children, offset = 50, className = "" }: ParallaxWrapperProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
};
