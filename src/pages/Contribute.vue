<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card plain>
            <h3 class="title">Contribute</h3>
            <el-form :model="contribute" class="register_container" label-position="left"
                     label-width="0px" :ref="contribute">
              <el-form-item>
<!--              <el-input :disabled="true" placeholder="会议名称：xxxx">-->
<!--                -->
<!--              </el-input>-->
                <el-autocomplete
                  v-model="state"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="Meeting Full Name..."
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item prop="username">
                <el-input type="text" v-model="contribute.fileTitle"
                          auto-complete="off" placeholder="Title......"></el-input>
              </el-form-item>
              <el-form-item prop="text">
                <el-input type="textarea" v-model="contribute.abstract"
                          auto-complete="off" placeholder="Abstract......"></el-input>
              </el-form-item>

              <el-form-item>
<!--                <el-upload-->
<!--                  class="upload-demo"-->
<!--                  ref="upload"-->
<!--                  accept="application/pdf"-->
<!--                  :before-upload="beforeUpload"-->
<!--                  drag-->
<!--                  show-file-list-->
<!--                  :file-list="fileList"-->
<!--                  :on-preview="handlePreview"-->
<!--                  :on-remove="handleRemove"-->
<!--                  :before-remove="beforeRemove"-->
<!--                  :limit="1"-->
<!--                  :auto-upload="true"-->
<!--                  :on-exceed="handleExceed"-->
<!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                  multiple>-->
<!--                  <i class="el-icon-upload"></i>-->
<!--                  <div class="el-upload__text">Drag your file here，or <em>click here</em></div>-->
<!--                  <div class="el-upload__tip" slot="tip">Caution: Only pdf files are permitted.</div>-->
<!--                </el-upload>-->

                <input class="file" type="file" title="请选择文件" value="请选择文件">
              </el-form-item>
              <el-form-item>
<!--                <div class="pdf" v-show="fileType === 'pdf'">-->
<!--                  <p class="arrow">-->
<!--                    <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span>-->
<!--                    {{currentPage}} / {{pageCount}}-->
<!--                    <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span>-->
<!--                  </p>-->
<!--                  <pdf-->
<!--                    :src="src"-->
<!--                  :page="currentPage"-->
<!--                  @num-pages="pageCount=$event"-->
<!--                  @page-loaded="currentPage=$event"-->
<!--                  @loaded="loadPdfHandler">-->
<!--                  </pdf>-->
<!--                </div>-->
                <el-button
                  class="view"
                  round
                  size="small"
                  @click="viewFile()"
                >预览文件</el-button>
              </el-form-item>
            </el-form>

            <div class="card-footer text-center">

              <n-button type="neutral" round size="lg" v-on:click="submit()">Confirm</n-button>
            </div>
          </card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { Card, FormGroupInput, Button } from '@/components'

  import axios from 'axios'
  import store from "../store"

  var formData = new FormData() // 声明一个FormData对象
  var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'

  export default {
    name: 'contribute',
    data () {
      const generateOpenedContributionConference = _ => {
        const conferences = [];
        // this.$axios.post('/meetingOpenedContribution')
        this.$axios.post('/allMeetings')
          .then(resp => {
            if (resp != null) {
              var response = resp.data
              response.forEach((meeting, index) => {
                var obj = {
                  meeting,
                  index
                }
                conferences.push({
                  value: meeting.fullName
                });
              })
              return conferences;
            } else return null;
          })
          .catch(error => {
            console.log(error)
            alert('get meetings error')
          })
        return conferences;
      };
      return {
        currentMeeting: '',
        selectAMeeting: generateOpenedContributionConference(),
        state: '',
        contribute: {
          fileTitle: '',
          abstract: ''
        },
        fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ],
        fileData: '',
        currentPage: 0,
        pageCount: 0,
        fileType: 'pdf',
        src: '/Users/wuyanjie/Desktop/系统之美（书）.pdf'
      }
    },
    components: {
      Card,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput
    },
    methods: {
      querySearchAsync(queryString, cb) {
        var selectAMeeting = this.selectAMeeting;
        var results = queryString ? selectAMeeting.filter(this.createStateFilter(queryString)) : selectAMeeting;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      handleSelect(item) {
        this.currentMeeting = item.value;
        console.log(item);
      },

      beforeUpload(file) {
        console.log("文件", file);
        this.file = file;
        this.fileName = file.name;
        this.fileSize = file.size;
        const isPdf = file.type === 'pdf';
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        if (!isPdf) {
          this.$message.error('上传头像图片只能是 pdf 格式!');
        }
        reader.onload = function() {
          that.fileData = reader.result;
          // console.log("fileData", reader.result);
          console.log("fileData", that.fileData);
        };
        return false; // 返回false不会自动上传
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      viewFile() {
        console.log("viewFile");
        var win = window.open();
        win.document.write(
          '<body style="margin:0px;"><object data="' +
          this.fileData +
          '" type="application/pdf" width="100%" height="100%"><iframe src="' +
          this.fileData +
          '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></object></body>'
        );
        // win.document.write(
        //   '<body style="margin:0px;"><iframe src="' +
        //     this.fileData +
        //     '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></body>'
        // );
      },
      uploadContract() {
        let fileFormData = new FormData();
        fileFormData.append("file", this.file);
        fileFormData.append("doc_title", this.fileName);
        uploadContract(fileFormData).then(res => {
          if (res.code === 200) {
            console.log("uploadContract", res);
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
      },
      submit: function() {
        formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        formData.append('user', store.state.userName)
        formData.append('meeting', this.currentMeeting)

        console.log("file:"+document.querySelector('input[type=file]').files[0].name)
        console.log("user:"+store.state.userName)
        console.log("meeting:"+this.currentMeeting)

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
          console.log(res.data);
        }) // 发送请求
      }
    }
  }
</script>

<style scoped>
</style>
