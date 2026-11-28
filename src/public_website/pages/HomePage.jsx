import AboutSection from "../components/sections/AboutSection"
import Hero from "../components/sections/Hero"
import HowItWorksSection from "../components/sections/HowItWorksSection"
import ImpactSection from "../components/sections/ImpactSection"
import ProgramsSection from "../components/sections/ProgramsSection"

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <HowItWorksSection />
      <ImpactSection />
    </>
  )
}

export default HomePage
