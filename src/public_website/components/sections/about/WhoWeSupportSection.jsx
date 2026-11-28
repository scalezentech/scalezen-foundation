import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Info,
  School,
  Users,
} from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "The learners at the heart of our work",
    description:
      "Students facing financial limitations who need access to educational resources, competitive exam preparation, and learning opportunities.",
    tags: ["Learning Resources", "Exam Preparation"],
  },
  {
    icon: School,
    title: "Schools & Educators",
    subtitle: "Partners in reaching more learners",
    description:
      "Schools and educators who want to help students discover educational support opportunities and connect eligible learners with Foundation initiatives.",
    tags: ["School Outreach", "Student Nominations"],
  },
  {
    icon: Users,
    title: "Underserved Communities",
    subtitle: "Expanding access beyond boundaries",
    description:
      "Rural and underserved communities where students may face barriers to educational resources, digital learning, and guidance.",
    tags: ["Inclusive Access", "Community Support"],
  },
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

const WhoWeSupportSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();
  const [noteRef, noteShown] = useReveal();

  return (
    <section
      id="who-we-support"
      aria-labelledby="who-we-support-heading"
      className="bg-white py-8 sm:py-10 lg:py-15"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mb-14 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-12 ${revealClass(headingShown)}`}
        >
          <div>
            <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
              <BookOpen size={16} aria-hidden="true" className="text-gold" />
              Our Reach
            </span>

            <h2
              id="who-we-support-heading"
              className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
            >
              Creating Opportunities for{" "}
              <span className="text-teal">Those Who Need Them Most.</span>
            </h2>
          </div>

          <p className="max-w-lg text-base leading-8 text-slate-600 lg:pb-1">
            We aim to connect students, schools, and communities with
            educational opportunities through accessible initiatives and
            meaningful collaboration.
          </p>
        </div>

        {/* Audience cards */}
        <ul ref={gridRef} className="grid gap-6 lg:grid-cols-3">
          {audiences.map(
            ({ icon: Icon, title, subtitle, description, tags }, index) => (
              <li
                key={title}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                }}
                className={`group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-off-white p-6 transition-all duration-500 hover:border-teal/30 hover:bg-white hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none sm:p-8 ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-xl font-bold leading-snug text-navy sm:text-2xl">
                  {title}
                </h3>

                <p className="mt-2 text-[15px] font-semibold text-teal">
                  {subtitle}
                </p>

                <p className="mt-4 flex-1 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {description}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>

        {/* Eligibility note */}
        <div
          ref={noteRef}
          className={`mt-10 flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-light-teal/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${revealClass(noteShown)}`}
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
              <Info size={22} aria-hidden="true" />
            </span>

            <div>
              <h3 className="text-lg font-bold text-navy">
                Support Based on Eligibility
              </h3>

              <p className="mt-1 max-w-3xl text-[15px] leading-7 text-slate-600">
                Each initiative has its own eligibility criteria and available
                capacity. Students should review the specific program details
                before applying.
              </p>
            </div>
          </div>

          <Link
            to="/programs"
            className={`group inline-flex shrink-0 items-center gap-2 rounded-sm text-[15px] font-bold text-teal transition-all duration-300 hover:gap-3 hover:text-navy ${ring}`}
          >
            View program details
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhoWeSupportSection;