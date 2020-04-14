<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-btn
          color="pink"
          fab
          fixed
          right
          large
          @click="openApplyPage"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="fileTitle"
            :rules="nameRules"
            :counter="10"
            label="File Title"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          outlined
          auto-grow
          name="input-7-4"
          label="File Abstract"
          v-model="fileAbstract"
        ></v-textarea>
      </v-row>
      <v-row>
        <v-file-input accept=".pdf" label="File input"></v-file-input>
      </v-row>
      <v-row>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="submit"
        >
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="uploadFile"
        >
          Preview
        </v-btn>
      </v-row>
      <div class="canvas-container">
        <canvas ref="myCanvas" class="pdf-container col-md-10 ml-auto mr-auto">
        </canvas>
      </div>
    </v-container>
  </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import pdfJS from 'pdfjs-dist'
  import axios from 'axios'
  import store from "../store"

  var formData = new FormData() // 声明一个FormData对象
  var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'

  export default {
    data (){
      return {
        meetingName: this.$route.params.id,
        pdfData: '', // PDF的base64
        scale: 2, // 缩放值
        select: null,
        valid: '',
        fileTitle: '',
        fileAbstract: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
      }
    },
    methods:{
      openApplyPage:function(){
        this.$router.replace({path: '/applyMeeting'})
      },
      submit: function () {
        formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        formData.append('user', store.state.userName)
        formData.append('meeting', this.meetingName)
        formData.append('fileTitle', this.fileTitle)
        formData.append('fileAbstract', this.fileAbstract)

        console.log("file:" + document.querySelector('input[type=file]').files[0].name)
        console.log("user:" + store.state.userName)
        console.log("meeting:" + 'TongjiConference2020')
        console.log("title:" + this.fileTitle)
        console.log("abstract:" + this.fileAbstract)

            axios({
              url: '/uploadwork',
              data: formData,
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then((res) => {
              console.log(res.data);
              alert('Success')
              location.reload()
            })
              .catch(error => {
                console.log(error)
                alert('Fail to upload')
              })
        },
      uploadFile () {
        let file =  document.querySelector('input[type=file]').files[0]
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
