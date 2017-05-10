触发硬件加速：transform:translate3d(0,0,0);触发GPU加速
脚手架工具安装：npm install vue-cli -g
1. vue init webpack myapp 创建一个项目并使用webpack模板
2. 依次执行
    cd myapp   
    npm install(如果出错：npm set registry http://registry.npmjs.org/)   
    npm run dev (成功监听8080端口)

index.html文件是单页应用程序挂载页面
App.vue是页面入口文件（写组件和样式）
main.js是程序入口页面

组件的使用：
在App.vue的template里面添加标签，在script里面引入组件并注册组件名字
在components目录下创建组件目录和文件（如header.vue）,在里面写入基本结构和样式

手机访问本地网站的方法
命令行输入ipconfig获取本机的ip,然后把localhost替换为本机的ip,复制链接到http://cli.im/生成二维码，手机扫描即可
