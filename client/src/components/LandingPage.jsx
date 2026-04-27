import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

import whispeerLogo from "../assets/images/logo.png";
import whispeerTypography from "../assets/images/typography.png";
import heroAmbientImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_36_05 PM (10).png";
import memoryDetailImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_33_43 PM (8).png";
import ctaBackgroundImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_30_12 PM (6).png";
import extraCoffeeImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_21_46 PM (1).png";
import exploreConcertImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_35_10 PM (9).png";
import exploreRainyImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_31_55 PM (7).png";
import exploreCookImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_27_58 PM (5).png";
import exploreSunsetImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_26_30 PM (4).png";
import exploreMuseumImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_23_53 PM (3).png";
import exploreBeachImage from "../assets/images/landing_samples/ChatGPT Image Apr 26, 2026 at 11_21_47 PM (2).png";

const landingPhotos = {
  heroAmbient: heroAmbientImage,
  memoryDetail: memoryDetailImage,
  ctaBackground: ctaBackgroundImage,
  extraCoffee: extraCoffeeImage,
  explore: [
    {
      src: exploreConcertImage,
      label: "concert night",
      inspired: 24,
    },
    {
      src: exploreRainyImage,
      label: "rainy coffee",
      inspired: 18,
    },
    {
      src: exploreCookImage,
      label: "cook together",
      inspired: 13,
    },
    {
      src: exploreSunsetImage,
      label: "sunset picnic",
      inspired: 31,
    },
    {
      src: exploreMuseumImage,
      label: "museum date",
      inspired: 16,
    },
    {
      src: exploreBeachImage,
      label: "beach walk",
      inspired: 27,
    },
  ],
};

const heroWhispersPreview = {
  openTodos: [
    {
      id: "hero_open_1",
      title: "Try a new dessert",
      minutes: 20,
      status: "open",
      isHighlighted: false,
      createdAt: "2026-04-27",
    },
    {
      id: "hero_open_2",
      title: "Take a 20 min walk",
      minutes: 20,
      status: "open",
      isHighlighted: false,
      createdAt: "2026-04-27",
    },
    {
      id: "hero_open_3",
      title: "Send one old photo",
      minutes: 8,
      status: "open",
      isHighlighted: false,
      source: {
        type: "public_memory",
        label: "Inspired from Explore",
      },
      createdAt: "2026-04-27",
    },
  ],
  doneTodos: [
    {
      id: "hero_done_1",
      title: "Voice note before sleep",
      minutes: 5,
      status: "done",
      isHighlighted: true,
      createdAt: "2026-04-25",
      doneAt: "2026-04-26",
    },
    {
      id: "hero_done_2",
      title: "Coffee after rain",
      minutes: 30,
      status: "done",
      isHighlighted: false,
      source: {
        type: "public_memory",
        label: "Inspired from Explore",
      },
      createdAt: "2026-04-23",
      doneAt: "2026-04-24",
    },
  ],
  selectedPartner: { id: "hero_partner", status: "active" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const iconPaths = {
  sparkles: [
    "M12 3l1.6 5.1L19 10l-5.4 1.9L12 17l-1.6-5.1L5 10l5.4-1.9L12 3z",
    "M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z",
    "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z",
  ],
  lock: [
    "M7 11V8a5 5 0 0110 0v3",
    "M6 11h12v10H6V11z",
    "M12 15v2",
  ],
  heart: [
    "M20.4 5.6a5.1 5.1 0 00-7.2 0L12 6.8l-1.2-1.2a5.1 5.1 0 00-7.2 7.2L12 21l8.4-8.2a5.1 5.1 0 000-7.2z",
  ],
  images: [
    "M4 5h13v13H4V5z",
    "M8 9h.01",
    "M4 15l4-4 3 3 2-2 4 4",
    "M8 3h12v12",
  ],
  telescope: [
    "M10 14l-3 7",
    "M14 14l3 7",
    "M12 14v7",
    "M5 11l10-7 3 5-10 7-3-5z",
    "M14 6l2 3",
  ],
  arrowRight: ["M5 12h14", "M13 6l6 6-6 6"],
  check: ["M20 6L9 17l-5-5"],
  plus: ["M12 5v14", "M5 12h14"],
  shield: ["M12 3l7 3v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3z", "M9 12l2 2 4-4"],
  wand: ["M15 4l5 5", "M14 10l-9 9", "M12 6l6 6", "M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2"],
};

function Icon({ name, className = "" }) {
  const paths = iconPaths[name] || iconPaths.sparkles;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function BrandMark({ className = "", alt = "Whispeer mark" }) {
  return <img src={whispeerLogo} alt={alt} className={`bg-transparent object-contain ${className}`} />;
}

function BrandWordmark({ className = "", alt = "Whispeer" }) {
  return <img src={whispeerTypography} alt={alt} className={`bg-transparent object-contain ${className}`} />;
}

function AuroraBlob({ className = "", delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl opacity-50 ${className}`}
      animate={{ x: [0, 24, -18, 0], y: [0, -18, 20, 0], scale: [1, 1.08, 0.96, 1] }}
      transition={{ duration: 10, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FloatingCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-3xl border border-white/60 bg-white/70 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: { duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.8, delay },
      }}
    >
      {children}
    </motion.div>
  );
}

function ScenicImage({ src, alt, className = "", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} bg-[radial-gradient(circle_at_22%_20%,rgba(244,114,182,.42),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(96,165,250,.42),transparent_38%),linear-gradient(140deg,#f8fafc,#fdf2f8,#ecfeff)]`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function AnchoredDottedArrow({ containerRef, startRef, endRef, active = true }) {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    if (!active) {
      setGeometry(null);
      return undefined;
    }

    let rafId = 0;
    let resizeObserver = null;

    const measure = () => {
      rafId = 0;

      const container = containerRef.current;
      const start = startRef.current;
      const end = endRef.current;
      if (!container || !start || !end) {
        setGeometry(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const startRect = start.getBoundingClientRect();
      const endRect = end.getBoundingClientRect();
      if (!containerRect.width || !containerRect.height) {
        setGeometry(null);
        return;
      }

      const startX = startRect.left + startRect.width / 2 - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;
      const endX = endRect.right - containerRect.left + 4;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      const chord = Math.hypot(endX - startX, endY - startY);
      if (chord < 1) {
        setGeometry(null);
        return;
      }
      const radius = chord / 2;
      const sweepFlag = endX >= startX ? 1 : 0;
      const path = `M ${startX} ${startY} A ${radius} ${radius} 0 0 ${sweepFlag} ${endX} ${endY}`;

      setGeometry((previous) => {
        if (
          previous &&
          previous.path === path &&
          previous.width === containerRect.width &&
          previous.height === containerRect.height
        ) {
          return previous;
        }
        return {
          path,
          width: containerRect.width,
          height: containerRect.height,
        };
      });
    };

    const scheduleMeasure = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.addEventListener("scroll", scheduleMeasure, true);

    if (typeof window.ResizeObserver !== "undefined") {
      resizeObserver = new window.ResizeObserver(() => scheduleMeasure());
      [containerRef.current, startRef.current, endRef.current].forEach((element) => {
        if (element) resizeObserver.observe(element);
      });
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure, true);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [active, containerRef, startRef, endRef]);

  if (!geometry) return null;

  const strokeColor = "rgba(80, 140, 255, 0.35)";

  return (
    <div className="pointer-events-none absolute inset-0 z-[90] overflow-visible">
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 ${Math.max(1, geometry.width)} ${Math.max(1, geometry.height)}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={geometry.path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 9"
        />
      </svg>
    </div>
  );
}

function PhoneMockup() {
  const [showInspiredWhisper, setShowInspiredWhisper] = useState(false);
  const phoneShellRef = useRef(null);
  const tryButtonRef = useRef(null);
  const whisperCardRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowInspiredWhisper(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={phoneShellRef}
      className="relative mx-auto h-[620px] w-[310px] rounded-[3.2rem] border border-slate-950/10 bg-slate-950 p-3 shadow-[0_40px_120px_rgba(15,23,42,0.35)]"
      initial={{ opacity: 0, y: 28, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    >
      <AnimatePresence>
        {showInspiredWhisper ? (
          <motion.div
            ref={whisperCardRef}
            className="absolute -left-6 top-[392px] z-40 w-[248px] rounded-[1.7rem] border border-white/90 bg-[#f3f4f6]/98 p-4 shadow-[0_22px_45px_rgba(15,23,42,0.2)] backdrop-blur-xl md:-left-7 md:top-[374px] md:w-[278px] md:p-5"
            initial={{ opacity: 0, x: 88, y: 18, scale: 0.86 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, y: 10, scale: 0.94 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="truncate text-base font-semibold leading-5 text-slate-950 md:text-[17px] md:leading-6">Sunset picnic pause</h4>
                <p className="mt-1 text-[13px] text-slate-500 md:text-sm">20 min · quality attention</p>
                <p className="mt-1 text-[11px] font-semibold text-violet-700">Inspired from Explore</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" className="grid h-8 w-8 place-items-center rounded-full text-lg leading-none text-slate-500" aria-label="More actions">
                  ...
                </button>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15 md:h-10 md:w-10"
                  aria-label="Mark inspired whisper done"
                >
                  <Icon name="check" className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="mt-3.5 h-9 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950 md:h-9"
            >
              Keep as highlight
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute left-1/2 top-5 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-950" />
      <div className="relative h-full overflow-hidden rounded-[2.55rem] bg-[#f8f5f2]">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,.36),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(96,165,250,.32),transparent_38%),radial-gradient(circle_at_50%_70%,rgba(168,85,247,.2),transparent_45%)]" />
        <motion.div
          className="absolute inset-x-4 top-12 z-30 overflow-hidden rounded-[1.4rem] border border-white/75 bg-[#f8f5f2]/96 shadow-[0_18px_44px_rgba(15,23,42,0.14)] backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between border-b border-slate-950/6 px-3 py-2">
            <span className="text-sm font-medium leading-none text-slate-700">‹</span>
            <p className="text-[11px] font-semibold text-slate-950">Public memory</p>
            <span className="w-3" />
          </div>
          <div className="relative h-[118px]">
            <ScenicImage src={landingPhotos.explore[3].src} alt="Sunset picnic pause memory" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
            <p className="absolute bottom-2.5 left-3 text-sm font-semibold text-white drop-shadow">Sunset picnic pause</p>
          </div>
          <div className="space-y-2 px-3 pb-3 pt-2.5">
            <p className="text-xs font-semibold leading-tight text-violet-700">Inspired 24 couples</p>
            <div className="flex flex-nowrap gap-1 overflow-hidden">
              {["movie night", "home", "cozy", "just us"].map((tag) => (
                <span key={tag} className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              ref={tryButtonRef}
              onClick={() => setShowInspiredWhisper(true)}
              className="w-full rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
            >
              Try this together
            </button>
          </div>
        </motion.div>

      </div>
      <AnchoredDottedArrow
        containerRef={phoneShellRef}
        startRef={tryButtonRef}
        endRef={whisperCardRef}
        active={showInspiredWhisper}
      />
    </motion.div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-[1.25rem] border border-slate-950/10 bg-white/72 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl md:rounded-[1.8rem] md:p-6 md:shadow-[0_20px_70px_rgba(15,23,42,0.065)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 hidden h-36 w-36 rounded-full bg-gradient-to-br from-pink-200 via-violet-200 to-blue-200 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-65 md:block" />
      <div className="relative">
        <div className="mb-2 grid h-8 w-8 place-items-center rounded-xl bg-slate-950 text-white shadow-sm md:mb-5 md:h-11 md:w-11 md:rounded-2xl md:shadow-lg md:shadow-slate-950/10">
          <Icon name={icon} className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-slate-950 md:text-xl">{title}</h3>
        <p className="mt-1.5 text-[11px] leading-4 text-slate-600 md:mt-3 md:text-sm md:leading-6">{text}</p>
      </div>
    </motion.div>
  );
}

function PublicMemoryTile({ item }) {
  return (
    <div className="group relative aspect-[2/3] w-[118px] shrink-0 overflow-hidden rounded-[1.2rem] shadow-[0_12px_30px_rgba(15,23,42,0.14)] md:w-[152px] md:rounded-[1.55rem]">
      <ScenicImage
        src={item.src}
        alt={item.label}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/8 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-3">
        <span className="w-fit rounded-full bg-white/72 px-2 py-1 text-[10px] font-semibold text-slate-900 backdrop-blur-xl">
          Inspired {item.inspired}
        </span>
        <p className="text-xs font-semibold capitalize text-white drop-shadow-sm md:text-sm">{item.label}</p>
      </div>
    </div>
  );
}

function ExploreSlideshow() {
  const slides = landingPhotos.explore;

  return (
    <div className="relative mt-8 w-full min-w-0 max-w-full overflow-hidden py-2 md:mt-0 md:max-w-[390px] md:py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#fbf7ef] to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#fbf7ef] to-transparent md:w-16" />
      <div className="landing-marquee">
        <div className="landing-marquee-group">
          {slides.map((item, index) => (
            <PublicMemoryTile key={`a-${item.label}-${index}`} item={item} />
          ))}
        </div>
        <div className="landing-marquee-group" aria-hidden="true">
          {slides.map((item, index) => (
            <PublicMemoryTile key={`b-${item.label}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MagneticButton({ children, className = "", onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  return (
    <motion.button
      type="button"
      style={{ x: springX, y: springY }}
      onClick={onClick}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)] transition hover:bg-slate-800 ${className}`}
    >
      {children}
      <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function runLandingPageSmokeTests() {
  const requiredNavItems = ["Overview", "How it works", "Memories", "Explore", "Privacy"];
  const requiredPublicLabels = landingPhotos.explore.map((item) => item.label);
  console.assert(requiredNavItems.length === 5, "Expected five landing navigation items.");
  console.assert(requiredPublicLabels.length === 6, "Expected six public memory preview tiles.");
  console.assert(landingPhotos.explore.every((item) => item.src && item.label && item.inspired > 0), "Expected every Explore photo to have a src, label, and inspired count.");
  console.assert(Boolean(iconPaths.sparkles && iconPaths.lock && iconPaths.arrowRight), "Expected built-in SVG icons to exist.");
  console.assert(Boolean(whispeerTypography), "Expected Whispeer typography image to exist.");
}

export default function LandingPage() {
  runLandingPageSmokeTests();

  const [activeSection, setActiveSection] = useState("overview");
  const [sectionDirection, setSectionDirection] = useState(1);
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-250, 250], [6, -6]);
  const rotateY = useTransform(mouseX, [-250, 250], [-6, 6]);

  const navItems = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "how-it-works", label: "How it works" },
      { id: "memories", label: "Memories" },
      { id: "explore", label: "Explore" },
      { id: "privacy", label: "Privacy" },
    ],
    []
  );

  const activeLabel = navItems.find((item) => item.id === activeSection)?.label || "Overview";
  const goToWhispers = () => navigate("/whispers");
  const goToExplore = () => navigate("/explore");

  useEffect(() => {
    let frameId = null;

    const updateActiveSection = () => {
      frameId = null;
      const offset = 130;
      const current = navItems
        .map((item) => {
          const section = document.getElementById(item.id);
          if (!section) return null;
          return { id: item.id, top: section.getBoundingClientRect().top };
        })
        .filter(Boolean)
        .filter((section) => section.top <= offset)
        .sort((a, b) => b.top - a.top)[0];

      const nextId = current?.id || "overview";
      setActiveSection((previous) => {
        if (previous === nextId) return previous;
        const previousIndex = navItems.findIndex((item) => item.id === previous);
        const nextIndex = navItems.findIndex((item) => item.id === nextId);
        setSectionDirection(nextIndex >= previousIndex ? 1 : -1);
        return nextId;
      });
    };

    const onScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [navItems]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen overflow-hidden bg-[#fbf7ef] text-slate-950 selection:bg-slate-950 selection:text-white"
      onMouseMove={(event) => {
        mouseX.set(event.clientX - window.innerWidth / 2);
        mouseY.set(event.clientY - window.innerHeight / 2);
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <AuroraBlob className="left-[-10rem] top-[-10rem] h-[28rem] w-[28rem] bg-pink-200" />
        <AuroraBlob className="right-[-12rem] top-28 h-[32rem] w-[32rem] bg-blue-200" delay={1.6} />
        <AuroraBlob className="bottom-[-14rem] left-1/3 h-[34rem] w-[34rem] bg-violet-200" delay={3.1} />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,247,239,.25),#fbf7ef_80%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/65 bg-white/65 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <a href="#top" className="flex items-center gap-3">
            <BrandMark className="h-9 w-9 md:hidden" />
            <BrandWordmark className="hidden h-8 w-auto md:block" />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const selected = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => scrollToSection(event, item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${selected
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="relative z-10">
            <button
              type="button"
              onClick={goToWhispers}
              className="rounded-full bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 md:px-5 md:py-2.5 md:text-sm"
            >
              Try now
            </button>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeSection}
                initial={{ opacity: 0, y: 12 * sectionDirection }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 * sectionDirection }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex max-w-[130px] truncate rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
              >
                {activeLabel}
              </motion.span>
            </AnimatePresence>
          </div>

        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section id="overview" className="scroll-mt-28 mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-[1.02fr_.98fr] md:px-8 md:pt-28">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center md:text-left">
            <motion.div variants={fadeUp} className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-slate-950/10 bg-white/65 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-xl md:mx-0">
              <BrandMark className="h-4 w-4" alt="Whispeer" />
              <span>Private by default. Shared only by choice.</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl md:text-7xl">
              A private world for two.
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 md:mx-0 md:text-lg">
              A calm, private place for the small things that make a relationship feel alive.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <MagneticButton onClick={goToWhispers}>Try now</MagneticButton>
              <button
                type="button"
                onClick={goToExplore}
                className="inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl transition hover:bg-white"
              >
                Explore
              </button>
            </motion.div>
          </motion.div>

          <motion.div className="relative min-h-[660px]" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute inset-x-4 top-10 hidden h-[540px] overflow-hidden rounded-[2.8rem] border border-white/50 shadow-[0_30px_120px_rgba(15,23,42,0.12)] md:block"
            >
              <ScenicImage src={landingPhotos.heroAmbient} alt="Cozy couple moment" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,247,239,0.08),rgba(251,247,239,0.32),rgba(251,247,239,0.72))]" />
            </motion.div>

            <div className="relative z-10">
              <PhoneMockup />
            </div>

            <FloatingCard className="left-0 top-24 hidden w-56 md:block" delay={0.75}>
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-pink-100 text-pink-700">
                  <Icon name="wand" className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold">Tiny idea</p>
              </div>
              <p className="text-sm leading-5 text-slate-600">Try a late coffee after class.</p>
              <ScenicImage src={landingPhotos.extraCoffee} alt="Coffee together" className="mt-4 h-24 w-full rounded-2xl object-cover" />
            </FloatingCard>

            <FloatingCard className="right-0 top-40 hidden w-56 md:block" delay={1.05}>
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-blue-700">
                  <Icon name="shield" className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold">Still private</p>
              </div>
              <p className="text-sm leading-5 text-slate-600">Encrypted data stays visible only to you and your partner.</p>
            </FloatingCard>

            <FloatingCard className="bottom-24 left-8 hidden w-60 md:block" delay={1.35}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Inspired 24 couples</p>
                  <p className="mt-1 text-xs text-slate-500">without likes or follows</p>
                </div>
                <Icon name="sparkles" className="h-5 w-5 text-violet-600" />
              </div>
            </FloatingCard>
          </motion.div>
        </section>

        <section id="how-it-works" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20 md:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
            <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-violet-700">Designed around attention</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
                Three simple ways to stay close.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Whispeer keeps each part clear: ideas you want to try, memories you want to keep, and inspiration you can borrow without social pressure.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 gap-2 md:mt-14 md:gap-5">
              <FeatureCard icon="heart" title="Whispers" text="Tiny things you want to do together. Quick to add and easy to finish." />
              <FeatureCard icon="images" title="Memories" text="A quiet timeline for moments worth keeping. Intentional and private-first." />
              <FeatureCard icon="telescope" title="Explore" text="Photo-only inspiration from public memories without social pressure." />
            </div>
          </motion.div>
        </section>

        <section id="memories" className="scroll-mt-28 px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
                <p className="mb-3 text-center text-sm font-semibold text-violet-700 md:text-left">Private by default</p>
                <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Public is a choice, not a setting.</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                  Memories start private. Private data is stored encrypted, and photos or videos are not visible to anyone outside the people who own or explicitly share them. When something goes public, Explore only gets the safe version.
                </p>

                <div className="mt-7 grid max-w-xl grid-cols-2 gap-2.5 md:gap-3">
                  {[
                    ["Encrypted storage", "Private data is protected at rest."],
                    ["No private notes", "Captions stay out of Explore."],
                    ["Per-memory sharing", "Only the memory you choose."],
                    ["Safe public preview", "Photo, tags, and the idea only."],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-slate-950/8 bg-white/60 p-3 shadow-sm backdrop-blur-xl md:p-4">
                      <div className="mb-1.5 flex items-center gap-2 md:mb-2">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-950 text-white md:h-6 md:w-6">
                          <Icon name="check" className="h-2.5 w-2.5 md:h-3 md:w-3" />
                        </span>
                        <p className="text-xs font-semibold text-slate-950 md:text-sm">{title}</p>
                      </div>
                      <p className="text-[11px] leading-4 text-slate-500 md:text-xs md:leading-5">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-[3rem] bg-[radial-gradient(circle_at_15%_10%,rgba(244,114,182,.22),transparent_34%),radial-gradient(circle_at_88%_0%,rgba(96,165,250,.20),transparent_38%)] blur-2xl" />
                <div className="relative overflow-hidden rounded-[2.35rem] border border-white/70 bg-white/55 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
                  <div className="relative overflow-hidden rounded-[1.9rem]">
                    <ScenicImage src={landingPhotos.memoryDetail} alt="Memory preview" className="h-[440px] w-full object-cover md:h-[500px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/8 to-transparent" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                      <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-slate-950 backdrop-blur-xl">Memory detail</span>
                      <span className="rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">Private</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/20 bg-white/18 p-4 text-white shadow-lg backdrop-blur-xl">
                      <p className="text-xs font-medium text-white/75">Little birthday, big feeling</p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight">The kind of memory that stays.</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">Make it public only when the safe version feels right.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="explore" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-16 md:px-8">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-8">
              <div className="relative z-10 min-w-0 md:order-2 md:pl-4">
                <p className="mb-3 text-center text-sm font-semibold text-violet-700 md:text-left">Explore without the noise</p>
                <h2 className="mx-auto max-w-lg text-center text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:mx-0 md:text-left md:text-5xl">
                  Ideas from real couples, without turning love into content.
                </h2>
                <p className="mx-auto mt-5 max-w-md text-center text-sm leading-7 text-slate-600 md:mx-0 md:text-left md:text-base md:leading-8">
                  A quiet, photo-first stream of public memories. No likes, no comments, no followers — just things you might want to try together.
                </p>
              </div>
              <div className="min-w-0 md:order-1 md:justify-self-start">
                <ExploreSlideshow />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="privacy" className="scroll-mt-28 px-5 py-20 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[3.25rem] p-8 text-white shadow-[0_40px_120px_rgba(15,23,42,0.25)] md:p-14"
          >
            <div className="absolute inset-0">
              <ScenicImage src={landingPhotos.ctaBackground} alt="Whispeer closing section" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.84),rgba(15,23,42,0.65),rgba(15,23,42,0.82))]" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
                <Icon name="sparkles" className="h-3.5 w-3.5" />
                Built for curiosity
              </div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Open it once. Start noticing more.</h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                A softer place for the moments you usually forget to write down — with private data kept encrypted and visible only to the people it belongs to.
              </p>
              <div id="waitlist" className="mt-8">
                <MagneticButton onClick={goToWhispers} className="bg-white text-slate-950 hover:bg-white/90">
                  Try now
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-10 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <BrandMark className="h-8 w-8 md:hidden" />
          <BrandWordmark className="h-7 w-auto" />
        </div>
        <div className="flex gap-5">
          <a href="#privacy" onClick={(event) => scrollToSection(event, "privacy")} className="hover:text-slate-950">Privacy</a>
          <a
            href="/explore"
            onClick={(event) => {
              event.preventDefault();
              goToExplore();
            }}
            className="hover:text-slate-950"
          >
            Explore
          </a>
          <a href="#overview" onClick={(event) => scrollToSection(event, "overview")} className="hover:text-slate-950">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
