'use strict';

import { static as EStatic } from 'express';
import * as path from 'path';

const configExpress = (app) => {
    app
    .use('/dist/', EStatic(path.join(__dirname, '../../../dist/')))
    .use('/images', EStatic(path.join(__dirname, '../../../assests/images/')))
    .use('/fonts', EStatic(path.join(__dirname, '../../../assests/fonts/')))
}

export default configExpress;