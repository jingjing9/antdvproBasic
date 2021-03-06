# antdvproBasic

本项目基于Ant Design Vue Pro的权限控制逻辑，在该基础上，优化了权限控制指令，使之可以适用于多菜单公用组件，以及tag标签、switch控件和checkbox的权限控制,详见core/directives/action.js文件
也可以直接下载Ant Design Vue Pro项目，将该项目中的action.js替换成core/directives/action.js文件

Overview
----

![dashboard](https://static-2.loacg.com/open/static/github/SP1.png)

### Env and dependencies

- node
- yarn
- webpack
- eslint
- @vue/cli
- [ant-design-vue@1.x](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - Picture edit
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - AntV G2
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - Antv/G2 of Vue

> Note:  [Yarn](https://yarnpkg.com/) package management is recommended, the exact same version loaded with the demo site of this project (yarn.lock) . but you can also use npm


### 项目启动


- 下载依赖
```
yarn install
```

- 运行
```
yarn run serve
```

- 打包
```
yarn run build
```

- 使用eslint语法修复
```
yarn run lint
```


