import { format, transports } from 'winston';
import colors from 'colors';
import expressWinston from 'express-winston';

import DailyRotateFile = require('winston-daily-rotate-file');

export default () => expressWinston.logger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'HH:mm:ss',
          alias: 'time',
        }),
        format.errors({ stack: true }),
        format.colorize(),
        format.splat(),
        format.simple(),
        format.printf(
          (info) => `${info.timestamp} ${colors.green('http')}: ${info.message}`,
        ),
      ),
    }),
    new DailyRotateFile({
      level: 'debug',
      filename: 'logs/api/http-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: process.env.LOG_FILE_MAX_SIZE,
      maxFiles: process.env.LOG_MAX_FILES_NUMBER,
      format: format.combine(
        format.json(),
        format.errors({ stack: true }),
        format.timestamp(),
      ),
    }),
  ],
  expressFormat: true,
  colorize: true,
  requestWhitelist: ['url', 'headers', 'method', 'httpVersion', 'originalUrl', 'query', 'body'],
  bodyBlacklist: ['password'],
});
