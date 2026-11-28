import AvailableProgramsSection from "../components/sections/programs/AvailableProgramsSection"
import EligibilitySection from "../components/sections/programs/EligibilitySection"
import ProgramApplicationSection from "../components/sections/programs/ProgramApplicationSection"
import ProgramsCTASection from "../components/sections/programs/ProgramsCTASection"
import ProgramsFAQSection from "../components/sections/programs/ProgramsFAQSection"
import ProgramsHero from "../components/sections/programs/ProgramsHero"
import StudentSupportSection from "../components/sections/programs/StudentSupportSection"

const ProgramsPage = () => {
    return (
        <>
            <ProgramsHero />
            <AvailableProgramsSection />
            <EligibilitySection />
            <StudentSupportSection />
            <ProgramApplicationSection />
            <ProgramsFAQSection />
            <ProgramsCTASection />
        </>
    )
}

export default ProgramsPage
