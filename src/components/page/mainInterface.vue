<template>
    
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>编译器文法分析模拟器</h1>
                <p>在编译原理课程的文法分析知识学习过程中，由于相关知识比较抽象，给学习者的学习带来困难。</p>
                <h2>目的</h2>
                <p>为解决此问题，本项目将研发一款针对编译器文法分析模拟器，通过可视化的方式，动态地展示分析算法的构造过程，帮助学习者更好地理解词法、语法和语义的分析知识。</p>
                <!--<p></p>-->

                <h2>功能特点</h2>
                <el-checkbox disabled checked>1、 词法分析：依据词法规则，以可视化方式展示NFA和DFA构造，自动转换词法分析算法的实现；</el-checkbox>
                <br>
                <el-checkbox disabled checked>2、 语法分析：依据语法规则，以可视化方式展示top-down和bottom-up的算法构造过程；</el-checkbox>
                <br>
                <el-checkbox disabled checked>3、 语义分析：依据语义规则，构造依赖图，可视化展示属性计算过程；</el-checkbox>
                <br>
                <el-checkbox disabled checked>4、 基于Web的模拟器系统方面学习这通过网络利用本模拟器。</el-checkbox>
                <br>
                <!--<el-checkbox disabled checked>修改用户信息</el-checkbox>-->
                <!--<br>-->
                <!--<h2>安装步骤</h2>-->
                <!--<p>cd vue-manage-system //进入项目目录</p>-->
                <!--<p>npm install //安装项目依赖，等待安装完成</p>-->
                <!--<h2>本地开发</h2>-->
                <!--<p>//开启前端服务，浏览器访问 http://localhost:8082</p>-->
                <!--<p>npm run dev</p>-->
                <!--<p>//开启后端服务</p>-->
                <!--<p>cd service</p>-->
                <!--<p>node app</p>-->
                <!--<h2>设置代理与跨域</h2>-->
                <!--<p>vue-cli的config文件中有一个proxyTable参数，用来设置地址映射表，可以添加到开发时配置（dev）中</p>-->
                <!--<p>dev: {-->
                <!--// ...-->
                <!--proxyTable: {-->
                <!--'/api': {-->
                <!--target: 'http://127.0.0.1:3000/api/',-->
                <!--changeOrigin: true,-->
                <!--pathRewrite: {-->
                <!--'^/api': ''-->
                <!--}-->
                <!--}-->
                <!--},-->
                <!--// ...-->
                <!--}</p>-->
                <!--<p>即请求/api时就代表http://127.0.0.1:3000/api/(这里要写ip，不要写localhost)，changeOrigin参数接收一个布尔值，如果为true，这样就不会有跨域问题了。</p>-->
                <!--<h2>最终项目的目录结构</h2>-->
                <!--<div>-->
                <!--<img src="../../../static/img/tree.png" alt="">-->
                <!--</div>-->
            </article>
        </div>

    
</template>

<script>
export default {
  name: 'mainInterface',
  methods: {
    turnToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.ms-doc {
  width: 100%;
  max-width: 980px;
  margin: 100px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif;
  /*background-image: url('/static/img/login.jpg')*/
}
.ms-doc h3 {
  padding: 9px 10px 10px;
  margin: 0;
  font-size: 14px;
  line-height: 17px;
  background-color: rgba(80, 80, 80, 0.5);
  border: 1px solid #d8d8d8;
  border-bottom: 0;
  border-radius: 3px 3px 0 0;
  color: #fff;
}
.ms-doc article {
  padding: 45px;
  word-wrap: break-word;
  min-height: 500px;
  background-color: rgba(120, 120, 120, 0.5);
  border: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  color: #fff;
}
.ms-doc article h1 {
  font-size: 32px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  color: #fff;
}
.ms-doc article h2 {
  margin: 24px 0 16px;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 7px;
  font-size: 24px;
  border-bottom: 1px solid #eee;
  color: #fff;
}
.ms-doc article p {
  margin-bottom: 15px;
  line-height: 1.5;
  color: #fff;
  font-size: 1.8rem
}
.ms-doc article .el-checkbox {
  margin-bottom: 5px;
}
</style>
