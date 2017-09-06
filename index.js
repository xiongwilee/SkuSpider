'use strict';

const siteConfig = require('./config/config.site');
const skuSpider = require('./src/skuSpider');

skuSpider(siteConfig);