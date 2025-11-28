
'use client';
import { cn } from '@/lib/utils';
import { motion, Transition } from 'motion/react';

export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?:
    | 'rotate'
    | 'pulse'
    | 'breathe'
    | 'colorShift'
    | 'flowHorizontal'
    | 'static';
  blur?:
    | number
    | 'softest'
    | 'soft'
    | 'medium'
    | 'strong'
    | 'stronger'
    | 'strongest'
    | 'none';
  transition?: Transition;
  scale?: number;
  duration?: number;
};

export function GlowEffect({
  className,
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  transition,
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: "linear" as const,
  };

  const getAnimation = () => {
    switch (mode) {
      case 'rotate':
        return {
          background: [
            `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
            `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
          ],
        };
      case 'pulse':
        return {
          background: colors.map(
            (color) =>
              `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
          ),
          scale: [1 * scale, 1.1 * scale, 1 * scale],
          opacity: [0.5, 0.8, 0.5],
        };
      case 'breathe':
        return {
          background: colors.map(
            (color) =>
              `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
          ),
          scale: [1 * scale, 1.05 * scale, 1 * scale],
        };
      case 'colorShift':
        return {
          background: colors.map((color, index) => {
            const nextColor = colors[(index + 1) % colors.length];
            return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
          }),
        };
      case 'flowHorizontal':
        return {
          background: colors.map((color) => {
            const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
            return `linear-gradient(to right, ${color}, ${nextColor})`;
          }),
        };
      case 'static':
        return {
          background: `linear-gradient(to right, ${colors.join(', ')})`,
        };
      default:
        return {};
    }
  };

  const getTransition = () => {
    if (mode === 'static') return undefined;
    
    if (transition) return transition;
    
    if (mode === 'pulse' || mode === 'breathe' || mode === 'colorShift' || mode === 'flowHorizontal') {
      return {
        ...BASE_TRANSITION,
        repeatType: "mirror" as const,
      };
    }
    
    return BASE_TRANSITION;
  };

  const getBlurClass = (blur: GlowEffectProps['blur']) => {
    if (typeof blur === 'number') {
      return `blur-[${blur}px]`;
    }

    const presets = {
      softest: 'blur-sm',
      soft: 'blur',
      medium: 'blur-md',
      strong: 'blur-lg',
      stronger: 'blur-xl',
      strongest: 'blur-xl',
      none: 'blur-none',
    };

    return presets[blur as keyof typeof presets];
  };

  return (
    <motion.div
      style={
        {
          ...style,
          '--scale': scale,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        } as React.CSSProperties
      }
      animate={getAnimation()}
      transition={getTransition()}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'scale-[var(--scale)] transform-gpu',
        getBlurClass(blur),
        className
      )}
    />
  );
}
