## 网易云音乐 React同构直出示例[.](https://github.com/meibin08/ "大家好，我是苏南, 前端 网易云音乐,@IT·平头哥联盟,首席填坑官∙苏南,@IT·平头哥联盟-首席填坑官∙苏南") 
 
 在线示例：[https://meibin08.github.io/NeteaseCloudMusic-SSR/#/music/song](https://meibin08.github.io/NeteaseCloudMusic-SSR/#/music/song "网易云音乐API 网易云音乐Node.js 网易云音乐 · 网易云 · 音乐 react 服务端渲染 降低首屏时间")   
 `在线示例因网易云音乐API的请求限制，github静态服务器部署，没有node代理请求转发，所以接口请求数据是失败，完整示例请本地运行`
 了解更多？——[@IT·平头哥联盟](https://honeybadger8.github.io/blog/ "@IT·平头哥联盟-首席填坑官∙苏南")

## 功能点
- react 服务端渲染 同构直出，解决了SEO优化、减少渲染等待时间（首屏优化）;
- ！！重点完善了同构数据请求发起到数据的接收输出、客户端/服务端请求的兼容、首屏直出等的问题;
- 网易云 API 的请求代理转发，设置header绕过网易云服务的拦截等;
- Skeleton Screen -- 骨架屏;
- 与网易云音乐M站版本完全一致的功能;
- 推荐音乐、热歌榜、搜索等
- ！！等你去发现……

## 技术交流
- 公众号：`honeyBadger8` 下方可扫码👇
- 群：912594095、[386485473](https://shang.qq.com/wpa/qunwpa?idkey=d44baf17512787eb0e4f268849a3239d6b9675145a606e21b9a055176bd1c0e2 "React\redux技术交流群")
- 博客：[@IT·平头哥联盟](https://honeybadger8.github.io/blog/ "@IT·平头哥联盟-首席填坑官∙苏南")

## 安装依赖包 
- git clone https://github.com/meibin08/NeteaseCloudMusic-SSR.git
- npm install (建议使用cnpm 因部分组件如不能翻墙会安装失败)

## 开发环境
- npm run dev
- 访问http://localhost:8081

## 生成环境
- npm run build
- npm start
- 访问http://localhost:8081

## 关于我
- 最近在写博客了，有兴趣的同学可以关注一下我和朋友一起整的公众号，专注于分享前端/测试的一些心得总结👇👇，
- 公众号：`honeyBadger8`。

![@IT·平头哥联盟-首席填坑官∙苏南，公众号：honeyBadger8，宝剑锋从磨砺出 梅花香自苦寒来，用心分享 做有温度的攻城狮，专注于分享前端、测试 等领域的积累，文章来源于(自己/群友)工作中积累的经验、填过的坑，希望能尽绵薄之力 助其他同学少走一些弯路](https://honeybadger8.github.io/blog/frontends/_banner/card.gif "@IT·平头哥联盟-首席填坑官∙苏南，公众号：honeyBadger8")



## 项目图片预览
![网易云首页,网易云音乐 api,网易云音乐 nodejs,@IT·平头哥联盟,首席填坑官∙苏南,明星,精选,歌单,识别音乐,收藏,分享音乐,音乐互动,高音质,320K,音乐社交,@IT·平头哥联盟-首席填坑官∙苏南](https://meibin08.github.io/NeteaseCloudMusic-SSR/static/01.png)
![网易云播放页,网易云音乐 node.js,react reactjs,redux,同构直出 示例,服务端渲染 SSR,音乐,播放器,网易,下载,播放,DJ,免费,@IT·平头哥联盟,首席填坑官∙苏南,@IT·平头哥联盟-首席填坑官∙苏南](https://meibin08.github.io/NeteaseCloudMusic-SSR/static/02.png)



 
## 还可以打赏哦～ 
- 如果觉得此示例对你有帮助，可以打赏我一点小费哦～ ^_^ ～
- 
![苏南, 前端,热爱前端开发,5年前端开发工作经验,meibin08@163.com,react爱好者，业余时间爱写一些自己感兴趣的东西，@IT·平头哥联盟,首席填坑官∙苏南,@IT·平头哥联盟-首席填坑官∙苏南实践自己所想,爱好:跑步、音乐、爬山、看书、羽毛球等,'宝剑锋从磨砺出，梅花得自苦寒来'](https://meibin08.github.io/NeteaseCloudMusic-SSR/static/reward@x1.png?20180803)


## 鸣谢
- 一直在看同构直出的一些东西，尝试了很多次，最后以失败告终，因为在网上看了很多的文章、示例等，都以概念性的为主，每次看到最后，都是千篇一律----`最后最最重点的服务端数据处理、请求等逻辑没有了`，所以想着弄一个完整的示例，正好偶然的机会又看到了以下几位大神分享的内容，给了很大的启发，非常感谢！
- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi"NeteaseCloudMusicApi")
- [React同构直出优化总结](https://github.com/joeyguo/blog"blog")
- [react-isomorphic-boilerplate](https://github.com/chikara-chan/react-isomorphic-boilerplate"react-isomorphic-boilerplate")
- [douban-movie-react-ssr](https://github.com/ibufu/douban-movie-react-ssr"douban-movie-react-ssr")


