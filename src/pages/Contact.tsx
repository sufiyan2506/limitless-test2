
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import confetti from 'canvas-confetti'
import emailjs from "emailjs-com"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Trigger confetti animation
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
    });

    // Handle form submission
    console.log('Form submitted:', formData)

    // Send contactform to ThinkLimitless email using EmailJS
    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
      },
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
      .then(
        () => {
          // Auto-reply to user
          return emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_AUTOREPLY_TEMPLATE_ID,
            {
              name: formData.name,
              email: formData.email,
              company: formData.company,
              projectType: formData.projectType,
              budget: formData.budget,
              timeline: formData.timeline,
              message: formData.message,
            },
            import.meta.env.VITE_EMAIL_PUBLIC_KEY
          )
        })
      .then(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      },
        (error) => {
          console.error('Email sending error:', error);
          alert('An error occurred while sending your message. Please try again later.')
        }
      );
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@limitless.studio" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "San Francisco, CA" },
    { icon: Clock, label: "Hours", value: "Mon - Fri, 9AM - 6PM PST" }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* <WebGLShader /> */}

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6 gradient-text">Let's Build Without Limits</h1>
            <p className="text-body-large text-white/70 max-w-2xl mx-auto">
              Ready to transform your vision into reality? Get in touch and let's discuss how we can bring your project to life.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="pb-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Start Your Project</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-white/5"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-white/5"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-white/5"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-white/70 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-#CCCCCC focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-#333333/5"
                    >
                      <option value="">Select a project type</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="saas-platform">SaaS Platform</option>
                      <option value="branding">Branding & Identity</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-white/70 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-#CCCCCC focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-#333333/5"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-10k">Under $1k</option>
                        <option value="10k-25k">$1k - $2.5k</option>
                        <option value="25k-50k">$2.5k - $5k</option>
                        <option value="50k-100k">$5k - $10k</option>
                        <option value="over-100k">$10k+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-white/70 mb-2">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-#CCCCCC focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-#333333/5"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-months-plus">6+ months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-white/5 resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>

                  <LiquidButton variant="hero" size="xl" className="w-full">
                    Send Message
                  </LiquidButton>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="glass rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  <p className="text-white/70 mb-8">
                    We're here to help bring your vision to life. Reach out through any of these channels and we'll get back to you within 24 hours.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-white/60">{info.label}</div>
                          <div className="text-white font-medium">{info.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="glass rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Quick Questions</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">How long does a typical project take?</h4>
                      <p className="text-white/70 text-sm">Project timelines vary based on scope and complexity, typically ranging from 4-16 weeks for most projects.</p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Do you work with startups?</h4>
                      <p className="text-white/70 text-sm">Absolutely! We love working with startups and offer flexible solutions to fit different budgets and stages.</p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">What's included in your services?</h4>
                      <p className="text-white/70 text-sm">Our services include strategy, design, development, testing, launch, and ongoing support as needed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default Contact
