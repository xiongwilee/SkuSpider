'use strict';

const fs = require('fs');
const path = require('path');

const assert = require('assert');
const rp = require("request-promise");
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

  return promiseGenerator(siteProcess)
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

  return promiseGenerator(cateProcess)
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
          return puppeteerHtml(browser, url)
            .then((data) => {
              let skuInfo = siteInfo.getSkuContent(url, data, skuCateDetail)
              console.log(`>> 成功获取 ${skuInfo.sku_name.value} 商品数据！`)
              return {
                skuLink: url,
                skuInfo: skuInfo,
                cateInfo: skuCateDetail
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })

      return promiseGenerator(detailProcess)
        .catch((err) => {
          console.log(err)
        });
    })
    .then((data) => {
      browser.close();
      console.log(`> 成功获取 ${skuCateDetail.catesList.join('>')} 的前 ${skuCateDetail.limit} 个商品！`)
      return data;
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * 获取文档的标准HTML
 * @param  {Object} browser puppeteer的browser对象
 * @param  {String} url     页面连接
 * @return {Object}         <Promise<HTML String>>
 */
function puppeteerHtml(browser, url) {
  let page;
  return browser.newPage()
    .then((data) => {
      page = data;
      return page.setRequestInterceptionEnabled(true)
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
      console.log(err)
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
    label: '商品原价',
    value: 'skuInfo.price.value',
    default: 'NULL'
  }, {
    label: 'SPU评论数',
    value: 'skuInfo.comments_num.value',
    default: 'NULL'
  }, {
    label: '促销信息',
    value(row, field, data) {
      return row.skuInfo.sale.value.join("\n");
    },
    default: 'NULL'
  }, {
    label: '供应商',
    value: 'skuInfo.supplier.value',
    default: 'NULL'
  }, {
    label: '商品链接',
    value: 'skuLink',
    default: 'NULL'
  }, {
    label: '一级品类',
    value: 'cateInfo.catesList[0]',
    default: 'NULL'
  }, {
    label: '二级品类',
    value: 'cateInfo.catesList[1]',
    default: 'NULL'
  }, {
    label: '三级品类',
    value: 'cateInfo.catesList[2]',
    default: 'NULL'
  }, ];


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

/**
 * 多个promise顺序执行器
 * @param  {Array} arr  数组，每个元素均为function，每个function均返回Promise
 * @return {Object}     Pormise
 */
function promiseGenerator(arr) {
  const data = [];
  arr.push(null);

  return gen(arr)

  function gen(arr, next) {
    let flag = !!next;

    next = next || Promise.resolve();

    if (arr[0] === null) {
      return next.then((itemData) => {
        data.push(itemData)
        return data;
      })
    } else {
      next = next.then((itemData) => {
        flag && data.push(itemData);
        return arr[0](itemData);
      });

      return gen(arr.slice(1), next)
    }
  }
}