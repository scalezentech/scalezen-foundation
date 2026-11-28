
import { useState } from "react";
import {
    ChevronDown,
    HelpCircle,
    MessageCircle,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
    {
        question: "Who can apply for ScaleZen Foundation programs?",
        answer:
            "Eligibility depends on the specific initiative. Each program will have its own requirements related to educational level, examination, financial circumstances, and other relevant criteria.",
    },
    {
        question: "Do students need to upload documents while applying?",
        answer:
            "No. Documents are not required during the initial application. If additional verification is necessary, the Foundation may request supporting information privately at a later stage.",
    },
    {
        question: "Is the educational support completely free?",
        answer:
            "Support provided under an approved Foundation initiative is free for selected eligible students. The exact nature and scope of support will be communicated in the respective program details.",
    },
    {
        question: "Does submitting an application guarantee selection?",
        answer:
            "No. Applications are reviewed against the initiative's eligibility criteria, available capacity, and verification requirements. Submitting an application does not guarantee approval.",
    },
    {
        question: "What kind of educational support may students receive?",
        answer:
            "Depending on the approved initiative, support may include study resources, practice questions, mock tests, digital learning content, educational guidance, or mentorship.",
    },
    {
        question: "How can students check their application status?",
        answer:
            "Applicants should retain their application reference details after submission. Status updates can be checked through the Foundation's application tracking facility once it is available.",
    },
    {
        question: "Can schools help students apply?",
        answer:
            "Yes. Schools and educators can help eligible students discover relevant initiatives and understand the application process. Any formal nomination process will depend on the specific program.",
    },
    {
        question: "When will new programs be announced?",
        answer:
            "New initiatives will be announced when their objectives, eligibility criteria, and availability have been confirmed by the Foundation.",
    },
];

const ProgramsFAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex((current) => (current === index ? null : index));
    };

    return (
        <section
            id="programs-faq"
            className="bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-15"
        >
            <div className="mx-auto max-w-[1320px]">
                {/* Section Heading */}
                <div className="mb-12 text-center lg:mb-14">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-light-teal px-4 py-2 text-sm font-semibold text-teal">
                        <HelpCircle size={16}  className="text-gold"/>
                        Frequently Asked Questions
                    </div>

                    <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-[42px]">
                        Questions About Our
                        <span className="block text-teal">Educational Programs?</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
                        Find answers to common questions about our initiatives,
                        eligibility requirements, application process, and student support.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="mx-auto max-w-4xl space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        const buttonId = `program-faq-button-${index}`;
                        const answerId = `program-faq-answer-${index}`;

                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                                        ? "border-teal/25 bg-off-white shadow-[0_10px_28px_-22px_rgba(14,59,66,0.35)]"
                                        : "border-slate-200 bg-white hover:border-teal/20"
                                    }`}
                            >
                                <button
                                    id={buttonId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    onClick={() => toggleFAQ(index)}
                                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                                >
                                    <span className="flex items-start gap-4">
                                        <span
                                            className={`mt-0.5 text-sm font-bold ${isOpen ? "text-teal" : "text-slate-400"
                                                }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span
                                            className={`text-[15px] font-semibold leading-6 sm:text-base ${isOpen ? "text-navy" : "text-slate-700"
                                                }`}
                                        >
                                            {faq.question}
                                        </span>
                                    </span>

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                                                ? "rotate-180 bg-teal text-white"
                                                : "bg-light-teal text-teal"
                                            }`}
                                    >
                                        <ChevronDown size={18} />
                                    </span>
                                </button>

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
                                        <p className="px-5 pb-6 pl-14 text-sm leading-7 text-slate-600 sm:px-7 sm:pl-[4.5rem]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <div
                    className={`mt-14 flex flex-col gap-8 rounded-[28px] bg-navy px-7 py-9 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between lg:mt-16 lg:px-12 lg:py-12 `}
                >
                    <div className="max-w-2xl">
                        <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                            Still Have Questions?
                        </h3>

                        <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/75 sm:text-base">
                            Contact our team for further information.
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

export default ProgramsFAQSection;
