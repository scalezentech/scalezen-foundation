import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    ChevronDown,
    CircleHelp,
} from "lucide-react";

const faqs = [
    {
        question: "What is ScaleZen Foundation?",
        answer:
            "ScaleZen Foundation is an educational social initiative focused on helping financially disadvantaged students access quality learning resources, competitive examination preparation and educational guidance.",
    },
    {
        question: "Who can apply for educational support?",
        answer:
            "Students who meet the eligibility criteria of a particular Foundation initiative can apply. Eligibility, class levels and available support will be announced separately for each approved program.",
    },
    {
        question: "Is the educational support completely free?",
        answer:
            "Approved support under a Foundation program is provided without fees to eligible students. The exact benefits and scope of support depend on the approved initiative.",
    },
    {
        question: "Do students need to upload documents while applying?",
        answer:
            "No. The initial application is designed to collect only essential information. If supporting documents are necessary for eligibility verification, the Foundation may request them separately through an appropriate process.",
    },
    {
        question: "How are applications reviewed?",
        answer:
            "Applications are reviewed based on the eligibility criteria, information submitted and available program capacity. The Foundation may contact applicants if additional information is required.",
    },
    {
        question: "How can I check my application status?",
        answer:
            "Applicants can use the application reference or tracking facility provided after submission to check the progress of their application.",
    },
    {
        question: "Can schools nominate eligible students?",
        answer:
            "Schools can express interest in working with the Foundation and helping eligible students discover available opportunities. The nomination process will depend on the relevant program.",
    },
    {
        question: "Does submitting an application guarantee selection?",
        answer:
            "No. Submitting an application does not guarantee approval or selection. Applications are considered according to the published eligibility criteria and available program capacity.",
    },
];

const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

/* Reveals a block once, the first time it scrolls into view. */
const useReveal = () => {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setShown(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return [ref, shown];
};

const revealClass = (shown) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [headingRef, headingShown] = useReveal();
    const [listRef, listShown] = useReveal();
    const [ctaRef, ctaShown] = useReveal();

    const toggleFAQ = (index) => {
        setActiveIndex((current) => (current === index ? -1 : index));
    };

    return (
        <section
            id="faqs"
            aria-labelledby="faq-heading"
            className="bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
                {/* Section heading */}
                <div
                    ref={headingRef}
                    className={`mx-auto mb-14 max-w-3xl text-center ${revealClass(headingShown)}`}
                >
                    <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
                        <CircleHelp size={16} aria-hidden="true" className="text-gold" />
                        Frequently Asked Questions
                    </span>

                    <h2
                        id="faq-heading"
                        className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
                    >
                        Got Questions?
                        <span className="block text-teal">We Have Answers.</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                        Find answers to common questions about our educational
                        initiatives, application process and student support.
                    </p>
                </div>

                {/* FAQ accordion */}
                <ul ref={listRef} className={`space-y-3 max-w-4xl mx-auto  ${revealClass(listShown)}`}>
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        const buttonId = `faq-question-${index}`;
                        const answerId = `faq-answer-${index}`;

                        return (
                            <li
                                key={faq.question}
                                onClick={() => toggleFAQ(index)}
                                className={`rounded-2xl border transition-colors duration-300 ${isOpen
                                    ? "border-teal/30 bg-off-white"
                                    : "border-slate-200 bg-white hover:border-teal/25"
                                    }`}
                            >
                                <h3>
                                    <button
                                        id={buttonId}
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={answerId}
                                        className="flex w-full items-center justify-between gap-5 rounded-2xl px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal sm:px-7"
                                    >
                                        <span
                                            className={`text-base font-bold leading-6 transition-colors duration-300 sm:text-[17px] ${isOpen ? "text-teal" : "text-navy"
                                                }`}
                                        >
                                            {faq.question}
                                        </span>

                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                                                ? "rotate-180 bg-teal text-white"
                                                : "bg-light-teal text-teal"
                                                }`}
                                        >
                                            <ChevronDown size={18} aria-hidden="true" />
                                        </span>
                                    </button>
                                </h3>

                                {/* Smooth open and close; closed answers are not reachable by keyboard */}
                                <div
                                    id={answerId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    inert={!isOpen}
                                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-6 text-[15px] leading-7 text-slate-600 sm:px-7 sm:pr-16">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Contact CTA */}
                <div
                    ref={ctaRef}
                    className={`mt-14 flex flex-col gap-8 rounded-[28px] bg-navy px-7 py-9 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between lg:mt-16 lg:px-12 lg:py-12 ${revealClass(ctaShown)}`}
                >
                    <div className="max-w-2xl">
                        <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                            Still Have Questions?
                        </h3>

                        <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/75 sm:text-base">
                            Our team is here to help you understand the available programs and
                            application process.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                    >
                        Contact Our Team
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowRight size={16} aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;