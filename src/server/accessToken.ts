export async function getAccessToken(
  clientId: string,
  clientSecret: string,
  username: string
) {
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
}
