import { createContext } from "react";
import { MelodiFeedbackContext as ContextType } from "./MelodiFeedbackContext.types";

export const MelodiFeedbackContext = createContext<ContextType>({
  accessToken: undefined,
});

export const MelodiFeedbackProvider = MelodiFeedbackContext.Provider;
