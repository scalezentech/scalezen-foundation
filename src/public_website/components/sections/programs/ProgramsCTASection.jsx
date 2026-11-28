
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GraduationCap,
} from "lucide-react";

const values = ["Learning Resources", "Exam Preparation", "Student Support"];

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
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown];
};

const revealClass = (shown) =>
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

const ProgramsCTASection = () => {
  const [ref, shown] = useReveal();

  return (
    <section
      id="programs-cta"
      aria-labelledby="programs-cta-heading"
      className="bg-white py-8 sm:py-10 lg:py-15"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div
          ref={ref}
          className={`rounded-[28px] bg-navy px-7 py-12 sm:px-12 lg:px-16 lg:py-16 ${revealClass(shown)}`}
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            {/* Message */}
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gold">
                <GraduationCap size={19} aria-hidden="true" />
                Your Learning Journey Starts Here
              </div>

              <h2
                id="programs-cta-heading"
                className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px]"
              >
                Every Student Deserves an Opportunity to Learn and Grow.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                Explore ScaleZen Foundation initiatives and discover
                educational opportunities designed to make quality learning
                more accessible. Find the support that matches your needs.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                {values.map((value) => (
                  <li
                    key={value}
                    className="flex items-center gap-2 text-[15px] font-medium text-white/80"
                  >
                    <Check
                      size={17}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-gold"
                    />
                    {value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href="#available-programs"
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Explore Our Programs
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </a>

              <Link
                to="/contact"
                className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/30 py-3.5 pl-7 pr-5 text-[15px] font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Get in Touch
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsCTASection;
