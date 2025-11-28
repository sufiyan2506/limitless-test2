import { motion } from 'framer-motion';
import ShutterLink from './ShutterLink';

const ServicesSnapshot = () => {
  const services = [
    {
      title: "Web Development",
      desc: "Custom websites and web applications built with cutting-edge technology.",
      tags: ["React", "Next.js", "TypeScript"]
    },
    {
      title: "UI/UX Design",
      desc: "Beautiful, intuitive interfaces that users love and businesses trust.",
      tags: ["Figma", "Prototyping", "Design Systems"]
    },
    {
      title: "Brand Identity",
      desc: "Cohesive visual identities that make your brand unforgettable.",
      tags: ["Logo Design", "Guidelines", "Marketing"]
    },
    {
      title: "E-Commerce",
      desc: "Powerful online stores that convert visitors into loyal customers.",
      tags: ["Shopify", "WooCommerce", "Payments"]
    },
    {
      title: "Mobile Apps",
      desc: "Native and cross-platform mobile experiences that delight users.",
      tags: ["React Native", "iOS", "Android"]
    },
    {
      title: "Consulting",
      desc: "Strategic guidance to help your business thrive in the digital age.",
      tags: ["Strategy", "Optimization", "Growth"]
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">
            SERVICES
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ShutterLink to="/services">
                <div className="group relative p-8 border border-white/10 hover:border-white/30 transition-all duration-300 h-full rounded-2xl overflow-hidden">
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full group-hover:border-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </ShutterLink>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <ShutterLink to="/services">
            <button className="group px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all">
              <span className="flex items-center gap-3">
                View All Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </ShutterLink>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSnapshot;