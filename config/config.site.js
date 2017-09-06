'use strict';

const url = require("url");
const gbk = require("gbk");
const cheerio = require("cheerio");

module.exports = [{
  id: 'jd',
  name: '京东',
  /**
   * 页面连接，可以是一个string, 也可以是function
   * @return {String|Array} 页面URL
   */
  url: [
    'https://list.jd.com/list.html?cat=9987,653,655&page=1&sort=sort_totalsales15_desc&trans=1',
    'https://list.jd.com/list.html?cat=670,671,672&page=1&sort=sort_totalsales15_desc&trans=1',
    /*'https://list.jd.com/list.html?cat=670,671,1105&page=1&sort=sort_totalsales15_desc&trans=1',
    'https://list.jd.com/list.html?cat=670,677,688&page=1&sort=sort_totalsales15_desc&trans=1',
    'https://list.jd.com/list.html?tid=51&page=1&sort=sort_totalsales15_desc&trans=1'*/
  ],

  /**
   * 页面编码，null是指二进制编码
   */
  encoding: {
    list: 'utf8'
  },

  /**
   * 通过sku列表页的url获取商品详情页URL的方法
   * @param   {String} url  当前页面URL
   * @param   {String} html 通过页面连接爬取到的页面html
   * @return {Array}      从html中解析到的sku详情页的链接
   */
  getSkuLink: function(_url, html) {
    try {

      const $ = cheerio.load(html);

      // 获取商品链接列表
      const limit = 10; // 商品限制
      const links = $('.j-sku-item .p-img a');
      const detailLinks = [];
      for (let i = 0; i < links.length; i++) {
        if (i === limit) break;

        let domLink = url.resolve(_url, $(links[i]).attr('href'));
        detailLinks.push(domLink);
      }

      // 获取品类列表
      const catesList = [$('.crumbs-nav .crumbs-link').text()],
        cates = $('.crumbs-nav .curr');
      for (let i = 0; i < cates.length; i++) {
        catesList.push($(cates[i]).text());
      }

      return {
        url: _url,
        limit,
        catesList,
        detailLinks
      }
    } catch (err) {
      return;
    }
  },

  /**
   * 通过sku详情页的链接爬取到文章主体
   * @param  {String} html            通过文sku详情页的链接爬取到文章的html
   * @param  {Object} skuCateDetail   品类信息
   * @return {Object}                 sku数据结构
   */
  getSkuContent: function(_url, html, skuCateDetail) {
    const $ = cheerio.load(html);
    try {
      return {
        sku_id: {
          name: 'SKU ID',
          value: _url.match(/jd\.com\/(.+)\.html/)[1]
        },
        sku_name: {
          name: '商品名称',
          get value() {
            return $('.product-intro .sku-name').text().trim();
          }
        },
        price: {
          name: '商品价格',
          get value() {
            return $('.product-intro .p-price .price').text().trim();
          }
        },
        sale: {
          name: '促销信息',
          get value() {
            let domList = $('.p-promotions div .hl_red'),
              list = [];
            for (let i = 0; i < domList.length; i++) {
              list.push($(domList[i]).text().trim());
            }

            return list;
          }
        },
        supplier: {
          name: '供应商',
          get value() {
            return $('.summary-service .hl_red').text().trim();
          }
        }
      }
    } catch (err) {
      return;
    }
  }
}]