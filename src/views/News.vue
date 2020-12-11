<template>
  <div>
    <div class="black" v-if="black"></div>
    <div class="header">
      <div class="logo2"><img src="../assets/新闻01.png" alt="" /></div>
      <div class="header-name">新闻中心</div>
    </div>
    <div class="line"></div>
    <div class="product-mess">
      <div class="form-group" id="name1">
        <div class="form-title">新闻标题 :</div>
        <input type="text" name="name" v-model="form.name" />
      </div>
      <div class="form-group" id="name1">
        <div class="form-title">查询时间 :</div>
        <el-date-picker
          v-model="form.time1"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
        <div id="line2"></div>
        <el-date-picker
          v-model="form.time2"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="btn">
      <div class="btn1" @click="search(1)">查询</div>
      <div class="dropdown">
        <div class="item3" @click="showDrop">发布新闻</div>
        <div id="item2" v-if="show">
          <div class="item1">
            <router-link to="/backstage/addnew">图文</router-link>
          </div>
          <div class="item1">
            <router-link to="/backstage/addvideo">视频</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="table1">
      <table border="1">
        <thead>
          <tr id="thead">
            <th id="img6">图片</th>
            <th id="name">新闻标题</th>
            <th id="category">上传时间</th>
            <th id="op">操作</th>
          </tr>
        </thead>
        <tr v-for="(item, index) in list" :key="index">
          <td><img :src="item.ip" alt="" /></td>
          <td>{{ item.title }}</td>
          <td>{{ item.time }}</td>
          <td>
            <button class="btnn2" @click="edit(item)">编辑</button
            ><button class="btnn2" @click="delate(item.id)">删除</button>
          </td>
        </tr>
        <tbody></tbody>
      </table>
      <div class="pageNo" v-if="total3">
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange2"
          >
          </el-pagination>
        </div>
      </div>
      <div class="pageNo" v-if="total2">
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="total0"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
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
        time1: "",
        time2: ""
      },
      show: false,
      black: false,
      list: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      total0: 0,
      total3: true,
      total2: false
    };
  },
  inject: ["reload"],
  methods: {
    additem() {
      this.$router.push("/addpro");
    },
    showDrop() {
      // document.getElementById('item2').style.visibility = 'visible'
      this.show = !this.show;
      this.black = !this.black;
    },
    getList(val) {
      axios
        .post("http://122.114.162.87:8080/system/api/xwzxList", {
          pageIndex: val,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res);
          this.total = res.data.result.total;
          this.list = res.data.result.rowsList;
          console.log(res.data.result.rowsList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange2(val) {
      this.getList(val);
    },
    handleCurrentChange(val) {
      this.search(val);
    },
    delate(iid) {
      var x;
      var r = confirm("确认删除？");
      if (r) {
        axios.post(
          // `http://122.114.162.87:8080/system/api/xwzxdelete?id=${iid}`
          "http://122.114.162.87:8080/system/api/jscpzxdelete",
          {
            id: iid
          }
        );
        this.reload();
      } else {
      }
    },
    search(val) {
      console.log(this.form.time1);
      this.total3 = false;
      this.total2 = true;
      axios
        .post("http://122.114.162.87:8080/system/api/xwzxList", {
          pageIndex: val,
          pageSize: this.pageSize,
          title: this.form.name,
          startTime: this.form.time1,
          endTime: this.form.time2
        })
        .then(res => {
          // console.log(res.data.result.total);
          this.total0 = res.data.result.total;
          this.list = res.data.result.rowsList;
          console.log(res.data.result.rowsList);
          // this.pro.push(...res.data.result.rowsList);
          // console.log(this.pro);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    edit(item) {
      console.log(item);
      this.$router.push({
        path: "/backstage/editnews",
        query: {
          id: item.id,
          title: item.title,
          content: item.content,
          ip: item.ip1
        }
      });
    }
  },
  mounted() {
    this.getList(1);
  }
};
</script>

<style scoped>
.form-group {
  display: flex;
  margin-right: 70px;
}
.logo2 {
  position: relative;
  top: 35px;
  left: 40px;
}
.pageNo {
  position: relative;
  margin: 30px 0 30px 100px;
}
.header-name {
  color: black;
  font-size: 30px;
  line-height: 100px;
  position: relative;
  left: 60px;
}
.header {
  display: flex;
}
.line {
  width: 1720px;
  border: 1px solid rgb(201, 201, 201);
}
.product-mess {
  display: flex;
  font-size: 22px;
  position: relative;
  top: 40px;
  left: 40px;
}
input {
  height: 50px;
  margin-left: 20px;
}
.form-title {
  line-height: 50px;
}
.btn {
  display: flex;
  position: relative;
  top: 70px;
  right: -50px;
}
.btn1 {
  width: 150px;
  height: 50px;
  background-color: #4489b0;
  text-align: center;
  color: white;
  cursor: pointer;
  line-height: 50px;
  margin: 0 50px;
  font-size: 23px;
  position: relative;
  /* top: 80px; */
}
.table1 {
  position: relative;
  top: 150px;
}
.dropdown {
  display: flex;
  width: 200px;
  flex-wrap: wrap;
}
#line2 {
  width: 25px;
  /* border: none; */
  border-bottom: 1px solid black;
  /* padding-bottom: 20px; */
  margin: 0 10px 30px 20px;
}
.item1 {
  background-color: rgb(242, 242, 242);
  color: black;
  width: 150px;
  text-align: center;
  line-height: 50px;
  font-size: 23px;
}
.dropdown {
  position: absolute;
  left: 250px;
  z-index: 1000;
  cursor: pointer;
}
.black {
  position: absolute;
  background-color: black;
  opacity: 0.6;
  width: 1720px;
  height: 1000px;
  z-index: 900;
  /* visibility: hidden; */
}
.item3 {
  background-color: #4489b0;
  color: white;
  width: 150px;
  text-align: center;
  line-height: 50px;
  font-size: 23px;
}
td {
  border: 0px;
}
table {
  border-collapse: collapse;
}
td,
th,
tr {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 16px;
  border: 1px solid #e2e2e2;
}
th {
  width: 350px;
  height: 50px;
  font-size: 20px;
}
#name {
  width: 500px;
}
</style>