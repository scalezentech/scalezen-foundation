import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const supportPoints = [
  { icon: BookOpen, text: "Learning Resources" },
  { icon: GraduationCap, text: "Exam Preparation" },
  { icon: HeartHandshake, text: "Student Support" },
];

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

/*
  Height: fills the viewport below the navbar, same as the other heroes.
  Main bar = 5rem. The announcement bar (2.5rem) shows from lg up, so lg = 7.5rem.
*/
const ProgramsHero = () => {
  const [mounted, setMounted] = useState(false);

  // One entrance sequence on load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = `transition-all duration-700 ease-out motion-reduce:transition-none ${
    mounted
      ? "translate-y-0 opacity-100"
      : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
  }`;

  return (
    <section
      id="programs-hero"
      aria-labelledby="programs-hero-heading"
      className="bg-off-white px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-5
                 min-h-[calc(100svh-5rem)]
                 lg:h-[calc(100svh-7.5rem)] lg:min-h-[460px] navbar-hide"
    >
      <div className="mx-auto grid h-full max-w-[1320px] gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        {/* Left: message */}
        <div className="flex flex-col px-2 pt-8 sm:px-6 lg:px-8 lg:pb-2 lg:pt-0">
          <div className="my-auto">
            <span
              style={{ transitionDelay: "60ms" }}
              className={`mb-6 inline-flex w-fit items-center border border-teal/30  gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal ${reveal}`}
            >
              <Sparkles size={16} aria-hidden="true" className="text-gold" />
              Learning Opportunities for Every Student
            </span>

            <h1
              id="programs-hero-heading"
              style={{ transitionDelay: "120ms" }}
              className={`max-w-[13ch] text-[clamp(2.6rem,10vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-navy lg:max-w-none lg:text-[clamp(2.5rem,min(4.2vw,8.5vh),4.5rem)] ${reveal}`}
            >
              Educational Support That Opens{" "}
              <span className="text-teal">Doors to Opportunity.</span>
            </h1>

            <p
              style={{ transitionDelay: "200ms" }}
              className={`mt-6 max-w-[32rem] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mt-[clamp(1rem,2.6vh,1.75rem)] ${reveal}`}
            >
              Explore educational initiatives designed to support students
              through learning resources, competitive examination preparation,
              guidance, and digital learning opportunities.
            </p>

            <div
              style={{ transitionDelay: "300ms" }}
              className={`mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7 lg:mt-[clamp(1.25rem,3.5vh,2.25rem)] ${reveal}`}
            >
              {/* Plain anchor: jumps to the programs list on this page */}
              <a
                href="#available-programs"
                className={`group inline-flex items-center gap-3 rounded-full bg-teal px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-teal/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-xl hover:shadow-teal/30 active:translate-y-0 ${ring}`}
              >
                Explore Programs
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-navy">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </a>

              <Link
                to="/contact"
                className={`group inline-flex items-center gap-1.5 rounded-sm text-[15px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-[6px] transition-all duration-300 hover:text-teal hover:decoration-teal hover:underline-offset-[9px] ${ring}`}
              >
                Have Questions?
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <ul
            style={{ transitionDelay: "420ms" }}
            className={`mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-5 lg:mt-5 ${reveal}`}
          >
            {supportPoints.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2.5 text-[15px] leading-5 text-slate-600"
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="shrink-0 text-teal"
                />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: photo with caption */}
        <figure
          style={{ transitionDelay: "240ms" }}
          className={`relative h-[420px] overflow-hidden rounded-[28px] bg-light-teal sm:h-[480px] lg:h-full ${reveal}`}
        >
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80"
            alt="Students participating in a classroom learning activity"
            width="1400"
            height="1000"
            fetchPriority="high"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out motion-reduce:transition-none ${
              mounted ? "scale-100" : "scale-105"
            }`}
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark-teal/90 via-dark-teal/40 to-transparent"
          />

          <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="mb-4 block h-1 w-10 rounded-full bg-gold"
            />
            <p className="max-w-[20ch] text-2xl font-bold leading-snug text-white sm:text-3xl">
              Education without financial barriers.
            </p>
            <p className="mt-2 max-w-md text-[15px] leading-7 text-white/80">
              Creating accessible learning opportunities through meaningful
              initiatives.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ProgramsHero;