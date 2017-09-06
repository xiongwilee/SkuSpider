const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setRequestInterceptionEnabled(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url.endsWith('.png') ||
      interceptedRequest.url.endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });

  await page.goto('https://item.jd.com/4586850.html');

  // await page.screenshot({path: 'jd.png'});

  // const dom = await page.$$('.product-intro .p-price .price');

  // console.log(dom,dom.length,dom[0].innerHTML);

  let html = await page.content();
  console.log(html);

  let dom = await page.$eval('.product-intro .p-price .price', e => e.innerText)
  console.log(dom, '~~~~~~~~~0')

  browser.close();
})();