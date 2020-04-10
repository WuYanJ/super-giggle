<template>
  <div>
    <div class="con">
      <div class="tip">选择文件：</div>
      <input class="file" type="file" title="请选择文件" value="请选择文件">
      <div class="tip">输入姓名：</div>
      <input class="inputS" type="text" v-model="name" placeholder="请在此输入姓名">
      <button class="submit" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  var formData = new FormData() // 声明一个FormData对象
  var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
  export default {
    name: 'pdfTest',
    data() {
      return {
        name: '',
        // file: ''
      }
    },
    methods: {
      submit: function() {
        formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        formData.append('user',this.name)

        console.log("file:"+document.querySelector('input[type=file]').files[0].name)
        console.log("user:"+this.name)

        //'userfile'是formData这个对象的键名
        axios({
          url: '/uploadwork',   //****: 你的ip地址
          data: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
            //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
          }
        }).then((res) => {
          console.log("res ok")
          console.log(res.data);
        }) // 发送请求
      },
    }
  }
</script>

<style scoped>
</style>
