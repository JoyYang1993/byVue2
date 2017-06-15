<template>
  <div class="login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username">
          <!--用户名-->
          <el-input type="text" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="psw">
          <!--密码-->
          <el-input type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checked">
          <!--是否记住密码-->
          <el-input type="checkbox"></el-input>
        </el-form-item>
        <el-form-item>
          <!--登录按钮-->
          <el-button type="primary" v-click="">登录</el-button>
          <el-button v-click="">重置</el-button>
        </el-form-item>
      </el-form>
  </div>

</template>

<script>
  export default{
    name: 'login'
  }
</script>

<style type="text/css">
  /*重置样式*/
  .login .el-input, .el-input__inner {
    width: 50%;
  }
</style>
