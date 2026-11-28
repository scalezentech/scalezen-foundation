import AboutSection from "../components/sections/AboutSection"
import FAQSection from "../components/sections/FAQSection"
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
      <FAQSection />
    </>
  )
}

export default HomePage
