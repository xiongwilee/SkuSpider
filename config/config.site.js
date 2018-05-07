'use strict';

const url = require("url");
const gbk = require("gbk");
const cheerio = require("cheerio");

module.exports = {
  urls: ["http://item.jd.com/11244689.html","http://item.jd.com/12053830.html","http://item.jd.com/12135557.html","http://item.jd.com/12216352.html","http://item.jd.com/12045155.html","http://item.jd.com/11480060.html","http://item.jd.com/11781267.html","http://item.jd.com/11791268.html","http://item.jd.com/11791269.html","http://item.jd.com/11791270.html","http://item.jd.com/11791271.html","http://item.jd.com/12235286.html","http://item.jd.com/11956332.html","http://item.jd.com/12107389.html","http://item.jd.com/18781390785.html","http://item.jd.com/12059802.html","http://item.jd.com/12901978358.html","http://item.jd.com/12125760.html","http://item.jd.com/11305750.html","http://item.jd.com/12084797.html","http://item.jd.com/11479230.html","http://item.jd.com/12027147.html","http://item.jd.com/12261545.html","http://item.jd.com/12216015.html","http://item.jd.com/11457009.html","http://item.jd.com/12292691.html","http://item.jd.com/12172152.html","http://item.jd.com/12102207.html","http://item.jd.com/11799069.html","http://item.jd.com/12276979.html","http://item.jd.com/12158377257.html","http://item.jd.com/12321659.html","http://item.jd.com/26850647465.html","http://item.jd.com/11240674.html","http://item.jd.com/11917281.html","http://item.jd.com/12245762.html","http://item.jd.com/11938782.html","http://item.jd.com/11289555.html","http://item.jd.com/10014289.html","http://item.jd.com/11239611.html","http://item.jd.com/11284646.html","http://item.jd.com/10014296.html","http://item.jd.com/11224863.html","http://item.jd.com/11326128.html","http://item.jd.com/11753735.html","http://item.jd.com/10014287.html","http://item.jd.com/11644277.html","http://item.jd.com/11644278.html","http://item.jd.com/11644279.html","http://item.jd.com/11644280.html","http://item.jd.com/11644281.html","http://item.jd.com/11479227.html","http://item.jd.com/11916100.html","http://item.jd.com/10703227.html","http://item.jd.com/11235188.html","http://item.jd.com/11749223.html","http://item.jd.com/11474385.html","http://item.jd.com/11342015.html","http://item.jd.com/11486394.html","http://item.jd.com/10014268.html","http://item.jd.com/11479232.html","http://item.jd.com/10014253.html","http://item.jd.com/11396712.html","http://item.jd.com/10022712.html","http://item.jd.com/10374144.html","http://item.jd.com/12170946.html","http://item.jd.com/10985565.html","http://item.jd.com/10014264.html","http://item.jd.com/10027629.html","http://item.jd.com/11997043.html","http://item.jd.com/11563104.html","http://item.jd.com/10014256.html","http://item.jd.com/10372516.html","http://item.jd.com/11253510.html","http://item.jd.com/11432463.html","http://item.jd.com/11523666.html","http://item.jd.com/11254899.html","http://item.jd.com/11432459.html","http://item.jd.com/11501878.html","http://item.jd.com/11501879.html","http://item.jd.com/11501880.html","http://item.jd.com/11501881.html","http://item.jd.com/11501882.html","http://item.jd.com/11501883.html","http://item.jd.com/11501884.html","http://item.jd.com/11501885.html","http://item.jd.com/11501886.html","http://item.jd.com/11501887.html","http://item.jd.com/11501888.html","http://item.jd.com/11501889.html","http://item.jd.com/11501890.html","http://item.jd.com/11501891.html","http://item.jd.com/11501892.html","http://item.jd.com/11715400.html","http://item.jd.com/10385129.html","http://item.jd.com/11746483.html","http://item.jd.com/11921799.html","http://item.jd.com/11911134.html","http://item.jd.com/11825618.html","http://item.jd.com/10014335.html","http://item.jd.com/12075678.html","http://item.jd.com/11326132.html","http://item.jd.com/11604887.html","http://item.jd.com/12014563.html","http://item.jd.com/10378451.html","http://item.jd.com/12013608.html","http://item.jd.com/10110496.html","http://item.jd.com/11753713.html","http://item.jd.com/10370145.html","http://item.jd.com/10029131.html","http://item.jd.com/11434821.html","http://item.jd.com/10028852.html","http://item.jd.com/11306510.html","http://item.jd.com/12076582.html","http://item.jd.com/12050120.html","http://item.jd.com/11236827.html","http://item.jd.com/10014239.html","http://item.jd.com/11477876.html","http://item.jd.com/11225719.html","http://item.jd.com/11239253.html","http://item.jd.com/12031320.html","http://item.jd.com/10014269.html","http://item.jd.com/10027578.html","http://item.jd.com/11434820.html","http://item.jd.com/11534558.html","http://item.jd.com/10438078.html","http://item.jd.com/11363999.html","http://item.jd.com/11181173.html","http://item.jd.com/11254372.html","http://item.jd.com/11255371.html","http://item.jd.com/12184738.html","http://item.jd.com/10678321.html","http://item.jd.com/11364010.html","http://item.jd.com/10014283.html","http://item.jd.com/11104560.html","http://item.jd.com/11131636.html","http://item.jd.com/12195924.html","http://item.jd.com/10014284.html","http://item.jd.com/12191221.html","http://item.jd.com/11786997.html","http://item.jd.com/10208833.html","http://item.jd.com/12083467.html","http://item.jd.com/11453736.html","http://item.jd.com/11241558.html","http://item.jd.com/10945623.html","http://item.jd.com/12070441.html","http://item.jd.com/10110498.html","http://item.jd.com/11241556.html","http://item.jd.com/10908569.html","http://item.jd.com/11445687.html","http://item.jd.com/11235189.html","http://item.jd.com/10014266.html","http://item.jd.com/11301868.html","http://item.jd.com/11997401.html","http://item.jd.com/12318789.html","http://item.jd.com/10945624.html","http://item.jd.com/11540409.html","http://item.jd.com/12329064.html","http://item.jd.com/11257782.html","http://item.jd.com/10027580.html","http://item.jd.com/11432135.html","http://item.jd.com/11847891.html","http://item.jd.com/11326134.html","http://item.jd.com/10210766.html","http://item.jd.com/11239256.html","http://item.jd.com/11788186.html","http://item.jd.com/11421331.html","http://item.jd.com/10991809.html","http://item.jd.com/12041313.html","http://item.jd.com/11236865.html","http://item.jd.com/10915292.html","http://item.jd.com/11906789.html","http://item.jd.com/11058669.html","http://item.jd.com/11350865.html","http://item.jd.com/10839859.html","http://item.jd.com/11800055.html","http://item.jd.com/11748387.html","http://item.jd.com/11757958.html","http://item.jd.com/26355257852.html","http://item.jd.com/12221110.html","http://item.jd.com/11242172.html","http://item.jd.com/12733013783.html","http://item.jd.com/11009988992.html","http://item.jd.com/10799128.html","http://item.jd.com/11474383.html","http://item.jd.com/11477628.html","http://item.jd.com/12327282.html","http://item.jd.com/12305889.html","http://item.jd.com/12279603.html","http://item.jd.com/12129458.html","http://item.jd.com/11994958.html","http://item.jd.com/12316592.html","http://item.jd.com/19095656268.html","http://item.jd.com/11977252.html","http://item.jd.com/15015943143.html","http://item.jd.com/12259482.html","http://item.jd.com/12292995.html","http://item.jd.com/11909374.html","http://item.jd.com/12308178.html","http://item.jd.com/1029093179.html","http://item.jd.com/1060039741.html","http://item.jd.com/11241557.html","http://item.jd.com/11689181.html","http://item.jd.com/11058110.html","http://item.jd.com/10027614.html","http://item.jd.com/26830697635.html","http://item.jd.com/12308254.html","http://item.jd.com/12184860.html","http://item.jd.com/1392008726.html","http://item.jd.com/10378449.html","http://item.jd.com/1798196635.html","http://item.jd.com/10564347.html","http://item.jd.com/10027653.html","http://item.jd.com/11874660.html","http://item.jd.com/12259484.html","http://item.jd.com/11849182.html","http://item.jd.com/12210264.html","http://item.jd.com/12129462.html","http://item.jd.com/11928689.html","http://item.jd.com/11655658.html","http://item.jd.com/12057064.html","http://item.jd.com/23556684537.html","http://item.jd.com/10023082.html","http://item.jd.com/12195404.html","http://item.jd.com/12199505.html","http://item.jd.com/12288085.html","http://item.jd.com/12229864.html","http://item.jd.com/12064771.html","http://item.jd.com/11937064.html","http://item.jd.com/12270388.html","http://item.jd.com/11613408.html","http://item.jd.com/12180278.html","http://item.jd.com/11684674.html","http://item.jd.com/11525465.html","http://item.jd.com/12250610.html","http://item.jd.com/12191265.html","http://item.jd.com/12305853.html","http://item.jd.com/12162112.html","http://item.jd.com/11648002.html","http://item.jd.com/10014262.html","http://item.jd.com/11479224.html","http://item.jd.com/12108957.html","http://item.jd.com/11469843.html","http://item.jd.com/11492513722.html","http://item.jd.com/11444425.html","http://item.jd.com/10203857.html","http://item.jd.com/11552022.html","http://item.jd.com/11445695.html","http://item.jd.com/11640841.html","http://item.jd.com/11143518.html","http://item.jd.com/17913953119.html","http://item.jd.com/11338766.html","http://item.jd.com/11396538.html","http://item.jd.com/12307435.html","http://item.jd.com/11596321.html","http://item.jd.com/12322600.html","http://item.jd.com/12335718.html"],
  // urls: ["http://product.dangdang.com/24030562.html","http://product.dangdang.com/21005473.html","http://product.dangdang.com/23444350.html","http://product.dangdang.com/23808035.html","http://product.dangdang.com/23356805.html","http://product.dangdang.com/23523508.html","http://product.dangdang.com/23851466.html","http://product.dangdang.com/23487613.html","http://product.dangdang.com/23946811.html","http://product.dangdang.com/23323691.html","http://product.dangdang.com/23422457.html","http://product.dangdang.com/20812025.html","http://product.dangdang.com/23812473.html","http://product.dangdang.com/23521768.html","http://product.dangdang.com/20948886.html","http://product.dangdang.com/24033539.html","http://product.dangdang.com/24104216.html","http://product.dangdang.com/23219914.html","http://product.dangdang.com/23257828.html","http://product.dangdang.com/9101748.html","http://product.dangdang.com/21057878.html","http://product.dangdang.com/23967348.html","http://product.dangdang.com/23248697.html","http://product.dangdang.com/22791395.html","http://product.dangdang.com/20039611.html","http://product.dangdang.com/23701036.html","http://product.dangdang.com/23466258.html","http://product.dangdang.com/9319968.html","http://product.dangdang.com/23748591.html","http://product.dangdang.com/23967003.html","http://product.dangdang.com/21112439.html","http://product.dangdang.com/22603409.html","http://product.dangdang.com/22807661.html","http://product.dangdang.com/23567110.html","http://product.dangdang.com/20633051.html","http://product.dangdang.com/23254613.html","http://product.dangdang.com/23806266.html","http://product.dangdang.com/23417701.html","http://product.dangdang.com/23963837.html","http://product.dangdang.com/23483032.html","http://product.dangdang.com/23381766.html","http://product.dangdang.com/21127254.html","http://product.dangdang.com/23302450.html","http://product.dangdang.com/23555428.html","http://product.dangdang.com/23700376.html","http://product.dangdang.com/23947171.html","http://product.dangdang.com/23448875.html","http://product.dangdang.com/22608209.html","http://product.dangdang.com/20910676.html","http://product.dangdang.com/23957473.html","http://product.dangdang.com/23478852.html","http://product.dangdang.com/20606480.html","http://product.dangdang.com/23908638.html","http://product.dangdang.com/23217273.html","http://product.dangdang.com/23170830.html","http://product.dangdang.com/24079906.html","http://product.dangdang.com/23288236.html","http://product.dangdang.com/23629505.html","http://product.dangdang.com/23636868.html","http://product.dangdang.com/22732944.html","http://product.dangdang.com/23177807.html","http://product.dangdang.com/24197303.html","http://product.dangdang.com/21000723.html","http://product.dangdang.com/23470966.html","http://product.dangdang.com/20927266.html","http://product.dangdang.com/20530151.html","http://product.dangdang.com/23463222.html","http://product.dangdang.com/24145119.html","http://product.dangdang.com/24102036.html","http://product.dangdang.com/25069494.html","http://product.dangdang.com/25069493.html","http://product.dangdang.com/25125417.html","http://product.dangdang.com/23723826.html","http://product.dangdang.com/23427130.html","http://product.dangdang.com/23831399.html","http://product.dangdang.com/23337896.html","http://product.dangdang.com/24240099.html","http://product.dangdang.com/23946177.html","http://product.dangdang.com/25119226.html","http://product.dangdang.com/22914275.html","http://product.dangdang.com/23546343.html","http://product.dangdang.com/25165048.html","http://product.dangdang.com/23174548.html","http://product.dangdang.com/23392959.html","http://product.dangdang.com/22455937.html","http://product.dangdang.com/23485462.html","http://product.dangdang.com/24170653.html","http://product.dangdang.com/24171265.html","http://product.dangdang.com/24142914.html","http://product.dangdang.com/20102796.html","http://product.dangdang.com/20359144.html","http://product.dangdang.com/23526685.html","http://product.dangdang.com/23533306.html","http://product.dangdang.com/23211544.html","http://product.dangdang.com/23668468.html","http://product.dangdang.com/23174150.html","http://product.dangdang.com/25120690.html","http://product.dangdang.com/23541268.html","http://product.dangdang.com/22871095.html","http://product.dangdang.com/9203153.html","http://product.dangdang.com/23880910.html","http://product.dangdang.com/25083136.html","http://product.dangdang.com/23604582.html","http://product.dangdang.com/20263101.html","http://product.dangdang.com/24196631.html","http://product.dangdang.com/22518209.html","http://product.dangdang.com/22544181.html","http://product.dangdang.com/22883482.html","http://product.dangdang.com/23827891.html","http://product.dangdang.com/24030565.html","http://product.dangdang.com/21022011.html","http://product.dangdang.com/23941774.html","http://product.dangdang.com/23475700.html","http://product.dangdang.com/21121570.html","http://product.dangdang.com/23700790.html","http://product.dangdang.com/23722231.html","http://product.dangdang.com/23933715.html","http://product.dangdang.com/25123131.html","http://product.dangdang.com/23447296.html","http://product.dangdang.com/23335201.html","http://product.dangdang.com/24197644.html","http://product.dangdang.com/23633727.html","http://product.dangdang.com/23437495.html","http://product.dangdang.com/23168354.html","http://product.dangdang.com/20043534.html","http://product.dangdang.com/23353916.html","http://product.dangdang.com/23319370.html","http://product.dangdang.com/25098168.html","http://product.dangdang.com/23829353.html","http://product.dangdang.com/23814838.html","http://product.dangdang.com/23251414.html","http://product.dangdang.com/24020759.html","http://product.dangdang.com/23951581.html","http://product.dangdang.com/23320302.html","http://product.dangdang.com/23806760.html","http://product.dangdang.com/21052696.html","http://product.dangdang.com/23985513.html","http://product.dangdang.com/22812599.html","http://product.dangdang.com/25119381.html","http://product.dangdang.com/23229260.html","http://product.dangdang.com/23486162.html","http://product.dangdang.com/21097059.html","http://product.dangdang.com/23668698.html","http://product.dangdang.com/20459762.html","http://product.dangdang.com/23333476.html","http://product.dangdang.com/23352787.html","http://product.dangdang.com/23509394.html","http://product.dangdang.com/24058498.html","http://product.dangdang.com/25171004.html","http://product.dangdang.com/23461520.html","http://product.dangdang.com/25108205.html","http://product.dangdang.com/24030560.html","http://product.dangdang.com/22533213.html","http://product.dangdang.com/23773340.html","http://product.dangdang.com/23254614.html","http://product.dangdang.com/22463219.html","http://product.dangdang.com/23207640.html","http://product.dangdang.com/23485741.html","http://product.dangdang.com/23300108.html","http://product.dangdang.com/24030561.html","http://product.dangdang.com/20971500.html","http://product.dangdang.com/1002205975.html","http://product.dangdang.com/25099265.html"],
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
            name: '售价',
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
          },
          books_name: {
            name: '系列丛书名称',
            get value() {
              let arr = $('#p-ad').text().match(/《([^》]+)》/g) || [];
              return arr.join(' ');
            }
          },
          author_name: {
            name: '作者',
            get value() {
              return $('#p-author').text().trim() || '无法获取';
            }
          },
          pages_num: {
            name: '页数',
            get value() {
              let weightArr = $('#parameter2').text().split('\n').filter(item => item.indexOf('页数：') > -1) || [];
              return weightArr[0] ? weightArr[0].replace('页数：', '').trim() : '无法获取';
            }
          },
          book_intro: {
            name: '图书简介',
            get value() {
              return $('#p-ad').text();
            }
          },
          content_intro: {
            name: '内容介绍',
            get value() {
              let dom = $('.book-detail-item[text=内容简介]').find('.book-detail-content');
              return dom.text().trim();
            }
          },
          editor_recom: {
            name: '编辑推荐',
            get value() {
              let dom = $('.book-detail-item[text=编辑推荐]').find('.book-detail-content');
              return dom.text().trim();
            }
          }
        }
      } catch (err) {
        return;
      }
    }
  }, {
    name: '亚马逊',

    /**
     * 页面编码，null是指二进制编码
     */
    encoding: {
      list: 'utf8'
    },

    is: function(url) {
      return url.indexOf('www.amazon.cn') > -1
    },

    onDetailPageLoaded: function(url, page) {
      return page.waitForSelector('#soldByThirdParty');
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
            value: '亚马逊'
          },
          sku_id: {
            name: 'SKU ID',
            value: 'TODO'
          },
          sku_name: {
            name: '商品名称',
            get value() {
              return $('#productTitle').text().trim();
            }
          },
          brand: {
            name: '品牌',
            get value() {
              return 'TODO';
            }
          },
          price: {
            name: '售价',
            get value() {
              return $('#soldByThirdParty .a-color-price').text().trim();
            }
          },
          price_origin: {
            name: '商品原价',
            get value() {
              return $($('#buyBoxInner .a-color-secondary')[1]).text().trim();
            }
          },
          age: {
            get value() {
              return 'TODO'
            }
          },
          book_age: {
            get value() {
              let arr = $('#detail_bullets_id .content li').slice(0, 13).text().match(/读者对象: (\S+)岁/) || [];
              return arr[1] || '无法获取';
            }
          },
          sale: {
            name: '促销信息',
            get value() {
              return 'TODO'
            }
          },
          supplier: {
            name: '供应商',
            get value() {
              return 'TODO'
            }
          },
          size: {
            get value() {
              return 'TODO'
            }
          },
          weight: {
            get value() {
              let arr = $('#detail_bullets_id .content li').slice(0, 13).text().match(/([\d|\.]+\ Kg)/) || [];
              return arr[1] || '无法获取';
            }
          },
          postage: {
            name: '运费',
            get value() {
              return 'TODO'
            }
          },
          comments_num: {
            name: '评论数',
            get value() {
              return $('#acrCustomerReviewText').text().replace('条商品评论', '').trim();
            }
          },
          sales_num: {
            name: '销量',
            get value() {
              return 'TODO'
            }
          },
          ISBN: {
            name: 'ISBN号',
            get value() {
              let arr = $('#detail_bullets_id .content li').slice(0, 13).text().match(/ISBN:\ ([\d\w]+)/) || []
              return arr[1] || '无法获取';
            }
          },
          package_type: {
            name: '包装',
            get value() {
              let arr = $('#detail_describe').text().match(/包\ 装：(\S装)/) || []
              return arr[1] || '无法获取'
            }
          },
          press: {
            name: '出版社',
            get value() {
              let arr = $('.messbox_info').text().match(/出版社:(\S+社)/) || []

              return arr[1] || '无法获取'
            }
          },
          format: {
            name: '开本',
            get value() {
              let arr = $('#detail_describe').text().match(/开\ 本：(\d+)/) || []
              return arr[1] || '无法获取'
            }
          },
          paper_type: {
            name: '纸张类型',
            get value() {
              let arr = $('#detail_describe').text().match(/纸\ 张：(\S+纸)/) || []
              return arr[1] || '无法获取'
            }
          },
          books_name: {
            name: '系列丛书名称',
            get value() {
              return 'TODO'
            }
          },
          author_name: {
            name: '作者',
            get value() {
              return $('.messbox_info span[dd_name=作者]').text() || '无法获取'
            }
          },
          pages_num: {
            name: '页数',
            get value() {
              let arr = $('#detail_describe').text().match(/页\ 数：(\d+)/) || []
              return arr[1] || '无法获取';
            }
          },
          book_intro: {
            name: '图书简介',
            get value() {
              return 'TODO'
            }
          },
          content_intro: {
            name: '内容介绍',
            get value() {
              return $('#content-show').text();
            }
          },
          editor_recom: {
            name: '编辑推荐',
            get value() {
              return $('#mediaFeedback-show').text();
            }
          }
        }
      } catch (err) {
        return;
      }
    }
  }, {
    name: '当当',

    /**
     * 页面编码，null是指二进制编码
     */
    encoding: {
      list: 'utf8'
    },

    is: function(url) {
      return url.indexOf('dangdang.com') > -1
    },

    onDetailPageLoaded: function(url, page) {
      return page.waitForSelector('#dd-price');
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
            value: '当当'
          },
          sku_id: {
            name: 'SKU ID',
            value: 'TODO'
          },
          sku_name: {
            name: '商品名称',
            get value() {
              return $('h1').text().trim()
            }
          },
          brand: {
            name: '品牌',
            get value() {
              return 'TODO';
            }
          },
          price: {
            name: '售价',
            get value() {
              return $('#dd-price').text().trim();
            }
          },
          price_origin: {
            name: '商品原价',
            get value() {
              return $('#original-price').text().trim();
            }
          },
          age: {
            get value() {
              return 'TODO'
            }
          },
          book_age: {
            get value() {
              let arr = $('#detail_describe').text().match(/([\d\-]+)岁/) || [];
              return arr[1] || '无法获取';
            }
          },
          sale: {
            name: '促销信息',
            get value() {
              return 'TODO'
            }
          },
          supplier: {
            name: '供应商',
            get value() {
              return 'TODO'
            }
          },
          size: {
            get value() {
              return 'TODO'
            }
          },
          weight: {
            get value() {
              return '无法获取';
            }
          },
          postage: {
            name: '运费',
            get value() {
              return 'TODO'
            }
          },
          comments_num: {
            name: '评论数',
            get value() {
              let arr = $('#comment_tab').text().match(/([\d]+)/) || []
              return arr[1] || '无法获取'
            }
          },
          sales_num: {
            name: '销量',
            get value() {
              let arr = $('#comment_tab').text().match(/([\d]+)/) || []
              return arr[1] || '无法获取'
            }
          },
          ISBN: {
            name: 'ISBN号',
            get value() {
              let arr = $('#detail_describe').text().match(/ISBN：([\d\w]+)/) || []
              return arr[1] || '无法获取';
            }
          },
          package_type: {
            name: '包装',
            get value() {
              let arr = $('#detail_describe').text().match(/包\ 装：(\S装)/) || []
              return arr[1] || '无法获取'
            }
          },
          press: {
            name: '出版社',
            get value() {
              let arr = $('.messbox_info').text().match(/出版社:(\S+社)/) || []

              return arr[1] || '无法获取'
            }
          },
          format: {
            name: '开本',
            get value() {
              let arr = $('#detail_describe').text().match(/开\ 本：(\d+)/) || []
              return arr[1] || '无法获取'
            }
          },
          paper_type: {
            name: '纸张类型',
            get value() {
              let arr = $('#detail_describe').text().match(/纸\ 张：(\S+纸)/) || []
              return arr[1] || '无法获取'
            }
          },
          books_name: {
            name: '系列丛书名称',
            get value() {
              return 'TODO'
            }
          },
          author_name: {
            name: '作者',
            get value() {
              return $('.messbox_info span[dd_name=作者]').text() || '无法获取'
            }
          },
          pages_num: {
            name: '页数',
            get value() {
              let arr = $('#detail_describe').text().match(/页\ 数：(\d+)/) || []
              return arr[1] || '无法获取';
            }
          },
          book_intro: {
            name: '图书简介',
            get value() {
              return 'TODO'
            }
          },
          content_intro: {
            name: '内容介绍',
            get value() {
              return $('#content-show').text();
            }
          },
          editor_recom: {
            name: '编辑推荐',
            get value() {
              return $('#mediaFeedback-show').text();
            }
          }
        }
      } catch (err) {
        return;
      }
    }
  }]
}