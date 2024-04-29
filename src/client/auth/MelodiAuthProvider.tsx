import React, { createContext, useContext, useState, useEffect } from "react";

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
  // TODO revert to before shipping
  // return
  return "1234";
};

const MelodiAuthContext = createContext<{
  status: string;
  accessToken: string | null;
} | null>(null);

interface MelodiAuthProviderProps {
  children: any;
  clientId: string;
  clientSecret: string;
  username: string;
}

const useMelodiAuthContext = () => {
  return useContext(MelodiAuthContext);
};

const MelodiAuthProvider = ({
  children,
  clientId,
  clientSecret,
  username,
}: MelodiAuthProviderProps) => {
  const [melodiAccessToken, setMelodiAccessToken] = useState({
    status: "LOADING",
    accessToken: null,
  });

  useEffect(() => {
    (async (): Promise<void> => {
      const accessToken = await getAccessToken(
        clientId,
        clientSecret,
        username
      );
      if (accessToken) {
        setMelodiAccessToken({
          status: "LOADED",
          accessToken: accessToken,
        });
      } else {
        setMelodiAccessToken({ status: "ERROR", accessToken: null });
      }
    })();
  }, []);

  return (
    <MelodiAuthContext.Provider value={melodiAccessToken}>
      {children}
    </MelodiAuthContext.Provider>
  );
};

export { MelodiAuthProvider, useMelodiAuthContext };
