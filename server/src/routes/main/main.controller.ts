'use strict';

import * as path from 'path';

function MainController() {};

// returns index.html
MainController.prototype.getRoot = function(req, res, next) {
	res.sendFile(path.join(__dirname, '../../../../dist/index.html'));
};

export default MainController.prototype;