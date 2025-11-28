import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-50" />

            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
    );
};
