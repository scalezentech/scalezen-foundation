import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  BookOpen,
  School,
  Handshake,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

const impactAreas = [
  {
    number: "01",
    title: "Student Reach",
    description:
      "Tracking the number of eligible students who receive access to free educational resources and approved learning support.",
    focus: "Students supported",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    icon: Users,
  },
  {
    number: "02",
    title: "Learning Progress",
    description:
      "Understanding student participation, assessment performance and progress through structured learning activities.",
    focus: "Learning outcomes",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "School Partnerships",
    description:
      "Building connections with schools and educational institutions to reach students who need learning opportunities.",
    focus: "Institutional reach",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    icon: School,
  },
  {
    number: "04",
    title: "Guidance & Mentorship",
    description:
      "Measuring access to educational guidance, examination awareness, mentoring and career-related support.",
    focus: "Guidance delivered",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80",
    icon: Handshake,
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

const ImpactSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();
  const [bannerRef, bannerShown] = useReveal();

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mx-auto mb-14 max-w-3xl text-center ${revealClass(headingShown)}`}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
            <HeartHandshake size={16} aria-hidden="true" className=" text-gold" />
            Making a Difference
          </span>

          <h2
            id="impact-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
          >
            Measuring What
            <span className="block text-teal">Matters Most</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Real impact goes beyond numbers. We aim to create meaningful
            educational opportunities and track the progress made by students,
            schools and communities.
          </p>
        </div>

        {/* Impact cards */}
        <ol
          ref={gridRef}
          className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {impactAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <li
                key={area.number}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 90}ms` : "0ms",
                }}
                className={`group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white transition-all duration-500 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {/* Image */}
                <div className="relative h-40 shrink-0 overflow-hidden bg-light-teal sm:h-44">
                  <img
                    src={area.image}
                    alt=""
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-dark-teal/85 via-dark-teal/15 to-transparent" />

                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-5 text-3xl font-bold text-white/80"
                  >
                    {area.number}
                  </span>

                  <span className="absolute bottom-3 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy shadow-md">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-navy lg:min-h-[3.4rem]">
                    {area.title}
                  </h3>

                  <p className="mt-2 flex-1 text-[15px] leading-7 text-slate-600">
                    {area.description}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs font-medium text-slate-500">
                      Impact focus
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-navy">
                      {area.focus}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Transparency banner */}
        <div
          ref={bannerRef}
          className={`mt-14 rounded-[28px] bg-navy px-7 py-10 sm:px-12 lg:mt-16 lg:px-16 lg:py-12 ${revealClass(bannerShown)}`}
        >
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gold md:justify-start">
                <ShieldCheck size={19} aria-hidden="true" />
                Transparency & Accountability
              </div>

              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                Every opportunity should create a measurable difference.
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-white/75">
                We aim to share verified program updates, student reach and
                learning outcomes as initiatives are implemented. Our
                commitment is to responsible and transparent reporting.
              </p>
            </div>

            <Link
              to="/programs"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Explore Our Programs
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Reporting note */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-slate-500">
          Impact areas represent the outcomes the Foundation intends to track.
          Verified figures and program results will be published as initiatives
          become operational.
        </p>
      </div>
    </section>
  );
};

export default ImpactSection;