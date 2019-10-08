# DuntengMagazine
休闲杂志阅读-微信小程序

## 写在前面

很尴尬😥，微信小程序官方说我小程序内容包含文娱咨询内容，审核不给我通过，无法发布上线。

但是我又懒得去改我接口里面的内容了，所以大家可以copy我的代码，在你的本地上预览吧。<br>

## 大图组件封装

/components/bigImg

<br>

## 纯文字组件

/components/pureText

<br>

## 图文组件

/components/imgText

<br>

## behavior.js

把多个组件中用到的：

```js
properties: {
        mainTitle: String,
        subHead: String,
        imgSrc: String
    }
```

这部分代码封装进了behavior中，实现复用减少耦合。

<br>

## 九宫格组件

有图片预览功能

components\nineImg

<br>

## 视频组件

/components/video

<br>

## 标签组件

/components/tag

<br>

## more三点组件和like圆圈组件

/components/more

/components/like

<br>

## 文章组件

/components/article

<br>

## 封装request类

/utils/request.js

使用ES6将其promise化

在/models/index.js中**继承** request类进行具体的代码编写，抽离出功能。

<br>

## 文章列表组件

/components/articleList

- 通过获取后台数据wx:for循环文章组件article
- 滑动触底加载更多，需要注意一个点，如果数据还未完全请求回来 ，而用户一直刷一直滑动触底，就可能一直用相同的参数（magazineId, start）重复请求相同的数据，导致最终页面出现相同的东西。所以这里要添加一个data数据loading来标志是否正在加载中，一个锁的概念，loading为false的时候才能继续触发数据请求，数据开始请求的时候将其置为true，数据请求完成时候就将其置为false。
- 滑动到最后需要显示“没有更多了”，同时在底部反复上滑下滑的时候会重复触发“滑动触底加载更多”导致不断地做无用重复的数据请求。这一点必须优化。这就需要判断数据请求还有没有返回给页面新的东西了。添加一个data数据noMoreData来标志是否还有更多数据，初始值为true。在数据请求回来后，我是将新数据数组拼接到原数据数组中，那么可以通过判断新数组的长度是否和原数组一样，如果不一样则是有请求到新的数据，将noMoreData设置为false；如果长度不变则说明没有新的数据了，将noMoreData设置为true。这时候就应先提示用户“没有更多了”，通过wx:if="{{noMoreData}}"来设置“没有更多了”的显示，这也避免了在断网的情况下明明没有穷尽数据就显示”没有更多了“。
- 显示loading动画。用的是CSS3动画实现的效果



<br>

## loading css3动画组件

/components/loading





<br>

## 滑动触底加载更多

pages\index\index.js中的**onReachBottom事件**



<br>

## 产生随机数工具类

utils/randomStr.js

<br>

## nav滑动导航栏组件

使用的是scroll-view

点击nav时触发事件，添加激活类样式；同时nav作为子组件向父组件index通过triggerEvent通讯，指定触发index中的方法使其重新加载数据，实现点击每个nav选项刷新对应页面。

components/nav

<br>

## 推荐组件

/components/recommend

- 每日月份日期转为汉字的显示
- 多写一个灰底的img占位图区域，当图片成功加载进来后将占位图隐藏，否则显示。在占位图中用css3写一个转圈特效。



<br>

## 标签群组件

/components/tagList

这里使用了一下**插槽Slot**在该组件中插入了另一个组件add（黑色加号方块）

<br>

## 底部tabBar

/app.json中设置



<br>

## "我的喜欢"组件

/pages/mark

- 获取用户信息授权
- 通过缓存来获取我喜欢的文章。事实上一般这种业务都是通过后端接口渲染就行了，简单。可是我没有后端的接口，所以就只能通过like组件的缓存信息来渲染页面。这里面的逻辑太繁复了，感觉是这个小程序里面最难点之一。
- 把like相关的js操作封装到了/modules/like.js类里面了。





<br>

## 图片按钮组件

/components/imgBtn

就是把button嵌套image的这一经常复用的结构抽离出来做成一个组件，常用于“分享”按钮功能和mark页的点击头像获取用户授权信息。

这里图片使用了slot插槽。

<br>

## 搜索功能待开发

只做了一个外壳，因为我没有后端的搜索接口，有小伙伴感兴趣的可以联系我一起开发个搜索接口。