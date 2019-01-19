'use strict';

const fs = require('fs');
const path = require('path');

const pg = require('promise-generator');
const json2csv = require('json2csv');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = skuSpider;

/**
 * [skuSpider description]
 * @param  {Array} siteConfig   站点配置，见./config/config.site.js
 * @return {Object}             Pomise
 */
function skuSpider(siteConfig) {
  const siteProcess = [];

  const fields = siteConfig.fields.map((item)=>{
    return {
      label: item.name,
      value: `skuInfo.${item.key}`,
      default: 'NULL'
    };
  });

  return puppeteer.launch()
    .then((browser) => {

      siteConfig.urls.forEach((url) => {
        siteProcess.push(() => {
          console.log(`> 开始获取 ${url} 的页面数据...`);
          return getSku(browser, url, siteConfig.site);
        });
      });

      return pg(siteProcess)
        .then((data) => {
          browser.close();

          return genCsvData(fields, data);
        })
        .catch((err) => {
          console.error(err);
        });
    });

}

/**
 * 获取详情页的URL列表
 * @param  {Object}   siteInfo  商品列表页配置
 * @return {Obejct}             Promise
 */
function getSku(browser, url, sites) {

  const siteInfo = sites.find((item) => {
    if (item.is(url)) {
      return item;
    }
  });

  if (!siteInfo) return Promise.resolve({
    siteInfo: {},
    skuLink: url,
    skuInfo: {}
  });

  return puppeteerHtml(browser, url, siteInfo)
    .then((data) => {
      let skuInfo = {};

      if (data) {
        const $ = cheerio.load(data);
        
        siteInfo.skuContentArr.forEach(( item ) => { 
          skuInfo[item.name] = item(url, $);
        });

        console.log(`>> 成功获取：${url}`);
      } else {
        skuInfo = {};
        console.error(`>> 获取 ${url} 商品数据失败！`);
      }

      return {
        siteInfo,
        skuLink: url,
        skuInfo: skuInfo
      };
    }).catch((data) => {
      console.error(`>> 解析 ${url} 页面中的商品数据失败: ${JSON.stringify(data)}`);

      return {
        siteInfo: siteInfo,
        skuLink: url,
        skuInfo: {}
      };
    });
}

/**
 * 获取文档的标准HTML
 * @param  {Object} browser puppeteer的browser对象
 * @param  {String} url     页面连接
 * @return {Object}         <Promise<HTML String>>
 */
function puppeteerHtml(browser, url, siteInfo) {
  let page;

  return browser.newPage()
    .then((data) => {
      page = data;

      // 设置完成请求的时机
      if (siteInfo.onDetailPageLoaded) siteInfo.onDetailPageLoaded(url, page);

      // 设置超时时间
      page.setDefaultNavigationTimeout(10000);

      // 设置页面请求可被截取
      return page.setRequestInterception(true);
    }).then(() => {
      page.on('request', interceptedRequest => {
        const urlObj = interceptedRequest.url();
        if (urlObj.endsWith('.png') || urlObj.endsWith('.jpg'))
          interceptedRequest.abort();
        else
          interceptedRequest.continue();
      });

      return page.goto(url);
    }).then(() => {
      return page.screenshot({path:'./test.png',  fullPage: true});
    }).then(() => {
      return page.content();
    }).then((data) => {
      return page.close()
        .then(() => {
          return data;
        });
    })
    .catch((err) => {
      console.log(err);
      return page.close();
    });
}

/**
 * 通过sku结构化数据生成CSV
 * @param  {Object} data 商品的结构化数据
 * @return 
 */
function genCsvData(fields, skuDataLists) {
  try {
    const content = json2csv({ data: skuDataLists, fields: fields });

    const now = new Date();
    const nowStr = `${now.getFullYear()}${now.getMonth()+1}${now.getMonth()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const fileName = path.resolve(`./${nowStr}-${skuDataLists.length}.csv`);

    saveCsv(fileName, content);

    console.log(`> 成功生成 ${fileName} ！`);

    return skuDataLists;
  } catch (err) {
    console.error(err);
    return;
  }
}

/**
 * 保存CSV文件
 * @param  {String} fileName 文件地址
 * @param  {String} content  文件内容
 * @return 
 */
function saveCsv(fileName, content) {
  // 防止excel打开乱码: https://github.com/f2e-journey/xueqianban/issues/34
  const msExcelBuffer = Buffer.concat([
    new Buffer('\xEF\xBB\xBF', 'binary'),
    new Buffer(content)
  ]);
  fs.writeFileSync(fileName, msExcelBuffer);
}