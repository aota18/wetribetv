import { errorHandler } from "./error-handler";
import { jwtMiddleware } from "./jwt-middleware";

const apiHandler = (handler) => {
  return async (req, res) => {
    const method = req.method.toLowerCase();

    // Check handler supports HTTP Method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // Global Middleware
      await jwtMiddleware(req, res);

      // Route handler
      await handler[method](req, res);
    } catch (err) {
      // Global error handler
      errorHandler(err, res);
    }
  };
};

export { apiHandler };
