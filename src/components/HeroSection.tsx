import { motion } from 'framer-motion';
import { RainbowButton } from '@/components/ui/rainbow-button';
import ShutterLink from './ShutterLink';
import { Logos3 } from '@/components/ui/logos3';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24">
      {/* Animated Grid Background (Honeycomb) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-60 z-0 pointer-events-none" />

      {/* Spline 3D Robot - Scaled Larger and Blended */}
      <div className="absolute inset-0 z-10 flex items-center justify-center mix-blend-screen pointer-events-none">
        <div className="w-full h-full scale-100 md:scale-90 lg:scale-75 translate-y-10">
          <Spline scene="https://prod.spline.design/IeYyoEayBAhkYpZ6/scene.splinecode" />
        </div>
      </div>

      {/* Gradient Orbs - REMOVED as per user request */}
      {/* <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob z-0" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 z-0" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 z-0" /> */}

      <div className="container mx-auto px-6 relative z-10 flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="max-w-6xl mx-auto text-center mt-16">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-display font-bold leading-none tracking-tighter mb-6">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                LIMITLESS
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light"
          >
            Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <ShutterLink to="/contact">
              <button className="group relative px-8 py-4 bg-white text-black font-semibold text-lg rounded-full overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10">Start Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </ShutterLink>
            <ShutterLink to="/portfolio">
              <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold text-lg rounded-full hover:border-white/40 hover:bg-white/5 transition-all">
                View Work
              </button>
            </ShutterLink>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Logos3 />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
