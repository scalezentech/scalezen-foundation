
import { Link } from "react-router-dom";
import {
    ArrowUpRight,
} from "lucide-react";

const footerLinks = {
    explore: [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about-us" },
        { label: "Our Programs", path: "/programs" },
        { label: "Our Impact", path: "/impact" },
        { label: "Resources", path: "/resources" },
    ],
    participate: [
        { label: "Apply for Support", path: "/apply" },
        { label: "Track Application", path: "/track-application" },
        { label: "Get Involved", path: "/get-involved" },
        { label: "Contact Us", path: "/contact" },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-navy text-white">
            <div className="mx-auto max-w-[1320px] px-6 pt-14 sm:px-8 sm:pt-16 lg:pt-20">

                {/* Main footer */}
                <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center">
                            <img
                                src="/logo-full.svg"
                                alt="ScaleZen Foundation"
                                className="h-12 w-auto object-contain  rounded-xl"
                            />
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
                            Working towards a future where financial limitations
                            do not prevent students from accessing quality
                            education and learning opportunities.
                        </p>

                        <p className="mt-5 text-sm font-semibold text-gold">
                            Education Without Financial Barriers.
                        </p>
                    </div>

                    {/* Explore links */}
                    <div>
                        <h3 className="text-base font-bold text-white">
                            Explore
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {footerLinks.explore.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-white/65 transition-colors hover:text-gold"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Participate links */}
                    <div>
                        <h3 className="text-base font-bold text-white">
                            Get Involved
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {footerLinks.participate.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-white/65 transition-colors hover:text-gold"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base font-bold text-white">
                            Connect With Us
                        </h3>

                        <p className="mt-6 text-sm leading-7 text-white/65">
                            Have questions about our initiatives or want to
                            explore a partnership? Connect with our team.
                        </p>

                        <Link
                            to="/contact"
                            className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-white"
                        >
                            Contact Our Team
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className="flex flex-col gap-5 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p className="text-xs leading-6 text-white/50 sm:text-sm">
                        &copy; {new Date().getFullYear()} ScaleZen Foundation. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
                        <Link
                            to="/privacy-policy"
                            className="text-xs text-white/50 transition-colors hover:text-gold sm:text-sm"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/terms-and-conditions"
                            className="text-xs text-white/50 transition-colors hover:text-gold sm:text-sm"
                        >
                            Terms & Conditions
                        </Link>

                        <Link
                            to="/contact"
                            className="text-xs text-white/50 transition-colors hover:text-gold sm:text-sm"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
