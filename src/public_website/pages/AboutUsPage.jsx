
import { useEffect } from "react";

import AboutHero from "../components/sections/about/AboutHero";
import WhoWeAreSection from "../components/sections/about/WhoWeAreSection";
import VisionMissionSection from "../components/sections/about/VisionMissionSection";
import ObjectivesSection from "../components/sections/about/ObjectivesSection";
import WhoWeSupportSection from "../components/sections/about/WhoWeSupportSection";
import AboutCTASection from "../components/sections/about/AboutCTASection";

const AboutUsPage = () => {
    useEffect(() => {
        const title =
            "About Us | ScaleZen Foundation - Education Without Financial Barriers";

        const description =
            "Discover ScaleZen Foundation's vision, mission, and commitment to making quality education accessible to financially disadvantaged students through educational support, learning resources, and mentorship across Maharashtra, India.";

        document.title = title;

        const setMeta = (attribute, key, content) => {
            let meta = document.querySelector(
                `meta[${attribute}="${key}"]`
            );

            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute(attribute, key);
                document.head.appendChild(meta);
            }

            meta.setAttribute("content", content);
        };

        // Primary SEO metadata
        setMeta("name", "description", description);
        setMeta("name", "robots", "index, follow");

        // Open Graph metadata
        setMeta("property", "og:type", "website");
        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:site_name", "ScaleZen Foundation");

    }, []);

    return (
        <main>
            <AboutHero />
            <WhoWeAreSection />
            <VisionMissionSection />
            <ObjectivesSection />
            <WhoWeSupportSection />
            <AboutCTASection />
        </main>
    );
};

export default AboutUsPage;
