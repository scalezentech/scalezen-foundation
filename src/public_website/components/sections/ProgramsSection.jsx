
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Laptop,
  Lightbulb,
  Users,
  School,
} from "lucide-react";

const programs = [
  {
    number: "01",
    title: "School Scholarship Exam Preparation",
    description:
      "Support for students preparing for school-level scholarship examinations through structured learning and exam guidance.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    icon: GraduationCap,
    tag: "Exam Preparation",
    classes: "Class 5 & Class 8",
    classNote: "Indicative scholarship exam levels",
  },
  {
    number: "02",
    title: "Navodaya Entrance Preparation",
    description:
      "Learning support to help students prepare for Jawahar Navodaya Vidyalaya entrance examinations.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    icon: BookOpen,
    tag: "Entrance Preparation",
    classes: "Class 5 Students",
    classNote: "Preparing for Class 6 admission",
  },
  {
    number: "03",
    title: "Digital Learning & Assessment",
    description:
      "Proposed access to practice questions, mock tests, recorded lessons, study notes and progress tracking.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    icon: Laptop,
    tag: "Digital Education",
    classes: "To Be Announced",
    classNote: "Depends on the approved program",
  },
  {
    number: "04",
    title: "Scholarships & Mentorship",
    description:
      "Potential initiatives focused on mentoring, career guidance, examination awareness and digital literacy.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
    icon: Users,
    tag: "Guidance & Support",
    classes: "Based on Initiative",
    classNote: "Eligibility varies by initiative",
  },
];

/* Scroll reveal animation */
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, shown];
};

const revealClass = (shown) =>
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

const ProgramsSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown] = useReveal();
  const [ctaRef, ctaShown] = useReveal();

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="bg-[#F7FAFA] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">

        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mx-auto mb-12 max-w-3xl text-center ${revealClass(
            headingShown
          )}`}
        >
          <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-[#154E56]/[0.07] px-4 py-2 text-sm font-semibold text-[#154E56]">
            <Lightbulb size={16} aria-hidden="true" className="text-gold" />
            Learning Opportunities
          </span>

          <h2
            id="programs-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-[#173052] sm:text-4xl lg:text-[44px]"
          >
            Creating Pathways to
            <span className="block text-[#154E56]">
              Better Opportunities
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Every student deserves the opportunity to learn, grow and achieve.
            Our proposed programs focus on making quality educational support
            more accessible.
          </p>
        </div>

        {/* Program cards */}
        <div
          ref={gridRef}
          className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {programs.map((program, i) => {
            const Icon = program.icon;

            return (
              <article
                key={program.number}
                style={{
                  transitionDelay: gridShown ? `${i * 90}ms` : "0ms",
                }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#154E56]/25 hover:shadow-xl hover:shadow-[#154E56]/10 motion-reduce:transition-none ${
                  gridShown
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {/* Image */}
                <div className="relative h-40 shrink-0 overflow-hidden bg-[#E4F0EF] sm:h-44">
                  <img
                    src={program.image}
                    alt=""
                    width="900"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B42]/85 via-[#0E3B42]/15 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#173052]">
                    {program.tag}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-4 text-3xl font-bold text-white/80"
                  >
                    {program.number}
                  </span>

                  <div className="absolute bottom-3 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8B44F] text-[#173052] shadow-md">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5">

                  {/* Consistent title height */}
                  <h3 className="min-h-[56px] text-lg font-bold leading-snug text-[#173052] transition-colors duration-300 group-hover:text-[#154E56]">
                    {program.title}
                  </h3>

                  {/* Consistent description height */}
                  <p className="mt-2 min-h-[120px] text-sm leading-6 text-slate-600">
                    {program.description}
                  </p>

                  {/* Aligned class information panel */}
                  <div className="mt-4 flex min-h-[116px] flex-col rounded-xl border border-[#154E56]/10 bg-[#F3F8F7] px-3.5 py-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#154E56]">
                      <School size={14} aria-hidden="true" />
                      Suitable For
                    </div>

                    <p className="mt-1.5 text-sm font-bold text-[#173052]">
                      {program.classes}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {program.classNote}
                    </p>
                  </div>

                  {/* Aligned program link */}
                  <Link
                    to="/programs"
                    aria-label={`Explore ${program.title}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-bold text-[#154E56] transition-all duration-300 after:absolute after:inset-0 after:content-[''] group-hover:gap-3 hover:text-[#173052] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#154E56] focus-visible:ring-offset-2"
                  >
                    Explore Program
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className={`mt-12 rounded-[28px] bg-[#173052] px-7 py-9 sm:px-12 lg:mt-14 lg:px-16 lg:py-10 ${revealClass(
            ctaShown
          )}`}
        >
          <div className="flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#E8B44F] md:justify-start">
                <GraduationCap size={19} aria-hidden="true" />
                Your Learning Journey Starts Here
              </div>

              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                Education should never be limited by financial barriers.
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/75 sm:text-[15px]">
                Discover the educational support and learning opportunities
                being developed by ScaleZen Foundation.
              </p>
            </div>

            <Link
              to="/programs"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#E8B44F] py-3 pl-6 pr-3 text-sm font-bold text-[#173052] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173052]"
            >
              View All Programs

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#173052]/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Approval note */}
        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">
          Class levels shown are indicative. Final program details, eligibility
          criteria and application availability will be published after formal
          approval by the Foundation.
        </p>
      </div>
    </section>
  );
};

export default ProgramsSection;
