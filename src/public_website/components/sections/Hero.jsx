import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Target,
  Compass,
  Check,
  ShieldCheck,
  CircleHelp,
} from "lucide-react";

/*
  IMAGES: free photos from Unsplash (Unsplash License, no attribution required).
    learning   : Jaykumar Bherwani  https://unsplash.com/photos/Dg8WzlOE1as
    exam-prep  : Nikhita S          https://unsplash.com/photos/NsPDiPFTp4c
    guidance   : Vitaly Gariev      https://unsplash.com/photos/14jNrPntbgk
  To use your own photos, replace each src with e.g. "/images/hero/learning.jpg".
  If a photo fails to load, a branded colour block is shown instead.
*/
const panels = [
  {
    src: "https://images.unsplash.com/photo-1762512346988-045f4d5ad2b3?auto=format&fit=crop&w=1100&q=75",
    alt: "Students studying together at a long library table",
    icon: BookOpen,
    title: "Free learning resources",
    text: "Study material and tools at no cost to the student.",
    fallback: "from-teal to-dark-teal",
  },
  {
    src: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=900&q=75",
    alt: "A student writing on a blackboard in a classroom in India",
    icon: Target,
    title: "Competitive exam preparation",
    text: "Structured preparation for the exams that open doors.",
    fallback: "from-navy to-dark-teal",
  },
  {
    src: "https://images.unsplash.com/photo-1758270704925-fa59d93119c1?auto=format&fit=crop&w=900&q=75",
    alt: "A teacher answering a student's question in a classroom",
    icon: Compass,
    title: "Educational guidance",
    text: "Help choosing courses and planning the next step.",
    fallback: "from-dark-teal to-teal",
  },
];

const assurances = [
  { icon: Check, text: "100% free for eligible students" },
  { icon: ShieldCheck, text: "No payment or invoice at any stage" },
  { icon: CircleHelp, text: "Assisted registration in English & Marathi" },
];

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

/*
  Expanding panel: the active one grows and shows its description.
  Hover, keyboard focus and tap all activate it. The photo drifts slightly
  with the cursor (parallax) while the panel is active.
*/
const Panel = ({ panel, isActive, onActivate, priority }) => {
  const [failed, setFailed] = useState(false);
  const Icon = panel.icon;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * -16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -16;
    e.currentTarget.style.setProperty("--px", `${x}px`);
    e.currentTarget.style.setProperty("--py", `${y}px`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty("--px", "0px");
    e.currentTarget.style.setProperty("--py", "0px");
  };

  return (
    <button
      type="button"
      aria-expanded={isActive}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ flexGrow: isActive ? 2.4 : 1 }}
      className={`group relative block min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-[28px] bg-gradient-to-br ${panel.fallback} text-left ring-1 ring-black/5 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${ring}`}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className="absolute left-1/2 top-[40%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white/15 lg:h-32 lg:w-32"
      />

      {!failed && (
        <img
          src={panel.src}
          alt={panel.alt}
          onError={() => setFailed(true)}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          style={{ transform: "translate3d(var(--px,0px),var(--py,0px),0) scale(1.1)" }}
          className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-500 ease-out motion-reduce:transition-none ${
            isActive ? "" : "brightness-[0.7] saturate-[0.7] group-hover:brightness-90"
          }`}
        />
      )}

      {/* White gradient under the caption: rises from the bottom edge as the panel grows */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-[68%] origin-bottom bg-gradient-to-t from-white/80 from-10% via-white/30 to-transparent transition-[transform,scale,opacity] duration-700 ease-out motion-reduce:transition-none ${
          isActive
            ? "scale-y-100 opacity-100"
            : "scale-y-[0.85] opacity-90 lg:scale-y-[0.45] lg:opacity-0"
        }`}
      />

      {/* lg and up: icon + vertical title while collapsed. Fixed size, so it never reflows. */}
      <span
        className={`absolute left-5 top-5 hidden h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:flex ${
          isActive
            ? "bg-gold text-navy"
            : "bg-white/20 text-white  group-hover:bg-white/30"
        }`}
      >
        <Icon size={19} aria-hidden="true" />
      </span>
      <p
        aria-hidden="true"
        className={`absolute left-[30px] top-[76px] hidden whitespace-nowrap text-[15px] font-semibold text-white transition-opacity duration-300 [writing-mode:vertical-rl] lg:block ${
          isActive ? "opacity-0" : "opacity-100 delay-200"
        }`}
      >
        {panel.title}
      </p>

      {/*
        Caption. On lg and up it has a FIXED width (never tied to the panel width),
        so the text keeps the same line breaks while the panel grows or shrinks;
        the panel simply reveals it. Below lg the panels only change height, so
        the text never reflows there either.
      */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:inset-x-auto lg:left-0">
        <span
          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
            isActive
              ? "bg-gold text-navy"
              : "bg-teal/10 text-teal"
          }`}
        >
          <Icon size={19} aria-hidden="true" />
        </span>

        <div
          className={`transition-opacity duration-300 lg:w-[clamp(11rem,18vw,17.5rem)] ${
            isActive ? "lg:opacity-100 lg:delay-200" : "lg:opacity-0"
          }`}
        >
          <p className="text-base font-semibold leading-snug text-navy sm:text-lg">
            {panel.title}
          </p>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none lg:grid-rows-[1fr] lg:opacity-100 ${
              isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="overflow-hidden text-sm leading-5 text-slate-700">
              <span className="mt-1.5 block">{panel.text}</span>
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

/*
  Height: fills the viewport below the navbar.
  Main bar = 5rem. The announcement bar (2.5rem) shows from lg up, so lg = 7.5rem.
*/
const Hero = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [mounted, setMounted] = useState(false);

  // One entrance sequence on load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Gently rotate through the panels until the visitor interacts.
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % panels.length), 5000);
    return () => clearInterval(id);
  }, [auto]);

  const choose = (i) => {
    setAuto(false);
    setActive(i);
  };

  const reveal = `transition-all duration-700 ease-out motion-reduce:transition-none ${
    mounted
      ? "translate-y-0 opacity-100"
      : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
  }`;

  return (
    <section
      id="home"
      className="bg-off-white px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-5
                 min-h-[calc(100svh-5rem)]
                 lg:h-[calc(100svh-7.5rem)] lg:min-h-[460px]"
    >
      <div className="mx-auto grid h-full max-w-[1320px] gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        {/* Left: what we do */}
        <div className="flex flex-col px-2 pt-8 sm:px-6 lg:px-8 lg:pb-2 lg:pt-0">
          <div className="my-auto">
            <h1
              style={{ transitionDelay: "60ms" }}
              className={`max-w-[13ch] text-[clamp(2.6rem,10vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-navy lg:max-w-none lg:text-[clamp(2.5rem,min(4.2vw,8.5vh),4.5rem)] ${reveal}`}
            >
              Education without financial barriers.
            </h1>

            <p
              style={{ transitionDelay: "180ms" }}
              className={`mt-6 max-w-[32rem] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mt-[clamp(1rem,2.6vh,1.75rem)] ${reveal}`}
            >
              ScaleZen Foundation connects eligible students with free
              learning resources, competitive exam preparation and
              educational guidance, so money never decides who gets to learn.
            </p>

            <div
              style={{ transitionDelay: "300ms" }}
              className={`mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7 lg:mt-[clamp(1.25rem,3.5vh,2.25rem)] ${reveal}`}
            >
              <Link
                to="/apply"
                className={`group inline-flex items-center gap-3 rounded-full bg-teal px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-teal/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-xl hover:shadow-teal/30 active:translate-y-0 ${ring}`}
              >
                Apply for free support
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-navy">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>

              <Link
                to="/programs"
                className={`group inline-flex items-center gap-1.5 rounded-sm text-[15px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-[6px] transition-all duration-300 hover:text-teal hover:decoration-teal hover:underline-offset-[9px] ${ring}`}
              >
                Explore our programs
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
            {assurances.map(({ icon: Icon, text }) => (
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

        {/* Right: three expanding panels, one for each thing we do */}
        <div
          role="group"
          aria-label="What we do"
          style={{ transitionDelay: "240ms" }}
          className={`relative flex h-[480px] flex-col gap-3 lg:h-full lg:flex-row ${reveal}`}
        >
          {panels.map((panel, i) => (
            <Panel
              key={panel.title}
              panel={panel}
              isActive={active === i}
              onActivate={() => choose(i)}
              priority={i === 0}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default Hero;