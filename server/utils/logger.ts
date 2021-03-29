import colors from 'colors';
import path from 'path';
import { createLogger, format, transports } from 'winston';

require('winston-daily-rotate-file');

function getStackInfo(stack: Error['stack'], stackIndex: number) {
  const PROJECT_ROOT = path.join(__dirname, '..');
  const stacklist = stack?.split('\n').slice(1);

  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  if (stacklist) {
    const s = stacklist[stackIndex];
    const sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
      return {
        method: sp[1],
        relativePath: path.relative(PROJECT_ROOT, sp[2]),
        line: sp[3],
        pos: sp[4],
        file: path.basename(sp[2]),
        stack: stacklist.join('\n'),
      };
    }
  }

  return null;
}

const addPathFormat = format((log) => {
  let stack;
  let stackInfo;

  if (log.error) {
    stack = log.error.stack;
    stackInfo = getStackInfo(stack, 0);
  } else {
    stack = new Error().stack;
    stackInfo = getStackInfo(stack, 9);
  }
  log.path = stackInfo?.relativePath;
  log.line = stackInfo?.line;
  log.stack = stack;

  return log;
});

const consoleTransport = new transports.Console({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'HH:mm:ss',
    }),
    format.printf((info) => {
      const shortPath = info.path?.split('\\').slice(-2).join('\\');
      const filePath = shortPath ? `${shortPath}:${info.line}` : undefined;
      const shortData = info.shortData
        ? `: ${JSON.stringify(info.shortData, null, 4)}`
        : '';

      return `${info.timestamp} ${info.level}${filePath ? colors.grey(` [${filePath}]`) : ''}: ${info.message} ${shortData}`;
    }),
  ),
});

const fileInfoTransport = new transports.DailyRotateFile({
  level: 'info',
  filename: 'combined-%DATE%.log',
  dirname: 'logs/combined/',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: process.env.LOG_FILE_MAX_SIZE,
  maxFiles: process.env.LOG_MAX_FILES_NUMBER,
  format: format.combine(format.timestamp(), format.json()),
});

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    addPathFormat(),
  ),
  transports: [consoleTransport, fileInfoTransport],
  silent: process.env.NODE_ENV === 'test',
  exitOnError: false,
});

export default logger;
