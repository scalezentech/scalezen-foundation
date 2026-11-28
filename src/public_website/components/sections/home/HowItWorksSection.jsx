import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

/* Application process steps */
const steps = [
  {
    title: "Explore Programs",
    description:
      "Discover educational initiatives and choose the learning support that best matches your educational needs.",
    detail: "Find the right opportunity",
    icon: BookOpen,
  },
  {
    title: "Submit Application",
    description:
      "Complete the application form with the required student and guardian information.",
    detail: "Share your details",
    icon: FileText,
  },
  {
    title: "Application Review",
    description:
      "The Foundation reviews applications according to approved eligibility criteria and available program capacity.",
    detail: "Eligibility verification",
    icon: ClipboardCheck,
  },
  {
    title: "Receive Support",
    description:
      "Approved students receive access to the relevant free educational resources and learning support.",
    detail: "Start your learning journey",
    icon: GraduationCap,
  },
];

/* Reveals a block once, the first time it scrolls into view. */
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
  const [panelRef, panelShown] = useReveal();
  const [ctaRef, ctaShown] = useReveal();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-off-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mx-auto mb-14 max-w-3xl text-center ${revealClass(headingShown)}`}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
            <Lightbulb size={16} aria-hidden="true" />
            How It Works
          </span>

          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
          >
            Your Journey Towards
            <span className="block text-teal">Better Opportunities</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Accessing educational support should be simple and transparent.
            Follow these four steps to understand how students can apply for
            learning opportunities through ScaleZen Foundation.
          </p>
        </div>

        {/* Process steps */}
        <ol
          ref={stepsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <li
                key={step.title}
                style={{ transitionDelay: stepsShown ? `${index * 100}ms` : "0ms" }}
                className={`group relative flex flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none sm:p-7 ${
                  stepsShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {/* Dashed line that leads on to the next step (4-column layout only) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 left-[6.25rem] top-[3.5rem] hidden border-t-2 border-dashed border-teal/25 lg:block"
                  />
                )}

                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <p className="mt-6 text-sm font-semibold text-teal">
                  Step {index + 1}
                </p>

                <h3 className="mt-1 text-xl font-bold leading-snug text-navy">
                  {step.title}
                </h3>

                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {step.description}
                </p>

                <p className="mt-6 border-t border-slate-100 pt-4 text-sm font-medium text-slate-500">
                  {step.detail}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Transparency panel */}
        <div
          ref={panelRef}
          className={`mt-10 flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8 ${revealClass(panelShown)}`}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
            <ShieldCheck size={24} aria-hidden="true" />
          </span>

          <div>
            <h3 className="text-lg font-bold text-navy">
              A Fair and Transparent Application Process
            </h3>

            <p className="mt-2 max-w-4xl text-[15px] leading-7 text-slate-600">
              Every application is reviewed according to the approved
              eligibility criteria and available capacity of the relevant
              program. Additional supporting information may be requested
              privately when necessary. Submitting an application does not
              guarantee selection.
            </p>

            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal">
              <CheckCircle2 size={17} aria-hidden="true" />
              Responsible verification and student privacy
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className={`mt-14 rounded-[28px] bg-navy px-7 py-10 sm:px-12 lg:mt-16 lg:px-16 lg:py-12 ${revealClass(ctaShown)}`}
        >
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gold md:justify-start">
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
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Explore Programs
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Supporting note */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-slate-500">
          Clear steps. Responsible verification. Meaningful learning support.
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;