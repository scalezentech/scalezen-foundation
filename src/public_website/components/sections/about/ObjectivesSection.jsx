import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  Compass,
  GraduationCap,
  Handshake,
  Target,
} from "lucide-react";

const objectives = [
  {
    icon: BookOpen,
    title: "Accessible Learning",
    description:
      "Help students facing financial limitations access educational resources and digital learning opportunities.",
    points: ["Educational resources", "Digital learning support"],
  },
  {
    icon: GraduationCap,
    title: "Exam Preparation",
    description:
      "Support students preparing for school-level competitive examinations through structured learning and assessment opportunities.",
    points: ["Competitive exam preparation", "Practice and mock assessments"],
  },
  {
    icon: Compass,
    title: "Guidance & Mentorship",
    description:
      "Encourage informed educational decisions by connecting students with relevant guidance and learning support.",
    points: ["Educational guidance", "Career awareness and mentorship"],
  },
  {
    icon: Handshake,
    title: "Inclusive Partnerships",
    description:
      "Work with schools, educators, and institutions to extend educational opportunities to underserved communities.",
    points: ["School and institutional outreach", "Community collaboration"],
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

const ObjectivesSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();

  return (
    <section
      id="objectives"
      aria-labelledby="objectives-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${revealClass(headingShown)}`}
        >
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
              <Target size={16} aria-hidden="true" className="text-gold" />
              What We Aim to Achieve
            </span>

            <h2
              id="objectives-heading"
              className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
            >
              Our Objectives,{" "}
              <span className="text-teal">Our Commitment.</span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-slate-600 lg:pb-1">
            We focus on practical initiatives that help make learning more
            accessible, inclusive, and meaningful for students.
          </p>
        </div>

        {/* Objectives grid */}
        <ul
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {objectives.map(({ icon: Icon, title, description, points }, index) => (
            <li
              key={title}
              style={{
                transitionDelay:
                  gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
              }}
              className={`group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-off-white p-6 transition-all duration-500 hover:border-teal/30 hover:bg-white hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none sm:p-7 ${
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

              <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-5">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm font-medium leading-6 text-slate-700"
                  >
                    <Check
                      size={17}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-teal"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ObjectivesSection;