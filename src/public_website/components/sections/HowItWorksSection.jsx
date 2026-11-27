
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

/* Application process steps */
const steps = [
  {
    number: "01",
    title: "Explore Programs",
    description:
      "Discover educational initiatives and choose the learning support that best matches your educational needs.",
    detail: "Find the right opportunity",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Submit Application",
    description:
      "Complete the application form with the required student and guardian information.",
    detail: "Share your details",
    icon: FileText,
  },
  {
    number: "03",
    title: "Application Review",
    description:
      "The Foundation reviews applications according to approved eligibility criteria and available program capacity.",
    detail: "Eligibility verification",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Receive Support",
    description:
      "Approved students receive access to the relevant free educational resources and learning support.",
    detail: "Start your learning journey",
    icon: GraduationCap,
  },
];

/* Scroll reveal animation */
const useReveal = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, shown];
};

const revealClass = (shown) =>
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

const HowItWorksSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [stepsRef, stepsShown] = useReveal();
  const [ctaRef, ctaShown] = useReveal();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden bg-[#F7FAFA] py-16 sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#154E56]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#E8B44F]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-[1320px] px-6 sm:px-8">

        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mx-auto mb-16 max-w-3xl text-center ${revealClass(
            headingShown
          )}`}
        >
          <span className="mb-5 inline-flex border border-teal/30 items-center gap-2 rounded-full bg-[#154E56]/[0.07] px-4 py-2 text-sm font-semibold text-[#154E56]">
            <Lightbulb size={16} aria-hidden="true" className="text-gold" />
            How It Works
          </span>

          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-[#173052] sm:text-4xl lg:text-[44px]"
          >
            Your Journey Towards
            <span className="block text-[#154E56]">
              Better Opportunities
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Accessing educational support should be simple and transparent.
            Follow these four steps to understand how students can apply
            for learning opportunities through ScaleZen Foundation.
          </p>
        </div>

        {/* Process steps */}
        <div
          ref={stepsRef}
          className="relative"
        >
          {/* Desktop connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[43px] hidden h-[2px] bg-gradient-to-r from-[#154E56]/20 via-[#154E56]/60 to-[#154E56]/20 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  style={{
                    transitionDelay: stepsShown
                      ? `${index * 100}ms`
                      : "0ms",
                  }}
                  className={`group relative flex flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#154E56]/25 hover:shadow-xl hover:shadow-[#154E56]/10 motion-reduce:transition-none sm:p-7 ${
                    stepsShown
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  {/* Icon and number */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border-4 border-[#F7FAFA] bg-[#154E56] text-white shadow-md shadow-[#154E56]/15 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#E8B44F] group-hover:text-[#173052]">
                      <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-4xl font-bold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-[#154E56]/10"
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col">
                    <span className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#154E56]">
                      Step {index + 1}
                    </span>

                    <h3 className="text-xl font-bold leading-snug text-[#173052] transition-colors duration-300 group-hover:text-[#154E56]">
                      {step.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom detail */}
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-xs font-semibold text-slate-500">
                      {step.detail}
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#154E56]/[0.07] text-[#154E56] transition-all duration-300 group-hover:bg-[#154E56] group-hover:text-white">
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Transparency panel */}
        <div
          className="mt-10 flex flex-col gap-5 rounded-[24px] border border-[#154E56]/10 bg-white p-6 sm:flex-row sm:items-start sm:p-8"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8B44F]/20 text-[#173052]">
            <ShieldCheck size={25} aria-hidden="true" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#173052]">
              A Fair and Transparent Application Process
            </h3>

            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              Every application is reviewed according to the approved
              eligibility criteria and available capacity of the relevant
              program. Additional supporting information may be requested
              privately when necessary. Submitting an application does not
              guarantee selection.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#154E56]">
              <CheckCircle2 size={17} aria-hidden="true" />
              Responsible verification and student privacy
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className={`mt-14 rounded-[28px] bg-[#173052] px-7 py-10 sm:px-12 lg:mt-16 lg:px-16 lg:py-12 ${revealClass(
            ctaShown
          )}`}
        >
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#E8B44F] md:justify-start">
                <GraduationCap size={19} aria-hidden="true" />
                Take the First Step
              </div>

              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                Every great learning journey starts with an opportunity.
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-white/75">
                Explore the educational initiatives being developed by
                ScaleZen Foundation.
              </p>
            </div>

            <Link
              to="/programs"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#E8B44F] py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-[#173052] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173052]"
            >
              Explore Programs

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#173052]/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Supporting note */}
        <p className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-2 text-center text-sm leading-6 text-slate-500">
          <CheckCircle2
            size={16}
            className="shrink-0 text-[#154E56]"
            aria-hidden="true"
          />
          Clear steps. Responsible verification. Meaningful learning support.
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
