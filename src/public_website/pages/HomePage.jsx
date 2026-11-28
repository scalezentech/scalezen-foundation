import AboutSection from "../components/sections/home/AboutSection"
import ContactSection from "../components/sections/home/ContactSection"
import FAQSection from "../components/sections/home/FAQSection"
import GetInvolvedSection from "../components/sections/home/GetInvolvedSection"
import Hero from "../components/sections/home/Hero"
import HowItWorksSection from "../components/sections/home/HowItWorksSection"
import ImpactSection from "../components/sections/home/ImpactSection"
import ProgramsSection from "../components/sections/home/ProgramsSection"
import ResourcesSection from "../components/sections/home/ResourcesSection"

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
      <ContactSection />
    </>
  )
}

export default HomePage
