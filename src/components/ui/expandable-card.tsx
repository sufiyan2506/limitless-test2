
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 grid place-items-center z-[100] p-4",
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-4xl max-h-[90vh] flex flex-col overflow-auto glass rounded-3xl relative",
                classNameExpanded,
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-black/40 to-black/60 rounded-t-3xl flex items-center justify-center">
                    <span className="text-8xl">{src}</span>
                  </div>
                </div>
              </motion.div>
              <div className="relative flex-1">
                <div className="flex justify-between items-start p-8">
                  <div className="flex-1">
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-white/60 text-lg mb-2"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-bold text-white text-3xl lg:text-4xl leading-tight"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full glass-strong text-white/70 hover:text-white transition-colors duration-300 focus:outline-none ml-4"
                    onClick={() => setActive(false)}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
                <div className="px-8 pb-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/80 text-base leading-relaxed space-y-6"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "p-6 flex flex-col glass rounded-2xl cursor-pointer hover:glass-strong transition-all duration-300 group relative overflow-hidden",
          className,
        )}
      >
        <div className="flex gap-4 flex-col w-full relative z-10">
          <motion.div layoutId={`image-${title}-${id}`}>
            <div className="w-full h-56 bg-gradient-to-br from-muted/40 to-muted/60 rounded-xl flex items-center justify-center group-hover:from-muted/30 group-hover:to-muted/50 transition-all duration-300 border border-border/50">
              <span className="text-6xl">{src}</span>
            </div>
          </motion.div>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col flex-1 min-w-0">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-white/60 text-sm font-medium mb-1"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-white font-bold text-lg leading-tight"
              >
                {title}
              </motion.h3>
            </div>
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full glass text-white/70 hover:glass-strong hover:text-white transition-colors duration-300 focus:outline-none ml-3"
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
