import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ArtisticCardProps {
    children: ReactNode;
    className?: string;
    gradientFrom?: string;
    gradientTo?: string;
}

export const ArtisticCard = ({
    children,
    className,
    gradientFrom = "hsl(var(--primary))",
    gradientTo = "hsl(var(--accent))"
}: ArtisticCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
            className={cn(
                "relative group overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300",
                className
            )}
        >
            {/* Gradient Glow Effect */}
            <div
                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
                    maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />

            {/* Inner Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${gradientFrom}, transparent 70%)`
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-6 h-full">
                {children}
            </div>
        </motion.div>
    );
};
