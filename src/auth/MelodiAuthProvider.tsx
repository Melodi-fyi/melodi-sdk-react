import React, { createContext, useContext } from 'react';
import { MelodiAuthProviderProps } from './MelodiAuthProvider.types';

const MelodiAuthContext = createContext<{
  apiKey?: string;
} | null>(null);

const useMelodiAuthContext = () => {
  return useContext(MelodiAuthContext);
};

const MelodiAuthProvider = ({ children, apiKey }: MelodiAuthProviderProps) => {
  return <MelodiAuthContext.Provider value={{ apiKey }}>{children}</MelodiAuthContext.Provider>;
};

export { MelodiAuthProvider, useMelodiAuthContext };
