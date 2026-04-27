import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const whispeerMark = "data:image/webp;base64,UklGRqQDAABXRUJQVlA4IJgDAADQEwCdASpgAEcAPpU8m0glo6KhLNQOqLASiWUAwnhIyifr3/t1kX+x/kWvBli/Xr9K/Uk4q6gB/Fv7z6HmgR6hQJsDh4bjkqVqrCGwPyszF4L0q+nG+ahgTKvPIneE1vs7auxC+W/ktsunKhDQjJr4LdjvDQzJJnZK59s3EMn2vFUawI8jNB4vMPWZ+janoPZhF7w4PC92gJJgQfKAqj5NV8frRLPqAAD+9drmROG/CJXgx++7UzaVj5mlLjpffy2Wc/3CvgzzLXH9M+a6KTzPYvEzmGlxFIutiz78SyDp3JlU8+D0cnGpr7D4aXafvuOQB+1Cji/ouNXhNMD0DR3bFzie4ocnPxm0tsEGuUZGkqNOp+tzgzZPmlrC7eH5zRF1jAF5i3C2ZrmP6hXk02DFSflzrl8Rk6qOIx6y6U1P3ER34Pbfz79jQ87SreW4CCXstv33PLonQbmNWEfsw68ABZlMqBqLlx6YIl+VN4R2nc7vEQ45JP57zZzA7Rp79oFR92jPevMg8ejCelN6WP7ReESymjwtDMhugnU32CapWsvstBFMZRvhCZr50B2spPdPWHN8tdUXH/8Qfhj9wqjpLxK6lhi/ojjOZWCgd9YOGEj7/C2Clbr31XPlC3BoQ8x18zfQa3CZdLGfgomRiZonUughbqS9+vLllvR25QhQTr3y0PU/1r8M5TppTP+HkLbtBlkuVenKiXORqmhFne/ddj0cUZSBMKiQNhXGA7g1yuX5Txioo9jKBgcC8lcJwtssAt3upEV5veyMFKv8nxe0o3TuRohP21Lqfw8s9LBWqfa/1+FyAJALGMcjAzsiSzKqRy3jv4nEpCncyVkvMMQ7pCZAlb/iAKl2zzY6DNM8zfaEUHyOBhq+0aDcm09TGoXI2sWCTnXuYAw0y3H8p3ICzbPEPnHzkz35yEQ13JuJJ1dqXp4DTj2SOyWHeAwX1YFBagTHkC/yhQ41Y5yOHq1x+JqcieTRQpM3JH1EsmY0S/uVDrh3yor76ySKwWkyJGNJ/MzkGN0GSHLaLsPTDdJoW7+Fd2oG0dEVlxXkZhbLX2zvM4kk8ILfg3IPy2J/0cv/m3T8EP2G59XMKjt943Xlx39Ip/mGb+Cl+QjHPTU3schbCvh7tC7bPeq3Z8XfvnZS6OIX3aRZ6bW+an9iimP+/Om2GAEfq2wtM3c1qswJEj+Z72j8uI5+QAGMiDzp8kRIYpHuBDYAAA==";
const whispeerLogo = "data:image/webp;base64,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";

const landingPhotos = {
  heroAmbient: "/mnt/data/aee65199-ac22-4403-bb71-09a8f928bb7b.png",
  memoryDetail: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_33_43 PM (8).png",
  ctaBackground: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_30_12 PM (6).png",
  extraCoffee: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_21_46 PM (1).png",
  explore: [
    {
      src: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_35_10 PM (9).png",
      label: "concert night",
      inspired: 24,
    },
    {
      src: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_31_55 PM (7).png",
      label: "rainy coffee",
      inspired: 18,
    },
    {
      src: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_27_58 PM (5).png",
      label: "cook together",
      inspired: 13,
    },
    {
      src: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_26_30 PM (4).png",
      label: "sunset picnic",
      inspired: 31,
    },
    {
      src: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_23_53 PM (3).png",
      label: "museum date",
      inspired: 16,
    },
    {
      src: "/mnt/data/ChatGPT Image Apr 26, 2026 at 11_21_47 PM (2).png",
      label: "beach walk",
      inspired: 27,
    },
  ],
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
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  x: ["M6 6l12 12", "M18 6L6 18"],
  plus: ["M12 5v14", "M5 12h14"],
  messageHeart: [
    "M4 5h16v11H8l-4 4V5z",
    "M14.8 8.7a2 2 0 00-2.8 0l-.5.5-.5-.5a2 2 0 00-2.8 2.8l3.3 3.2 3.3-3.2a2 2 0 000-2.8z",
  ],
  shield: ["M12 3l7 3v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3z", "M9 12l2 2 4-4"],
  wand: ["M15 4l5 5", "M14 10l-9 9", "M12 6l6 6", "M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"],
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

function PhoneMockup() {
  const memories = ["Coffee after rain", "Small rooftop plan", "Sunday playlist"];

  return (
    <motion.div
      className="relative mx-auto h-[620px] w-[310px] rounded-[3.2rem] border border-slate-950/10 bg-slate-950 p-3 shadow-[0_40px_120px_rgba(15,23,42,0.35)]"
      initial={{ opacity: 0, y: 28, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    >
      <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-950" />
      <div className="relative h-full overflow-hidden rounded-[2.55rem] bg-[#fbf7ef]">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,.45),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(96,165,250,.42),transparent_38%),radial-gradient(circle_at_50%_70%,rgba(168,85,247,.26),transparent_45%)]" />
        <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={whispeerMark} alt="Whispeer" className="h-8 w-8 object-contain" />
              <div>
                <p className="text-xs font-medium text-slate-500">Whispeer</p>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-950">For two</h3>
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/70 shadow-sm backdrop-blur-xl">
              <Icon name="sparkles" className="h-4 w-4 text-slate-950" />
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">Today’s whispers</p>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-white">
                <Icon name="plus" className="h-4 w-4" />
              </div>
            </div>
            {[
              ["Try a new dessert", "Tiny plan"],
              ["Take a 20 min walk", "Quiet ritual"],
              ["Send one old photo", "Memory seed"],
            ].map(([title, tag], index) => (
              <motion.div
                key={title}
                className="mb-3 rounded-2xl border border-slate-950/5 bg-white p-3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.13 }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100">
                    <Icon name="check" className="h-3.5 w-3.5 text-slate-700" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-950">{title}</p>
                    <p className="text-[11px] text-slate-500">{tag}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-[2rem] border border-white/70 bg-white/55 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">Timeline</p>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-medium text-white">Private</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory}
                  className="aspect-square rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.9),transparent_35%),linear-gradient(135deg,rgba(244,114,182,.55),rgba(96,165,250,.45),rgba(168,85,247,.45))] p-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.12 }}
                >
                  <p className="line-clamp-2 text-[10px] font-medium leading-tight text-slate-900/80">{memory}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto grid grid-cols-4 rounded-[1.65rem] border border-slate-950/5 bg-white/80 p-1 shadow-sm backdrop-blur-xl">
            {["Timeline", "Whispers", "Explore", "Account"].map((item) => (
              <div
                key={item}
                className={`rounded-[1.2rem] px-2 py-2 text-center text-[10px] font-medium ${
                  item === "Whispers" ? "bg-slate-950 text-white" : "text-slate-500"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-[1.8rem] border border-slate-950/10 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.065)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br from-pink-200 via-violet-200 to-blue-200 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-65" />
      <div className="relative">
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
          <Icon name={icon} className="h-4.5 w-4.5" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </motion.div>
  );
}

function PublicMemoryTile({ item, index }) {
  return (
    <motion.div
      className="group relative aspect-[4/5] w-[164px] shrink-0 overflow-hidden rounded-[1.55rem] shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:w-[190px]"
      whileHover={{ y: -5, scale: 1.015 }}
    >
      <img
        src={item.src}
        alt={item.label}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/8 to-transparent" />
      <div className="absolute inset-0 rounded-[1.55rem] ring-1 ring-inset ring-white/20" />
      <div className="relative z-10 flex h-full flex-col justify-between p-3.5">
        <span className="w-fit rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium text-slate-900 backdrop-blur-xl">
          Inspired {item.inspired}
        </span>
        <p className="text-sm font-semibold capitalize text-white drop-shadow-sm">{item.label}</p>
      </div>
    </motion.div>
  );
}

function ExploreSlideshow() {
  const slides = [...landingPhotos.explore, ...landingPhotos.explore];

  return (
    <div className="relative mt-10 rounded-[2.2rem] border border-white/70 bg-white/45 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-4">
      <div className="pointer-events-none absolute inset-y-3 left-3 z-10 w-20 rounded-l-[2rem] bg-gradient-to-r from-white/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-3 right-3 z-10 w-20 rounded-r-[2rem] bg-gradient-to-l from-white/85 to-transparent" />
      <div className="overflow-hidden rounded-[1.8rem] py-2">
        <motion.div
          className="flex w-max gap-3.5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {slides.map((item, index) => (
            <PublicMemoryTile key={`${item.label}-${index}`} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MagneticButton({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  return (
    <motion.button
      style={{ x: springX, y: springY }}
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
  console.assert(!requiredNavItems.includes("Whispers"), "Navbar should not repeat the Whispers name.");
  console.assert(requiredPublicLabels.length === 6, "Expected six public memory preview tiles.");
  console.assert(landingPhotos.explore.every((item) => item.src && item.label && item.inspired > 0), "Expected every Explore photo to have a src, label, and inspired count.");
  console.assert(Boolean(iconPaths.sparkles && iconPaths.lock && iconPaths.arrowRight), "Expected built-in SVG icons to exist.");
  console.assert(Boolean(whispeerMark && whispeerLogo), "Expected Whispeer brand images to exist.");
}

export default function WhispeerLandingPage() {
  runLandingPageSmokeTests();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
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

      if (current?.id) {
        setActiveSection((previous) => (previous === current.id ? previous : current.id));
      } else {
        setActiveSection("overview");
      }
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

    setActiveSection(id);
    setMenuOpen(false);
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
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/65 bg-white/65 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={whispeerMark}
              alt="Whispeer mark"
              className="h-9 w-9 object-contain md:hidden"
            />
            <img
              src={whispeerLogo}
              alt="Whispeer"
              className="hidden h-8 w-auto object-contain md:block"
            />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const selected = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => scrollToSection(event, item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                    selected
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:block">
            <a href="#waitlist" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Try Whispeer
            </a>
          </div>

          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <Icon name="x" className="h-4 w-4" /> : <Icon name="menu" className="h-4 w-4" />}
          </button>
        </nav>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-6xl rounded-[2rem] border border-white/65 bg-white/80 p-3 shadow-xl backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item) => {
              const selected = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => scrollToSection(event, item.id)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                    selected ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section id="overview" className="scroll-mt-28 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-[1.02fr_.98fr] md:px-8 md:pt-28">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center md:text-left">
            <motion.div variants={fadeUp} className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-slate-950/10 bg-white/65 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-xl md:mx-0">
              <img src={whispeerMark} alt="Whispeer" className="h-4 w-4 object-contain" />
              <span>Private by default. Shared only by choice.</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl md:text-7xl">
              A private world for two.
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 md:mx-0 md:text-lg">
              A calm, private place for the small things that make a relationship feel alive.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <MagneticButton>Try Whispeer</MagneticButton>
              <a href="#how-it-works" onClick={(event) => scrollToSection(event, "how-it-works")} className="inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl transition hover:bg-white">
                See how it works
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="relative min-h-[660px]" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute inset-x-4 top-10 hidden h-[540px] overflow-hidden rounded-[2.8rem] border border-white/50 shadow-[0_30px_120px_rgba(15,23,42,0.12)] md:block"
            >
              <img src={landingPhotos.heroAmbient} alt="Cozy couple moment" className="h-full w-full object-cover" />
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
              <img src={landingPhotos.extraCoffee} alt="Coffee together" className="mt-4 h-24 w-full rounded-2xl object-cover" />
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

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              <FeatureCard icon="heart" title="Whispers" text="Tiny things you want to do together. Quick to add, easy to finish, and built for real life." />
              <FeatureCard icon="images" title="Memories" text="A quiet timeline for the moments worth keeping. Intentional, visual, and private first." />
              <FeatureCard icon="telescope" title="Explore" text="Photo-only inspiration from public memories. No likes. No comments. No follower game." />
            </div>
          </motion.div>
        </section>

        <section id="memories" className="scroll-mt-28 px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/65 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-xl">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-950 text-white">
                  <Icon name="lock" className="h-3 w-3" />
                </span>
                Private by default
              </div>
              <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Public is a choice, not a setting.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                Memories start private. Private data is stored encrypted, and photos or videos are not visible to anyone outside the people who own or explicitly share them. When something goes public, Explore only gets the safe version.
              </p>

              <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
                {[
                  ["Encrypted storage", "Private data is protected at rest."],
                  ["No private notes", "Captions stay out of Explore."],
                  ["Per-memory sharing", "Only the memory you choose."],
                  ["Safe public preview", "Photo, tags, and the idea only."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-slate-950/8 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-950 text-white">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      <p className="text-sm font-semibold text-slate-950">{title}</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">{text}</p>
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
                  <img src={landingPhotos.memoryDetail} alt="Memory preview" className="h-[440px] w-full object-cover md:h-[500px]" />
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
        </section>

        <section id="explore" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-18 md:px-8">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/65 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-xl">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-950 text-white">
                  <Icon name="telescope" className="h-3 w-3" />
                </span>
                Explore without the noise
              </div>
              <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Ideas from real couples, without turning love into content.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                A quiet, photo-first stream of public memories. No likes, no comments, no followers — just things you might want to try together.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-white/65 px-3 py-2 shadow-sm backdrop-blur-xl">Photo-only grid</span>
                <span className="rounded-full bg-white/65 px-3 py-2 shadow-sm backdrop-blur-xl">Add as idea</span>
                <span className="rounded-full bg-white/65 px-3 py-2 shadow-sm backdrop-blur-xl">No social pressure</span>
              </div>
            </div>

            <ExploreSlideshow />
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
              <img src={landingPhotos.ctaBackground} alt="Whispeer closing section" className="h-full w-full object-cover" />
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
                <MagneticButton className="bg-white text-slate-950 hover:bg-white/90">Try Whispeer</MagneticButton>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-10 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img src={whispeerMark} alt="Whispeer mark" className="h-8 w-8 object-contain md:hidden" />
          <img src={whispeerLogo} alt="Whispeer" className="h-7 w-auto object-contain opacity-90" />
        </div>
        <div className="flex gap-5">
          <a href="#privacy" onClick={(event) => scrollToSection(event, "privacy")} className="hover:text-slate-950">Privacy</a>
          <a href="#explore" onClick={(event) => scrollToSection(event, "explore")} className="hover:text-slate-950">Explore</a>
          <a href="#overview" onClick={(event) => scrollToSection(event, "overview")} className="hover:text-slate-950">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
