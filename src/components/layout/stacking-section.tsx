import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackingSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const StackingSection = ({ children, className, id }: StackingSectionProps) => {
    return (
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div
                id={id}
                className={cn(
                    "relative w-full h-full bg-background border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
                    className
                )}
            >
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
};
