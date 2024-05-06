import React, { createContext, useContext, useEffect, useState } from 'react';
import { Authentication, MelodiAuthProviderProps, TokenType } from './MelodiAuthProvider.types';

const MelodiAuthContext = createContext<{
  status: string;
  value: Authentication | {};
} | null>(null);

const useMelodiAuthContext = () => {
  return useContext(MelodiAuthContext);
};

const MelodiAuthProvider = ({ children, apiKey }: MelodiAuthProviderProps) => {
  const [melodiAuth, setMelodiAuth] = useState({
    status: 'LOADING',
    value: {},
  });

  useEffect(() => {
    if (apiKey) {
      setMelodiAuth({
        status: 'LOADED',
        value: {
          apiKey,
          type: TokenType.API_KEY,
        },
      });
      return;
    }
    setMelodiAuth({ status: 'ERROR', value: {} });
  }, []);

  return <MelodiAuthContext.Provider value={melodiAuth}>{children}</MelodiAuthContext.Provider>;
};

export { MelodiAuthProvider, useMelodiAuthContext };
