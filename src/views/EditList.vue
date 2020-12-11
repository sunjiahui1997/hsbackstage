<template>
  <div>
    <div class="header">
      <div class="logo2"></div>
      <div class="header-name">{{ canshu1.lx | cate }}</div>
      <div class="backHome" @click="backHome">返回</div>
    </div>
    <div class="line"></div>
    <div class="product-mess">
      <div class="form-group" id="name1">
        <div class="form-title">产品名称</div>
        <input
          type="text"
          name="name"
          v-model="canshu1.name"
          placeholder="请输入产品名称"
        />
      </div>
      <div class="form-group" id="name1">
        <div class="form-title">产品序号</div>
        <input
          type="text"
          name="id"
          v-model="canshu1.xh"
          placeholder="请输入产品序号"
        />
      </div>
    </div>
    <div class="params1">参数配置</div>
    <div class="params">
      <div class="param-item">
        <div class="param-title">模数</div>
        <input v-model="canshu1.ms" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">比重</div>
        <input v-model="canshu1.bz" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">浓度</div>
        <input v-model="canshu1.nd" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">说明</div>
        <input v-model="canshu1.show" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">分子式</div>
        <input v-model="canshu1.fzs" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">外观</div>
        <input v-model="canshu1.wg" type="text" />
      </div>
    </div>
    <div class="img1">添加图片</div>
    <div class="h">
      <div class="btn2" @click="subbmit3">发布修改</div>
      <div class="btn2">取消</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        id: ""
      },
      name2: "",
      p: "",
      form1: [],
      // id: this.$route.params.id
      canshu1: "",
      par: {
        ms: "",
        fzs: "",
        wg: "",
        show: "",
        nd: "",
        bz: ""
      }
    };
  },
  props: {},
  created() {
    console.log(this.$route.query);
    this.canshu1 = this.$route.query;
  },
  methods: {
    backHome() {
      this.$router.push("/backstage/product");
    },
    handleClick(row) {
      console.log(row);
    },
    subbmit3() {
      axios
        .post("http://122.114.162.87:8080/system/api/jscpzxupdate", {
          id:this.canshu1.id,
          name: this.canshu1.name,
          xh: this.canshu1.xh,
          fzs: this.canshu1.fzs,
          wg: this.canshu1.wg,
          show: this.canshu1.show,
          ms: this.canshu1.ms,
          nd: this.canshu1.nd,
          bz: this.canshu1.bz,
          lx: this.canshu1.lx
        })
        .then(response => {
          console.log(response); //成功
          alert("添加成功");
          this.$router.push("/product");
        })
        .catch(function(error) {
          console.log(error); //失败
        });
    }
  },
  filters: {
    cate(val) {
      if (val === "0") {
        val = "硅酸钠";
      } else if (val === "1") {
        val = "硅酸钾";
      } else if (val === "2") {
        val = "硅酸钾钠";
      }
      return val;
    }
  }
};
</script>

<style scoped>
.form-group {
  /* display: flex; */
  margin-right: 70px;
}
.logo2 {
  position: relative;
  top: 35px;
  left: 40px;
}
.header-name {
  color: black;
  font-size: 30px;
  line-height: 100px;
  position: relative;
  left: 60px;
}
.posi {
  position: absolute;
  right: 500px;
  top: 230px;
}
.header {
  display: flex;
}
ul li {
  list-style: none;
}
.line {
  width: 1720px;
  border: 1px solid rgb(201, 201, 201);
}
.product-mess {
  /* display: flex; */
  font-size: 22px;
  position: relative;
  top: 20px;
  left: 40px;
}
.backHome {
  width: 130px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  background-color: #4489b0;
  color: white;
  cursor: pointer;
  position: relative;
  right: -1300px;
  top: 25px;
}
input {
  width: 270px;
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  padding-left: 10px;
  outline: none;
  font-size: 18px;
  margin-top: 10px;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #999999;
}
.form-title {
  margin-top: 20px;
}
.params1 {
  font-size: 20px;
  position: relative;
  top: 40px;
  left: 45px;
}
.params {
  position: relative;
  top: 60px;
}
.module {
  width: 100px;
  height: 70px;
}
#select1 {
  text-align: center;
  width: 130px;
  height: 50px;
  font-size: 18px;
  padding-left: 7px;
  margin-left: 40px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  outline: none;
}
.select2 {
  text-align: center;
  font-size: 18px;
}
#param {
  border: none;
  border-bottom: 1px solid #cccccc;
  text-align: center;
  margin: 0 30px;
  width: 450px;
}
img {
  width: 40px;
  height: 40px;
  margin-left: 19px;
  cursor: pointer;
}
.img1 {
  font-size: 20px;
  position: relative;
  left: 45px;
  top: 100px;
}
.param-item {
  display: flex;
}
.param-title {
  line-height: 30px;
  margin: 20px 20px 0 40px;
}
.h {
  display: flex;
  position: relative;
  top: 300px;
  left: 1100px;
}
.btn2 {
  width: 100px;
  height: 60px;
  color: white;
  background-color: #cccccc;
  margin-right: 30px;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.img3 {
  position: relative;
  top: 50px;
  left: 100px;
}
</style>