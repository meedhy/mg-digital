"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type ProjectIntent = {
  projectType: string;
  objective: string;
  budget: string;
  offer: string;
};

const emptyIntent: ProjectIntent = {
  projectType: "",
  objective: "",
  budget: "",
  offer: "",
};

type ProjectIntentContextValue = {
  intent: ProjectIntent;
  updateIntent: (values: Partial<ProjectIntent>) => void;
  openLeadFlow: (values?: Partial<ProjectIntent>) => void;
};

const ProjectIntentContext = createContext<ProjectIntentContextValue | null>(null);

function scrollToLeadFlow() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("contact")?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export default function ProjectIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ProjectIntent>(emptyIntent);

  const value = useMemo<ProjectIntentContextValue>(
    () => ({
      intent,
      updateIntent: (values) => setIntent((current) => ({ ...current, ...values })),
      openLeadFlow: (values = {}) => {
        setIntent((current) => ({ ...current, ...values }));
        window.requestAnimationFrame(scrollToLeadFlow);
      },
    }),
    [intent]
  );

  return <ProjectIntentContext.Provider value={value}>{children}</ProjectIntentContext.Provider>;
}

export function useProjectIntent() {
  const context = useContext(ProjectIntentContext);
  if (!context) throw new Error("useProjectIntent must be used inside ProjectIntentProvider");
  return context;
}
