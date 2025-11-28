
import { useState } from 'react'

const PortfolioHighlights = () => {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "TechFlow SaaS",
      category: "Web Application",
      description: "A revolutionary productivity platform that streamlines workflow management",
      image: "🌐",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Minimal Studio",
      category: "Brand Identity",
      description: "Complete brand redesign for a luxury interior design studio",
      image: "🎨",
      color: "from-pink-500 to-orange-500"
    },
    {
      title: "EcoTech Mobile",
      category: "Mobile App",
      description: "Sustainable living app connecting eco-conscious communities",
      image: "📱",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "FinanceAI Dashboard",
      category: "Data Visualization",
      description: "AI-powered financial analytics platform for investment firms",
      image: "📊",
      color: "from-yellow-500 to-red-500"
    }
  ]

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display mb-6 gradient-text">
            Featured Work
          </h2>
          <p className="text-body-large text-white/70 max-w-2xl mx-auto">
            Explore our latest projects that showcase innovation and creativity.
          </p>
        </div>

        {/* Horizontal Scroll Portfolio */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-80 glass rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:glass-strong hover:scale-105 ${
                  activeProject === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveProject(index)}
              >
                <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6`}>
                  <span className="text-6xl">{project.image}</span>
                </div>
                <div className="space-y-3">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-white/70 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Work CTA */}
        <div className="text-center mt-12">
          <button className="text-primary hover:text-white transition-colors font-medium">
            View All Projects →
          </button>
        </div>
      </div>
    </section>
  )
}

export default PortfolioHighlights
