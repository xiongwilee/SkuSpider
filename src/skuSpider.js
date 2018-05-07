'use strict';

const fs = require('fs');
const path = require('path');

const assert = require('assert');
const rp = require("request-promise");
const pg = require("promise-generator");
const json2csv = require('json2csv');
const puppeteer = require('puppeteer');

module.exports = skuSpider;

/**
 * [skuSpider description]
 * @param  {Array} siteConfig   站点配置，见./config/config.site.js
 * @return {Object}             Pomise
 */
function skuSpider(siteConfig) {
  const siteProcess = [];

  siteConfig.forEach((siteInfo) => {
    siteProcess.push(() => {
      console.log(`> 开始获取 ${siteInfo.name} 的配置数据...`)
      return getAllSkulist(siteInfo);
    })
  });

  return pg(siteProcess)
    .then((data) => {
      data.forEach((item) => {
        genCsvData(item.siteInfo, item.siteData);
      });
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * 获取详情页的URL列表
 * @param  {Object}   siteInfo  商品列表页配置
 * @return {Obejct}             Promise
 */
function getAllSkulist(siteInfo) {
  const promiseList = [];

  let urls = typeof siteInfo.url == 'function' ? siteInfo.url() : siteInfo.url;
  if (!Array.isArray(urls)) urls = new Array(urls);

  // 如果没有getSkuLink方法，则直接退出
  assert(siteInfo.getSkuLink, `${siteInfo.name}没有配置'getSkuLink'方法！`)

  let cateProcess = [];

  urls.forEach((url) => {
    cateProcess.push(() => {
      return rp({
          uri: url,
          method: 'get',
          encoding: siteInfo.encoding.list
        })
        .then((body) => {
          // 获取商品详情页链接
          return siteInfo.getSkuLink(url, body);
        })
        .then((data) => {
          // 通过商品详情页链接获取商品详情
          return getAllSkudetail(siteInfo, url, data);
        })
        .catch((err) => {
          console.error(err);
        })
    })
  })

  return pg(cateProcess)
    .then((data) => {
      return {
        siteInfo: siteInfo,
        siteData: data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * 获取商品详情页内容
 * @param  {Object} siteInfo    站点信息
 * @param  {String} skuListUrl  sku列表页URL
 * @param  {String} skuCateDetail 商品品类数据
 * @return {Object}             商品数据
 */
function getAllSkudetail(siteInfo, skuListUrl, skuCateDetail) {
  let browser;

  return puppeteer.launch({
      // TODO: 这里的timeout似乎没有效果
      // timeout: skuCateDetail.limit * 3000
      timeout: 200000
    })
    .then(data => {
      browser = data;

      const detailProcess = [];
      skuCateDetail.detailLinks.forEach((url) => {
        detailProcess.push(() => {
          return puppeteerHtml(browser, url, siteInfo)
            .then((data) => {
              let skuInfo = siteInfo.getSkuContent(url, data, skuCateDetail)
              console.log(`>> 成功获取 ${skuInfo.sku_name.value} 商品数据，链接：${url}`);
              return {
                skuLink: url,
                skuInfo: skuInfo,
                cateInfo: skuCateDetail
              }
            })
            .catch((err) => {
              console.error(err)
            })
        })
      })

      return pg(detailProcess)
        .catch((err) => {
          console.error(err)
        });
    })
    .then((data) => {
      browser.close();
      console.log(`> 成功获取 ${skuCateDetail.catesList.join('>')} 的前 ${skuCateDetail.limit} 个商品！`)
      return data;
    })
    .catch((err) => {
      console.error(err)
    })
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

      if (siteInfo.onDetailPageLoaded) {
        siteInfo.onDetailPageLoaded(url, page);
      }

      return page;
    })
    .then(() => {
      page.on('request', interceptedRequest => {
        if (interceptedRequest.url.endsWith('.png') ||
          interceptedRequest.url.endsWith('.jpg')) {
          interceptedRequest.abort();
        } else {
          interceptedRequest.continue();
        }
      });

      return page.goto(url);
    })
    .then(() => {
      return page.content();
    })
    .then((data) => {
      // page.close返回一个promise，暂时先注释
      // page.close();
      return data;
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * 通过sku结构化数据生成CSV
 * @param  {Object} data 商品的结构化数据
 * @return 
 */
function genCsvData(siteInfo, siteData) {
  let skuData;

  if (Array.isArray(siteData[0])) {
    skuData = [];
    siteData.forEach(item => { skuData = skuData.concat(item) });
  } else {
    skuData = siteData;
  }

  const fields = [{
    label: 'SKU ID',
    value: 'skuInfo.sku_id.value',
    default: 'NULL'
  }, {
    label: '商品名称',
    value: 'skuInfo.sku_name.value',
    default: 'NULL'
  }, {
    label: '京东价格',
    value: 'skuInfo.price.value',
    default: 'NULL'
  }, {
    label: '原价',
    value: 'skuInfo.price_origin.value',
    default: 'NULL'
  }, {
    label: '销量',
    value: 'skuInfo.sales_num.value',
    default: 'NULL'
  }, {
    label: 'ISBN书号',
    value: 'skuInfo.ISBN.value',
    default: 'NULL'
  }, {
    label: '包装',
    value: 'skuInfo.package_type.value',
    default: 'NULL'
  }, {
    label: '出版社',
    value: 'skuInfo.press.value',
    default: 'NULL'
  }, {
    label: '开本',
    value: 'skuInfo.format.value',
    default: 'NULL'
  }, {
    label: '用纸',
    value: 'skuInfo.paper_type.value',
    default: 'NULL'
  }, {
    label: '适用年龄',
    value: 'skuInfo.book_age.value',
    default: 'NULL'
  }, {
    label: '尺寸',
    value: 'skuInfo.size.value',
    default: 'NULL'
  }, {
    label: '商品链接',
    value: 'skuLink',
    default: 'NULL'
  }, {
    label: '供应商',
    value: 'skuInfo.supplier.value',
    default: 'NULL'
  }];


  try {
    let content = json2csv({ data: skuData, fields: fields });
    let fileName = path.resolve(`./${siteInfo.name.trim()}.${Date.now()}.csv`);

    saveCsv(fileName, content)

    console.log(`> 成功生成 ${fileName} ！`)
  } catch (err) {
    console.error(err);
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