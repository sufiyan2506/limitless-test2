import Navigation from '@/components/Navigation';
import CTAFooter from '@/components/CTAFooter';
import ShutterLink from '@/components/ShutterLink';
import CountUp from '@/components/CountUp';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { PinContainer } from '@/components/ui/3d-pin';
import { GlowEffect } from '@/components/ui/glow-effect';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Target, Palette, Code2, Rocket, TrendingUp, ArrowRight, CheckCircle2, Zap, Shield, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const services = [{
    title: "Design",
    description: "Complete digital design solutions that captivate audiences and drive conversions through strategic user experience and compelling visual identity",
    icon: Palette,
    features: ["User Experience Design & Research", "Visual Identity & Brand Development", "Interactive Prototyping & Testing", "Design System Creation", "Conversion Rate Optimization", "Accessibility & Inclusive Design"],
    gradientFrom: "#ffbc00",
    gradientTo: "#ff0058",
    expertise: "From wireframes to pixel-perfect interfaces, we craft experiences that users love and businesses profit from.",
    technologies: "Figma, Adobe Creative Suite, Principle, InVision"
  }, {
    title: "Development",
    description: "Enterprise-grade development services building scalable web applications, SaaS platforms, and mobile apps with cutting-edge technology stacks",
    icon: Code2,
    features: ["Custom Web Application Development", "SaaS Platform Architecture & Build", "Mobile App Development (iOS/Android)", "API Development & Integration", "Database Design & Optimization", "Cloud Infrastructure & DevOps"],
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    expertise: "Full-stack development with modern frameworks, ensuring scalability, security, and performance at enterprise level.",
    technologies: "React, Node.js, Python, AWS, Docker, Kubernetes"
  }, {
    title: "Brand Strategy",
    description: "Strategic brand development that creates memorable identities, establishes market presence, and builds lasting connections with target audiences",
    icon: Star,
    features: ["Brand Strategy & Market Positioning", "Logo Design & Visual Identity Systems", "Brand Guidelines & Style Guides", "Marketing Collateral Design", "Brand Voice & Messaging Framework", "Trademark & Legal Consultation"],
    gradientFrom: "#4dff03",
    gradientTo: "#00d0ff",
    expertise: "Creating cohesive brand experiences that resonate emotionally and drive business growth across all touchpoints.",
    technologies: "Adobe Creative Suite, Sketch, Brand Strategy Frameworks"
  }, {
    title: "Automation and Scaling Solutions",
    description: "Comprehensive business strategy and digital transformation consulting focused on sustainable growth, automation, and market expansion",
    icon: Rocket,
    features: ["Digital Transformation Strategy", "Growth Hacking & Scaling Solutions", "Business Process Automation", "Market Analysis & Competitive Intelligence", "Technology Stack Consultation", "Performance Metrics & Analytics Setup"],
    gradientFrom: "#ffbc00",
    gradientTo: "#ff0058",
    expertise: "Data-driven strategies that transform businesses, optimize operations, and accelerate growth in competitive markets.",
    technologies: "Analytics Platforms, Automation Tools, CRM Systems"
  }];
  const handleCardClick = (index: number, e: React.MouseEvent) => {
    if (isMobile) {
      if (hoveredIndex !== index) {
        // First tap - reveal pin
        e.preventDefault();
        e.stopPropagation();
        setHoveredIndex(index);
        return;
      }
      // Second tap - allow navigation to proceed
    }
  };
  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setHoveredIndex(index);
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };
  const enhancedProcess = [{
    step: "Discovery & Research",
    icon: Search,
    headline: "Deep Market Intelligence",
    description: "We don't just listen—we investigate. Through comprehensive market research, competitor analysis, and stakeholder interviews, we uncover opportunities others miss.",
    details: ["Stakeholder alignment workshops", "Market & competitor analysis", "User journey mapping", "Technical feasibility audit"],
    duration: "1-2 weeks",
    deliverable: "Strategic Discovery Report",
    colors: ['#0EA5E9', '#06B6D4', '#8B5CF6', '#A855F7']
  }, {
    step: "Strategic Architecture",
    icon: Target,
    headline: "Blueprint for Success",
    description: "Every great product starts with a bulletproof strategy. We architect scalable solutions that align perfectly with your business objectives and market demands.",
    details: ["Information architecture design", "Technical stack recommendations", "Scalability planning", "Risk mitigation strategies"],
    duration: "1-3 weeks",
    deliverable: "Technical & UX Blueprint",
    colors: ['#F59E0B', '#EAB308', '#84CC16', '#22C55E']
  }, {
    step: "Experience Design",
    icon: Palette,
    headline: "Conversion-Driven Design",
    description: "Beautiful interfaces that convert. We craft user experiences that don't just look stunning—they drive measurable business results and user engagement.",
    details: ["User interface design", "Interactive prototyping", "Design system creation", "Usability testing & iteration"],
    duration: "2-4 weeks",
    deliverable: "Interactive Design System",
    colors: ['#EC4899', '#F472B6', '#FB7185', '#FBBF24']
  }, {
    step: "Premium Development",
    icon: Code2,
    headline: "Enterprise-Grade Engineering",
    description: "Code that scales with your ambitions. Built with modern architecture, rigorous testing, and performance optimization that enterprise clients demand.",
    details: ["Clean, maintainable codebase", "Automated testing & CI/CD", "Performance optimization", "Security implementation"],
    duration: "4-12 weeks",
    deliverable: "Production-Ready Application",
    colors: ['#6366F1', '#8B5CF6', '#A855F7', '#C084FC']
  }, {
    step: "Strategic Launch",
    icon: Rocket,
    headline: "Market-Ready Deployment",
    description: "Launch isn't just going live—it's making an impact. We ensure your solution launches with maximum visibility, performance, and user adoption.",
    details: ["Deployment automation", "Performance monitoring setup", "Launch strategy execution", "Initial user onboarding"],
    duration: "1-2 weeks",
    deliverable: "Live Production System",
    colors: ['#10B981', '#059669', '#047857', '#065F46']
  }, {
    step: "Growth Optimization",
    icon: TrendingUp,
    headline: "Continuous Excellence",
    description: "Success is a journey, not a destination. We provide ongoing optimization, feature evolution, and strategic guidance to ensure sustained growth.",
    details: ["Performance analytics", "Feature enhancement roadmap", "User feedback integration", "Scaling strategies"],
    duration: "Ongoing",
    deliverable: "Growth Partnership",
    colors: ['#EF4444', '#F97316', '#F59E0B', '#EAB308']
  }];
  const whyChooseUs = [{
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description: "Agile methodology ensures rapid iterations without compromising quality"
  }, {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security practices built into every line of code"
  }, {
    icon: Award,
    title: "Industry Recognition",
    description: "Award-winning designs and development practices trusted by Fortune 500"
  }];
  return <div className="relative min-h-screen overflow-hidden bg-black">
    {/* <WebGLShader /> */}

    <div className="relative z-10">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display mb-6 gradient-text">Our Services</h1>
          <p className="text-body-large text-white/70 max-w-2xl mx-auto">
            We craft experiences that inspire and scale across all digital touchpoints, delivering solutions that drive real business results.
          </p>
        </div>
      </section>

      {/* Services Grid - Simple Clean Grid Like Homepage */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ShutterLink key={index} to="/contact">
                <div className="group relative p-8 border border-white/10 hover:border-white/30 transition-all duration-300 h-full rounded-2xl overflow-hidden">
                  {/* Hover Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradientFrom}10, ${service.gradientTo}10)`
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`
                      }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:gradient-text transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full group-hover:border-white/20 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </ShutterLink>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Flow - Fixed Symmetry */}
      <section className="py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-bounce">
                <Award className="w-4 h-4" />
                Industry-Leading Process
              </div>
            </div>
            <h2 className="text-display mb-6 gradient-text">How We Deliver Excellence</h2>
            <p className="text-body-large text-white/70 max-w-3xl mx-auto mb-12">
              Our battle-tested methodology combines strategic thinking with technical excellence,
              ensuring every project exceeds expectations and drives measurable results.
            </p>

            {/* Why Choose Us Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {whyChooseUs.map((item, index) => <div key={index} className="glass rounded-full px-6 py-3 flex items-center gap-3 hover:glass-strong transition-all group">
                <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">{item.title}</span>
              </div>)}
            </div>
          </div>

          {/* Process Steps - Animated Layout */}
          <div className="grid gap-8 lg:gap-12">
            {enhancedProcess.map((step, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
                  {/* Step Number & Icon - Animated from Left */}
                  <motion.div
                    className="lg:col-span-3 flex justify-center lg:justify-end"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  >
                    <div className="relative">
                      <GlowEffect colors={step.colors} mode="breathe" blur="soft" duration={4} className="rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
                      <motion.div
                        className="relative glass rounded-3xl p-6 border-2 border-white/10 group-hover:border-white/20 transition-all w-48"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <span className="text-white font-bold text-lg">{index + 1}</span>
                          </motion.div>
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-primary font-medium mb-1">{step.duration}</div>
                          <div className="text-xs text-white/60">{step.deliverable}</div>
                        </div>

                        {/* Side Stats */}
                        <div className="space-y-3 mt-4">
                          <div className="glass rounded-2xl p-3 text-center">
                            <div className="text-xl font-bold text-primary mb-1">
                              <CountUp
                                end={index === 0 ? 100 : index === 1 ? 99 : index === 2 ? 95 : index === 3 ? 99.9 : index === 4 ? 98 : 92}
                                suffix="%"
                                duration={2000 + index * 200}
                                decimals={index === 3 ? 1 : 0}
                              />
                            </div>
                            <div className="text-xs text-white/60">
                              {index === 0 ? "Client Satisfaction" : index === 1 ? "On-Time Delivery" : index === 2 ? "User Adoption" : index === 3 ? "Uptime Guarantee" : index === 4 ? "Launch Success" : "Growth Rate"}
                            </div>
                          </div>
                          <div className="glass rounded-2xl p-3 text-center">
                            <div className="text-xl font-bold text-white mb-1">
                              <CountUp
                                end={index === 0 ? 24 : index === 1 ? 48 : index === 2 ? 7 : index === 3 ? 2 : index === 4 ? 1 : 24}
                                suffix="h"
                                duration={1500 + index * 150}
                              />
                            </div>
                            <div className="text-xs text-white/60">Response Time</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Connector Line */}
                    {index < enhancedProcess.length - 1 && <div className="hidden lg:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>}
                  </motion.div>

                  {/* Content - Animated from Right */}
                  <motion.div
                    className="lg:col-span-9"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div
                      className="glass rounded-3xl p-8 hover:glass-strong transition-all h-full"
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="flex items-center gap-3 mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all">
                          {step.step}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </motion.div>
                      <motion.h4
                        className="text-xl font-semibold text-primary mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {step.headline}
                      </motion.h4>
                      <motion.p
                        className="text-white/80 mb-6 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        {step.description}
                      </motion.p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.7 + detailIndex * 0.05 }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-white/70 text-sm">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTAFooter />
    </div>
  </div>;
};
export default Services;
