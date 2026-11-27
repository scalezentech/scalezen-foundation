import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Eye, Target } from "lucide-react";

const offerings = [
  "Free educational resources",
  "Competitive examination preparation",
  "Assessments",
  "Guidance",
  "Digital learning support",
];

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#154E56] focus-visible:ring-offset-2";

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

const AboutSection = () => {
  const [mainRef, mainShown] = useReveal();
  const [bannerRef, bannerShown] = useReveal();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Main content */}
        <div
          ref={mainRef}
          className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          {/* Image */}
          <figure
            className={`relative overflow-hidden rounded-[28px] bg-[#E4F0EF] ${revealClass(mainShown)}`}
          >
            <img
              src="https://images.unsplash.com/photo-1758270703813-2ecf235a6462?auto=format&fit=crop&w=1200&q=80"
              alt="Students attending a classroom lesson"
              width="1200"
              height="1500"
              loading="lazy"
              decoding="async"
              className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[580px]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0E3B42]/90 via-[#0E3B42]/40 to-transparent"
            />

            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="mb-4 block h-1 w-10 rounded-full bg-[#E8B44F]"
              />
              <p className="max-w-[20ch] text-2xl font-bold leading-snug text-white sm:text-3xl">
                Every learner deserves access to quality education.
              </p>
            </figcaption>
          </figure>

          {/* Content */}
          <div
            style={{ transitionDelay: "150ms" }}
            className={revealClass(mainShown)}
          >
            <h2
              id="about-heading"
              className="text-3xl font-bold leading-[1.1] tracking-tight text-[#173052] sm:text-4xl lg:text-[44px]"
            >
              Education should be an opportunity, not a privilege.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              ScaleZen Foundation is a social initiative focused on expanding
              access to education for financially disadvantaged students
              across Maharashtra and India.
            </p>

            <p className="mt-6 font-semibold text-[#173052]">
              We connect eligible students with
            </p>

            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {offerings.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[15px] leading-6 text-slate-600"
                >
                  <Check
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-[#154E56]"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-[15px] leading-7 text-slate-500">
              We do this through responsible partnerships and accessible
              technology.
            </p>

            {/* Vision and mission */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="group border-t-2 border-slate-200 pt-5 transition-colors duration-300 hover:border-[#154E56]">
                <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#173052]">
                  <Eye
                    size={20}
                    aria-hidden="true"
                    className="text-[#154E56]"
                  />
                  Our vision
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">
                  An India where financial limitations do not prevent
                  students from accessing quality learning and competitive
                  examination preparation.
                </p>
              </div>

              <div className="group border-t-2 border-slate-200 pt-5 transition-colors duration-300 hover:border-[#E8B44F]">
                <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#173052]">
                  <Target
                    size={20}
                    aria-hidden="true"
                    className="text-[#154E56]"
                  />
                  Our mission
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">
                  Provide eligible students with free educational resources,
                  assessments, guidance and digital learning support.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/about-us"
                className={`group inline-flex items-center gap-3 rounded-full bg-[#154E56] py-3.5 pl-7 pr-3.5 text-[15px] font-semibold text-white shadow-lg shadow-[#154E56]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#173052] hover:shadow-xl hover:shadow-[#154E56]/30 active:translate-y-0 ${ring}`}
              >
                Discover our story
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#E8B44F] group-hover:text-[#173052]">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Commitment banner */}
        <div
          ref={bannerRef}
          className={`mt-20 flex flex-col gap-8 rounded-[28px] bg-[#154E56] px-7 py-10 sm:px-12 md:flex-row md:items-center md:justify-between lg:mt-24 lg:px-16 lg:py-12 ${revealClass(bannerShown)}`}
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              Building a future where every student gets the chance to learn,
              grow and succeed.
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-white/75">
              Through educational opportunities and responsible partnerships,
              we aim to make quality learning more accessible.
            </p>
          </div>

          <Link
            to="/programs"
            className={`group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#E8B44F] py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-[#173052] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#154E56]`}
          >
            Explore programs
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#173052]/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;