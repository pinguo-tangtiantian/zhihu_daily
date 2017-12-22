
### 1. 使用导航器（React Navigation）跳转页面
社区今后主推的方案是一个单独的导航库react-navigation，它的使用十分简单

### 2. `undefined is note an object(evaluating 'React.propTypes.func')`


### Q3:
使用ref属性，详情请见[该问题下](https://gist.github.com/TiagoGouvea/ba30975dd125d8a358ae)@lalkmim 的回答


### Q9:
1). ToolbarAndroid
* 必须设置高度
* 样式友style来决定
* 必须设置属性title
* actions中的某一项的show属性不设置为always时，折叠展示（三个纵向的点）
2). react-navigation
* 不用设置高度，默认显示顶部导航栏，若想不显示，header属性设置为null
* 相关样式设置在navigationOptions中



## 待解决问题
1. 点击顶部导航栏中的菜单图标展开侧边菜单栏 --- done
2. 各种点击跳转  --- done
3. 点击时传递参数  --- done
4. react native解析/处理html字符串 —— WebView组件  --done
5. webview与view组件同时在一个ScrollView中，view组件不会滚动 -- done
6. react-native引入矢量图标 —— react-native-vector-icons组件库 --- done
7. 安卓下导航栏中的返回按钮如何显示成白色 -- headerTintColor
8. 如何将动态获取的数据展示在导航栏中 --- done
9. react native navigation 与 ToolbarAndroid 的区别 --- done
10. 文章详情页面展示不全　　--- done
11. ToolbarAndroid中折叠功能列表图标改变颜色 --- done
12. 查看DrawerLayoutAndroid状态　--- ignore
13. 菜单抽屉中跳转到别的页面 -- done
14. 图标和开机动画 -- ignore
15. 夜间模式
16. 下拉刷新及下拉加载前一天文章 --- done
17. 分享 --done
18. 查看评论　--- done
19. 点赞 --- ignore
20. 侧边菜单栏展开后首页内容部分可滚动 --- done，手机上不存在
21. drawer属性无规律不存在   --- done 把点击事件写在父节点上，作为属性传给子组件
22. navigation中goBack方法无效
23. 没有数据时用ActivityIndicator表示加载
24. 按钮点击时的样式










## 参考资料
1. [知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)
2. [react-native-viewpager](https://github.com/race604/react-native-viewpager)
3. [使用Charles对iPhone进行Http(s)请求拦截(抓包)](http://www.jianshu.com/p/595e8b556a60?from=timeline&isappinstalled=0)
4. [如何利用Android Studio打包React Native APK](https://www.cnblogs.com/allenxieyusheng/p/5841714.html)
5. [react native 到真机上运行程序时的几个报错](http://blog.csdn.net/u010618627/article/details/70142630)
6. [mac下adb环境变量的配置以及command not found的解决](http://blog.csdn.net/coffeeroy/article/details/22875201)