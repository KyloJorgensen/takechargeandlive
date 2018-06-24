'use strict';
import cookie from './utilities/cookie';

const appConfig = {};
appConfig.MAIN_NEWS_COUNT = 3;
appConfig.NEWS_LIST_COUNT = 10;
appConfig.FACEBOOK_APP_ID = cookie.get("facebook_app_id") || null;
appConfig.FACEBOOK_APP_VERSION = cookie.get("facebook_app_version") || null;
appConfig.FACEBOOK_PAGE_ID = cookie.get("facebook_page_id") || null;

export default appConfig;