
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import CountUp from '@/components/CountUp'
import { Globe, Palette, Smartphone, BarChart3, ShoppingBag, Hospital } from 'lucide-react'
import { WebGLShader } from '@/components/ui/web-gl-shader'

const Work = () => {
  const [filter, setFilter] = useState('All')

  const projects = [
    {
      title: "TechFlow SaaS",
      category: "Development",
      type: "Web Application",
      description: "A revolutionary productivity platform that streamlines workflow management for enterprise teams. Built with React, Node.js, and advanced AI integrations.",
      image: Globe,
      color: "from-blue-500 to-purple-600",
      tags: ["SaaS", "React", "AI", "Enterprise"],
      client: "TechFlow Inc.",
      year: "2024"
    },
    {
      title: "Minimal Studio",
      category: "Design",
      type: "Brand Identity",
      description: "Complete brand redesign for a luxury interior design studio, including logo, visual identity, and digital presence across all touchpoints.",
      image: Palette,
      color: "from-pink-500 to-orange-500",
      tags: ["Branding", "Identity", "Luxury", "Interior"],
      client: "Minimal Studio",
      year: "2024"
    },
    {
      title: "EcoTech Mobile",
      category: "Development",
      type: "Mobile App",
      description: "Sustainable living app connecting eco-conscious communities worldwide. Features real-time tracking, social features, and gamification.",
      image: Smartphone,
      color: "from-green-500 to-teal-600",
      tags: ["Mobile", "Sustainability", "Social", "React Native"],
      client: "EcoTech",
      year: "2023"
    },
    {
      title: "FinanceAI Dashboard",
      category: "Development",
      type: "Data Visualization",
      description: "AI-powered financial analytics platform for investment firms. Complex data visualization with real-time market insights and predictive analytics.",
      image: BarChart3,
      color: "from-yellow-500 to-red-500",
      tags: ["FinTech", "AI", "Analytics", "Dashboard"],
      client: "InvestCorp",
      year: "2023"
    },
    {
      title: "Artisan Collective",
      category: "Branding",
      type: "E-commerce Platform",
      description: "Marketplace platform for artisan creators with integrated branding, custom storefront designs, and seamless payment processing.",
      image: ShoppingBag,
      color: "from-purple-500 to-indigo-600",
      tags: ["E-commerce", "Marketplace", "Branding", "Creators"],
      client: "Artisan Co.",
      year: "2024"
    },
    {
      title: "HealthTech Suite",
      category: "Development",
      type: "Healthcare Platform",
      description: "Comprehensive healthcare management system with patient portals, telemedicine capabilities, and advanced health analytics.",
      image: Hospital,
      color: "from-cyan-500 to-blue-600",
      tags: ["Healthcare", "Telemedicine", "Analytics", "HIPAA"],
      client: "HealthFirst",
      year: "2023"
    }
  ]

  const categories = ['All', 'Development', 'Design', 'Branding']

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter)

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* <WebGLShader /> */}

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6 gradient-text">Our Work</h1>
            <p className="text-body-large text-white/70 max-w-2xl mx-auto">
              Explore our portfolio of innovative projects that showcase our expertise in design, development, and digital transformation.
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-4 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${filter === category
                    ? 'glass-strong text-white'
                    : 'glass text-white/70 hover:text-white hover:glass-strong'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-500 hover:scale-105"
                >
                  {/* Project Image/Icon */}
                  <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                    <project.image className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-primary font-medium">{project.type}</span>
                      <span className="text-sm text-white/50">{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/60 mb-1">{project.client}</p>

                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="glass rounded-2xl p-8">
                <div className="text-3xl font-black text-primary mb-2">
                  <CountUp end={50} suffix="+" duration={2500} />
                </div>
                <div className="text-white/70">Projects Delivered</div>
              </div>
              <div className="glass rounded-2xl p-8">
                <div className="text-3xl font-black text-primary mb-2">
                  <CountUp end={25} suffix="+" duration={2200} />
                </div>
                <div className="text-white/70">Happy Clients</div>
              </div>
              <div className="glass rounded-2xl p-8">
                <div className="text-3xl font-black text-primary mb-2">
                  <CountUp end={4} duration={1800} />
                </div>
                <div className="text-white/70">Years Experience</div>
              </div>
              <div className="glass rounded-2xl p-8">
                <div className="text-3xl font-black text-primary mb-2">
                  <CountUp end={100} suffix="%" duration={2800} />
                </div>
                <div className="text-white/70">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default Work
