import { useEffect, useRef, useState } from "react";
import { Check, Eye, Sparkles, Target } from "lucide-react";

const visionMission = [
  {
    label: "Our vision",
    title: "A Future Where Every Student Has the Opportunity to Learn.",
    description:
      "We envision an India where financial limitations do not prevent students from accessing quality learning opportunities and competitive examination preparation.",
    footer: "Equal Access to Education",
    icon: Eye,
  },
  {
    label: "Our mission",
    title: "Making Educational Support More Accessible and Inclusive.",
    description:
      "We aim to provide eligible students with free educational resources, assessment opportunities, guidance, and digital learning support through responsible partnerships and accessible technology.",
    footer: "Meaningful Educational Support",
    icon: Target,
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

const VisionMissionSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();

  return (
    <section
      id="vision-mission"
      aria-labelledby="vision-mission-heading"
      className="bg-off-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${revealClass(headingShown)}`}
        >
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
              <Sparkles size={16} aria-hidden="true" />
              Our Direction
            </span>

            <h2
              id="vision-mission-heading"
              className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
            >
              Guided by a Purpose,{" "}
              <span className="text-teal">Driven by a Vision.</span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-slate-600 lg:pb-1">
            Our vision and mission define the purpose behind our work and guide
            how we create meaningful educational opportunities.
          </p>
        </div>

        {/* Vision and mission cards */}
        <ul
          ref={gridRef}
          className="grid items-stretch gap-6 lg:grid-cols-2"
        >
          {visionMission.map((item, index) => {
            const Icon = item.icon;

            return (
              <li
                key={item.label}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 120}ms` : "0ms",
                }}
                className={`group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none sm:p-8 lg:p-10 ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <p className="mt-7 text-sm font-semibold text-teal">
                  {item.label}
                </p>

                <h3 className="mt-2 max-w-xl text-2xl font-bold leading-snug text-navy sm:text-[28px]">
                  {item.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="mt-5 block h-1 w-10 rounded-full bg-gold"
                />

                <p className="mt-5 max-w-xl flex-1 text-base leading-8 text-slate-600">
                  {item.description}
                </p>

                <p className="mt-8 flex items-center gap-2.5 border-t border-slate-100 pt-5 text-[15px] font-semibold text-navy">
                  <Check
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-teal"
                  />
                  {item.footer}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default VisionMissionSection;