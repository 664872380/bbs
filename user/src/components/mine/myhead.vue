<template>
  <div class="nav">
    <div>
      <img src="" alt="" class="logo">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">沸点</el-menu-item>
      <el-menu-item index="3">小册</el-menu-item>
      <div class="userinfor" v-if="weatherlogin">
        <i class="username">用户名112</i>
        <img src="" alt="" class="userimg">
      </div>
      <div class="userinfor" v-if="!weatherlogin">
        您还没有登录
      </div>
      </el-menu>
    </div>
    
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import shouye from "../index/shouye.vue"
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        weatherlogin:true 
      };
    },
    components:{
        shouye
    }
    ,
    methods: {
      handleSelect(key, keyPath) {
          var path;
          switch (key) {
            case "1":path="/"; break;
            case "2":path="/feidian"; break;
            case "3":path="/xiaoce"; break;
          }
          if (this.$route.fullPath!==path) {
              this.$router.push(path);
          } else {
              
          }
      }
    }
  }
</script>

<style>

  .nav {
    width: 1100px;
    margin: auto;
  }


  .logo {
    width: 100px;
    height: 59px;
    border: 1px solid black;
    float: left;

  }

  .el-menu-demo {
    width: 998px;
    position: relative;
    float: left;
  }

  .userinfor {
    line-height: 61px;
    width: 170px;
    height: 61px;
    position: absolute;
    right: 0px;
  }
  .username {
    width: 80px;
    height: 61px;
    font-style: normal;
    overflow: hidden;
    line-height: 61px;
    float: left;
  }

  .userimg {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    position: absolute;
    right: 20px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 5px;
  }

</style>