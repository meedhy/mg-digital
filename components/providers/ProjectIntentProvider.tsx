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
  isLeadFlowOpen: boolean;
  updateIntent: (values: Partial<ProjectIntent>) => void;
  openLeadFlow: (values?: Partial<ProjectIntent>) => void;
  closeLeadFlow: () => void;
};

const ProjectIntentContext = createContext<ProjectIntentContextValue | null>(null);

export default function ProjectIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ProjectIntent>(emptyIntent);
  const [isLeadFlowOpen, setIsLeadFlowOpen] = useState(false);

  const value = useMemo<ProjectIntentContextValue>(
    () => ({
      intent,
      isLeadFlowOpen,
      updateIntent: (values) => setIntent((current) => ({ ...current, ...values })),
      openLeadFlow: (values = {}) => {
        setIntent((current) => ({ ...current, ...values }));
        setIsLeadFlowOpen(true);
      },
      closeLeadFlow: () => setIsLeadFlowOpen(false),
    }),
    [intent, isLeadFlowOpen]
  );

  return <ProjectIntentContext.Provider value={value}>{children}</ProjectIntentContext.Provider>;
}

export function useProjectIntent() {
  const context = useContext(ProjectIntentContext);
  if (!context) throw new Error("useProjectIntent must be used inside ProjectIntentProvider");
  return context;
}
