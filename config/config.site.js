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
    'https://list.jd.com/list.html?cat=1713,3263,4761&page=1&stock=0&sort=sort_commentcount_desc&trans=1&JL=4_5_0#J_main'
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
        detailLinks: ["https://item.jd.com/10210762.html", "https://item.jd.com/10014284.html", "https://item.jd.com/10842664.html", "https://item.jd.com/10773705927.html", "https://item.jd.com/11660806.html", "https://item.jd.com/11660803.html", "https://item.jd.com/10034551.html", "https://item.jd.com/10703227.html", "https://item.jd.com/10223188608.html", "https://item.jd.com/11660799.html", "https://item.jd.com/11660807.html", "https://item.jd.com/10027626.html", "https://item.jd.com/10678319.html", "https://item.jd.com/10377828.html", "https://item.jd.com/11468033.html", "https://item.jd.com/11956994.html", "https://item.jd.com/11867663.html", "https://item.jd.com/11219386.html", "https://item.jd.com/11867780.html", "https://item.jd.com/11867792.html", "https://item.jd.com/10733241537.html", "https://item.jd.com/11445687.html", "https://item.jd.com/11565228.html", "https://item.jd.com/11353618.html", "https://item.jd.com/11660815.html", "https://item.jd.com/1752931218.html", "https://item.jd.com/11686906.html", "https://item.jd.com/11984183.html", "https://item.jd.com/10790110.html", "https://item.jd.com/10014290.html", "https://item.jd.com/11686910.html", "https://item.jd.com/10983981.html", "https://item.jd.com/1033484641.html", "https://item.jd.com/10543273.html", "https://item.jd.com/10451976757.html", "https://item.jd.com/10023376.html", "https://item.jd.com/12021218.html", "https://item.jd.com/11122173521.html", "https://item.jd.com/10439436.html", "https://item.jd.com/11630192.html", "https://item.jd.com/11911134.html", "https://item.jd.com/11094037.html", "https://item.jd.com/10301420.html", "https://item.jd.com/10189186621.html", "https://item.jd.com/10051409445.html", "https://item.jd.com/11920318.html", "https://item.jd.com/10943226.html", "https://item.jd.com/12066522.html", "https://item.jd.com/11182149.html", "https://item.jd.com/11197301.html", "https://item.jd.com/11350865.html", "https://item.jd.com/11670129.html", "https://item.jd.com/10155797530.html", "https://item.jd.com/11464246.html", "https://item.jd.com/12120878.html", "https://item.jd.com/11851402.html", "https://item.jd.com/11346545.html", "https://item.jd.com/11702006.html", "https://item.jd.com/11423164.html", "https://item.jd.com/11244684.html", "https://item.jd.com/11099279.html", "https://item.jd.com/11981656.html", "https://item.jd.com/11753709.html", "https://item.jd.com/1035116057.html", "https://item.jd.com/12107446.html", "https://item.jd.com/12174530.html", "https://item.jd.com/10012131.html", "https://item.jd.com/11328511.html", "https://item.jd.com/11403700.html", "https://item.jd.com/11645275.html", "https://item.jd.com/10196889.html", "https://item.jd.com/10193081.html", "https://item.jd.com/10637239.html", "https://item.jd.com/10044543.html", "https://item.jd.com/10020166.html", "https://item.jd.com/1459708075.html", "https://item.jd.com/10910024.html", "https://item.jd.com/11753736.html", "https://item.jd.com/10210766.html", "https://item.jd.com/1703747593.html", "https://item.jd.com/10882548.html", "https://item.jd.com/10374143.html", "https://item.jd.com/10538410.html", "https://item.jd.com/11968142.html", "https://item.jd.com/12012439.html", "https://item.jd.com/11215247.html", "https://item.jd.com/10833715479.html", "https://item.jd.com/11254901.html", "https://item.jd.com/11386903.html", "https://item.jd.com/10193083.html", "https://item.jd.com/11738914.html", "https://item.jd.com/10027588.html", "https://item.jd.com/11651365.html", "https://item.jd.com/11752738.html", "https://item.jd.com/11120351.html", "https://item.jd.com/11803348.html", "https://item.jd.com/11640679.html", "https://item.jd.com/11187753.html", "https://item.jd.com/11732497.html", "https://item.jd.com/11752755.html", "https://item.jd.com/11859939.html", "https://item.jd.com/11732899.html", "https://item.jd.com/11954665.html", "https://item.jd.com/10044545.html", "https://item.jd.com/10012180.html", "https://item.jd.com/10643782.html", "https://item.jd.com/10012132.html", "https://item.jd.com/11120338.html", "https://item.jd.com/1088646263.html", "https://item.jd.com/11058669.html", "https://item.jd.com/11797923.html", "https://item.jd.com/11346542.html", "https://item.jd.com/11453736.html", "https://item.jd.com/11447923.html", "https://item.jd.com/1642937428.html", "https://item.jd.com/11197290.html", "https://item.jd.com/10027655.html", "https://item.jd.com/11238669.html", "https://item.jd.com/11235189.html", "https://item.jd.com/10301443.html", "https://item.jd.com/10014270.html", "https://item.jd.com/12025399.html", "https://item.jd.com/11904465.html", "https://item.jd.com/11896036.html", "https://item.jd.com/11175561.html", "https://item.jd.com/11239425.html", "https://item.jd.com/12111444.html", "https://item.jd.com/1647006885.html", "https://item.jd.com/10014288.html", "https://item.jd.com/1612740386.html", "https://item.jd.com/11875165.html", "https://item.jd.com/12065314.html", "https://item.jd.com/11371328.html", "https://item.jd.com/10915292.html", "https://item.jd.com/12178616.html", "https://item.jd.com/11753729.html", "https://item.jd.com/10014280.html", "https://item.jd.com/10014295.html", "https://item.jd.com/11892916.html", "https://item.jd.com/10571183.html", "https://item.jd.com/10090033210.html", "https://item.jd.com/10204386.html", "https://item.jd.com/10014298.html", "https://item.jd.com/10027627.html", "https://item.jd.com/10941747.html", "https://item.jd.com/11929051.html", "https://item.jd.com/11548155.html", "https://item.jd.com/11304545.html", "https://item.jd.com/10027680.html", "https://item.jd.com/11371324.html", "https://item.jd.com/11855237.html", "https://item.jd.com/11801153.html", "https://item.jd.com/11559612.html", "https://item.jd.com/10991809.html", "https://item.jd.com/11735941.html", "https://item.jd.com/11434820.html", "https://item.jd.com/10787563432.html", "https://item.jd.com/10029228.html", "https://item.jd.com/10014364.html", "https://item.jd.com/11687328555.html", "https://item.jd.com/11240674.html", "https://item.jd.com/10023337.html", "https://item.jd.com/11657562.html", "https://item.jd.com/10995637.html", "https://item.jd.com/10027656.html", "https://item.jd.com/10378990.html", "https://item.jd.com/10257955996.html", "https://item.jd.com/11364997.html", "https://item.jd.com/10694099233.html", "https://item.jd.com/11008591.html", "https://item.jd.com/11807242.html", "https://item.jd.com/11774707.html", "https://item.jd.com/11842922.html", "https://item.jd.com/10941829.html", "https://item.jd.com/10695864.html", "https://item.jd.com/11239256.html", "https://item.jd.com/11244682.html", "https://item.jd.com/11364994.html", "https://item.jd.com/10952088.html", "https://item.jd.com/1408512494.html"]
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