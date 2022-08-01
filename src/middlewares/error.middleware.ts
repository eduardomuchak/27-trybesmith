import { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  const { code, message, name } = err;

  if (name === 'ValidationError') {
    if (message.includes('must')) {
      return res.status(422).json({ message });
    }
    return res.status(400).json({ message: err.message });
  }
  if (name === 'UnauthorizedError') {
    return res.status(401).json({ message: err.message });
  }

  res.status(code || 500).json({ message });
};

export default errorHandlerMiddleware;