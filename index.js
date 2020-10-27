import express from 'express';
import config, { appConfig } from './config';
import initLogger from './config/logger';


const app = express();

const winstonLogger = initLogger(config.NODE_ENV);
// sets logger as a global variable
global.logger = winstonLogger;

// app config
appConfig(app);
