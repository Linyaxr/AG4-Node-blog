
# Angular4 + Nodejs + Mongolass 个人博客

> 安装步骤：

1、将项目下载到本地，使用cnpm install，注意不能使用npm install！
```
cnpm install
```

2、在src/server/lib/mongo.js 中更改你的数据库地址即可！

src/server/lib/mongo.js
```
var Mongolass = require('mongolass');
var mongolass = new Mongolass();

//更改下面的连接地址即可，注意记得开启你的mongodb服务。
mongolass.connect("mongodb://127.0.0.1:27017/blogs");

```

3、最后一步npm run build然后浏览器打开http://localhost:3000/
