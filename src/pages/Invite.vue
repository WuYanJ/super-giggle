<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-12 ml-auto mr-auto">
          <card plain >
            <h1 class="title">Invite</h1>
            <p style="text-align: center; margin: 0 0 20px">邀请数据库中已注册用户成为该会议的 PC Member </p>
            <div class="col-md-6 ml-auto mr-auto" >
              <v-expansion-panels>
                <v-expansion-panel
                >
                  <v-expansion-panel-header>Conference Info</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Abbr Name:
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    Full Name:
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    Date:
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    Submit Due Date:
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    Result Release Date:
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    Spot:
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
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
<!--                <el-button class="transfer-footer"  v-on:click="submit()" slot="right-footer" size="small">Confirm</el-button>-->
              </el-transfer>
            </div>
            <div class="card-footer text-center">
              <n-button type="neutral" round size="lg" v-on:click="invite()">Confirm</n-button>
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
          return'<span>{ options.key } - { options.label }</span>';
        }
      };
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      invite() {
        this.$axios.post('/invite')//未实现
          .then(resp => {
          })
          .catch(error => {
            console.log(error)
          })
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
