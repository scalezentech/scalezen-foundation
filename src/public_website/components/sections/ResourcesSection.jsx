import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    FileText,
    GraduationCap,
    Newspaper,
} from "lucide-react";

const resources = [
    {
        category: "Education Updates",
        title: "Stay Informed About Educational Opportunities",
        description:
            "Find important announcements about free educational support, student opportunities and Foundation initiatives.",
        icon: Newspaper,
        image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    },
    {
        category: "Exam Resources",
        title: "Prepare Better for Competitive Examinations",
        description:
            "Explore examination guidance, preparation information and useful learning resources for students.",
        icon: GraduationCap,
        image:
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    },
    {
        category: "Foundation News",
        title: "Follow Our Journey Towards Accessible Education",
        description:
            "Read about Foundation activities, educational partnerships and initiatives that create learning opportunities.",
        icon: FileText,
        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
    },
];

const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

/*
  Reveals a block once, the first time it scrolls into view.
  `settled` turns true after the entrance has finished, so the staggered entrance
  delay can be removed and hover effects react instantly.
*/
const useReveal = () => {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    const [settled, setSettled] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setShown(true);
            setSettled(true);
            return;
        }

        let timer;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    timer = setTimeout(() => setSettled(true), 1200);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, []);

    return [ref, shown, settled];
};

const revealClass = (shown) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;

const ResourcesSection = () => {
    const [headingRef, headingShown] = useReveal();
    const [gridRef, gridShown, gridSettled] = useReveal();
    const [stripRef, stripShown] = useReveal();

    return (
        <section
            id="resources"
            aria-labelledby="resources-heading"
            className="bg-off-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
                {/* Section heading */}
                <div
                    ref={headingRef}
                    className={`mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end ${revealClass(headingShown)}`}
                >
                    <div className="max-w-3xl">
                        <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
                            <BookOpen size={16} aria-hidden="true" className="text-gold" />
                            Knowledge & Information
                        </span>

                        <h2
                            id="resources-heading"
                            className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
                        >
                            Stay Connected.
                            <span className="block text-teal">Stay Informed.</span>
                        </h2>

                        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                            Access useful educational information, examination guidance and
                            updates from ScaleZen Foundation.
                        </p>
                    </div>

                    <Link
                        to="/resources"
                        className={`group inline-flex w-fit shrink-0 items-center gap-2 rounded-sm text-[15px] font-bold text-teal transition-all duration-300 hover:gap-3 hover:text-navy ${ring}`}
                    >
                        Explore All Resources
                        <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>

                {/* Resource cards: the whole card is clickable */}
                <ul
                    ref={gridRef}
                    className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {resources.map((resource, index) => {
                        const Icon = resource.icon;

                        return (
                            <li
                                key={resource.title}
                                style={{
                                    transitionDelay:
                                        gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                                }}
                                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10 has-[:focus-visible]:border-teal has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal/40 motion-reduce:transition-none md:last:col-span-2 lg:last:col-span-1 ${gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative h-48 shrink-0 overflow-hidden bg-light-teal">
                                    <img
                                        src={resource.image}
                                        alt=""
                                        width="900"
                                        height="600"
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-teal/85 via-dark-teal/15 to-transparent" />

                                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy">
                                        {resource.category}
                                    </span>

                                    <span className="absolute bottom-4 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy shadow-md">
                                        <Icon size={20} aria-hidden="true" />
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-teal">
                                        {resource.title}
                                    </h3>

                                    <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                                        {resource.description}
                                    </p>

                                    {/* Stretched link: the ::after covers the whole card (the <li> is relative) */}
                                    <Link
                                        to="/resources"
                                        className="mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-bold text-teal transition-all duration-300 after:absolute after:inset-0 after:content-[''] group-hover:gap-3 hover:text-navy focus-visible:outline-none"
                                    >
                                        <span>
                                            Explore Resource
                                            <span className="sr-only">: {resource.title}</span>
                                        </span>
                                        <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Bottom information strip */}
                <div
                    ref={stripRef}
                    className={`mt-12 flex flex-col items-center justify-between gap-5 rounded-[28px] border border-slate-200/80 bg-white px-7 py-7 text-center sm:px-10 md:flex-row md:text-left ${revealClass(stripShown)}`}
                >
                    <div>
                        <h3 className="text-lg font-bold text-navy">
                            Looking for a specific educational update?
                        </h3>
                        <p className="mt-1 text-[15px] leading-7 text-slate-600">
                            Contact our team for information about Foundation initiatives.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className={`group inline-flex items-center gap-3 rounded-full bg-teal px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-teal/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-xl hover:shadow-teal/30 active:translate-y-0 ${ring}`}
                    >
                        Contact Us
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-navy">
                            <ArrowRight size={16} aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ResourcesSection;