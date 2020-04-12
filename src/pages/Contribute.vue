<template>
  <div class=" clear-filter" filter-color="orange">
    <div
      class="page-header-image"
    ></div>
    <div class="content">
      <div class="container" >
        <div class="col-md-8 ml-auto mr-auto">
          <card plain style="margin-top: 200px">
            <h1 class="title" style="color: white">Contribute</h1>
            <el-form :model="contribute" class="register_container" label-position="left"
                     :rules="rules"
                     label-width="0px" ref="contribute">
              <el-form-item>
                <el-autocomplete
                  v-model="state"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="Meeting Full Name..."
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item prop="fileTitle">
                <el-input type="text" v-model="contribute.fileTitle"
                          auto-complete="off" placeholder="Title......"></el-input>
              </el-form-item>
              <el-form-item prop="abstract">
                <el-input type="textarea" v-model="contribute.abstract"
                          auto-complete="off" placeholder="Abstract......"></el-input>
              </el-form-item>

              <el-form-item>
                <input class="file"
                       type="file"
                       title="请选择文件"
                       value="请选择文件"
                       ref="fileInput"
                       accept=".pdf"
                       @change="uploadFile"
                >
              </el-form-item>
            </el-form>

            <div class="card-footer text-center">

              <n-button type="neutral" round size="lg" v-on:click="submit()">Confirm</n-button>
            </div>
          </card>
          <div class="canvas-container">
            <canvas ref="myCanvas" class="pdf-container col-md-10 ml-auto mr-auto">
            </canvas>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script >
  import pdfJS from 'pdfjs-dist'
  import { Card, FormGroupInput, Button } from '@/components'
  import axios from 'axios'
  import store from "../store"

  var formData = new FormData() // 声明一个FormData对象
  var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'

  export default {
    name: 'contribute',
    data () {
      const dataValid = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('can\'t be empty'))
        }
        return callback()
      }
      const nameValid = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('can\'t be empty'))
        } else {
          // eslint-disable-next-line no-useless-escape
          let reg = /^[a-zA-Z\-][a-zA-Z0-9_\-]*$/
          if (!reg.test(value)) {
            return callback(new Error('只能包含字母，数字或两种特殊字符(-_)且只能以字母或-开头'))
          }
        }
        return callback()
      }
      const generateOpenedContributionConference = _ => {
        const conferences = [];
        this.$axios.post('/meetingOpenedContribution', store.state.userName)
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
          })
        return conferences;
      };
      return {
        pdfData: '', // PDF的base64
        scale: 2, // 缩放值
        currentMeeting: '',
        selectAMeeting: generateOpenedContributionConference(),
        state: '',
        contribute: {
          fileTitle: '',
          abstract: ''
        },
        rules: {
          fileTitle: [
            {required: true, message: 'Fill in file title', trigger: 'blur'},
            {min: 5, max: 50},
            {validator: nameValid, trigger: 'blur'},
            {validator: dataValid, trigger: 'blur'}
          ],
          abstract: [
            {required: true, message: 'Fill in abstract', trigger: 'blur'},
            {min: 5, max: 80},
            {validator: nameValid, trigger: 'blur'},
            {validator: dataValid, trigger: 'blur'}
          ]
        },
        // fileList: [
        //   {
        //     name: 'food.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        //   },
        //   {
        //     name: 'food2.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        //   }
        // ],
        // fileData: '',
        // currentPage: 0,
        pageCount: 0,
        fileType: 'pdf',
        // src: '/Users/wuyanjie/Desktop/系统之美（书）.pdf'
      }
    },
    components: {
      Card,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput
    },
    methods: {
      querySearchAsync (queryString, cb) {
        var selectAMeeting = this.selectAMeeting;
        var results = queryString ? selectAMeeting.filter(this.createStateFilter(queryString)) : selectAMeeting;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
          return (state) => {
            return (state.abbrName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
      handleSelect (item) {
        this.currentMeeting = item.value;
        console.log(item);
      },

      submit: function () {
        formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        formData.append('user', store.state.userName)
        formData.append('meeting', this.currentMeeting)
        formData.append('fileTitle', this.contribute.fileTitle)
        formData.append('fileAbstract', this.contribute.abstract)

        console.log("file:" + document.querySelector('input[type=file]').files[0].name)
        console.log("user:" + store.state.userName)
        console.log("meeting:" + this.currentMeeting)
        console.log("title:" + this.contribute.fileTitle)
        console.log("abstract:" + this.contribute.abstract)
        this.$refs.contribute.validate(valid => {
          if (valid) {
            axios({
              url: '/uploadwork',
              data: formData,
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then((res) => {
              console.log(res.data);
            })
              .catch(error => {
                console.log(error)
                alert('Meeting Has Been Applied')
              })
          } else alert("表单填写不完整")
        })
      },

      uploadFile () {
        let inputDom = this.$refs.fileInput
        let file = inputDom.files[0]
        console.log(file.name)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.pdfData = atob(reader.result.substring(reader.result.indexOf(',') + 1))
          this.previewPDF()
        }
      },
      previewPDF () {
        // 引入pdf.js的字体
        let CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/'
        //读取base64的pdf流文件
        let loadingTask = pdfJS.getDocument({
          data: this.pdfData, // PDF base64编码
          cMapUrl: CMAP_URL,
          cMapPacked: true
        })
        loadingTask.promise.then((pdf) => {
          this.loadFinished = true
          let numPages = pdf.numPages
          let pageNumber = 1
          this.getPage(pdf, pageNumber, numPages)
        })
      },
      getPage (pdf, pageNumber, numPages) {
        let _this = this
        pdf.getPage(pageNumber)
          .then((page) => {
            // 获取DOM中为预览PDF准备好的canvasDOM对象
            let canvas = this.$refs.myCanvas
            let viewport = page.getViewport(_this.scale)
            canvas.height = viewport.height
            canvas.width = viewport.width

            let ctx = canvas.getContext('2d')
            let renderContext = {
              canvasContext: ctx,
              viewport: viewport
            }
            page.render(renderContext)
              .then(() => {
              pageNumber += 1
              if (pageNumber <= 1) {
                _this.getPage(pdf, pageNumber, numPages)
              }
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
