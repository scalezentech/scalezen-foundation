import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  GraduationCap,
  Info,
  MonitorPlay,
  Award,
} from "lucide-react";

const programs = [
  {
    status: "Proposed Initiative",
    icon: BookOpen,
    title: "School Scholarship Exam Preparation",
    description:
      "Learning support for students preparing for school-level scholarship examinations through structured study resources and practice opportunities.",
    audience: "Intended for eligible school students",
    features: [
      "Subject-wise learning resources",
      "Practice questions and assessments",
      "Exam preparation guidance",
    ],
  },
  {
    status: "Proposed Initiative",
    icon: GraduationCap,
    title: "Navodaya Entrance Preparation",
    description:
      "Preparation support for students aiming to appear for Jawahar Navodaya Vidyalaya entrance examinations.",
    audience: "Students preparing for Class 6 admission",
    features: [
      "Entrance exam preparation resources",
      "Practice questions and mock tests",
      "Learning and assessment support",
    ],
  },
  {
    status: "Planned Initiative",
    icon: MonitorPlay,
    title: "Digital Learning & Assessment",
    description:
      "Digital learning opportunities designed to help students practise, assess their progress, and strengthen their understanding.",
    audience: "Eligibility to be announced",
    features: [
      "Digital learning resources",
      "Online practice and assessments",
      "Progress monitoring opportunities",
    ],
  },
  {
    status: "Scheme-Based Initiative",
    icon: Award,
    title: "Scholarships & Mentorship",
    description:
      "Potential merit-cum-need support, educational guidance, and mentorship through initiatives approved by the Foundation.",
    audience: "Based on individual scheme criteria",
    features: [
      "Educational and career guidance",
      "Mentorship opportunities",
      "Assistance under approved schemes",
    ],
  },
];

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
          timer = setTimeout(() => setSettled(true), 1300);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

const AvailableProgramsSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();
  const [noteRef, noteShown] = useReveal();

  return (
    <section
      id="available-programs"
      aria-labelledby="available-programs-heading"
      className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${revealClass(headingShown)}`}
        >
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
              <BookOpen size={16} aria-hidden="true" className="text-gold" />
              Our Initiatives
            </span>

            <h2
              id="available-programs-heading"
              className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
            >
              Explore Our{" "}
              <span className="text-teal">Educational Programs.</span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-slate-600 lg:pb-1">
            Discover the educational initiatives through which we aim to make
            learning resources, preparation, and guidance more accessible.
          </p>
        </div>

        {/* Program cards */}
        <ul
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <li
                key={program.title}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                }}
                className={`group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-off-white p-6 transition-all duration-500 hover:border-teal/30 hover:bg-white hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <p className="mt-5 inline-flex w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-navy">
                  {program.status}
                </p>

                <h3 className="mt-3 text-xl font-bold leading-snug text-navy">
                  {program.title}
                </h3>

                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {program.description}
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs font-medium text-slate-500">
                    Intended audience
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-6 text-navy">
                    {program.audience}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-5">
                  <p className="mb-3 text-sm font-semibold text-navy">
                    Areas of support
                  </p>

                  <ul className="space-y-2.5">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                      >
                        <Check
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-teal"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Information note */}
        <div
          ref={noteRef}
          className={`mt-10 flex items-start gap-4 rounded-[28px] border border-slate-200/80 bg-light-teal/60 p-6 sm:p-8 ${revealClass(noteShown)}`}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
            <Info size={22} aria-hidden="true" />
          </span>

          <div>
            <h3 className="text-lg font-bold text-navy">
              Program Availability & Eligibility
            </h3>

            <p className="mt-1 max-w-4xl text-[15px] leading-7 text-slate-600">
              Program availability, eligibility criteria, and support are
              subject to individual scheme approval and available capacity.
              Please check the relevant program details before applying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableProgramsSection;