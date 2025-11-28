import React, { useState, useCallback, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import GradientCardShowcase from '@/components/ui/gradient-card-showcase'
import { Awards } from '@/components/ui/award'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SlideButton } from '@/components/ui/slide-button'
import { GradientText } from '@/components/ui/gradient-text'
import JoinLimitlessForm from '@/components/JoinLimitlessForm'
import { Lightbulb, Target, Users, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

// Team member images
import safeerImage from '@/assets/team/ceo-safeer.png';
import usamaImage from '@/assets/team/cfo-usama.png';
import michaelImage from '@/assets/team/vp-sales-michael.jpg';
import billyImage from '@/assets/team/ai-architect-billy.jpg';
import duaImage from '@/assets/team/marketing-consultant-dua.png';
import neoImage from '@/assets/team/fullstack-dev-neo.png';
import fahadImage from '@/assets/team/frontend-engineer-fahad.png';
import fateymahImage from '@/assets/team/seo-expert-fateymah.png';
import miaImage from '@/assets/team/outreach-manager-mia.png';

const About = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [resetButton, setResetButton] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setShowSuccessMessage(false)
    setTimeout(() => {
      setResetButton(!resetButton)
    }, 100)
  }

  const handleFormComplete = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      handleDialogClose()
    }, 4000)
  }

  const approach = [
    {
      title: "Digital Strategy & Discovery",
      desc: "We conduct comprehensive digital transformation audits, competitive analysis, and user research to identify growth opportunities. Our strategic discovery process includes brand positioning, target audience analysis, and conversion optimization planning to ensure your digital presence drives measurable ROI.",
      icon: <Lightbulb className="w-8 h-8" />,
      gradientFrom: "#10B981",
      gradientTo: "#3B82F6"
    },
    {
      title: "Custom UI/UX Design",
      desc: "Our expert designers create mobile-first, conversion-focused user experiences using advanced design systems and accessibility standards. We specialize in responsive web design, user interface optimization, and brand identity development that increases engagement and drives customer acquisition.",
      icon: <Target className="w-8 h-8" />,
      gradientFrom: "#3B82F6",
      gradientTo: "#8B5CF6"
    },
    {
      title: "Full-Stack Development",
      desc: "We build high-performance web applications, custom software solutions, and enterprise platforms using cutting-edge technologies like React, Node.js, and cloud infrastructure. Our development process includes API integration, database optimization, and security implementation for scalable digital solutions.",
      icon: <Users className="w-8 h-8" />,
      gradientFrom: "#8B5CF6",
      gradientTo: "#EC4899"
    },
    {
      title: "Growth & Optimization",
      desc: "Our data-driven approach includes performance monitoring, conversion rate optimization, SEO implementation, and digital marketing integration. We provide ongoing maintenance, analytics tracking, and iterative improvements to ensure your digital investment continues delivering exceptional business results.",
      icon: <Rocket className="w-8 h-8" />,
      gradientFrom: "#EC4899",
      gradientTo: "#EF4444"
    }
  ]

  const teamMembers = [
    {
      name: "Safeer",
      role: "CEO",
      bio: "Visionary leader driving innovation and strategic growth across all business verticals.",
      avatar: safeerImage,
      initials: "S",
      gradientFrom: "#667eea",
      gradientTo: "#764ba2"
    },
    {
      name: "Usama",
      role: "CFO",
      bio: "Financial strategist optimizing operations and ensuring sustainable business growth.",
      avatar: usamaImage,
      initials: "U",
      gradientFrom: "#f093fb",
      gradientTo: "#f5576c"
    },
    {
      name: "Michael",
      role: "VP Sales",
      bio: "Sales expert building lasting client relationships and driving revenue growth.",
      avatar: michaelImage,
      initials: "M",
      gradientFrom: "#4facfe",
      gradientTo: "#00f2fe"
    },
    {
      name: "Billy",
      role: "AI Innovation Architect",
      bio: "AI pioneer developing cutting-edge solutions that transform business operations.",
      avatar: billyImage,
      initials: "B",
      gradientFrom: "#43e97b",
      gradientTo: "#38f9d7"
    },
    {
      name: "Dua",
      role: "Marketing Consultant",
      bio: "Creative marketing strategist crafting compelling campaigns that drive engagement.",
      avatar: duaImage,
      initials: "D",
      gradientFrom: "#fa709a",
      gradientTo: "#fee140"
    },
    {
      name: "Neo",
      role: "Full Stack Developer",
      bio: "Technical expert building robust, scalable applications with modern technologies.",
      avatar: neoImage,
      initials: "N",
      gradientFrom: "#667eea",
      gradientTo: "#764ba2"
    },
    {
      name: "Fahad",
      role: "Front End Engineer",
      bio: "UI/UX specialist creating beautiful, responsive interfaces that users love.",
      avatar: fahadImage,
      initials: "F",
      gradientFrom: "#f093fb",
      gradientTo: "#f5576c"
    },
    {
      name: "Fateymah",
      role: "SEO Expert",
      bio: "SEO strategist optimizing digital presence for maximum search visibility.",
      avatar: fateymahImage,
      initials: "FT",
      gradientFrom: "#4facfe",
      gradientTo: "#00f2fe"
    },
    {
      name: "Mia",
      role: "Outreach Manager",
      bio: "Relationship builder expanding our network and strengthening community connections.",
      avatar: miaImage,
      initials: "M",
      gradientFrom: "#43e97b",
      gradientTo: "#38f9d7"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const getCardsPerView = useCallback(() => {
    if (window.innerWidth < 768) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards  
    return 3; // Desktop: 3 cards
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      const newCardsPerView = getCardsPerView();
      setCardsPerView(newCardsPerView);
      const maxIndex = Math.max(0, teamMembers.length - newCardsPerView);
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [currentIndex, getCardsPerView, teamMembers.length]);

  const scrollToNext = () => {
    const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const scrollToPrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < teamMembers.length - cardsPerView;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* <WebGLShader /> */}

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-black tracking-tight mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GradientText>About Limitless</GradientText>
            </motion.h1>
            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We're a creative studio that believes in pushing boundaries and reimagining what's possible in digital design and development.
            </motion.p>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                className="glass rounded-3xl p-10 hover:glass-strong transition-all order-2 lg:order-1 min-h-[400px]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">Our Story</h2>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Limitless was founded on the belief that creativity should have no boundaries. We started as a small team of passionate designers and developers who were frustrated by the limitations of traditional approaches.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Today, we're a full-service creative studio that partners with forward-thinking brands to create digital experiences that inspire, engage, and drive results.
                  </motion.p>
                </div>
              </motion.div>
              <motion.div
                className="glass rounded-3xl p-10 hover:glass-strong transition-all order-1 lg:order-2 flex items-center justify-center min-h-[400px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Awards
                  variant="award"
                  title="WINNER"
                  subtitle="Excellence in Digital Innovation"
                  recipient="Think Limitless"
                  date="2024"
                  level="gold"
                  className="text-white"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                <GradientText>Our Approach</GradientText>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                A proven process that transforms ideas into exceptional digital experiences
              </p>
            </motion.div>

            <GradientCardShowcase cards={approach} />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet The Talent Powering <GradientText>Limitless</GradientText>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Our diverse team of experts brings together creativity, technical excellence, and strategic thinking to deliver outstanding results for every project.
              </p>
            </motion.div>

            {/* Team Carousel */}
            <div className="relative">
              {/* Cards Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                  }}
                >
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-3"
                      style={{
                        width: `${100 / cardsPerView}%`
                      }}
                    >
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="group relative bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                            {/* Gradient Background */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                              style={{
                                background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
                              }}
                            />

                            {/* Full Image */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                              <img
                                src={member.avatar}
                                alt={`${member.name} - ${member.role}`}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Gradient overlay at bottom */}
                              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            {/* Name and Role Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                                {member.name}
                              </h3>
                              <p
                                className={`text-sm font-medium ${member.role === 'CEO'
                                  ? 'text-red-400'
                                  : 'bg-gradient-to-r bg-clip-text text-transparent'
                                  }`}
                                style={member.role !== 'CEO' ? {
                                  backgroundImage: `linear-gradient(90deg, ${member.gradientFrom}, ${member.gradientTo})`,
                                } : {}}
                              >
                                {member.role}
                              </p>
                            </div>

                            {/* Glow Effect */}
                            <div
                              className="absolute -inset-1 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10 rounded-2xl"
                              style={{
                                background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
                              }}
                            />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4"
                          sideOffset={10}
                        >
                          <div className="space-y-2">
                            <h4 className="font-semibold text-white">{member.name}</h4>
                            <p
                              className={`text-sm font-medium ${member.role === 'CEO'
                                ? 'text-red-400'
                                : 'bg-gradient-to-r bg-clip-text text-transparent'
                                }`}
                              style={member.role !== 'CEO' ? {
                                backgroundImage: `linear-gradient(90deg, ${member.gradientFrom}, ${member.gradientTo})`,
                              } : {}}
                            >
                              {member.role}
                            </p>
                            <p className="text-sm text-white/80 leading-relaxed">
                              {member.bio}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <button
                  onClick={scrollToPrev}
                  disabled={!canScrollPrev}
                  className={`p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${canScrollPrev
                    ? 'bg-white/10 hover:bg-white/20 hover:scale-110'
                    : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <span className="text-white/60 text-sm font-medium">
                  {Math.min(currentIndex + cardsPerView, teamMembers.length)} / {teamMembers.length}
                </span>

                <button
                  onClick={scrollToNext}
                  disabled={!canScrollNext}
                  className={`p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${canScrollNext
                    ? 'bg-white/10 hover:bg-white/20 hover:scale-110'
                    : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Join Limitless Button */}
            <div className="text-center mt-16">
              <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                  <SlideButton
                    onComplete={() => setIsDialogOpen(true)}
                    reset={resetButton}
                  >
                    Join Limitless
                  </SlideButton>
                </DialogTrigger>
                <DialogContent className="glass border-white/20 p-0 max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    {showSuccessMessage ? (
                      <div className="text-center py-12">
                        <div className="mb-6">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">Application Submitted Successfully!</h3>
                          <p className="text-white/80 text-lg max-w-md mx-auto">
                            We'll vet your profile and get back to you within 3 working days.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <JoinLimitlessForm onClose={handleFormComplete} />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default About