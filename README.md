# uni-app从入门到进阶 系统完成项目实战
网址：https://coding.imooc.com/class/521.html

## 演示
H5：imooc.blog.lgdsunday.club

## 运行须知

1. 该项目应运行在 `HBuilder X` 之中
2. 运行该项目前，请先执行 `npm install` 下来依赖包

## 项目基本目录结构
api 模块请求接口目录
components 全局公用组件
filters 过滤器，例如字符过滤转换函数定义
node_modules node包管理
pages 应用的页面文件存放目录
static 存放静态资源
store 全局状态管理，数据缓存
styles 样式文件
subpkg 分包页面目录
unpackage 打包存放目录，app资源配置目录
utils 工具库目录
App.vue 应用入口页面，应用配置、配置App全局样式以及监听
main.js Vue初始化入口文件，配置Vue实例、加载组件、初始化等
manifest.json 应用配置文件，用于指定应用的名称、描述、图标、权限；平台特有配置等
pages.json 配置页面的路由、窗口样式、tabBar导航条、选项卡等页面类信息
-- pages 页面路由
---- style
navigationBarTitleText: "首页", //导航标题
navigationBarTextStyle: "black", //导航字体颜色
navigationBarBackgroundColor: "#F8F8F8", //导航背景颜色
enablePullDownRefresh: true, //下拉刷新

-- globalStyle 全局样式
navigationBarTextStyle: "black", //导航字体颜色
navigationBarTitleText: "uni-app", //导航标题
navigationBarBackgroundColor: "#F8F8F8", //导航背景颜色
backgroundColor: "#F8F8F8" //页面背景颜色
app-plus: {} //App节点配置项

-- tabBar 多tab应用一级导航栏，最少2个、最多5个
-- subPackages 分包配置，用于解决主包文件过大问题
root //子包的根目录
pages //参数同主包pages

uni.scss 内置的常用样式变量

## uni-app 应用生命周期
onLauch 当uni-app初始化完成时触发（全局只触发一次）
onShow 当uni-app启动，或从后台进入前台显示
onHide 当uni-app从前台进入后台
onError 当uni-app报错时触发

在应用入口页面 App.vue
```
<script>
export default {
	// 当uniapp初始化完成时进行触发，全局只触发一次
	onLaunch: function() {
		console.log('App Launch')
	},
	// 当uniapp启动或者从后台进入前台显示
	onShow: function() {
		console.log('App Show')
	},
	// 当uniapp从前台进入后台
	onHide: function() {
		console.log('App Hide')
	}
}
</script>
```

## uni-app 页面生命周期函数

```
<script>
export default {
    onLoad(option) {}, //监听页面加载，option为上个页面传递的数据，参数类型为Object
    onReady() {}, //监听页面初次渲染完成
    onShow() {}, //监听页面显示。页面每次出现在屏幕上都触发
    onHide() {}, //监听页面隐藏
    onUnload() {}, //监听页面卸载
    onResize() {}, //监听窗口尺寸变化
    onPullDownRefresh() {}, //监听用户下拉动作，一般用于下拉刷新
    onReachBottom() {}, //页面滚动到底部的事件
	onPageScroll() {}, //监听页面滚动
    onTabItemTap() {} //点击 tab 时触发
}
</script>
```
注意：
（1）不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数是和父级上下文绑定在一起的，this 不会是如你做预期的 Vue 实例，且 this.a 或 this.myMethod 也会是未定义的。
（2）建议使用 uni-app 的 onReady 代替 vue 的 mounted。
（3）建议使用 uni-app 的 onLoad 代替 vue 的 created。

## 跳转
声明式导航
编程式导航

1、打开新页面
uni.navigateTo、<navigator open-type="navigate"/>
2、页面重定向
uni.redirectTo、<navigator open-type="redirectTo"/>
3、页面返回
uni.navigateBack、<navigator open-type="navigateBack"/>、用户按左上角返回按钮、安卓用户点击物理back按键
4、Tab 切换
uni.switchTab、<navigator open-type="switchTab"/>、用户切换 Tab
5、重加载
uni.reLaunch、<navigator open-type="reLaunch"/>

注意：
（1）navigateTo, redirectTo 只能打开非 tabBar 页面。
（2）switchTab 只能打开 tabBar 页面。
（3）reLaunch 可以打开任意页面。
（4）页面底部的 tabBar 由页面配置决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
（5）不能在 App.vue 里面进行页面跳转。

## 弄懂Vuex：mapState、mapGetter、mapMutation、mapAction


## 解释
mpType：mpType 是一个uni-app的内置变量，只能在uni-app开发中使用，用于标识应用程序的类型，包括app、h5、weixin、alipay等。
app表示原生应用程序，开发者可以使用原生API进行一些操作，如打开相机、调用系统通讯录等。而其他值则表示在不同平台上运行的Web应用程序，无法使用这些原生API。

async await：使用async关键字来声明一个异步函数，使用await关键字表示等待一个异步操作执行完成。一般搭配try与catch使用，更好地处理异步操作中可能出现的异常情况。
在小程序中，要使用async await，需先使用promise封装wx.request请求，不能勾选ES6转ES5
```
funcA() {
	return new Promise((resolve, reject) => {
		wx.request({
			url: '',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

async onAsyncClick() {
	const resA = await this.funcA();
}
```

mescroll-body: mescroll是一个下拉刷新和上拉加载js框架, <mescroll-body>是1.2.1版本新增的组件, 用来填补<mescroll-uni>的不足

生命周期：一件事物由`创建`到`销毁`的全过程
生命周期函数：生命周期中的`关键时刻`

## 多平台适配
1. 自定义模板，在根目录新建 index.html 文件，标签 meta=>no-referrer，用于解决 h5端 访问外部资源 403问题

## Bug & Tip

1. 首页中 `swiper` 快速滚动导致 `setData` 被不停地调用的问题
   此问题为 [微信小程序 swiper 组件的 bug](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)，可通过以下代码进行修复：

```
    onSwiperChange(e) {
      ...
			// 解决官方 swiper 在 change 里改变 current 值无限左右抖动的 bug
			if (e.detail.source === 'touch') {
				this.currentIndex = e.detail.current;
			}
    }
```

## 知识点
1. 小程序的数据请求会存在跨域吗？
   不会。跨域问题只存在基于浏览器`web`中，小程序宿主环境是微信客户端
2. 小程序的数据请求可以叫做`ajax`请求吗？
   不可以。`ajax`的核心是依赖于浏览器端的`XMLHttpRequest`对象
3. vscode 工具开发，安装插件：uni-helper，uni-app-snippets，uni-app-schemas，uni-ui-snippets


## Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

### Store (容器/仓库)
不能直接改变 Store 中的状态，改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。