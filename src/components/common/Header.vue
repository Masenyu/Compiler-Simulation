<template>
    <el-row>
        <div class="header">
          <div class="navigation">
            <div class="logo">
              <img style="float:left" src="../../assets/_logo.png" width="40px" height="40px"/>
              <a style="float:left">文法分析模拟器</a>
            </div>
            <div class="nav-menu">
              <ul>
                <li><a @click="gotoUrl('/index/main-interface')">首页</a></li>
                <li><a @click="gotoUrl('/index/lexical-analysis')">词法分析</a></li>
                <li><a @click="gotoUrl('/index/main-interface')">语法分析</a></li>
                <li><a @click="gotoUrl('/index/main-interface')">语义分析</a></li>
                <li><a class='login-btn'>登录</a></li>
              </ul>
            </div>
            <!-- <div class="user-info">
                <el-button style="display:none;">登陆</el-button>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{name}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的收藏</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item divided>注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div> -->
          </div>
        </div>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      name: '账号'
    }
  },
  methods: {
    gotoUrl (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 40px;
  color: #49505b;
  font-size: 16px;
  font-weight: 400;
  /* line-height: 1.5em; */
  padding:15px 0px;
  box-shadow: 0px 1px 1px #ece9e9;
}
.navigation{
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-width: 800px;
  margin:0px auto;
  width:65%;
}
.logo {
  font-size: 32px;
  cursor: pointer;
  -webkit-text-size-adjust:100%;
  min-width: 270px;
  float: left;
}
.nav-menu {
  height: 40px;
  float: right;
}
ul{
  list-style:none; /* 去掉ul前面的符号 */
  margin: 0px; /* 与外界元素的距离为0 */
  padding: 0px; /* 与内部元素的距离为0 */
  width: auto; /* 宽度根据元素内容调整 */
}
ul li
{
  padding:0px 10px;
  float:left; /* 向左漂移，将竖排变为横排 */
}
ul li a, ul li a:visited
{
  cursor: pointer;
  color:#49505b;
  display: block; /* 此元素将显示为块级元素，此元素前后会带有换行符 */
  padding: 10px; /* 内部填充的距离 */
  text-decoration: none; /* 不显示超链接下划线 */
  white-space: nowrap; /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
}
ul li a:hover
{
  color: #39a9db; /* 文字颜色 */
  text-decoration: none; /* 不显示超链接下划线 */
}
ul li a:active
{
  color:#49505b;/* 文字颜色 */
  text-decoration: none; /* 不显示超链接下划线 */
}
.login-btn{
  cursor: pointer;
  border: 1px solid #00aeee;
  color: #00aeee;
  border-radius: 3px;
  display: block; /* 此元素将显示为块级元素，此元素前后会带有换行符 */
  padding: 8px 20px; /* 内部填充的距离 */
  text-decoration: none; /* 不显示超链接下划线 */
  white-space: nowrap; /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
}
</style>
