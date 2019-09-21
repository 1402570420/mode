<template>
  <div id="Login">
    <div class="middle">
      <div class="loog">
        <div class="hangao">
          <div class="loogin">
            <img src="../assets/img/favicon.jpg" />
          </div>
        </div>
        <div class="title">
          <h2>治学无忧后台系统</h2>
        </div>
        <p>做最有态度, 责任, 良心的IT教育</p>
      </div>
      <div class="register">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
        >
          <el-form-item prop="pass">
           <i class="el-icon-s-custom"></i>
            <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <i class="el-icon-lock"></i>
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox label="记住密码" name="type"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: ""
       
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
 
  methods: {
    submitForm(formName) {
      var _this=this
  
      this.$refs[formName].validate(valid => {
        if (valid) {
        //  console.log(this.ruleForm.pass)
          // console.log(this.ruleForm.checkPass)
            this.axios.get("/api/OAuth/authenticate?stuMobile="+_this.ruleForm.pass+
            "&stuPassword="+_this.ruleForm.checkPass).then((data)=>{
            if(data.status==200){
              console.log(data.data)
                console.log(document.cookie)
                sessionStorage.setItem("Token",data.data.access_token)
                var str = JSON.stringify(data.data.profile); 
                sessionStorage.setItem("profile",str)
                var exdate = new Date(); //获取时间
                setCookie("username",_this.ruleForm.pass,exdate+300)
                // setCookie("passwod",_this.ruleForm.checkPass,exdate+300)
              
              this.open2()
              _this.$router.replace("/")
            }
            }).catch(function (error) {
          _this.open3()
            });
        } else {
         this.open4()
          return false;
        }
      });
    },
   open3() {
        this.$message({
          message: '账号或密码错误，请重新输入',
          type: 'warning'
        });
      },
      open2() {
        this.$message({
          message: '登录成功',
          type: 'success'
        });
      },
      open4() {
        this.$message({
          message: '账号和密码不能为空',
          type: 'warning'
        });
      },


  },
   
      

};
</script>

<style lang="less" scoped>
#Login {
  background-image: url(../assets/img/background.jpg);
  background-size: 100% 100%;
  height: 100%;
  display: flex;
}

// 左边
.middle {
  width: 550px;
  height: 400px;
  margin: auto;
  background-color: #d8ecf5;
  display: flex;
  box-shadow: 0px 0px 5px 10px #4b95ea;
  border-radius: 10px;
}
.middle > div {
  width: 50%;
  border: 1px solid #ffffff;
}
.middle .loog {
  border-radius: 10px 0px 0px 10px;
  text-align: center;
}
.middle .register {
  border-radius: 0px 10px 10px 0px;
}
.loogin {
  width: 55%;
  height: 75%;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  margin: auto;
}
.loogin img {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  margin: auto;
}
.hangao {
  width: 100%;
  height: 50%;
  display: flex;
}
.title {
  color: #008b78;
}
.loog p {
  color: #999;
  font-size: 14px;
}

// 右边
/deep/.el-form-item{
margin-left: 15%;
 margin-bottom: 20px;
 position: relative;
}

/deep/.el-form-item i{position: absolute;z-index: 99;font-size: 30px;top:10%;color:#24A33A ;}
/deep/.el-input__inner{border: 0px;}
/deep/.el-input__suffix{width: 50px;}

/deep/.el-input{width: 80% ; border: 1px solid #24A33A ;background-color:#ffffff ;}
/deep/.el-input input{padding: 0px 10px;width: 80%;margin-left: 10%;}
/deep/.el-button{width:80%;}
/deep/.el-form-item__error{width: 100% ; text-align:center ;} 
/deep/.el-form{margin-top: 40px;}
/deep/.el-checkbox{margin-right:30px;}

</style>