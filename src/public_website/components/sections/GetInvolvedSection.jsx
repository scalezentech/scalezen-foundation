import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Users,
} from "lucide-react";

const opportunities = [
  {
    title: "Become a School Partner",
    description:
      "Help students from your school discover free educational opportunities, competitive exam preparation and learning support.",
    icon: GraduationCap,
    link: "/contact",
    linkText: "Partner With Us",
  },
  {
    title: "Volunteer With Us",
    description:
      "Contribute your time, knowledge and experience through student mentoring, career guidance and educational activities.",
    icon: HeartHandshake,
    link: "/contact",
    linkText: "Join as a Volunteer",
  },
  {
    title: "Institutional Partnerships",
    description:
      "Collaborate with the Foundation to develop meaningful educational initiatives and expand access to learning opportunities.",
    icon: Building2,
    link: "/contact",
    linkText: "Explore Partnership",
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

const GetInvolvedSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();
  const [ctaRef, ctaShown] = useReveal();

  return (
    <section
      id="get-involved"
      aria-labelledby="get-involved-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mx-auto mb-14 max-w-3xl text-center ${revealClass(headingShown)}`}
        >
          <span className="mb-5 inline-flex items-center border border-teal/30 gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
            <Users size={16} aria-hidden="true" className="text-gold" />
            Be Part of the Change
          </span>

          <h2
            id="get-involved-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
          >
            Together, We Can Create
            <span className="block text-teal">More Learning Opportunities</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Meaningful change in education takes collective effort. Join
            ScaleZen Foundation as a school, volunteer or institutional
            partner and help make quality learning more accessible.
          </p>
        </div>

        {/* Opportunity cards: the whole card is clickable */}
        <ul
          ref={gridRef}
          className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {opportunities.map((item, index) => {
            const Icon = item.icon;

            return (
              <li
                key={item.title}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                }}
                className={`group relative flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-off-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal/30 hover:bg-white hover:shadow-xl hover:shadow-teal/10 has-[:focus-visible]:border-teal has-[:focus-visible]:bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal/40 motion-reduce:transition-none sm:p-7 md:last:col-span-2 lg:last:col-span-1 ${
                  gridShown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-teal">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {item.description}
                </p>

                <Link
                  to={item.link}
                  className="mt-7 inline-flex w-fit items-center gap-2 text-[15px] font-bold text-teal transition-all duration-300 after:absolute after:inset-0 after:rounded-[28px] after:content-[''] group-hover:gap-3 hover:text-navy focus-visible:outline-none"
                >
                  {item.linkText}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom partnership CTA */}
        <div
          ref={ctaRef}
          className={`mt-14 rounded-[28px] bg-navy px-7 py-10 sm:px-12 lg:mt-16 lg:px-16 lg:py-12 ${revealClass(ctaShown)}`}
        >
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gold md:justify-start">
                <Handshake size={19} aria-hidden="true" />
                Let's Work Together
              </div>

              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                Every contribution can open a door to education.
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-white/75">
                Have an idea, an educational initiative or a willingness to
                make a difference? We would like to hear from you.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Connect With Us
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;