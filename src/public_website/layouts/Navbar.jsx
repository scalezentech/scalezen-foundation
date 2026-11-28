import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  ArrowRight,
  ChevronDown,
  Check,
  HeartHandshake,
} from "lucide-react";

/* Announcement in the top bar. Edit the text and links here. */
const announcement = {
  message: "Applications for free MHT-CET & Scholarship preparation are now open.",
  links: [
    { label: "View programmes", to: "/programs", accent: true },
    { label: "Track Application", to: "/track-application" },
  ],
};

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about-us" },
  { name: "Programs", path: "/programs" },
  { name: "Impact", path: "/impact" },
  { name: "Get Involved", path: "/get-involved" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

const languages = [
  { value: "EN", label: "EN", full: "English" },
  { value: "MR", label: "मराठी", full: "मराठी" },
  { value: "HI", label: "हिन्दी", full: "हिन्दी" },
];

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

/* Language dropdown. variant="dark" is for the dark top bar. */
const LanguageMenu = ({ lang, setLang, variant = "light" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.value === lang);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = variant === "dark";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.full}`}
        className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
          dark
            ? open
              ? "bg-white/20 text-white"
              : "text-white/85 hover:bg-white/10 hover:text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
        }`}
      >
        <Globe size={15} aria-hidden="true" />
        {current.label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        role="listbox"
        aria-label="Select language"
        inert={!open}
        className={`absolute right-0 top-[calc(100%+8px)] z-[70] w-44 origin-top-right rounded-xl border border-slate-100 bg-white p-1.5 shadow-[0_20px_50px_-12px_rgba(14,59,66,0.35)] transition-all duration-200 motion-reduce:transition-none ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {languages.map((l) => {
          const selected = l.value === lang;
          return (
            <button
              key={l.value}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                setLang(l.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${ring} ${
                selected
                  ? "bg-teal/[0.08] text-teal"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {l.full}
              {selected && <Check size={16} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/*
  Heights (the Hero uses these two numbers):
  main bar = 80px (5rem) on every screen
  top bar  = 40px (2.5rem), only from lg up
*/
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [lang, setLang] = useState("EN");
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  /*
    Scroll behaviour:
    - While the hero (id="home") is on screen the bar is always visible.
    - Once the visitor has scrolled past the hero, the bar hides when they scroll
      down and comes back as soon as they scroll up.
    - Pages without a hero keep the bar visible.
    Movements under 6px are ignored so it does not flicker. 80px = main bar height.
  */
  useEffect(() => {
    let frame = 0;
    lastY.current = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      const hero = document.querySelector(".navbar-hide");
      const pastHero = hero ? hero.getBoundingClientRect().bottom <= 80 : false;

      setScrolled(y > 4);

      if (!pastHero) {
        setHidden(false);
        lastY.current = y;
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
        lastY.current = y;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const desktopLink = ({ isActive }) =>
    `relative whitespace-nowrap rounded-sm py-2 text-[15px] font-medium transition-colors duration-200 ${ring}
     after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-teal after:transition-transform after:duration-200
     ${
       isActive
         ? "text-teal after:scale-x-100"
         : "text-slate-700 after:scale-x-0 hover:text-teal hover:after:scale-x-100"
     }`;

  return (
    <>
      {/* Announcement bar (desktop only) */}
      <div className="relative z-[60] hidden h-10 bg-dark-teal text-[13.5px] text-white/90 lg:block">
        <div className="mx-auto grid h-full max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center px-8">
          <span aria-hidden="true" />

          <p className="flex items-center gap-3">
            <span>{announcement.message}</span>
            {announcement.links.map((link, i) => (
              <span key={link.to} className="flex items-center gap-3">
                <Link
                  to={link.to}
                  className={`rounded-sm font-semibold underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    link.accent
                      ? "text-gold hover:text-[#F2C86B]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
                {i < announcement.links.length - 1 && (
                  <span aria-hidden="true" className="text-white/40">
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>

          <div className="justify-self-end">
            <LanguageMenu lang={lang} setLang={setLang} variant="dark" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={`sticky top-0 z-50 border-b bg-off-white will-change-transform transition-[translate,box-shadow] duration-300 ease-out has-[:focus-visible]:translate-y-0 motion-reduce:transition-none ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || open
            ? "border-slate-200 shadow-[0_10px_24px_-18px_rgba(14,59,66,0.45)]"
            : "border-slate-200/70"
        }`}
      >

        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          {/* Logo (public/logo-full.svg, 300x62). mix-blend-multiply hides its white
              background on the off-white bar. */}
          <Link
            to="/"
            aria-label="ScaleZen Foundation, home"
            className={`flex shrink-0 items-center justify-self-start rounded-lg ${ring}`}
          >
            <img
              src="/logo-full.svg"
              alt="ScaleZen Foundation: Education Without Financial Barriers"
              width="300"
              height="62"
              className="h-12 w-auto mix-blend-multiply sm:h-14 xl:h-16"
            />
          </Link>

          {/* Desktop navigation, centred */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 justify-self-center xl:flex 2xl:gap-9"
          >
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={desktopLink}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 justify-self-end xl:flex">
            <Link
              to="/partner"
              aria-label="Partner with us"
              title="Partner with us"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-navy transition-colors hover:border-teal hover:text-teal ${ring}`}
            >
              <HeartHandshake size={20} aria-hidden="true" />
            </Link>

            <Link
              to="/apply"
              className={`group flex items-center gap-2 whitespace-nowrap rounded-full bg-teal px-7 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-teal/20 transition-colors hover:bg-navy ${ring}`}
            >
              Apply for free support
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/apply"
              className={`hidden whitespace-nowrap rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white sm:inline-flex ${ring}`}
            >
              Apply for free support
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-navy transition-colors hover:border-teal ${ring}`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-off-white px-6 pb-10 pt-[calc(5rem+1rem)] transition-opacity duration-300 motion-reduce:transition-none xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navigationLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-slate-200 py-4 text-2xl font-semibold tracking-tight transition-all duration-500 motion-reduce:transition-none ${ring} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                } ${isActive ? "text-teal" : "text-navy hover:text-teal"}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full bg-teal"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/apply"
            className={`flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-4 text-base font-semibold text-white ${ring}`}
          >
            Apply for free support
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            to="/partner"
            className={`flex items-center justify-center gap-2 rounded-full border border-teal px-5 py-4 text-base font-semibold text-teal ${ring}`}
          >
            <HeartHandshake size={19} aria-hidden="true" />
            Partner with us
          </Link>
        </div>

        <div
          role="group"
          aria-label="Select language"
          className="mt-8 flex rounded-full bg-slate-200/70 p-1"
        >
          {languages.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLang(l.value)}
              aria-pressed={lang === l.value}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${ring} ${
                lang === l.value
                  ? "bg-white text-navy shadow-sm"
                  : "text-slate-600 hover:text-navy"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;