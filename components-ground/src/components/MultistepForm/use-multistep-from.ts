import { create } from "zustand";

type FromData = Record<string, any>

type Fields = "firstName" | "lastName" | "bio" | "gender" | "country" | "city";

type MultistepFromStore = {
  data: FromData;
  steps: Array<Array<Fields>>;
  stepIndex: number;
  next: () => void;
  prev: () => void;
  to: (newIndex: number) => void;
  updateData: (newData: FromData) => void;
};

export const useMultistepFrom = create<MultistepFromStore>((set) => ({
  data: {},
  steps: [
    ["firstName", "lastName"],
    ["bio", "gender"],
    ["country", "city"],
  ],
  stepIndex: 0,
  next: () =>
    set((prev) => {
      if (prev.stepIndex >= prev.steps.length - 1) {
        return { stepIndex: prev.stepIndex };
      }
      return { stepIndex: prev.stepIndex + 1 };
    }),
  prev: () =>
    set((prev) => {
      if (prev.stepIndex <= 0) {
        return { stepIndex: prev.stepIndex };
      }
      return { stepIndex: prev.stepIndex - 1 };
    }),
  to: (newIndex) => set({ stepIndex: newIndex }),
  updateData: (newData) => set({ data: newData }),
}));
