# Techweekly

高可配的技术周报邮件推送工具。

![](http://img002.qufenqi.com/products/7c/ba/7cbac61933c8e8d21fe2e3915d4618e4.jpeg)

## 快速入门

第一步，下载代码，安装依赖：
```shell
$ git clone https://github.com/xiongwilee/Techweekly.git
$ cd Techweekly && npm install --registry=https://registry.npm.taobao.org
```

第二步，修改邮件配置`config/config.mail.js`：
```javascript
module.exports = {
  "sender": {
    "host": "邮箱服务器host",
    "port": "邮箱服务器端口号",
    "auth": {
      "user": "邮箱地址",
      "pass": "邮箱密码"
    }
  },
  "subject": "邮件主题",
  "from": "你的名字 <邮箱地址>",
  "to": ["收件人邮箱地址"]
}
```

或者，你也可以直接使用默认的邮箱配置`config.mail.sample.js`，修改`config.mail.sample.js`为`config.mail.js`

第三步，发送周报邮件：
```shell
$ node index.js
```


**FYI:** 

如果你需要定时发送邮件，推荐使用`crontab`:
```shell
* 10 * * 5 cd /your/project/path/ && node index.js
```


## 贡献

Techweekly默认支持[fex](https://github.com/zenany/weekly/tree/master/software/)和[75team](https://weekly.75team.com/)两个默认周报源，你可以根据自己的需求配置周报来源：
```javascript
"源ID（可以配置任意字符）": {
    /**
     * 页面连接，可以是一个string, 也可以是function，如果是function则：
     * @return {String} 页面URL
     */
    url: function() {},

    /**
     * 通过url获取文章内容URL的方法
     * @param  {string} html 通过页面连接爬取到的页面html
     * @return {String}      从html中解析到的文章内容的链接
     */
    getLink: function(html) {},

    /**
     * 通过文章内容的链接爬取到文章主体
     * @param  {String} html 通过文章内容的链接爬取到文章的html
     * @return {String}      文章主体部分的html
     */
    getContent: function(html) {}
}
```

**FYI:** 

在`getLink`和`getContent`方法里，你可以直接使用[cheerio](https://github.com/cheeriojs/cheerio#cheerio)来解析DOM。

## 作者

* [xiongwilee](https://github.com/xiongwilee)

