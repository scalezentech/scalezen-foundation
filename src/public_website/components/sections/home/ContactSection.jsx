
import {
    ArrowRight,
    GraduationCap,
    Handshake,
    MessageCircle,
    School,
} from "lucide-react";
import { Link } from "react-router-dom";

const contactOptions = [
    {
        icon: GraduationCap,
        title: "Students & Parents",
        description:
            "Need help understanding program eligibility, applications or educational support? We're here to guide you.",
        link: "/contact",
        linkText: "Get in touch",
    },
    {
        icon: School,
        title: "Schools & Educators",
        description:
            "Help students discover educational opportunities and explore ways your school can work with the Foundation.",
        link: "/contact",
        linkText: "Connect with us",
    },
    {
        icon: Handshake,
        title: "Partners & Volunteers",
        description:
            "Interested in contributing your skills, resources or institutional support to our educational initiatives?",
        link: "/contact",
        linkText: "Explore opportunities",
    },
];

const ContactSection = () => {
    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="bg-off-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-[1320px] px-6 sm:px-8">

                {/* Section heading */}
                <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
                        <MessageCircle size={16} aria-hidden="true" />
                        Get in Touch
                    </span>

                    <h2
                        id="contact-heading"
                        className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
                    >
                        Let's Make a Difference
                        <span className="block text-teal">
                            Together.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                        Whether you're looking for educational support or want
                        to contribute to our mission, we'd love to hear from you.
                    </p>
                </div>

                {/* Contact cards */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {contactOptions.map((option, index) => {
                        const Icon = option.icon;

                        return (
                            <Link
                                key={option.title}
                                to={option.link}
                                className="group flex h-full flex-col rounded-4xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_14px_35px_-20px_rgba(21,78,86,0.3)] sm:p-7"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-teal text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                                        <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                                    </div>

                                    <span className="text-sm font-bold tracking-widest text-teal/40">
                                        0{index + 1}
                                    </span>
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-navy">
                                    {option.title}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                                    {option.description}
                                </p>

                                <div
                                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-teal transition-colors duration-300 hover:text-navy"
                                >
                                    {option.linkText}
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-4xl bg-navy px-6 py-8 text-center sm:px-10 md:flex-row md:text-left lg:mt-12">
                    <div>
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                            Have Something Else in Mind?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-white/70 sm:text-base">
                            Reach out to our team and let's find the right way forward.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold py-3 pl-6 pr-3 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                        Contact Our Team
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10">
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
