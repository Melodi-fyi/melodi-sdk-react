import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Authentication,
  MelodiAuthProviderProps,
} from "./MelodiAuthProvider.types";

const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  username: string
) => {
  try {
    const res = await fetch("https://app.melodi.fyi/api/external/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        username,
      }),
    });

    if (res.status === 200) {
      const { access_token } = await res.json();
      return access_token;
    }
    // TODO handle non-2xx response types
  } catch (error) {
    console.error("MelodiAuthProvider failed to fetch authentication", error);
  }

  return null;
};

const MelodiAuthContext = createContext<{
  status: string;
  value: Authentication | {};
} | null>(null);

const useMelodiAuthContext = () => {
  return useContext(MelodiAuthContext);
};

const MelodiAuthProvider = ({
  children,
  accessTokenInfo,
  apiKeyInfo,
}: MelodiAuthProviderProps) => {
  const [melodiAuth, setMelodiAuth] = useState({
    status: "LOADING",
    value: {},
  });

  useEffect(() => {
    if (apiKeyInfo) {
      setMelodiAuth({
        status: "LOADED",
        value: apiKeyInfo,
      });
      return;
    }
    if (accessTokenInfo) {
      const { clientId, clientSecret, username } = accessTokenInfo;
      (async (): Promise<void> => {
        const accessToken = await getAccessToken(
          clientId,
          clientSecret,
          username
        );
        if (accessToken) {
          setMelodiAuth({
            status: "LOADED",
            value: {
              type: "ACCESS_TOKEN",
              accessToken,
            },
          });
        }
      })();
      return;
    }
    setMelodiAuth({ status: "ERROR", value: {} });
  }, []);

  return (
    <MelodiAuthContext.Provider value={melodiAuth}>
      {children}
    </MelodiAuthContext.Provider>
  );
};

export { MelodiAuthProvider, useMelodiAuthContext };
