import { motion } from 'framer-motion';
import ShutterLink from './ShutterLink';

const CTAFooter = () => {
  return (
    <section className="relative pt-32 pb-0 px-6 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tighter mb-8">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
              LET'S TALK
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's create something extraordinary together.
          </p>

          <ShutterLink to="/contact">
            <button className="group relative px-12 py-6 bg-white text-black font-bold text-xl overflow-hidden transition-all hover:scale-105 rounded-full">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </ShutterLink>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 pt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="text-3xl font-display font-bold text-white mb-4">
                LIMITLESS
              </div>
              <p className="text-gray-500 text-sm">
                Where creativity meets code.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-3">
                <ShutterLink to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </ShutterLink>
                <ShutterLink to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </ShutterLink>
                <ShutterLink to="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </ShutterLink>
                <ShutterLink to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </ShutterLink>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
              <div className="flex flex-col gap-3 text-gray-400 text-sm">
                <a href="mailto:hello@limitless.com" className="hover:text-white transition-colors">
                  hello@limitless.com
                </a>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm pt-8 pb-8 border-t border-white/5">
            © 2024 Limitless. All rights reserved.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFooter;
