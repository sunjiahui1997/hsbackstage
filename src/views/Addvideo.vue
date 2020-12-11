<template>
  <div>
      <div class="tixing">时长限制(0.5-15分钟)</div>
    <div class="header">
      <div class="logo2"><img src="../assets/新闻01.png" alt=""></div>
      <div class="header-name">发布新闻</div>
      <div class="backHome" @click="backHome">返回</div>
    </div>
    <div class="line"></div>
    <div class="new">
      <div>
        <input id="title" type="text" placeholder="请输入标题，5~60字" />
      </div>
      <div class="upload">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="article"
          placeholder="请输入文章详情"
        ></textarea>
        <div class="time">
          <div class="block">
            <span class="demonstration">请选择日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="h">
        <div class="btn2" @click="subbmit">发布</div>
        <div class="btn2">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      value1: ""
    };
  },
  props: {},
  created() {},
  methods: {
    backHome() {
      this.$router.push("/backstage/product");
    },
    handleRemove(file) {
      console.log(file);
    },
    add() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    subbmit() {
      console.log(this.value1);
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
.new {
  position: absolute;
  left: 500px;
  width: 550px;
  top: 180px;
  /* border: 1px solid black; */
  height: auto;
}
#title {
  margin-top: 10px;
  width: 550px;
  font-size: 27px;
  border: none;
  border-bottom: 1px black solid;
}
.upload {
  margin: 20px 20px 20px 200px;
}
.article {
  width: 1000px;
  font-size: 20px;
  height: 600px;
  padding: 5px 0px 0px 10px;
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
.h {
  display: flex;
  position: relative;
  margin: 20px 0px 120px 100px;
  /* top: 300px; */
  /* left: 1100px; */
}
.time{
  margin: 30px 0;
}
.tixing{
    position: absolute;
    color: cadetblue;
    font-size: 14px;
    left: 300px;
    top: 300px;
}
</style>