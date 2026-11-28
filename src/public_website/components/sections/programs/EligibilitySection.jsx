import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Info,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

const eligibilityFactors = [
  {
    icon: GraduationCap,
    title: "Educational Requirements",
    description:
      "Applicants must meet the class level, examination, or educational requirements specified for the selected initiative.",
  },
  {
    icon: Wallet,
    title: "Financial Circumstances",
    description:
      "Some initiatives may prioritise students who face financial barriers to accessing educational resources and support.",
  },
  {
    icon: ClipboardCheck,
    title: "Program-Specific Criteria",
    description:
      "Each initiative may have additional requirements based on its objectives, available resources, and approved capacity.",
  },
];

const reviewSteps = [
  "Review the selected program's requirements.",
  "Submit accurate student and guardian information.",
  "Wait for the Foundation's application review.",
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
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

const EligibilitySection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();
  const [reviewRef, reviewShown] = useReveal();
  const [noteRef, noteShown] = useReveal();

  return (
    <section
      id="eligibility"
      aria-labelledby="eligibility-heading"
      className="bg-off-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mb-14 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-12 ${revealClass(headingShown)}`}
        >
          <div>
            <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
              <Users size={16} aria-hidden="true" className="text-gold" />
              Eligibility & Applications
            </span>

            <h2
              id="eligibility-heading"
              className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
            >
              Who Can <span className="text-teal">Apply for Support?</span>
            </h2>
          </div>

          <p className="max-w-lg text-base leading-8 text-slate-600 lg:pb-1">
            We aim to support students who need educational opportunities.
            Eligibility is assessed according to the requirements of each
            individual initiative.
          </p>
        </div>

        {/* Eligibility factors */}
        <ul
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {eligibilityFactors.map(
            ({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                }}
                className={`group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none sm:p-7 md:last:col-span-2 lg:last:col-span-1 ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-xl font-bold leading-snug text-navy">
                  {title}
                </h3>

                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {description}
                </p>
              </li>
            )
          )}
        </ul>

        {/* Application review information */}
        <div
          ref={reviewRef}
          className={`mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] ${revealClass(reviewShown)}`}
        >
          {/* Review process */}
          <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <FileCheck2 size={22} aria-hidden="true" />
              </span>

              <div>
                <p className="text-sm font-semibold text-teal">
                  Application review
                </p>
                <h3 className="mt-0.5 text-xl font-bold leading-snug text-navy">
                  How Applications Are Evaluated
                </h3>
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-7 text-slate-600">
              The Foundation reviews applications against the published
              eligibility criteria, the information submitted, and the
              available capacity of the relevant initiative.
            </p>

            <ol className="mt-6 space-y-3.5">
              {reviewSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-teal text-sm font-bold text-teal">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-[15px] leading-6 text-slate-600">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Supporting documents */}
          <div className="flex flex-col rounded-[28px] border border-slate-200/80 bg-light-teal/60 p-6 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy">
              <ShieldCheck size={23} aria-hidden="true" />
            </span>

            <h3 className="mt-5 text-xl font-bold leading-snug text-navy">
              What About Supporting Documents?
            </h3>

            <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
              Students do not need to upload supporting documents during the
              initial application. If additional verification is necessary,
              the Foundation may request relevant information privately at a
              later stage.
            </p>

            <p className="mt-6 border-t border-slate-300/60 pt-5 text-sm leading-6 text-slate-600">
              Applicant information should be handled responsibly and used
              only for the relevant application and verification process.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div
          ref={noteRef}
          className={`mt-10 flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${revealClass(noteShown)}`}
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
              <Info size={22} aria-hidden="true" />
            </span>

            <div>
              <h3 className="text-lg font-bold text-navy">
                Every initiative has its own eligibility criteria.
              </h3>

              <p className="mt-1 text-[15px] leading-7 text-slate-600">
                Review the program details before starting an application.
              </p>
            </div>
          </div>

          <a
            href="#available-programs"
            className={`group inline-flex shrink-0 items-center gap-2 rounded-sm text-[15px] font-bold text-teal transition-all duration-300 hover:gap-3 hover:text-navy ${ring}`}
          >
            Review program details
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;