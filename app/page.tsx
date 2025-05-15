"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import TabsContainer from "../components/TabsContainer";
import ThemeToggle from "../components/ThemeToggle";
import WorksContent from "../components/WorksContent";
import HandPointerIcon from "../components/HandPointerIcon";
import HandGrabIcon from "../components/HandGrabIcon";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// :: TYPE DEFINITIONS & CONSTANTS               ::
// ::::::::::::::::::::::::::::::::::::::::::::::::
type TabType = "about" | "works" | "contact";
const NAME = "Karrar Almayali.";

// Constants for hand icon positioning relative to the name during splash animation
const GRAB_OFFSET_X = 20;
const GRAB_OFFSET_Y = 50;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// :: MAIN HOME COMPONENT                        ::
// ::::::::::::::::::::::::::::::::::::::::::::::::
export default function Home() {
  // ::::::::::::::::::::::::::::::::::::::::::::::::
  // :: STATE MANAGEMENT                           ::
  // ::::::::::::::::::::::::::::::::::::::::::::::::

  // States for controlling the phases of the splash screen animation
  const [typingDone, setTypingDone] = useState(false);
  const [showHandPointer, setShowHandPointer] = useState(false);
  const [handIsGrabbing, setHandIsGrabbing] = useState(false);
  const [nameIsMoving, setNameIsMoving] = useState(false);
  const [movingDone, setMovingDone] = useState(false); // True when splash animation is complete
  const [displayedName, setDisplayedName] = useState(""); // For the typing effect
  const [showCursor, setShowCursor] = useState(true); // Typing cursor visibility

  // States for storing DOM element dimensions for animation calculations
  const [nameInitialRect, setNameInitialRect] = useState<DOMRect | null>(null);
  const [nameTargetRect, setNameTargetRect] = useState<DOMRect | null>(null);

  // State for the currently active tab in the main content
  const [activeTab, setActiveTab] = useState<TabType>("about");
  
  // State for the current theme (light/dark)
  // We use useEffect to set the actual theme after initial render to avoid hydration mismatch
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // ::::::::::::::::::::::::::::::::::::::::::::::::
  // :: REFS                                       ::
  // ::::::::::::::::::::::::::::::::::::::::::::::::

  // Refs for DOM elements involved in the splash animation
  const splashNameRef = useRef<HTMLDivElement>(null); // Ref for the animated name
  const nameGapRef = useRef<HTMLDivElement>(null);    // Ref for the static name placeholder

  // ::::::::::::::::::::::::::::::::::::::::::::::::
  // :: EFFECT HOOKS                               ::
  // ::::::::::::::::::::::::::::::::::::::::::::::::

  // Effect for initializing theme state to match what was set in the non-hydrating script
  useEffect(() => {
    // This runs after hydration is complete
    if (typeof window === 'undefined') return;
    
    // Simply check the class that was applied by our script in layout.tsx
    const isDarkMode = document.documentElement.classList.contains("dark");
    // Set the React state to match what's already applied in the DOM
    setTheme(isDarkMode ? 'dark' : 'light');
    
    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // Only change theme based on system if no localStorage preference
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? 'dark' : 'light');
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Splash Animation Phase 1: Typing out the name
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedName(NAME.slice(0, i + 1));
      i++;
      if (i === NAME.length) {
        clearInterval(interval);
        if (splashNameRef.current) {
          setNameInitialRect(splashNameRef.current.getBoundingClientRect());
        }
        setTimeout(() => {
          setShowCursor(false);
          setTypingDone(true);
        }, 400);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Splash Animation Phase 2: Show the hand pointer icon
  useEffect(() => {
    if (typingDone) {
      const pointerTimer = setTimeout(() => {
        setShowHandPointer(true);
      }, 200);
      return () => clearTimeout(pointerTimer);
    }
  }, [typingDone]);

  // Splash Animation Phase 3: Hand "grabs" the name
  useEffect(() => {
    if (showHandPointer && nameGapRef.current) {
      const grabTimer = setTimeout(() => {
        if (!nameTargetRect && nameGapRef.current) {
          setNameTargetRect(nameGapRef.current.getBoundingClientRect());
        }
        setShowHandPointer(false);
        setHandIsGrabbing(true);
      }, 800);
      return () => clearTimeout(grabTimer);
    }
  }, [showHandPointer, nameTargetRect]);

  // Splash Animation Phase 4: Name and hand move to their final position
  useEffect(() => {
    if (handIsGrabbing && nameTargetRect) {
      const moveTimer = setTimeout(() => {
        setNameIsMoving(true);
      }, 200);
      return () => clearTimeout(moveTimer);
    }
  }, [handIsGrabbing, nameTargetRect]);
  
  // Splash Animation Phase 5: Hand "lets go", then all splash elements fade out
  useEffect(() => {
    if (nameIsMoving) {
      const moveAnimationEndsTimer = setTimeout(() => {
        setHandIsGrabbing(false); 
        setShowHandPointer(true); 

        const finalFadeOutTimer = setTimeout(() => {
          setMovingDone(true); 
        }, 300); 

        return () => clearTimeout(finalFadeOutTimer);
      }, 1700); 

      return () => clearTimeout(moveAnimationEndsTimer);
    }
  }, [nameIsMoving]);

  // ::::::::::::::::::::::::::::::::::::::::::::::::
  // :: ANIMATION PROPS (FRAMER MOTION)            ::
  // ::::::::::::::::::::::::::::::::::::::::::::::::

  // Animation properties for the splash screen name
  const nameAnimationProps = {
    initial: { x: 0, y: 0, scale: 1, opacity: 1 },
    animate: nameIsMoving && nameTargetRect ? {
      x: nameTargetRect.left - (nameInitialRect?.left || 0) + 7, 
      y: nameTargetRect.top - (nameInitialRect?.top || 0) + 4, 
      scale: 1, 
      opacity: 1,
    } : { x: 0, y: 0, scale: 1, opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.55 } },
    transition: { duration: 1.7, ease: [0.42, 0, 0.58, 1.0] },
  };

  // Animation properties for the splash screen hand icon
  const handAnimationProps = {
    initial: nameInitialRect ? { 
      opacity: 0, 
      x: nameInitialRect.left + nameInitialRect.width / 2 - GRAB_OFFSET_X, 
      y: nameInitialRect.top + nameInitialRect.height / 2 - GRAB_OFFSET_Y, 
      scale: 1.1, 
      rotate: -15 
    } : { opacity: 0 },
    animate: nameInitialRect && nameTargetRect ? {
      opacity: (showHandPointer || handIsGrabbing) ? 1 : 0,
      x: nameIsMoving 
        ? nameTargetRect.left + nameTargetRect.width / 2 - GRAB_OFFSET_X
        : nameInitialRect.left + nameInitialRect.width / 2 - GRAB_OFFSET_X,
      y: nameIsMoving
        ? nameTargetRect.top + nameTargetRect.height / 2 - GRAB_OFFSET_Y
        : nameInitialRect.top + nameInitialRect.height / 2 - GRAB_OFFSET_Y,
      rotate: nameIsMoving ? 0 : -15,
      scale: handIsGrabbing ? 1.15 : 1.1, 
    } : { opacity: (showHandPointer || handIsGrabbing) ? 1 : 0 },
    exit: { opacity: 0, transition: { duration: 0.55 } },
    transition: { duration: 1.7, ease: [0.42, 0, 0.58, 1.0] },
  };

  // ::::::::::::::::::::::::::::::::::::::::::::::::
  // :: JSX STRUCTURE                              ::
  // ::::::::::::::::::::::::::::::::::::::::::::::::
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] overflow-hidden">
      {/* Main Page Layout: Two Columns with Fixed Widths */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Column: Name, Subtitle, Social Links, Tab Buttons, Footer - Fixed Position */}
        <div className="w-full md:w-[30%] md:min-w-[30%] md:max-w-[30%] flex flex-col justify-between p-8 md:p-12 pt-12 md:pt-24 md:fixed md:h-screen">
          <div>
            {/* Static Name Placeholder (Visible after splash animation) */}
            <div
              ref={nameGapRef}
              className="min-h-[70px] min-w-[300px] md:min-w-[350px] flex items-center mb-3"
            >
              {movingDone && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="koulen-regular text-5xl md:text-6xl tracking-wide text-left whitespace-nowrap"
                >
                  {NAME}
                </motion.h1>
              )}
            </div>
            {/* Subtitle / Professional Summary */}
            <h2 className="instrument-sans text-xl mb-6 text-left">
              Full Stack Software Engineer focused on developing{" "}
              <strong>user-centric</strong> and <strong>robust</strong>{" "}
              solutions that <em>exceed</em> expectations.
            </h2>
            {/* Social Media Links */}
            <div className="flex gap-3 mt-6 items-center">
              <a
                href="https://github.com/Karrar2k"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md bg-[var(--secondary-bg)] hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Image
                  src="/github-icon.svg"
                  alt="GitHub"
                  width={26}
                  height={26}
                  className={`${theme === "dark" ? "brightness-0 invert" : ""}`}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/karrar-almayali/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md bg-[var(--secondary-bg)] hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Image
                  src="/linkedin-icon.svg"
                  alt="LinkedIn"
                  width={26}
                  height={26}
                  className={`${theme === "dark" ? "brightness-0 invert" : ""}`}
                />
              </a>
            </div>
          </div>

          {/* Tab Buttons Group - Vertically centered on the right side of left column */}
          <div className="flex flex-col gap-4 self-end my-auto py-8">
            {(["about", "works", "contact"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`koulen-regular text-xl md:text-2xl tracking-wider text-left py-2.5 px-4 rounded-md transition-all duration-250 ease-in-out focus:outline-none
                  ${
                    activeTab === tab
                      ? "bg-[var(--accent-color)] text-white shadow-md scale-105"
                      : "text-[var(--text-color)] hover:bg-fuschia-200 hover:text-[var(--accent-color)] dark:hover:bg-transparent dark:hover:text-[var(--accent-color)]"
                  }
                  ${
                    activeTab !== tab &&
                    "border border-transparent hover:border-[var(--accent-color)] hover:bg-fuschia-200"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Footer Text */}
          <div className="instrument-sans text-sm text-left mt-auto pb-4">
            I built this using <strong>Next.js</strong> and{" "}
            <strong>Tailwind CSS</strong>
          </div>
        </div>

        {/* Invisible spacer div to offset content for the fixed left column */}
        <div className="hidden md:block w-[30%] min-w-[30%] shrink-0"></div>

        {/* Thin Vertical Divider Line - Fixed Position */}
        <div className="hidden md:block w-px bg-[var(--divider-color)] h-screen fixed left-[30%] top-0 z-10"></div>

        {/* Right Column: Content Area with Fixed Width - Scrollable */}
        <div className="w-full md:w-[70%] md:min-w-[70%] md:max-w-[70%] flex flex-col p-8 pt-6 md:pt-24 md:pl-12 overflow-y-auto">
          {/* Content Container */}
          <div className="h-full">
            {/* Tab Content Display Area */}
            <div className="w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {activeTab === "about" && (
                    <TabsContainer activeTab={activeTab} />
                  )}
                  {activeTab === "contact" && (
                    <TabsContainer activeTab={activeTab} />
                  )}
                  {activeTab === "works" && <WorksContent />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Splash Screen Elements: Background, Animated Name, Animated Hand */}
      {/* These are rendered on top of the main content until 'movingDone' is true */}
      <AnimatePresence>
        {!movingDone && (
          <motion.div
            key="splash-bg"
            className={`fixed z-[999] inset-0 flex items-center justify-center transition-colors duration-500 bg-[var(--bg-color)]`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, delay: 0 } }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!movingDone && (
          <>
            {/* Animated Name for Splash Screen */}
            <motion.div
              key="splash-name"
              ref={splashNameRef}
              className="koulen-regular text-5xl md:text-6xl tracking-wide whitespace-nowrap z-[1001] text-[var(--text-color)] absolute"
              style={{
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              {...nameAnimationProps}
            >
              {displayedName}
              {/* Typing Cursor for Splash Screen Name */}
              <span
                className={`inline-block align-baseline rounded-sm transition-opacity duration-100 ${
                  showCursor
                    ? "animate-blink w-[10px] ml-1"
                    : "opacity-0 w-[10px] ml-1"
                }`}
                style={{
                  height: 38,
                  verticalAlign: "baseline",
                  background: "var(--text-color)",
                }}
              />
            </motion.div>

            {/* Animated Hand Icon for Splash Screen */}
            {nameInitialRect && (
              <motion.div
                key="splash-hand"
                className="absolute z-[1002] w-20 h-20 pointer-events-none text-[var(--hand-color)]"
                {...handAnimationProps}
              >
                {/* Hand Pointer SVG */}
                <motion.div
                  className="absolute w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: showHandPointer && !handIsGrabbing ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <HandPointerIcon className="w-full h-full" />
                </motion.div>
                {/* Hand Grab SVG */}
                <motion.div
                  className="absolute w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: handIsGrabbing ? 1 : 0 }}
                  transition={{
                    duration: 0.2,
                    delay: handIsGrabbing ? 0.1 : 0,
                  }}
                >
                  <HandGrabIcon className="w-full h-full" />
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Theme Toggle Button (Visible after splash animation) */}
      {movingDone && typeof window !== "undefined" && (
        <ThemeToggle theme={theme} setTheme={setTheme} />
      )}
    </div>
  );
}