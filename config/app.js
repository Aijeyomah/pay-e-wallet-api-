import { json, urlencoded } from 'express';
import morgan from 'morgan';
import config from './env';
import authRoute from '../app/routes/auth';
import { genericErrors, constants } from '../app/utils';
import { errorResponse, successResponse } from '../app/utils/helpers';

const { notFoundApi } = genericErrors;
const { WELCOME } = constants;
const appConfig = (app) => {
  // integrate winston logger with morgan
  app.use(morgan('combined', { stream: logger.stream }));

  // It parses incoming requests with JSON payloads and is based on body-parser
  app.use(json());

  // It parses incoming requests with urlencoded payloads and is based on body-parser.
  app.use(urlencoded({ extended: true }));

  // add an entry route
  app.get('/', (req, res) => {
    successResponse(res, { message: WELCOME });
  });
  app.use('/api/v1', authRoute);

  // catches 404 errors and forwards them to error handlers
  app.use((req, res, next) => next(notFoundApi));

  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err));

  // server listens for connection
  const port = config.PORT || 4000;
  app.listen(port, () => {
    logger.info(`e-wallet running on port ${port}`);
  });
};

export default appConfig;
