
import { WebGLShader } from '@/components/ui/web-gl-shader'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ValueProposition from '@/components/ValueProposition'
import ClientTestimonials from '@/components/ClientTestimonials'
import ServicesSnapshot from '@/components/ServicesSnapshot'
import CTAFooter from '@/components/CTAFooter'

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background - Removed for performance and because it's occluded */}
      {/* <WebGLShader /> */}

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />

        <HeroSection />

        <ValueProposition />
        <ServicesSnapshot />

        {/* <ClientTestimonials /> */}

        <CTAFooter />
      </div>
    </div>
  )
}

export default Index
