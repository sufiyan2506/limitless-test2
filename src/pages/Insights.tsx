
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { ExpandableCard } from '@/components/ui/expandable-card'
import confetti from 'canvas-confetti'
import { Globe, Zap, Bot, Target, Settings, Lightbulb } from 'lucide-react'

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
      });

      console.log('Newsletter subscription for:', email)
      setEmail('')
    }
  }

  const categories = ['All', 'Design', 'Development', 'Future Trends', 'Strategy']

  const posts = [
    {
      title: "The Future of Web Design: Beyond Traditional Interfaces",
      excerpt: "Exploring how emerging technologies like AR, VR, and AI are reshaping the digital design landscape and creating new possibilities for user interaction.",
      category: "Design",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      author: "Sarah Chen",
      image: Globe,
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">The Evolution of Digital Interfaces</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            The digital landscape is undergoing a fundamental transformation. Traditional web interfaces, once revolutionary, are now giving way to immersive experiences that blur the lines between physical and digital worlds. As we stand on the brink of a new era, designers must reimagine how users interact with digital content, moving beyond flat screens to three-dimensional spaces that respond to human emotions and intentions.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Augmented Reality: The New Canvas</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Augmented Reality (AR) is transforming how we conceptualize user interfaces. Unlike traditional screen-based designs, AR interfaces exist in real space, overlaying digital information onto our physical environment. This paradigm shift requires designers to think spatially, considering depth, lighting, and real-world context. Companies like Apple and Google are already integrating AR capabilities into their platforms, creating new opportunities for designers to craft experiences that feel natural and intuitive.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">AI-Driven Personalization</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Artificial Intelligence is enabling unprecedented levels of personalization in digital interfaces. Modern AI systems can analyze user behavior patterns, preferences, and context to dynamically adapt interfaces in real-time. This means interfaces that learn and evolve with each interaction, presenting relevant content and features while hiding unnecessary complexity. The result is a more intuitive, efficient user experience that feels tailored to each individual.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Voice and Gesture Interfaces</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            The future of interface design extends beyond touch and click interactions. Voice interfaces, powered by natural language processing, are becoming sophisticated enough to handle complex queries and commands. Similarly, gesture recognition technology allows users to manipulate digital objects through natural hand movements. These modalities create more accessible and inclusive design opportunities, accommodating users with different abilities and preferences.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Designing for Tomorrow</h4>
          <p className="text-white/80 leading-relaxed">
            As these technologies mature, designers must develop new skills and methodologies. Understanding spatial design principles, conversational UI patterns, and accessibility considerations across multiple modalities becomes crucial. The future belongs to designers who can seamlessly blend physical and digital experiences, creating interfaces that feel less like technology and more like natural extensions of human capability.
          </p>
        </>
      )
    },
    {
      title: "Building Scalable SaaS Applications: Lessons from the Field",
      excerpt: "Key insights and best practices for developing robust, scalable software-as-a-service platforms that can grow with your business.",
      category: "Development",
      readTime: "12 min read",
      date: "Dec 10, 2024",
      author: "Alex Rodriguez",
      image: Zap,
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">Architecture Fundamentals for Scale</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Building a scalable SaaS application begins with architectural decisions made in the early stages of development. The foundation must support not just current requirements, but anticipate future growth patterns. Microservices architecture has emerged as a preferred approach, allowing teams to develop, deploy, and scale individual components independently. This architectural pattern enables organizations to respond quickly to changing market demands while maintaining system reliability.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Database Design for Multi-Tenancy</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            One of the most critical decisions in SaaS development is choosing the right multi-tenancy model. Single-tenant architectures provide maximum isolation but increase operational complexity. Multi-tenant shared databases offer cost efficiency but require careful design to prevent data leakage and ensure performance isolation. Hybrid approaches, using techniques like row-level security and connection pooling, often provide the best balance between security, performance, and cost-effectiveness.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Performance Optimization Strategies</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Performance at scale requires proactive optimization across multiple layers. Caching strategies, from in-memory data stores like Redis to content delivery networks (CDNs), can dramatically improve response times. Database query optimization, including proper indexing and query patterns, prevents performance degradation as data volumes grow. Asynchronous processing for non-critical operations keeps user-facing features responsive while handling background tasks efficiently.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Monitoring and Observability</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Scalable SaaS applications require comprehensive monitoring and observability solutions. Modern APM tools provide insights into application performance, user behavior, and system health. Implementing distributed tracing helps identify bottlenecks across service boundaries, while real-time alerting enables rapid response to issues. Metrics-driven development ensures that performance improvements are measurable and sustainable.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Security and Compliance at Scale</h4>
          <p className="text-white/80 leading-relaxed">
            As SaaS applications grow, security and compliance requirements become increasingly complex. Implementing zero-trust security models, regular security audits, and compliance frameworks like SOC 2 or ISO 27001 builds customer confidence. Data encryption in transit and at rest, secure authentication protocols, and regular vulnerability assessments are essential components of a robust security strategy that scales with your application.
          </p>
        </>
      )
    },
    {
      title: "AI-Powered Design Systems: The Next Evolution",
      excerpt: "How artificial intelligence is revolutionizing design systems, enabling dynamic, adaptive interfaces that respond to user behavior and preferences.",
      category: "Future Trends",
      readTime: "6 min read",
      date: "Dec 5, 2024",
      author: "Maya Patel",
      image: Bot,
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">The Intelligence Revolution in Design</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Design systems have evolved from static style guides to dynamic, living ecosystems that adapt and learn. AI-powered design systems represent the next evolutionary leap, introducing intelligence that can analyze user behavior, predict design needs, and automatically generate components that align with brand guidelines and user preferences. This transformation is reshaping how design teams approach consistency, efficiency, and user experience optimization.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Automated Component Generation</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Modern AI systems can generate design components based on existing patterns and brand parameters. Machine learning algorithms analyze successful component combinations, user interaction data, and accessibility requirements to suggest or automatically create new interface elements. This capability accelerates design workflows while maintaining consistency across large-scale applications. Tools like Figma's AI features and Adobe's Sensei are pioneering this approach.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Dynamic Personalization</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            AI-powered design systems enable real-time interface adaptation based on user context, preferences, and behavior patterns. These systems can adjust color schemes for users with visual impairments, modify layout complexity based on user expertise levels, or optimize information hierarchy based on usage patterns. The result is a more inclusive and efficient user experience that feels personally crafted for each individual.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Predictive Design Analytics</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Intelligence in design systems extends beyond component generation to predictive analytics. AI can forecast which design patterns will be most effective for specific user segments, predict accessibility issues before they occur, and suggest optimizations based on performance data. This predictive capability helps design teams make data-driven decisions and prevents usability issues before they impact users.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">The Future of Collaborative Design</h4>
          <p className="text-white/80 leading-relaxed">
            As AI becomes more sophisticated, design systems will facilitate unprecedented collaboration between human creativity and machine intelligence. Designers will focus on high-level creative decisions while AI handles routine tasks like maintaining consistency, ensuring accessibility compliance, and optimizing performance. This partnership will enable design teams to scale their impact while maintaining the human insight that drives meaningful user experiences.
          </p>
        </>
      )
    },
    {
      title: "UX Strategy for Digital Transformation",
      excerpt: "A comprehensive guide to developing user experience strategies that drive successful digital transformation initiatives across organizations.",
      category: "Strategy",
      readTime: "10 min read",
      date: "Nov 28, 2024",
      author: "David Kim",
      image: Target,
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">Understanding Digital Transformation Through UX</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Digital transformation isn't just about technology—it's fundamentally about reimagining how organizations create value for their users. UX strategy serves as the bridge between business objectives and user needs, ensuring that digital initiatives deliver meaningful outcomes. Successful transformation requires a deep understanding of user journeys, pain points, and opportunities for innovation across all touchpoints.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Building User-Centric Transformation Roadmaps</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Creating effective transformation roadmaps requires balancing user research insights with business priorities. Organizations must invest in comprehensive user research, journey mapping, and persona development to understand their audience deeply. This foundation enables teams to prioritize features and initiatives that will have the greatest impact on user satisfaction and business outcomes.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Cross-Channel Experience Design</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Modern users expect seamless experiences across all channels and devices. UX strategy must address the complexity of omnichannel experiences, ensuring consistency while optimizing for each platform's unique characteristics. This requires close collaboration between design, development, and business teams to create unified experiences that feel cohesive regardless of the touchpoint.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Measuring Transformation Success</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Successful UX strategy includes robust measurement frameworks that track both user experience metrics and business outcomes. Key performance indicators should encompass user satisfaction scores, task completion rates, conversion metrics, and long-term engagement patterns. Regular testing and iteration based on these metrics ensure that transformation efforts remain aligned with user needs and business goals.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Cultural Change and UX Adoption</h4>
          <p className="text-white/80 leading-relaxed">
            Perhaps the most challenging aspect of digital transformation is driving cultural change within organizations. UX strategy must include change management principles, helping teams adopt user-centered thinking and collaborative design processes. This involves training programs, workshop facilitation, and the establishment of design systems and processes that support sustainable UX practices throughout the organization.
          </p>
        </>
      )
    },
    {
      title: "Modern JavaScript Frameworks: Performance and Scalability",
      excerpt: "Comparing React, Vue, and Angular in terms of performance, scalability, and developer experience for large-scale applications.",
      category: "Development",
      readTime: "9 min read",
      date: "Nov 22, 2024",
      author: "Lisa Zhang",
      image: Settings,
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">The Framework Landscape in 2024</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            The JavaScript framework ecosystem continues to evolve rapidly, with React, Vue, and Angular remaining the dominant players for enterprise applications. Each framework has matured significantly, offering sophisticated solutions for complex user interfaces and large-scale applications. Understanding their strengths and trade-offs is crucial for making informed architectural decisions that will serve your project's long-term needs.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Performance Benchmarks and Optimization</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Performance characteristics vary significantly between frameworks, particularly at scale. React's virtual DOM and concurrent features provide excellent performance for complex UIs, while Vue's reactivity system offers more predictable performance patterns. Angular's ahead-of-time compilation and tree-shaking capabilities make it highly optimized for large applications. Bundle size, runtime performance, and memory usage all factor into the performance equation.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Scalability Architecture Patterns</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Scalable architecture requires more than just choosing the right framework. Micro-frontend architectures, component libraries, and state management solutions all play crucial roles in maintaining code quality as applications grow. React's ecosystem offers flexibility with solutions like Redux Toolkit and Zustand, Vue provides Pinia for state management, while Angular's built-in dependency injection and services create naturally scalable architectures.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Developer Experience and Team Productivity</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Developer experience significantly impacts long-term project success. TypeScript integration, tooling support, debugging capabilities, and learning curves all influence team productivity. React's flexibility can be both an advantage and a challenge, requiring more architectural decisions. Vue offers a gentler learning curve with excellent documentation, while Angular provides comprehensive tooling and conventions that can accelerate development for large teams.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Future-Proofing Your Technology Stack</h4>
          <p className="text-white/80 leading-relaxed">
            Making framework decisions requires considering long-term maintenance, community support, and emerging technologies. All three frameworks are investing heavily in server-side rendering, edge computing, and modern web standards. The key is aligning framework capabilities with your team's expertise, project requirements, and organizational goals. Regular evaluation and migration strategies ensure your technology stack remains competitive and maintainable.
          </p>
        </>
      )
    },
    {
      title: "Design Thinking for Complex Problem Solving",
      excerpt: "Applying design thinking methodologies to tackle complex business challenges and drive innovation in digital product development.",
      category: "Design",
      readTime: "7 min read",
      date: "Nov 18, 2024",
      author: "Marcus Johnson",
      image: Lightbulb,
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">The Design Thinking Framework</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Design thinking provides a human-centered approach to innovation that integrates the needs of people, the possibilities of technology, and the requirements for business success. The framework consists of five key phases: empathize, define, ideate, prototype, and test. This iterative process helps teams move beyond assumptions to develop solutions that truly address user needs and business objectives.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Empathy as a Foundation for Innovation</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            The empathize phase involves developing a deep understanding of the people you're designing for. This goes beyond traditional market research to include ethnographic studies, user interviews, and observational research. By immersing themselves in users' experiences, teams uncover insights that lead to breakthrough innovations. Empathy maps, user journey maps, and persona development are essential tools in this process.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Ideation and Creative Problem Solving</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            The ideation phase encourages creative thinking and the generation of a wide range of potential solutions. Techniques like brainstorming, mind mapping, and "How Might We" questions help teams explore possibilities without constraint. The goal is quantity over quality initially, allowing for unexpected connections and innovative approaches to emerge. Structured ideation sessions with diverse team members often yield the most creative solutions.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Rapid Prototyping and Testing</h4>
          <p className="mb-6 text-white/80 leading-relaxed">
            Prototyping brings ideas to life quickly and cost-effectively, allowing teams to test assumptions and gather feedback early in the process. Low-fidelity prototypes, from paper sketches to digital wireframes, enable rapid iteration and refinement. The testing phase involves putting prototypes in front of real users to validate or challenge design decisions. This feedback loop is crucial for developing solutions that truly meet user needs.
          </p>

          <h4 className="text-white font-semibold text-xl mb-3">Implementing Design Thinking in Organizations</h4>
          <p className="text-white/80 leading-relaxed">
            Successfully implementing design thinking requires organizational support and cultural change. Teams need time and space for creative exploration, as well as permission to fail and learn from mistakes. Training programs, workshop facilitation, and the establishment of design thinking processes help embed these methodologies into organizational DNA. When properly implemented, design thinking becomes a powerful tool for continuous innovation and problem-solving.
          </p>
        </>
      )
    }
  ]

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const featuredPost = posts[0]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* <WebGLShader /> */}

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6 gradient-text">Insights</h1>
            <p className="text-body-large text-white/70 max-w-2xl mx-auto">
              Exploring the future of design, development, and digital innovation through expert insights and industry trends.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="pb-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-8 hover:glass-strong transition-all">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-sm text-primary font-medium mb-2 block">Featured Article</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{featuredPost.title}</h2>
                  <p className="text-white/70 mb-6">{featuredPost.excerpt}</p>

                  <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                    <span>{featuredPost.author}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <LiquidButton variant="hero" size="lg">
                    Read Article
                  </LiquidButton>
                </div>

                <div className="bg-gradient-to-br from-black/60 to-black/80 rounded-2xl p-12 flex items-center justify-center">
                  <featuredPost.image className="w-24 h-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-4 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category
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

        {/* Articles Grid with Expandable Cards */}
        <section className="pb-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <ExpandableCard
                  key={index}
                  title={post.title}
                  src={post.image}
                  description={post.category}
                  className="hover:scale-105 transition-all duration-300"
                >
                  <div className="space-y-1 mb-6">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  {post.content}
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-headline mb-6 text-white">Stay Updated</h2>
            <p className="text-body-large text-white/70 mb-8 max-w-2xl mx-auto">
              Get the latest insights and trends delivered to your inbox. Join our community of forward-thinking professionals.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 glass rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-white/5"
              />
              <LiquidButton variant="hero" size="lg" type="submit">
                Subscribe
              </LiquidButton>
            </form>
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default Insights
