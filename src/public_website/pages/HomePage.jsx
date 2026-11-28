import AboutSection from "../components/sections/AboutSection"
import GetInvolvedSection from "../components/sections/GetInvolvedSection"
import Hero from "../components/sections/Hero"
import HowItWorksSection from "../components/sections/HowItWorksSection"
import ImpactSection from "../components/sections/ImpactSection"
import ProgramsSection from "../components/sections/ProgramsSection"
import ResourcesSection from "../components/sections/ResourcesSection"

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <HowItWorksSection />
      <ImpactSection />
      <GetInvolvedSection />
      <ResourcesSection />
    </>
  )
}

export default HomePage
