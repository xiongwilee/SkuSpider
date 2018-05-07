'use strict';

const url = require("url");
const gbk = require("gbk");
const cheerio = require("cheerio");

module.exports = {
  urls: ['https://itemjd.com/11244689.html', 'https://item.jd.com/11956332.html', 'https://item.jd.com/11244689.html', 'https://item.jd.com/12135557.html'],
  site: [{
    name: '京东',

    /**
     * 页面编码，null是指二进制编码
     */
    encoding: {
      list: 'utf8'
    },

    is: function(url) {
      return url.indexOf('jd.com') > -1
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
          site: {
            name: '电商名称',
            value: '京东'
          },
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
          brand: {
            name: '品牌',
            get value() {
              return $('#parameter-brand').text().replace('品牌：', '').trim();
            }
          },
          price: {
            name: '京东价格',
            get value() {
              return $('#jd-price').text().trim();
            }
          },
          price_origin: {
            name: '商品原价',
            get value() {
              return $('#page_maprice').text().trim();
            }
          },
          age: {
            get value() {
              let ageArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('适用年龄：') > -1) || [];
              return ageArr[0] ? ageArr[0].replace('适用年龄：', '').trim() : '无法获取';
            }
          },
          book_age: {
            get value() {
              let arr = $('#name').text().match(/\[(.+)岁\]/) || [];
              return arr[1] || '无法获取'
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
          },
          size: {
            get value() {
              let sizeArr = $('.tab-con .Ptable-item dd') || [];
              return sizeArr.length > 0 ? $(sizeArr[sizeArr.length - 1]).text().trim() : '无法获取';
            }
          },
          weight: {
            get value() {
              let weightArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('商品毛重：') > -1) || [];
              return weightArr[0] ? weightArr[0].replace('商品毛重：', '').trim() : '无法获取';
            }
          },
          postage: {
            name: '运费',
            get value() {
              return $('.summary-stock .dcashDesc').text().trim();
            }
          },
          comments_num: {
            name: '评论数',
            get value() {
              return $('#comment-count .count').text().trim();
            }
          },
          sales_num: {
            name: '销量',
            get value() {
              return $('#comment-count .count').text().trim();
            }
          },
          ISBN: {
            name: 'ISBN号',
            get value() {
              let weightArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('ISBN：') > -1) || [];
              return weightArr[0] ? weightArr[0].replace('ISBN：', '').trim() : '无法获取';
            }
          },
          package_type: {
            name: '包装',
            get value() {
              let weightArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('包装：') > -1) || [];
              return weightArr[0] ? weightArr[0].replace('包装：', '').trim() : '无法获取';
            }
          },
          press: {
            name: '出版社',
            get value() {
              let weightArr = $('#parameter2').text().split('\n');
              let id;
              weightArr.filter((item, index) => {
                if (item.indexOf('出版社：') > -1) {
                  id = index + 1
                  return true;
                } else {
                  return false;
                }
              }) || [];

              return weightArr[id].trim() || '无法获取';
            }
          },
          format: {
            name: '开本',
            get value() {
              let weightArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('开本：') > -1) || [];
              return weightArr[0] ? weightArr[0].replace('开本：', '').trim() : '无法获取';
            }
          },
          paper_type: {
            name: '纸张类型',
            get value() {
              let weightArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('用纸：') > -1) || [];
              return weightArr[0] ? weightArr[0].replace('用纸：', '').trim() : '无法获取';
            }
          }
        }
      } catch (err) {
        return;
      }
    }
  }]
}