import AvailableProgramsSection from "../components/sections/programs/AvailableProgramsSection"
import EligibilitySection from "../components/sections/programs/EligibilitySection"
import ProgramsHero from "../components/sections/programs/ProgramsHero"

const ProgramsPage = () => {
    return (
        <>
            <ProgramsHero />
            <AvailableProgramsSection/>
            <EligibilitySection/>
        </>
    )
}

export default ProgramsPage
