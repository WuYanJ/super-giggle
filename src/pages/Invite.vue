<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-12 ml-auto mr-auto">
          <card plain >
            <h3 class="title">Invite</h3>
            <p style="text-align: center; margin: 0 0 20px">邀请数据库中已注册用户成为该会议的 PC Member </p>
            <div class="col-md-12 ml-auto mr-auto" >
              <el-transfer
                style="text-align: left;display: inline-block"
                v-model="value"
                filterable
                :left-default-checked="[2, 3]"
                :right-default-checked="[1]"
                :render-content="renderFunc"
                :titles="['Source', 'Target']"
                :button-texts="['Delete', 'Select']"
                :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'}"
                @change="handleChange"
                :data="data">
                <el-button class="transfer-footer"  v-on:click="submit()" slot="right-footer" size="small">Confirm</el-button>
              </el-transfer>
            </div>
<!--            <div class="card-footer text-center">-->
<!--              <n-button type="neutral" round size="lg" v-on:click="submit(contribute)">Confirm</n-button>-->
<!--            </div>-->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Card, FormGroupInput, Button } from '@/components'
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1],
        value4: [1],
        renderFunc(h, option) {
          return '<span>{ option.key } - { option.label }</span>';
        }
      };
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      submit() {
        alert('ok')
      }
    },
    components: {
      Card, FormGroupInput,
      [Button.name]: Button
    }
  };
</script>

<style scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
