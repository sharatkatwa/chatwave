import env from "../config/envConfig.js";
export default {
  PORT: 3000,
  LOGGER_LEVEL: "info",
  NODE_ENV: "development",
};

export const app_config = () => {
  return {
    RefreshcookieOptions: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  };
};
