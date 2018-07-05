<template>
  <div class="page">
    逐步开放中
    <el-button @click="turnToHome">返回主页</el-button>
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
.page {
  font-size: 40px;
  /*background-image: url("/static/img/login.jpg");*/
  min-height: 1000px;
}
</style>
