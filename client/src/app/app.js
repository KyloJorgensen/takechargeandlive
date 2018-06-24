'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import '../css/index.less';
import store from './store.js';
import App from './components/app.container.js';

var routes = (
    <Provider store={store}>
        <HashRouter>
        	<App />
        </HashRouter>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});