export const config = {
  bcrypt: {
    JSON_SECRET: (process.env.JWT_SECRET = "secret"),
  },
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  },
  cookie: {
    setCookie: {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    keyName: "Authorization",
  },
};
