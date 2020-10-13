module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || "procurement-api",
    tokenOptions: {
      expiresIn: "10h",
      issuer: process.env.JWT_ISSUER || "procurement-api",
    },
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "procurement",
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "password",
  },
};
