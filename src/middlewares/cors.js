import cors from 'cors';

export const corsMiddleware = (app) => {
  return cors('*');
};
