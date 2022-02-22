const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyA-tqG2z3-RjiD3MFFasztEGvCPRonX0OQ",
    FIREBASE_AUTH_DOMAIN: "wetribetv.firebaseapp.com",
    FIREBASE_PROJECT_ID: "wetribetv",
    FIREBASE_STORAGE_BUCKET: "wetribetv.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "300089780942",
    FIREBASE_APP_ID: "1:300089780942:web:27907c255cac0190b3be9f",
    FIREBASE_MEASUREMENT_ID: "G-ZQZKN610E4",
  },
  serverRuntimeConfig: {
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
};
