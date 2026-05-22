import { create } from "zustand";

type UiState = {
  introComplete: boolean;
  commandOpen: boolean;
  resumeOpen: boolean;
  activeSkill: string;
  setIntroComplete: (value: boolean) => void;
  setCommandOpen: (value: boolean) => void;
  setResumeOpen: (value: boolean) => void;
  setActiveSkill: (value: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  introComplete: false,
  commandOpen: false,
  resumeOpen: false,
  activeSkill: "All",
  setIntroComplete: (introComplete) => set({ introComplete }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setResumeOpen: (resumeOpen) => set({ resumeOpen }),
  setActiveSkill: (activeSkill) => set({ activeSkill })
}));
