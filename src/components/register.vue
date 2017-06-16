<template>
  <div class="register">
    <h1>注册</h1>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" labelWidth="100px" class="demo-ruleForm">
      <el-form-item prop="username">
        <!--用户名-->
        <el-input type="text" placeholder="用户名" v-model="registerForm.username" autoComplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="psw">
        <!--密码-->
        <el-input type="password" placeholder="密码" v-model="registerForm.psw" autoComplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="rePsw">
        <!--再次输入密码-->
        <el-input type="password" placeholder="再次输入密码" v-model="registerForm.rePsw" autoComplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    name: 'register',
    data () {
      // 验证用户名
      var userPattern = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
      var validateUser = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('用户名不能为空，请输入！'))
        } else {
          if (!userPattern.exec(value)) {
            callback(new Error('只能输入5-20个以字母开头、可带数字、“_”、“.”的字串'))
          } else {
            callback()
          }
        }
      }
      // 验证密码
      var pswPattern = /^(\w){6,20}$/
      var validatePsw = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('密码不能为空，请输入！'))
        } else {
          if (!pswPattern.exec(value)) {
            callback(new Error('只能输入6-20个字母、数字、下划线'))
          } else {
            callback()
          }
        }
      }
      // 二次输入密码
      var validateRePsw = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请再次输入密码！'))
        } else {
          if (value !== this.registerForm.psw) {
            callback(new Error('两次输入密码不一致，请重新输入！'))
          } else {
            callback()
          }
        }
      }
      return {
        registerForm: {
          username: '',
          psw: '',
          rePsw: ''
        },
        rules: {
          username: [{validator: validateUser, trigger: 'blur'}],
          psw: [{validator: validatePsw, trigger: 'blur'}],
          rePsw: [{validator: validateRePsw, trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(
          (valid) => {
            if (valid) {
              // alert('submit')
              console.log(this.registerForm)
              this.$ajax({
                url: '#',
                method: 'get',
                data: this.registerForm
              })
            } else {
              console.log('error submit')
              return false
            }
          }
        )
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>


<style type="text/css">
  /*重置样式*/
  .login .el-input, .el-input__inner {
    width: 90%;
    margin-left: -28%;
  }
  .el-button{
    width: 128px;
  }
  .el-button--primary {
    margin-left: -28%;
  }
</style>
