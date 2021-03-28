## 这个文件用来记录用到的第 3 方包和一些配置文件的作用

> package.json

```javascript
{
  "name": "sw-react-template-new",					// 项目名字
  "version": "1.0.0",				 	// 项目版本
  "description": "react后台框架模板",		   	// 项目简介
  "main": "index.tsx",					// 项目入口，没用，因为配置了server.js
  "scripts": {						// 自定义的脚本
    "start": "node server.js --max_old_space_size=4096",				// 启动开发环境
    "build": "webpack --config webpack.production.config.js", // 正式打包
    "dist": "set NODE_ENV=production&& node server.js",				// 运行打包后的build文件夹下的代码
    "distmac": "export NODE_ENV=production&& node server.js", // mac下运行打包后的build文件夹下的代码
    "prettier": "prettier --write \"{src,mock}/**/*.{js,css,less}\"",	// 一键格式化src目录,mock目录下的代码
    "cover": "./node_modules/.bin/istanbul cover _mocha",			// 第3方测试库
    "coveralls": "npm run cover -- --report lcovonly && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls" // 第3方测试库
    "cz:changelog": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md",    //git cz生成提交log
    "cz:commit": "git-cz"     //使用git cz提交规范
  },
  "author": "",		// 作者名字
  "license": "ISC",		// 开源协议
  "private": true,		// 是否私有，没用，因为不是发布npm包
  "repository": {		// 源代码信息
    "type": "git",		// 这是一个git存储的项目
    "url": "" // 源代码地址
  },
  "dependencies": {				// 项目依赖包
    "@rematch/core": "^2.0.0", 			// redux中间件，按model划分，类似dva或vuex，但比dva轻量
    "antd": "^4.12.2",				// 蚂蚁金服UI组件库
    "axios": "^0.21.1",				// 封装了fetch的异步请求库
    "core-js": "^3.8.3",    			// 代替babel-polyfill,使浏览器支持ES6+新功能
    "dayjs": "^1.10.4",			// 时间对象，比moment轻量
    "history": "^4.10.1",			// 第3方history库，项目中没有使用react-router自带的
    "lodash": "^4.17.20",			// 常用工具库（深拷贝等）
    "react": "^17.0.1",				// react核心，本项目采用17以上
    "react-dom": "^17.0.1",			// react Dom操作工具库（render函数等）
    "react-loadable": "^5.5.0",			// 代码分割按需加载插件
    "react-redux": "^7.2.2",			// react与redux连接的桥梁，挂载组件，同步状态
    "react-router-dom": "^5.2.0",		// react前端路由（现在的版本不再需要react-router）
    "redux": "^4.0.5",				// redux核心 状态管理
    "typescript": "^4.1.3"				// typescript语言
  },
  "devDependencies": {						// 开发依赖包
    "@babel/core": "^7.12.13",  					// babel核心，编译ES6+新语法
    "@babel/plugin-proposal-class-properties": "^^7.12.13",	// Babel插件 - 用于让class类中支持定义箭头函数的语法
    "@babel/plugin-proposal-decorators": "^7.12.13",		// Babel插件 - 支持修饰器语法 Decorator
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.12.13",		// Babel插件 - 支持修饰器语法 双问号
    "@babel/plugin-proposal-object-rest-spread": "^7.12.13",	// Babel插件 - 支持对象的扩展运算符
    "@babel/plugin-proposal-optional-chaining": "^7.12.13",	// Babel插件 - 支持修饰器语法 可选链
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",		// Babel插件 - 支持异步import语法，代码分割需要
    "@babel/plugin-transform-runtime": "^7.12.13",		// Babel插件 - 所有的垫片函数将引用babel-runtime中的，避免重复编译
    "@babel/preset-env": "^7.12.13",				// Babel根据浏览器和运行时环境自动识别运用哪些垫片库来兼容ES6+语法
    "@babel/preset-react": "^7.12.13",				// Babel支持react语法
    "@babel/runtime": "^7.12.13",					// Babel运行时垫片库，提供了各种ES6的垫片，最终会自动编译为ES5
    "@commitlint/cli": "^11.0.0",					// commitlint，前端提交规范化插件
    "@commitlint/config-conventional": "^11.0.0",					// commitlint生成配置文件commitlint.config.js
    "@typescript-eslint/eslint-plugin": "^3.6.0",					// Eslint插件 - 让Eslint支持检测typescript
    "@typescript-eslint/parser": "^3.6.0",					// Eslint插件 - 让Eslint解析typescript
    "antd-dayjs-webpack-plugin": "^1.0.6",					// webpack支持dayjs的插件
    "autoprefixer": "^10.2.4",					// postCSS插件，自动添加CSS前缀等
    "babel-eslint": "^10.1.0",					// 适配babel ES6+的eslint规范插件
    "babel-loader": "^8.2.2",					// Webpack解析器 - 解析JS ES6+ 新语法
    "babel-plugin-import": "^1.13.3",				// Babel插件 - 按需加载，例如antd
    "body-parser": "^1.19.0",					// server.js有用，解析post请求的body数据
    "clean-webpack-plugin": "^3.0.0",				// Webpack插件 - 每次打包时自动删除上一次打包留下的旧代码
    "commitizen": "^4.2.3",				       // commitizen - 用于规范git commit提交
    "copy-webpack-plugin": "^7.0.0",				// 打包时将public中的文件直接拷贝到最终文件夹
    "css-loader": "^5.0.1",					// Webpack解析器 - 用于解析js中import的css，和css中url()的路径
    "css-minimizer-webpack-plugin": "^1.2.0",					// Webpack插件 - 压缩 css 文件
    "cz-conventional-changelog": "^3.3.0",					// git cz cz-conventional-changelog用来规范提交信息。
    "cz-customizable": "^6.3.0",					// cz-customizable和cz-conventional-changelog一样，也是commitizen的adapter，不过支持一定程度上的自定义
    "eslint": "^7.19.0",					// Eslint 代码规范检测器
    "eslint-loader": "^4.0.2",					// Webpack解析器 - 打包时检测代码规范时用
    "eslint-config-prettier": "^7.2.0",					// Eslint插件，用于关闭一些不必要的或者是与prettier冲突的lint选项
    "eslint-plugin-prettier": "^3.3.1",				// Eslint插件 - prettier风格的代码格式规范，配置eslint用
    "eslint-plugin-react": "^7.22.0",				// Eslint插件 - 让Eslint支持检测JSX（.eslintrc.jsonon中有配置）
    "eslint-plugin-react-hooks": "^4.2.0",  			// Eslint插件 - 让Eslint支持检测Hooks语法
    "express": "^4.17.1",					// Node.js框架 - 用于server.js中提供开发环境的服务
    "favicons": "^6.2.0",			// 自动生成适配各终端得ico图标，pwa会用到部分
    "favicons-webpack-plugin": "^5.0.0",			// webpack插件 用于favicons
    "file-loader": "^6.2.0",					// Webpack解析器 - 解析各类文件时有用，图片音频等,处理它们的相对路径
    "happypack": "^5.0.1",				// Webpack插件 - 多线程编译，速度更快，开发环境用
    "husky": "^5.0.9",				// Git hooks 工具
    "html-webpack-plugin": "^5.0.0",				// Webpack插件 - 最终打包时自动生成index.html，并配置其类容
    "less": "4.1.1",						// Less核心
    "less-loader": "^8.0.0",					// Webpack解析器 - 解析Less,主要是解析antd的样式文件
    "lint-staged": ">=10",					// 过滤出 Git 代码暂存区文件(被 git add 的文件)的工具
    "mini-css-extract-plugin": "^1.3.5", 			// Webpack插件 - 打包时单独提取所有CSS
    "mockjs": "^1.1.0",					// Mock 模拟生成随机数据用于开发测试
    "postcss": "^8.2.4",					// postcss核心
    "postcss-loader": "^5.0.0",					// Webpack解析器 - 用于进一步解析CSS，比如自动添加-webkit-前缀等
    "prettier": "2.2.1",					// 代码自动格式化插工具
    "style-loader": "^2.0.0",					// Webpack解析器 - 用于提取重复的css代码加入到<style>标签里
    "sw-precache-webpack-plugin": "^1.0.0",			// Webpack插件 - 打包后生成用于pwa的server-worker文件
    "terser-webpack-plugin": "^5.1.1",  			// Webpack插件 - 这个插件修复了很多错误，覆盖webpack内置的uglifyJS
    "ts-loader": "^8.0.15",					// Webpack解析器 - 用于处理ts语法
    "url-loader": "^4.1.1",					// Webpack解析器 - 用于处理一些小图片编译为base64，也处理它们的相对路径
    "webpack": "^5.20.1",					// Webpack 核心，目前项目升级到webpack5
    "webpack-bundle-analyzer": "^4.4.0",					// Webpack构建工具 - 用于分析打包出的文件包含哪些，大小占比如何，模块包含关系，依赖项，文件是否重复，压缩后大小如何
    "webpack-cli": "^4.5.0",					// Webpack构建工具 - 4.0+版本webpack单独提取了这个npm包，打包时需要
    "webpack-dev-middleware": "^4.1.0",				// Webpack小型服务器（server.js中用这个来搭建开发环境所需的服务）
    "webpack-hot-middleware": "^2.25.0",			// Webpack热更新插件（server.js中用这个来启动代码热更新的功能）
    "webpackbar": "^4.0.0", // 控制台美化webpack进度条
    "workbox-webpack-plugin": "^6.1.0", // 自动生成 Service Worker 和 静态资源列表
    "xml-loader": "^1.2.1"					// Webpack解析器 - 解析xml文件
  },
  "browserslist": [ 	// 需要兼容的浏览器，postCSS等工具会自动读取这里等信息
    "iOS >= 8", 	// 兼容iOS8以上的版本
    "last 1 versions", 	// 兼容所有浏览器等最后一个版本
    "> 2%", 		// 兼容全球市场份额大于2%的浏览器
    "not dead" 		// 兼容官方还在继续支持更新的浏览器
    "not op_mini all" 	// 不考虑opera所有mini版本
  ],
    "lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"    // 设置prettier
  }
}
```

> .babelrc Babel 配置文件

```javascript
{
  "presets": [				// babel初始化设置
    "@babel/preset-env",		// 让babel根据环境自动转换ES6+语法
    "@babel/preset-react"		// 让babel支持react语法
  ],
  "plugins": [						// 插件
    "@babel/plugin-transform-runtime",			// babel运行时垫片库
    "@babel/plugin-proposal-object-rest-spread",  	// 支持对象的扩展运算符
    "@babel/plugin-syntax-dynamic-import",  		// 支持异步import语法
    ["@babel/plugin-proposal-decorators", { "legacy": true }],	// 支持“修饰器”语法
    "@babel/plugin-proposal-class-properties",		// 支持编译class类中直接定义箭头函数语法
    "@babel/plugin-proposal-optional-chaining", // 支持“可选链”语法： a.b?.c, 相当于： a.b ? a.b.c : undefined
    "@babel/plugin-proposal-nullish-coalescing-operator", // 支持“双问号”语法：a ?? b, 相当于： a ? a : b;
    "react-loadable/babel",		// 代码分割插件raect-loadable配置，服务端渲染时有关，暂时没用
    [
      "import",				// babel-plugin-import按需加载插件
      {
	      "libraryName": "antd",	// 需要按需加载的包的名字
	      "style": true		// true - 加载antd的less样式文件， 'css' - 加载antd的css样式文件
      }
    ]
  ]
}
```

> public/manifest.json

```javascript
{
  "short_name": "react-luo",				// 添加到桌面和启动页面时显示的APP名字
  "name": "react-luo",					// 桌面APP图标下面显示的名字
  "icons": [						// 所有可用的图标
    {
      "src": "./icons/favicon.ico",			// 图标路径
      "sizes": "64x64 32x32 24x24 16x16",		// 图标的尺寸
      "type": "image/x-icon"				// 图标的类型
    },
    {
      "src": "./icons/apple-touch-icon-114x114.png",
      "sizes": "114x114",
      "type": "image/png"
    },
    {
      "src": "./icons/apple-touch-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }
  ],
  "start_url": ".",					// 主页路径，APP启动后默认跳转此页面
  "display": "standalone",				// 启动模式，standalone隐藏搜索栏
  "theme_color": "#222222",				// 手机顶部工具条颜色
  "background_color": "#222222"				// 启动页面背景色
}
```
