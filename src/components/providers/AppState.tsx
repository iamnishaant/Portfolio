"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AppState {
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
  setRecruiterMode: (v: boolean) => void;

  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;

  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
  /** optional seed question when opening the assistant */
  assistantSeed: string | null;
  askAssistant: (q?: string) => void;

  booted: boolean;
  setBooted: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantSeed, setAssistantSeed] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);

  const toggleRecruiterMode = useCallback(() => setRecruiterMode((v) => !v), []);

  const askAssistant = useCallback((q?: string) => {
    setAssistantSeed(q ?? null);
    setAssistantOpen(true);
  }, []);

  // Global hotkeys: Cmd/Ctrl+K palette, "/" assistant focus, Esc closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (mod && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setAssistantOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Persist recruiter mode
  useEffect(() => {
    const saved = localStorage.getItem("recruiterMode");
    if (saved === "1") setRecruiterMode(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("recruiterMode", recruiterMode ? "1" : "0");
    document.documentElement.dataset.recruiter = recruiterMode ? "1" : "0";
  }, [recruiterMode]);

  const value = useMemo<AppState>(
    () => ({
      recruiterMode,
      toggleRecruiterMode,
      setRecruiterMode,
      paletteOpen,
      setPaletteOpen,
      assistantOpen,
      setAssistantOpen,
      assistantSeed,
      askAssistant,
      booted,
      setBooted,
    }),
    [recruiterMode, toggleRecruiterMode, paletteOpen, assistantOpen, assistantSeed, askAssistant, booted]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppStateProvider");
  return ctx;
}
