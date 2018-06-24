'use strict';

import logToFile from 'log-to-file';
import * as path from 'path';

export const log = (message):void => {
    logToFile(message, path.join(__dirname, '../../../logs/pencil4life.log'));
    console.log(message);
}

export const report = (message):void => {
    logToFile(message, path.join(__dirname, '../../../logs/report-violation.log'));
    console.log(message);
}

export default {
    log: log,
    report: report,
};