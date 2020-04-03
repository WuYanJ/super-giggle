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
              <el-input :disabled="true" placeholder="会议名称：xxxx">
              </el-input>
              </el-form-item>
              <el-form-item prop="username">
                <el-input type="text" v-model="contribute.fileTitle"
                          auto-complete="off" placeholder="Title......"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="textarea" v-model="contribute.abstract"
                          auto-complete="off" placeholder="Abstract......"></el-input>
              </el-form-item>

              <el-form-item>
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drag your file here，or <em>click here</em></div>
                  <div class="el-upload__tip" slot="tip">Caution: Only pdf files are permitted.</div>
                </el-upload>
              </el-form-item>


              <div class="clearfix"></div>
            </el-form>
            <div class="card-footer text-center">
              <n-button type="neutral" round size="lg" v-on:click="submit(contribute)">Confirm</n-button>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Card, FormGroupInput, Button } from '@/components'
  export default {
    name: 'contribute',
    data () {
      return {
        contribute: {
          fileTitle: '',
          abstract: ''
        },
        fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    components: {
      Card,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput
    },
    methods: {
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
      }
    }
  }
</script>

<style scoped>
</style>
