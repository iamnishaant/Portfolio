"use client";

import { AnimatePresence, motion } from "motion/react";
import { AppStateProvider, useApp } from "./AppState";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { BootLoader } from "@/components/layout/BootLoader";
import { Nav } from "@/components/layout/Nav";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Assistant } from "@/components/assistant/Assistant";
import { X } from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <BootLoader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <RecruiterBanner />
      <main>{children}</main>
      <Assistant />
      <CommandPalette />
    </AppStateProvider>
  );
}

function RecruiterBanner() {
  const { recruiterMode, setRecruiterMode } = useApp();
  return (
    <AnimatePresence>
      {recruiterMode && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed inset-x-0 top-[76px] z-[95] flex justify-center px-4"
        >
          <div className="flex items-center gap-3 rounded-full border border-blue/40 bg-blue/10 px-4 py-1.5 text-xs text-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Recruiter mode — showing the essentials only
            <button
              onClick={() => setRecruiterMode(false)}
              aria-label="Exit recruiter mode"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
