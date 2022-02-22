const exrpessJwt = require("express-jwt");
const util = require("util");
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const jwtMiddleware = (req, res) => {
  const middleware = exrpessJwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/register",
      "/api/users/authenticate",
    ],
  });

  return util.promisify(middleware)(req, res);
};

export { jwtMiddleware };
