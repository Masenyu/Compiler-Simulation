<template>
  <div id="p" class="shoppingCart">
    <el-header>
      <h1 class="head">我的收藏</h1>
      <div class="headLine"></div>
    </el-header>
    <div class="cartTable">
      <el-row>
        <el-col :span="2"> </el-col>
        <el-col :span="2">编号</el-col>
        <el-col :span="4">类型</el-col>
        <el-col :span="12">文法</el-col>
        <el-col :span="4">操作</el-col>
      </el-row>
      <div style="margin: 15px 0;"></div>
        <div class="table" v-for="item in collection">
          <el-row>
            <el-col :span="2">{{item.collectionId}}</el-col>
            <el-col :span="4"><p>{{item.collectionType}}</p></el-col>
            <el-col style="margin-right: 80px" :span="10"><el-input type="textarea" readonly="true" :rows="3" resize="none" v-model="item.expression"></el-input></el-col>
            <el-col :span="1"><el-button @click="deleteItem(item.collectionId)" type="text">查看</el-button></el-col>
            <el-col :span="2"><el-button style="color: #f00" @click="deleteItem(item.collectionId)" type="text">删除</el-button></el-col>
          </el-row>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data(){
      return{
        collection:[
          {
            studentId: '20153061380',
            collectionId: 1,
            collectionType: "词法分析",
            expression: "t=do\nt=double\nt=a|b\nt=abcd",
          },
          {
            studentId: '20153061380',
            collectionId: 2,
            collectionType: "词法分析",
            expression: 't=do\nt=double',
          },
          {
            studentId: '20153061380',
            collectionId: 3,
            collectionType: "词法分析",
            expression: 't=do\nt=double', 
          },
          {
            studentId: '20153061380',
            collectionId: 4,
            collectionType: "词法分析",
            expression: 't=don\nt=double', 
          },
          {
            studentId: '20153061380',
            collectionId: 5,
            collectionType: "词法分析",
            expression: 't=do\nt=double',
          },
        ],
        books:[],
        hostURL:  'localhost',
      }
    },
    methods: {
      getCartList(){
        var self=this;
        var _url = '/collection/getItems?userId='+ localStorage.getItem('userId');//用户ID（long）////////////////////////////////////+this.category;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          self.collection = response.data;
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
      fresh(){
        this.getCartList();
        this.books = [];
        for(var i = 0; i < this.collection.length; i++)
          this.books[i] = this.collection[i].collectionId;
      },
      deleteItem(val){
        var self=this;
        var _url = '/collection/deleteItem?collectionId=' + val;
        self.$axios({
          url:_url,
          methods:'get',
          baseURL:this.hostURL
        }).then((response)=>{
          if(response.data.success == true)
          {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.fresh();
          }
          else
            this.$message({
              type: 'info',
              message: '删除失败'
            });
        }).catch((error)=>{
          this.$message({
            type:'info',
            message:'connection fail,press F12 to see the error in console'
          });
          console.log("ERROR:");
          console.log(error);
        });
      },
    },
    mounted() {
      document.getElementById('p').style.height=(window.innerHeight - 110)+'px'
    },
  }
</script>

<style scoped>
  .shoppingCart{
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #cccccc;
    background-color: rgba(255, 255, 255, 1)
  }
  .head{
    margin: 1.5rem;
    font-size: 2.5rem
  }
  .headLine{
    height: 5px;
    width: 100%;
    background-color: #DD0606;
  }
  .cartTable{
    margin: 2% 4%;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .table{
    width: 100%;
    height: 10%;
    margin-bottom: 0px;
    background-color: #fafafa;
    padding: 10px;
    border: 1px solid #ccd0d2;
    border-bottom-color: #ececec;
    border-top-color: #ececec;
  }
</style>
