
import { useEffect } from "react";

import AboutSection from "../components/sections/home/AboutSection";
import ContactSection from "../components/sections/home/ContactSection";
import FAQSection from "../components/sections/home/FAQSection";
import GetInvolvedSection from "../components/sections/home/GetInvolvedSection";
import Hero from "../components/sections/home/Hero";
import HowItWorksSection from "../components/sections/home/HowItWorksSection";
import ImpactSection from "../components/sections/home/ImpactSection";
import ProgramsSection from "../components/sections/home/ProgramsSection";
import ResourcesSection from "../components/sections/home/ResourcesSection";

const HomePage = () => {
    useEffect(() => {
        // Page title
        document.title =
            "ScaleZen Foundation | Free Education & Scholarship Support";

        // SEO metadata
        const metadata = {
            description:
                "ScaleZen Foundation works to make quality education accessible to financially disadvantaged students through free educational support, scholarship exam preparation, learning resources, mentorship, and educational initiatives across Maharashtra, India.",

            keywords:
                "ScaleZen Foundation, free education Maharashtra, scholarship exam preparation, free scholarship classes, student educational support, Navodaya entrance preparation, educational foundation India",

            robots: "index, follow",
        };

        Object.entries(metadata).forEach(([name, content]) => {
            let meta = document.querySelector(
                `meta[name="${name}"]`
            );

            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute("name", name);
                document.head.appendChild(meta);
            }

            meta.setAttribute("content", content);
        });

        // Open Graph metadata
        const openGraph = {
            "og:type": "website",
            "og:title":
                "ScaleZen Foundation | Free Education & Scholarship Support",
            "og:description":
                "Discover free educational support, scholarship exam preparation, learning resources, and mentorship opportunities for students across Maharashtra.",
        };

        Object.entries(openGraph).forEach(([property, content]) => {
            let meta = document.querySelector(
                `meta[property="${property}"]`
            );

            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute("property", property);
                document.head.appendChild(meta);
            }

            meta.setAttribute("content", content);
        });

    }, []);

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
    );
};

export default HomePage;
