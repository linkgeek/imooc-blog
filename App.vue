<!-- App.vue 是应用的主组件，所有的页面都会嵌套在这个组件内。可以在 App.vue 中定义全局的样式和逻辑。 -->
<script>
	export default {
		// 应用初始化完成时触发，全局只会触发一次
		onLaunch: function() {
			/* #ifdef H5 */
			console.log('当前处于 H5 编译平台');
			/* #endif */
			/* #ifndef H5 */
			console.log('当前处于非 H5 编译平台');
			/* #endif */
		},
		// 应用启动或从后台进入前台时触发
		onShow: function() {},
		// 应用进入后台时触发
		onHide: function() {}
	};
</script>

<style>
	/*全局css */
</style>