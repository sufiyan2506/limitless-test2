import { motion } from "framer-motion";

export const ArtisticShapes = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Floating Circle */}
            <motion.div
                className="absolute w-96 h-96 rounded-full"
                style={{
                    background: "radial-gradient(circle, hsl(280, 100%, 70%) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                animate={{
                    x: ["-10%", "10%", "-10%"],
                    y: ["20%", "40%", "20%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                initial={{ top: "10%", left: "70%" }}
            />

            {/* Floating Blob */}
            <motion.div
                className="absolute w-[500px] h-[500px]"
                style={{
                    background: "radial-gradient(circle, hsl(340, 100%, 65%) 0%, transparent 70%)",
                    filter: "blur(100px)",
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                }}
                animate={{
                    x: ["10%", "-10%", "10%"],
                    y: ["-10%", "10%", "-10%"],
                    scale: [1, 1.1, 1],
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                    ],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                initial={{ top: "60%", right: "60%" }}
            />

            {/* Floating Accent */}
            <motion.div
                className="absolute w-80 h-80 rounded-full"
                style={{
                    background: "radial-gradient(circle, hsl(180, 100%, 60%) 0%, transparent 70%)",
                    filter: "blur(90px)",
                }}
                animate={{
                    x: ["-5%", "5%", "-5%"],
                    y: ["-5%", "5%", "-5%"],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                initial={{ bottom: "20%", left: "20%" }}
            />
        </div>
    );
};
