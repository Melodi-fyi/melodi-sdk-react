import { createContext } from "react";
import { MelodiFeedbackContext as ContextType } from "./MelodiFeedbackContext.types";

export const MelodiFeedbackContext =
  createContext &&
  createContext<ContextType>({
    accessToken: undefined,
  });
