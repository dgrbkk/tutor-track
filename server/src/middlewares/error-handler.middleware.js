import {HttpError} from '../helpers/httpErrors.js';
import {validationResult} from 'express-validator';


// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (error, req, res, _next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return  res.status(400).json({ error: errors.errors.map(e => e.msg)});
  }

  if (error instanceof HttpError) {
    const { status, message } = error;
    console.log(error);
    return res.status(status).json({ error: message });
  }

  console.log(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

export const checkValidationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return  res.status(400).json({ error: errors.errors.map(e => e.msg)});
  } else {
    next();
  }
};