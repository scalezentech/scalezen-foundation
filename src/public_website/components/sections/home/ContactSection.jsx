import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  MessageCircle,
  School,
} from "lucide-react";

const contactOptions = [
  {
    icon: GraduationCap,
    title: "Students & Parents",
    description:
      "Need help understanding program eligibility, applications or educational support? We're here to guide you.",
    link: "/contact",
    linkText: "Get in touch",
  },
  {
    icon: School,
    title: "Schools & Educators",
    description:
      "Help students discover educational opportunities and explore ways your school can work with the Foundation.",
    link: "/contact",
    linkText: "Connect with us",
  },
  {
    icon: Handshake,
    title: "Partners & Volunteers",
    description:
      "Interested in contributing your skills, resources or institutional support to our educational initiatives?",
    link: "/contact",
    linkText: "Explore opportunities",
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

const ContactSection = () => {
  const [headingRef, headingShown] = useReveal();
  const [gridRef, gridShown, gridSettled] = useReveal();
  const [ctaRef, ctaShown] = useReveal();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-off-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`mx-auto mb-14 max-w-3xl text-center ${revealClass(headingShown)}`}
        >
          <span className="mb-5 inline-flex items-center border-teal/30 border gap-2 rounded-full bg-teal/[0.07] px-4 py-2 text-sm font-semibold text-teal">
            <MessageCircle size={16} aria-hidden="true" className="text-gold" />
            Get in Touch
          </span>

          <h2
            id="contact-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[44px]"
          >
            Let's Make a Difference
            <span className="block text-teal">Together.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Whether you're looking for educational support or want to
            contribute to our mission, we'd love to hear from you.
          </p>
        </div>

        {/* Contact cards: each whole card is a link */}
        <ul
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {contactOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <li
                key={option.title}
                style={{
                  transitionDelay:
                    gridShown && !gridSettled ? `${index * 100}ms` : "0ms",
                }}
                className={`${revealClass(gridShown)} md:last:col-span-2 lg:last:col-span-1`}
              >
                <Link
                  to={option.link}
                  className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 motion-reduce:transition-none sm:p-7"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-teal">
                    {option.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                    {option.description}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-bold text-teal transition-all duration-300 group-hover:gap-3 group-hover:text-navy">
                    {option.linkText}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className={`mt-14 rounded-[28px] bg-navy px-7 py-10 sm:px-12 lg:mt-16 lg:px-16 lg:py-12 ${revealClass(ctaShown)}`}
        >
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                Have Something Else in Mind?
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-white/75">
                Reach out to our team and let's find the right way forward.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Contact Our Team
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

export default ContactSection;