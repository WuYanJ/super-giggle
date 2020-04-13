<template>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now();
          },
        },
        value1: '',
        value2: '',
      };
    }
  }
</script>
