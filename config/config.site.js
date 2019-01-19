'use strict';

module.exports = {
  urls: ['https://item.jd.com/8811993.html','https://item.jd.com/6708133.html','https://item.jd.com/2001495.html','https://item.jd.com/980431.html','https://item.jd.com/8484527.html','https://item.jd.com/8811995.html','https://item.jd.com/1686632.html','https://item.jd.com/5717123.html','https://item.jd.com/2654608.html','https://item.jd.com/7438004.html','https://item.jd.com/1692758.html','https://item.jd.com/3391437.html','https://item.jd.com/1637067.html','https://item.jd.com/8484501.html','https://item.jd.com/7998557.html','https://item.jd.com/5006216.html','https://item.jd.com/5097880.html','https://item.jd.com/1287138.html','https://item.jd.com/5097908.html','https://item.jd.com/4256362.html','https://item.jd.com/3526440.html','https://item.jd.com/2348945.html','https://item.jd.com/7196902.html','https://item.jd.com/3048924.html','https://item.jd.com/2030802.html','https://item.jd.com/10235390821.html','https://item.jd.com/100001826395.html','https://item.jd.com/1686651.html','https://item.jd.com/5870936.html','https://item.jd.com/3360442.html','https://item.jd.com/1496483834.html','https://item.jd.com/6832657.html','https://item.jd.com/24436623024.html','https://item.jd.com/100001009067.html','https://item.jd.com/5195324.html','https://item.jd.com/4034901.html','https://item.jd.com/5483508.html','https://item.jd.com/7507762.html','https://item.jd.com/7507732.html','https://item.jd.com/5412045.html','https://item.jd.com/6133971.html','https://item.jd.com/100001553520.html','https://item.jd.com/7339296.html','https://item.jd.com/2337318.html','https://item.jd.com/5140554.html','https://item.jd.com/34003820432.html','https://item.jd.com/1381866.html','https://item.jd.com/8272076.html','https://item.jd.com/7102047.html','https://item.jd.com/6020953.html','https://item.jd.com/8536103.html','https://item.jd.com/5037172.html','https://item.jd.com/5629054.html','https://item.jd.com/31091278682.html','https://item.jd.com/3728283.html','https://item.jd.com/100000485467.html','https://item.jd.com/7410797.html','https://item.jd.com/3756329.html','https://item.jd.com/30394948309.html','https://item.jd.com/4775616.html'],
  // urls: ['https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.269c745ayQE9ph&id=527075698825&sku_properties=1627207:909850991'],
  fields: [
    { key:'site', name: '电商名称' }, 
    { key:'sku_id', name: 'SKU ID' }, 
    { key:'sku_name', name: '商品名称' }, 
    { key:'brand', name: '品牌' }, 
    { key:'price', name: '售价' }, 
    { key:'sales_num', name: '销量' }, 
    { key:'size', name: '尺寸' }, 
    { key:'color', name: '颜色' }, 
    { key:'material', name: '材质' }, 
    { key:'lock', name: '锁' }, 
    { key:'weight', name: '毛重' }, 
    { key:'supplier', name: '供应商' }, 
    { key:'link', name: '链接' }
  ],
  site: [{
    name: '京东',

    is: function(url) {
      return url.indexOf('jd.com') > -1;
    },

    skuContentArr: [
      function site (_url, $){ return '京东'; } ,
      function link (_url, $){ return _url; } ,
      function sku_id (_url, $){ return _url.match(/jd\.com\/(.+)\.html/)[1]; } ,
      function sku_name (_url, $){
        return $('.product-intro .sku-name').text().trim();
      },
      function brand (_url, $){
        return $('#parameter-brand').text().replace('品牌：', '').trim();
      },
      function price (_url, $){
        return $('.summary-price .p-price .price').text().trim();
      },
      function sales_num (_url, $){
        return $('#comment-count .count').text().trim();
      },
      function size (_url, $){
        let ageArr = $('.parameter2').text().split('\n').filter(item => item.indexOf('尺寸：') > -1) || [];
        return ageArr[0] ? ageArr[0].replace('尺寸：', '').trim() : '无法获取';
      },
      function color (_url, $){
        let ageArr = $('.parameter2').text().split('\n').filter(item => item.indexOf('颜色：') > -1) || [];
        return ageArr[0] ? ageArr[0].replace('颜色：', '').trim() : '无法获取';
      },
      function material (_url, $){
        let ageArr = $('.parameter2').text().split('\n').filter(item => item.indexOf('材质：') > -1) || [];
        return ageArr[0] ? ageArr[0].replace('材质：', '').trim() : '无法获取';
      },
      function lock (_url, $){
        let ageArr = $('.parameter2').text().split('\n').filter(item => item.indexOf('锁具方式：') > -1) || [];
        return ageArr[0] ? ageArr[0].replace('锁具方式：', '').trim() : '无法获取';
      },
      function weight (_url, $){
        let ageArr = $('.parameter2').text().split('\n').filter(item => item.indexOf('商品毛重：') > -1) || [];
        return ageArr[0] ? ageArr[0].replace('商品毛重：', '').trim() : '无法获取';
      },
      function supplier (_url, $){
        return $('.summary-service .hl_red').text().trim();
      }
    ]
  }, {
    name: '天猫',

    is: function(url) {
      return url.indexOf('detail.tmall.com') > -1;
    },

    skuContentArr: [
      function site (_url, $){ return '天猫'; } ,
      function link (_url, $){ return _url; } ,
      function sku_id (_url, $){ return _url.match(/id=(\d+)/)[1]; } ,
      function sku_name (_url, $){
        return $('#J_DetailMeta h1').text().trim();
      },
      function brand (_url, $){
        let arr = [];
        $('#J_AttrUL li').each((index, item)=> {arr.push($(item).text());});
        let findOne = arr.find(item => item.indexOf('品牌:') > -1) || '';
        return findOne.replace('品牌:', '').trim() || '无法获取';
      },
      function price (_url, $){
        return $('.tm-promo-price .tm-price').text().trim();
      },
      function sales_num (_url, $){
        return $('.tm-ind-sellCount .tm-count').text().trim();
      },
      function size (_url, $){
        let arr = [];
        $('#J_AttrUL li').each((index, item)=> {arr.push($(item).text());});
        let findOne = arr.find(item => item.indexOf('尺寸:') > -1) || '';
        return findOne.replace('尺寸:', '').trim() || '无法获取';
      },
      function color (_url, $){
        let arr = [];
        $('#J_AttrUL li').each((index, item)=> {arr.push($(item).text());});
        let findOne = arr.find(item => item.indexOf('图案:') > -1) || '';
        return findOne.replace('图案:', '').trim() || '无法获取';
      },
      function material (_url, $){
        let arr = [];
        $('#J_AttrUL li').each((index, item)=> {arr.push($(item).text());});
        let findOne = arr.find(item => item.indexOf('质地:') > -1) || '';
        return findOne.replace('质地:', '').trim() || '无法获取';
      },
      function lock (_url, $){
        let arr = [];
        $('#J_AttrUL li').each((index, item)=> {arr.push($(item).text());});
        let findOne = arr.find(item => item.indexOf('锁的类型:') > -1) || '';
        return findOne.replace('锁的类型:', '').trim() || '无法获取';
      },
      function weight (_url, $){
        let arr = [];
        $('#J_AttrUL li').each((index, item)=> {arr.push($(item).text());});
        let findOne = arr.find(item => item.indexOf('商品毛重:') > -1) || '';
        return findOne.replace('商品毛重:', '').trim() || '无法获取';
      },
      function supplier (_url, $){
        return $('.slogo-shopname').text().trim();
      }
    ]
  }]
};
