# vue-my-music

## 介绍

Vue My Music! 根据慕课网《Vue 2.0开发企业级移动端音乐Web APP》的实战项目

本项目使用 VueCLI3

```sh
# 安装VueCLI
yarn global add @vue/cli

# 新建项目
vue create vue-my-music

# 启动dev环境
npm run serve

# 打包发布
npm run build
```

由于旧版的QQ音乐API已不能使用

    GET http://ws.stream.qqmusic.qq.com/102636799.m4a?fromtag=46 403 (Forbidden)

我找了以下链接，准备更换项目中的API

* http://ustbhuangyi.com/music/#/recommend
* https://blog.csdn.net/xiayiye5/article/details/79487560


    抓取到的API地址：
    http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C4000039MnYb0qxYhV.m4a?guid=3317358380&vkey=3E457F58E5B4D26BFD0BE2BEE172A9D08908DB68D0727F01F5207E616431865DE03CAC296FFDC7D8CAF391A5F9B5EA8AF9437B690A432818&uin=0&fromtag=38
    http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400003aAYrm3GE0Ac.m4a?guid=3317358380&vkey=18F9120E7241015C17BC6820CAB8CBF373407DC49DCD8A16057F2EE66D08890321C3BC1BE29715F4FF897DC4FC8D38A50FD41176FA833D3C&uin=0&fromtag=38

我还在GitHub上找到的类似项目，直接用就可以了 #滑稽

https://github.com/lvchenqiang/VueLearn/tree/master/vue-music

https://github.com/libaixu/music

还有网易云音乐的

https://github.com/tgxhx/vue-music

https://github.com/logonod/music-vue

https://binaryify.github.io/NeteaseCloudMusicApi/#/

