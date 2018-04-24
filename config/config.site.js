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
      'https://list.jd.com/list.html?cat=6233,6234,6243&page=1&sort=sort_totalsales15_desc&trans=1&JL=4_2_0#J_main'
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
        const limit = 1; // 商品限制
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
          detailLinks: ["https://item.jd.com/3754283.html","https://item.jd.com/4204590.html","https://item.jd.com/4204586.html","https://item.jd.com/2525364.html","https://item.jd.com/4294662.html","https://item.jd.com/2199790.html","https://item.jd.com/4204592.html","https://item.jd.com/2200397.html","https://item.jd.com/1804150.html","https://item.jd.com/2208978.html","https://item.jd.com/4204600.html","https://item.jd.com/4294648.html","https://item.jd.com/3018450.html","https://item.jd.com/552478.html","https://item.jd.com/4204596.html","https://item.jd.com/2909459.html","https://item.jd.com/1179294.html","https://item.jd.com/4204608.html","https://item.jd.com/1179275.html","https://item.jd.com/3809510.html","https://item.jd.com/3754279.html","https://item.jd.com/3018454.html","https://item.jd.com/496196.html","https://item.jd.com/3282426.html","https://item.jd.com/1188326.html","https://item.jd.com/1374005960.html","https://item.jd.com/2108936.html","https://item.jd.com/3754277.html","https://item.jd.com/1397749.html","https://item.jd.com/2200389.html","https://item.jd.com/1425106.html","https://item.jd.com/2856807.html","https://item.jd.com/4204578.html","https://item.jd.com/18646169190.html","https://item.jd.com/1205729.html","https://item.jd.com/3378951.html","https://item.jd.com/1698964996.html","https://item.jd.com/2060926.html","https://item.jd.com/2151317.html","https://item.jd.com/4135410.html","https://item.jd.com/1349673444.html","https://item.jd.com/1804093.html","https://item.jd.com/18646169191.html","https://item.jd.com/20698497857.html","https://item.jd.com/1379185.html","https://item.jd.com/1179306.html","https://item.jd.com/13328590211.html","https://item.jd.com/2850525.html","https://item.jd.com/3809653.html","https://item.jd.com/2312789.html","https://item.jd.com/554682.html","https://item.jd.com/4305842.html","https://item.jd.com/17926332698.html","https://item.jd.com/2525372.html","https://item.jd.com/25245856720.html","https://item.jd.com/4305848.html","https://item.jd.com/1629498.html","https://item.jd.com/4135434.html","https://item.jd.com/3378941.html","https://item.jd.com/1019006.html","https://item.jd.com/4322308.html","https://item.jd.com/1297105.html","https://item.jd.com/22549534999.html","https://item.jd.com/3476719.html","https://item.jd.com/1619823565.html","https://item.jd.com/960307.html","https://item.jd.com/3809536.html","https://item.jd.com/2370704.html","https://item.jd.com/24279339544.html","https://item.jd.com/157064.html","https://item.jd.com/3809534.html","https://item.jd.com/4322338.html","https://item.jd.com/16978784676.html","https://item.jd.com/3030344.html","https://item.jd.com/2966760.html","https://item.jd.com/22718098124.html","https://item.jd.com/3809655.html","https://item.jd.com/1708490.html","https://item.jd.com/18646169192.html","https://item.jd.com/687141.html","https://item.jd.com/3018516.html","https://item.jd.com/10160173860.html","https://item.jd.com/2825492.html","https://item.jd.com/1219137.html","https://item.jd.com/14708434830.html","https://item.jd.com/3030318.html","https://item.jd.com/16915606838.html","https://item.jd.com/2856837.html","https://item.jd.com/1045608.html","https://item.jd.com/2289487.html","https://item.jd.com/11044096255.html","https://item.jd.com/1056263447.html","https://item.jd.com/10116983953.html","https://item.jd.com/1030413879.html","https://item.jd.com/1219099.html","https://item.jd.com/12494880703.html","https://item.jd.com/10448514021.html","https://item.jd.com/10977212908.html","https://item.jd.com/11195635740.html","https://item.jd.com/11157008501.html","https://item.jd.com/3273479.html","https://item.jd.com/3030272.html","https://item.jd.com/19568411378.html","https://item.jd.com/10160173859.html","https://item.jd.com/1729895.html","https://item.jd.com/10684352484.html","https://item.jd.com/1309591.html","https://item.jd.com/1629455.html","https://item.jd.com/2856809.html","https://item.jd.com/960298.html","https://item.jd.com/509042.html","https://item.jd.com/742232.html","https://item.jd.com/25060820997.html","https://item.jd.com/10160173857.html","https://item.jd.com/16031496437.html","https://item.jd.com/15111890166.html","https://item.jd.com/24279339545.html","https://item.jd.com/19521219590.html","https://item.jd.com/3273493.html","https://item.jd.com/10353005926.html"]
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
          brand: {
            name: '品牌',
            get value() {
              return $('#parameter-brand').text().replace('品牌：', '').trim();
            }
          },
          price: {
            name: '商品价格',
            get value() {
              return $('.product-intro .p-price .price').text().trim();
            }
          },
          age: {
            get value() {
              let ageArr = $('#detail .parameter2').text().split('\n').filter(item => item.indexOf('适用年龄：') > -1) || [];
              return ageArr[0] ? ageArr[0].replace('适用年龄：', '').trim() : '无法获取';
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
              let weightArr = $('#detail .parameter2').text().split('\n').filter(item => item.indexOf('商品毛重：') > -1) || [];
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
          }
        }
      } catch (err) {
        return;
      }
    }
  // }, {
  // id: 'taobao',
  // name: '淘宝',
  // /**
  //  * 页面连接，可以是一个string, 也可以是function
  //  * @return {String|Array} 页面URL
  //  */
  // url: [
  //   'https://s.taobao.com/search?initiative_id=staobaoz_20180423&q=9%E5%B2%81+%E7%8E%A9%E5%85%B7&cps=yes&ppath=20017%3A67034847&sort=sale-desc'
  // ],

  // /**
  //  * 页面编码，null是指二进制编码
  //  */
  // encoding: {
  //   list: 'utf8'
  // },

  // /**
  //  * 通过sku列表页的url获取商品详情页URL的方法
  //  * @param   {String} url  当前页面URL
  //  * @param   {String} html 通过页面连接爬取到的页面html
  //  * @return {Array}      从html中解析到的sku详情页的链接
  //  */
  // getSkuLink: function(_url, html) {
  //   try {
  //     const limit = 50; // 商品限制

  //     const data = html.match(/g_page_config\ =\ (.+)\;\n/)[1];
  //     if (!data) return;
  //     const dataObj = JSON.parse(data.replace(/\\'/g, "'"));

  //     // 获取链接数据
  //     const itemList = dataObj.mods.itemlist.data.auctions;
  //     const detailLinks = itemList.map(item => url.resolve(_url, item.detail_url));

  //     return {
  //       url: _url,
  //       limit,
  //       // 淘宝无品类列表
  //       catesList: [],
  //       detailLinks: ["https://item.taobao.com/item.htm?id=559385670320&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=559385670320&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=550797609790&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=550797609790&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=544849544585&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=544849544585&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=45807580870&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=45807580870&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=561503482288&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=561503482288&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=536872647415&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=536872647415&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=561630464986&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=561630464986&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=560223689099&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=560223689099&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=554969251907&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=554969251907&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=542822223068&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=542822223068&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=539608148605&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=539608148605&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=562812216151&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=562812216151&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=564906680571&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=564906680571&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=39181810604&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=39181810604&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=565095970498&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=565095970498&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=544949052127&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=544949052127&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=565200375321&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=565200375321&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=562501078489&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=562501078489&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=547968442271&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=547968442271&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=553653851025&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=553653851025&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=538833211551&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=538833211551&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=565770621585&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=565770621585&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=41156590778&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=41156590778&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=544699941977&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=544699941977&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=561885970653&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=561885970653&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=534633113103&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=534633113103&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=520544240055&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=520544240055&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=564181569825&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=564181569825&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=543784604395&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=543784604395&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=554049363707&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=554049363707&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=520502050989&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=520502050989&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=545444721046&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=545444721046&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=546046973057&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=546046973057&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=565745470744&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=565745470744&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=561831531048&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=561831531048&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=564016172210&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=564016172210&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=565376867293&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=565376867293&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=562883976046&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=562883976046&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=533216434371&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=533216434371&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=562004399111&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=562004399111&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=553173512088&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=553173512088&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=564194877407&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=564194877407&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=536417751341&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=536417751341&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=563416162110&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=563416162110&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=559323720500&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=559323720500&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=548718657258&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=548718657258&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=563966248131&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=563966248131&ns=1&abbucket=6","https://item.taobao.com/item.htm?id=566191817905&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=566191817905&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=563632698550&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=563632698550&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=536524593184&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=536524593184&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=546920251577&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=546920251577&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=553673118822&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=553673118822&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=558014168342&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=558014168342&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=539863440421&ns=1&abbucket=6#detail","https://item.taobao.com/item.htm?id=539863440421&ns=1&abbucket=6#detail","https://detail.tmall.com/item.htm?id=35538220952&ns=1&abbucket=6","https://detail.tmall.com/item.htm?id=35538220952&ns=1&abbucket=6"]
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
  // /**
  //  * 详情页加载之后回调
  //  * @param  {[type]} page [description]
  //  * @return {[type]}      [description]
  //  */
  // onDetailPageLoaded: function(url, page) {
  //   if (url.indexOf('tmall') > -1) {
  //     return page.waitForSelector('#J_DetailMeta .tm-price');
  //   } else {
  //     return page.waitForSelector('#J_PromoPriceNum');
  //   }
  // },
  // /**
  //  * 通过sku详情页的链接爬取到文章主体
  //  * @param  {String} html            通过文sku详情页的链接爬取到文章的html
  //  * @param  {Object} skuCateDetail   品类信息
  //  * @return {Object}                 sku数据结构
  //  */
  // getSkuContent: function(_url, html, skuCateDetail) {
  //   const $ = cheerio.load(html);

  //   if (_url.indexOf('tmall') > -1) {
  //     try {
  //       const $attrs = $('#J_AttrUL')[0].children;

  //       return {
  //         sku_id: {
  //           name: 'SKU ID',
  //           value: _url.match(/id\=(\d+)\&/)[1]
  //         },
  //         sku_name: {
  //           name: '商品名称',
  //           get value() {
  //             return $('#J_DetailMeta h1').text().trim();
  //           }
  //         },
  //         brand: {
  //           name: '品牌',
  //           get value() {
  //             let arr = $attrs.filter(item => $(item).text().indexOf('品牌') > -1);
  //             return arr.length > -1 ? $(arr[0]).text().replace(/(.+)\:/, '').trim() : '无品牌信息';
  //           }
  //         },
  //         price: {
  //           name: '商品价格',
  //           get value() {
  //             return $('#J_DetailMeta .tm-price').text().trim();
  //           }
  //         },
  //         age: {
  //           get value() {
  //             let arr = $attrs.filter(item => $(item).text().indexOf('年龄') > -1);
  //             return arr.length > -1 ? $(arr[0]).text().replace(/(.+)\:/, '').trim() : '无年龄信息';
  //           }
  //         },
  //         sale: {
  //           name: '促销信息',
  //           get value() {
  //             // TODO: 暂不需要促销信息
  //             return '无促销信息'
  //           }
  //         },
  //         supplier: {
  //           name: '供应商',
  //           get value() {
  //             // TODO: 暂不需要供应商信息
  //             return '无供应商信息'
  //           }
  //         },
  //         size: {
  //           get value() {
  //             // TODO: 无法获取包装尺寸
  //             return '无包装尺寸信息'
  //           }
  //         },
  //         weight: {
  //           get value() {
  //             // TODO: 无法获取重量
  //             return '无重量信息'
  //           }
  //         },
  //         postage: {
  //           name: '运费',
  //           get value() {
  //             return $('.summary-stock .dcashDesc').text().trim();
  //           }
  //         },
  //         comments_num: {
  //           name: '评论数',
  //           get value() {
  //             return $('#J_DetailMeta .tm-ind-reviewCount .tm-count').text().trim();
  //           }
  //         },
  //         sales_num: {
  //           name: '销量',
  //           get value() {
  //             return $('#J_DetailMeta .tm-ind-sellCount .tm-count').text().trim();
  //           }
  //         }
  //       }
  //     } catch (err) {
  //       return;
  //     }
  //   } else {
  //     try {
  //       const $attrs = $('#attributes .attributes-list')[0].children;

  //       return {
  //         sku_id: {
  //           name: 'SKU ID',
  //           value: _url.match(/id\=(\d+)\&/)[1]
  //         },
  //         sku_name: {
  //           name: '商品名称',
  //           get value() {
  //             return $('.tb-property .tb-main-title').text().trim();
  //           }
  //         },
  //         brand: {
  //           name: '品牌',
  //           get value() {
  //             let arr = $attrs.filter(item => $(item).text().indexOf('品牌') > -1);
  //             return arr.length > -1 ? $(arr[0]).text().replace(/(.+)\:/, '').trim() : '无品牌信息';
  //           }
  //         },
  //         price: {
  //           name: '商品价格',
  //           get value() {
  //             return $('#J_PromoPriceNum').text().trim();
  //           }
  //         },
  //         age: {
  //           get value() {
  //             let arr = $attrs.filter(item => $(item).text().indexOf('年龄') > -1);
  //             return arr.length > -1 ? $(arr[0]).text().replace(/(.+)\:/, '').trim() : '无年龄信息';
  //           }
  //         },
  //         sale: {
  //           name: '促销信息',
  //           get value() {
  //             // TODO: 暂不需要促销信息
  //             return '无促销信息'
  //           }
  //         },
  //         supplier: {
  //           name: '供应商',
  //           get value() {
  //             // TODO: 暂不需要供应商信息
  //             return '无供应商信息'
  //           }
  //         },
  //         size: {
  //           get value() {
  //             // TODO: 无法获取包装尺寸
  //             return '无包装尺寸信息'
  //           }
  //         },
  //         weight: {
  //           get value() {
  //             // TODO: 无法获取重量
  //             return '无重量信息'
  //           }
  //         },
  //         postage: {
  //           name: '运费',
  //           get value() {
  //             return $('.summary-stock .dcashDesc').text().trim();
  //           }
  //         },
  //         comments_num: {
  //           name: '评论数',
  //           get value() {
  //             return $('#J_RateCounter').text().trim();
  //           }
  //         },
  //         sales_num: {
  //           name: '销量',
  //           get value() {
  //             return $('#J_SellCounter').text().trim();
  //           }
  //         }
  //       }
  //     } catch (err) {
  //       return;
  //     }
  //   }
  // }
}]