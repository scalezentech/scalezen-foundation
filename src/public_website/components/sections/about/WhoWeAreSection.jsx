import { useEffect, useRef, useState } from "react";
import { BookOpen, GraduationCap, HeartHandshake } from "lucide-react";

const focusAreas = [
  {
    icon: BookOpen,
    title: "Learning Access",
    description:
      "Making educational resources and learning opportunities more accessible to students.",
  },
  {
    icon: GraduationCap,
    title: "Student Development",
    description:
      "Supporting students through competitive exam preparation, educational guidance, and learning support.",
  },
  {
    icon: HeartHandshake,
    title: "Community Partnerships",
    description:
      "Collaborating with schools, educators, and institutions to reach students who need support.",
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

const WhoWeAreSection = () => {
  const [introRef, introShown] = useReveal();
  const [focusRef, focusShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Introduction */}
        <div
          ref={introRef}
          className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20"
        >
          {/* Left: heading and belief */}
          <div className={revealClass(introShown)}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
              <HeartHandshake size={16} aria-hidden="true" />
              Who We Are
            </span>

            <h2
              id="who-we-are-heading"
              className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
            >
              Creating a Future Where{" "}
              <span className="text-teal">Every Student Can Learn.</span>
            </h2>

            <blockquote className="mt-9 max-w-xl">
              <span
                aria-hidden="true"
                className="mb-4 block h-1 w-10 rounded-full bg-gold"
              />
              <p className="text-xl font-bold leading-snug text-navy sm:text-2xl">
                Education without financial barriers.
              </p>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                We believe financial circumstances should not determine a
                student's opportunity to learn, grow, and explore their
                potential.
              </p>
            </blockquote>
          </div>

          {/* Right: who we are */}
          <div
            style={{ transitionDelay: "150ms" }}
            className={`space-y-5 text-base leading-8 text-slate-600 ${revealClass(introShown)}`}
          >
            <p className="text-lg leading-8 text-navy sm:text-xl sm:leading-9">
              ScaleZen Foundation is a social initiative associated with
              ScaleZen Technologies Pvt. Ltd., focused on expanding access to
              educational opportunities for students who face financial
              limitations.
            </p>

            <p>
              We aim to support students across Maharashtra and India through
              educational resources, competitive examination preparation,
              guidance, and responsible partnerships.
            </p>

            <p>
              Our approach focuses on making learning support more accessible
              through clearly defined initiatives, eligibility criteria, and
              responsible implementation.
            </p>
          </div>
        </div>

        {/* Areas of focus */}
        <div className="mt-16 border-t border-slate-200 pt-12 sm:mt-20 sm:pt-14">
          <div
            ref={focusRef}
            className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${revealClass(focusShown)}`}
          >
            <h3 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Our Areas of Focus
            </h3>

            <p className="max-w-md text-[15px] leading-7 text-slate-600">
              Our work is centred on creating accessible educational
              opportunities through three key areas of focus.
            </p>
          </div>

          <ul
            ref={gridRef}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {focusAreas.map(({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                }}
                className={`group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-off-white p-6 transition-all duration-500 hover:border-teal/30 hover:bg-white hover:shadow-lg hover:shadow-teal/10 motion-reduce:transition-none sm:p-7 md:last:col-span-2 lg:last:col-span-1 ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h4 className="mt-6 text-xl font-bold leading-snug text-navy">
                  {title}
                </h4>

                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;