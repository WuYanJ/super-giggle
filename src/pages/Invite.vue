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
            <br>
            <br>
            <div class="col-md-6 ml-auto mr-auto" >
              <v-expansion-panels>
                <v-expansion-panel
                >
                  <v-expansion-panel-header>{{meetingName}}</v-expansion-panel-header>
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
<!--            穿梭框部分-->
            <div class="col-md-12 ml-auto mr-auto" >
              <el-transfer
                style="text-align: left;display: inline-block"
                v-model="selectList"
                filterable
                :render-content="renderFunc"
                :titles="['All users', 'PC member']"
                :button-texts="['delete', 'select']"
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
        this.$axios.post('/allUsers')
          .then(resp => {
            var response = resp.data
            response.forEach((username, index) => {
              var obj={
                username,
                index
              }
              data.push({
                label: username,
                key: username, // 无奈之举！后续可以把 key 还原为 index，通过 index map 到 label
              });
            })
            return data;
          })
          .catch(error =>{
            console.log(error)
            alert('get users error')
          })
        return data;
      };

      return {
        meetingName: 'AAA',
        data: generateData(),
        selectList: [], // selectList: [1], 效果是第2个条目自动在右边 => selectList v-model
        renderFunc(h, option) {
          return <span> { option.key } - { option.label }</span>;
        }
      };
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      invite() {
        this.$axios.post('/invite',{
          meetingName: this.meetingName,
          pcMemberNames: this.selectList,
        })//未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              alert('successful Invitation')
            } else {
              alert('invite error')
            }
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
