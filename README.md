## 网易云音乐 React同构直出示例  
 
 在线示例：https://meibin08.github.io/NeteaseCloudMusic-SSR/#/music/song   
 `在线示例因网易云音乐API的请求限制，github静态服务器部署，没有node代理请求转发，所以接口请求数据是失败，完整示例请本地运行`

### 功能点
- react 服务端渲染 同构直出，解决了SEO优化、减少渲染等待时间（首屏优化）;
- ！！重点完善了同构数据请求发起到数据的接收输出、客户端/服务端请求的兼容、首屏直出等的问题;
- 网易云 API 的请求代理转发，设置header绕过网易云服务的拦截等;
- Skeleton Screen -- 骨架屏;
- 与网易云音乐M站版本完全一致的功能;
- 推荐音乐、热歌榜、搜索等
- ！！等你去发现……

### 安装依赖包 
- git clone https://github.com/meibin08/NeteaseCloudMusic-SSR.git
- npm install (建议使用cnpm 因部分组件如不能翻墙会安装失败)

### 开发环境
- npm run dev
- 访问http://localhost:8081

### 生成环境
- npm run build
- npm start
- 访问http://localhost:8081

### 鸣谢

- 一直在看同构直出的一些东西，尝试了很多次，最后以失败告终，因为在网上看了很多的文章、示例等，都以概念性的为主，每次看到最后，都是千篇一律----`最后最最重点的服务端数据处理、请求等逻辑没有了`，所以想着弄一个完整的示例，正好偶然的机会又看到了以下几位大神分享的内容，给了很大的启发，非常感谢！
- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi"NeteaseCloudMusicApi")
- [React同构直出优化总结](https://github.com/joeyguo/blog"blog")
- [react-isomorphic-boilerplate](https://github.com/chikara-chan/react-isomorphic-boilerplate"react-isomorphic-boilerplate")
- [douban-movie-react-ssr](https://github.com/ibufu/douban-movie-react-ssr"douban-movie-react-ssr")

### 项目图片预览

![网易云首页,网易云音乐 api,网易云音乐 nodejs,明星,精选,歌单,识别音乐,收藏,分享音乐,音乐互动,高音质,320K,音乐社交](https://meibin08.github.io/NeteaseCloudMusic-SSR/static/01.png)
![网易云播放页,网易云音乐 node.js,react reactjs,redux,同构直出 示例,服务端渲染 SSR,音乐,播放器,网易,下载,播放,DJ,免费](https://meibin08.github.io/NeteaseCloudMusic-SSR/static/02.png)

##### 还可以打赏哦～ ^_^
- 如果觉得此示例对你有帮助，可以打赏我点小费哦～ ^_^ ～
![苏南, 前端,热爱前端开发,5年前端开发工作经验,meibin08@163.com,react爱好者，业余时间爱写一些自己感兴趣的东西，实践自己所想,爱好:跑步、音乐、爬山、看书、羽毛球等,'宝剑锋从磨砺出，梅花得自苦寒来'](https://meibin08.github.io/NeteaseCloudMusic-SSR/static/reward.png)


