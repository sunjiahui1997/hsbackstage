<template>
  <div>
    <div class="header">
      <div class="logo2"><img src="../assets/产品.png" alt=""></div>
      <div class="header-name">硅酸钠</div>
      <div class="backHome" @click="backHome">返回</div>
    </div>
    <div class="line"></div>
    <div class="product-mess">
      <div class="form-group" id="name1">
        <div class="form-title">产品名称</div>
        <input
          type="text"
          name="name"
          v-model="name"
          placeholder="请输入产品名称"
        />
      </div>
      <div class="form-group" id="">
        <div class="form-title">产品序号</div>
        <input
          type="text"
          name="id"
          v-model="xh"
          placeholder="请输入产品序号"
        />
      </div>
    </div>
    <div class="params1">参数配置</div>
    <div class="params">
      <div class="param-item">
        <div class="param-title">模数</div>
        <input v-model="par.ms" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">比重</div>
        <input v-model="par.bz" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">浓度</div>
        <input v-model="par.nd" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">说明</div>
        <input v-model="par.show" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">分子式</div>
        <input v-model="par.fzs" type="text" />
      </div>
      <div class="param-item">
        <div class="param-title">外观</div>
        <input v-model="par.wg" type="text" />
      </div>
    </div>

    <div class="img1">添加图片</div>
    <div class="h">
      <div class="btn2" @click="subbmit">发布</div>
      <div class="btn2">取消</div>
    </div>
    <div class="img3">
      <el-upload
        action="http://122.114.162.87:8080/system/api/upload"
        :auto-upload="false"
        :on-change="changup"
        :data="resData"
        :limit="1"
        ref="upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      name: "",
      xh: "",
      p: "",
      form1: [],
      elId: "",
      dialogImageUrl: "",
      dialogVisible: false,
      par: {
        ms: "",
        fzs: "",
        wg: "",
        show: "",
        nd: "",
        bz:''
      },
      file:'',
      imgUrl:"",
      resData:{
        id:this.elId
      }
    };
  },
  props: {},
  inject: ["reload"],
  created() {
    this.elId = uuidv4();
    this.resData.id = this.elId
  },
  methods: {
    backHome() {
      this.$router.push("/backstage/product");
    },
    add() {
      if (this.p === "") {
        alert("请输入内容");
      } else {
        this.form1.push({ name: this.name2, canshu: this.p });
        this.p = "";
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    subbmit() {
      var m;
      var d;
      var h;
      var i;
      var s;
      const now = new Date();
      const year = now.getFullYear();
      var month = now.getMonth() + 1;
      if (month < 10) {
        m = "0" + month;
      } else {
        m = month;
      }
      const day = now.getDate();
      if (day < 10) {
        d = "0" + day;
      } else {
        d = day;
      }
      const hour = now.getHours();
      if (hour < 10) {
        h = "0" + hour;
      } else {
        h = hour;
      }
      const minutes = now.getMinutes();
      if (minutes < 10) {
        i = "0" + minutes;
      } else {
        i = minutes;
      }
      const second = now.getSeconds();
      if (second < 10) {
        s = "0" + second;
      } else {
        s = second;
      }
      const time = year + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;

      this.$refs.upload.submit();
      // console.log(time);
      axios
        .post("http://122.114.162.87:8080/system/api/jscpzxadd", {
          id: this.elId,
          name: this.name,
          xh: this.xh,
          jgTime: time,
          fzs: this.par.fzs,
          wg: this.par.wg,
          show: this.par.show,
          ms: this.par.ms,
          nd: this.par.nd,
          bz:this.par.bz,
          type: "0"
        })
        .then((response)=> {
          console.log(response); //成功
          alert("添加成功");
          this.$router.push("/backstage/product");
        })
        .catch(function(error) {
          console.log(error); //失败
        });
      this.reload();
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
  font-size: 22px;
  margin: 40px 0px 20px 40px;
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
.btn2 {
  width: 100px;
  height: 60px;
  color: white;
  background-color: #4489b0;
  margin-right: 30px;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.h {
  display: flex;
  position: relative;
  top: 300px;
  left: 1100px;
}
.img3 {
  position: relative;
  top: 50px;
  left: 100px;
}
.param-item {
  display: flex;
}
.param-title {
  line-height: 30px;
  margin: 20px 20px 0 40px;
}
</style>