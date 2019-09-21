<template>
  <div id="Home-base">
    <el-container>
      <el-aside width="200">
        <!-- loog图片标题 -->
        <div class="right-top">
          <p>
            <img src="../assets/img/favicon .png" />
          </p>
          <b v-show="fas">智学无忧教育</b>
        </div>
        <!-- 二级展开 -->
        <el-menu
          style="overflow-x: hidden"
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">在线测试</span>
            </template>
            <el-menu-item-group v-for="(intm,index) in name" :key="index">
              <el-menu-item :index="intm.navItem" @click="Tab(intm)">{{intm.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">基础数据</span>
            </template>
            <el-menu-item-group v-for="(item,i) in name2" :key="i">
              <el-menu-item :index="item.navItem" @click="Tab(item)">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部 -->
        <el-header>
          <!-- 点击 -->
          <div class="top" @click="dianji">
            <i class="el-icon-caret-left"></i>
          </div>
          <!-- tab 标签页 -->
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="tabCl"
          >
            <el-tab-pane
              v-for="(item,index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >{{item.content}}</el-tab-pane>
          </el-tabs>
          <div class="right">
            <p>
              <span class="el-icon-s-custom">退出</span>
            </p>
            <div>
              <el-avatar :size="45" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-header>
        <!-- 中间主页 -->
        <el-main>
          <router-view name="key" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //头像
      isCollapse: false, //控制是否展开
      fas: true, //标题隐藏或显示
      editableTabsValue: "0",
      editableTabs: [{ title: "首页", name: "0", navItem: "/" }], //接收顶部tab的数值
      edd: [], //接收顶部tab的数值用来删除时调用
      tabIndex: 0,
      stuName: "", //用来接收点击时传过来的名字
      stunavItem: "", //接收点击时的路径
      name: [
        { name: "老师出卷", navItem: "/MakeTestPaper" },
        { name: "试卷管理", navItem: "/TestPaperManage" },
        { name: "安排测试", navItem: "/TestResult" },
        { name: "批阅试卷", navItem: "/TestSetter" },
        { name: "测试成绩", navItem: "/ViewTestPaper" }
      ],
      name2: [
        { name: "班级管理", navItem: "/ClassManage" },
        { name: "学生管理", navItem: "/ModifyPassword" },
        { name: "老师管理", navItem: "/StudentManage" },
        { name: "修改密码", navItem: "/TeacherManage" }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      // console.log(this.widt);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    dianji() {
      var _this = this;
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.fas = false;
      } else {
        setTimeout(function() {
          _this.fas = true;
        }, 300);
      }
    },
    // tab切换
    addTab(targetName) {
      var _this = this;
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: _this.stuName,
        name: newTabName,
        navItem: _this.stunavItem
      });
      this.edd.push({
        title: _this.stuName,
        name: newTabName,
        navItem: _this.stunavItem
      });

      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      if (targetName == "0") {
      } else {
        var _this = this;
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                if (_this.editableTabs.length > 1) {
                  _this.$router.push(nextTab.navItem);
                } else {
                  _this.$router.push("/");
                }

                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    // 点击时赋值并且调用tab选项卡
    Tab(a) {
      this.stunavItem = a.navItem;
      this.stuName = a.name;
      for (const i in this.editableTabs) {
        if (this.editableTabs[i].title == a.name) {
          console.log(this.editableTabsValue);
          this.editableTabsValue = this.editableTabs[i].name;
          return false;
        }
      }
      this.addTab();
    },

    // 点击头部切换
    tabCl(tab) {
      var ti = tab.index;
      var po = this.editableTabs[ti].navItem;

      this.$router.push(po);
    }
  },
  beforeCreate() {

  },
  		beforeRouteEnter:(to,from,next)=>{ 
        console.log(sessionStorage.getItem("Token"))
          if (sessionStorage.getItem("Token")!=null) {
            console.log(11111)
            	next()
          }else{
             console.log(22222)
              next(vm=>{
				vm.$router.push("/Login")
			})
    }
	}

};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#Home-base {
  height: 100%;
}
/deep/.el-container {
  height: 100%;
}

p {
  padding: 0px;
  margin: 0px;
}

.el-header,
.el-footer {
  border-bottom: 1px solid #ccc;
  padding: 0px;
  line-height: 60px;
  display: flex;
}

.el-aside {
  background-color: #545c64;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

// 右边
.right-top {
  width: 100%;
  height: 60px;

  background-color: #ffeb3a;
  display: flex;
}
.right-top img {
  border-radius: 50%;
  border: 1px solid #7ab162;
  width: 40px;
  height: 40px;
  margin: auto;
  box-shadow: 0px 0px 3px 4px #7ab162;
}
.right-top b {
  height: 60px;
  line-height: 60px;
  color: #079787;
  font-size: 18px;
}
.right-top p {
  display: inline-block;
  width: 40%;
  height: 100%;
  display: flex;
}
// 中间
.top {
  width: 40px;
  height: 100%;
  display: flex;
  background-color: #008181;
}
.top i {
  color: white;
  font-size: 28px;
  margin: auto;
}
/deep/.el-menu {
  background-color: #545c64;
  color: white;
}

/deep/.el-submenu__title,
/deep/.el-icon-menu {
  color: #ffffff;
}
/deep/.el-menu-item {
  color: white;
}

/deep/.el-submenu__title {
  width: 200px;
}

// 头部tabs
/deep/.el-tabs {
  line-height: 0px;
  margin-top: 18px;
  flex: 1;
  overflow: hidden;
}
/deep/.el-tabs--card > .el-tabs__header {
  margin: 0px;
  border: 0px;
}

.right {
  display: flex;
  justify-content: flex-end;
  div {
    width: 80px;
    display: flex;
    /deep/.el-avatar {
      margin: auto;
    }
  }
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom: 2px solid #409eff;
}
/deep/.el-menu-item.is-active {
  background: #373737 !important;
}
/deep/.el-menu-item.is-active::after {
  content: "◆";
  color: white;
  font-size: 40px;
  position: absolute;
  right: 0;
  margin-right: -12px;
}

/deep/.el-menu {
  border: 0px;
}
</style>