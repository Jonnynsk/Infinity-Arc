import jsCookie from "js-cookie";

export enum EnumTokens {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const getAccessToken = () => {
  const accessToken = jsCookie.get(EnumTokens.ACCESS_TOKEN);

  return accessToken ?? null;
};

export const saveToCookies = (accessToken: string) => {
  jsCookie.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: process.env.NEXT_PUBLIC_COOKIES_DOMAIN,
    sameSite: "strict",
    expires: 1,
  });
};

export const removeToken = () => {
  jsCookie.remove(EnumTokens.ACCESS_TOKEN);
};
