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
            <p>当前会议：{{meetingName}}</p>
            <br>
            <br>
            <div class="col-md-12 ml-auto mr-auto">
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="Meeting Full Name..."
                @select="handleSelect"
                required
              ></el-autocomplete>

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
  import store from "./../store"
  import { Card, FormGroupInput, Button } from '@/components'
  export default {
    data() {
      const generateAppliedConference = _ => {
        const conferences = [];
        this.$axios.post('/meetingIApplied', store.state.userName)
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
        meetingName: '',
        selectAMeeting: generateAppliedConference(),
        state: '',
        timeout:  null,
        data: [],
        selectList: [], // selectList: [1], 效果是第2个条目自动在右边 => selectList v-model
        renderFunc(h, option) {
          return <span> { option.key } - { option.label }</span>;
        }
      };
    },
    methods: {
      generateData() {
        const data = [];
        this.$axios.post('/notInvitedUsers',this.meetingName)
          .then(resp => {
            var response = resp.data
            response.forEach((user, index) => {
              var obj={
                user,
                index
              }
              data.push({
                label: user.affiliation+"-"+user.region+"-"+user.email,
                key: user.username, // 无奈之举！后续可以把 key 还原为 index，通过 index map 到 label
                disabled: user.username === store.state.userName || user.username === 'admin'

              });
            })
          })
          .catch(error =>{
            console.log(error)
            alert('get users error')
          })

        this.$axios.post('/alreadyInvitedUsers',this.meetingName)
          .then(resp => {
            var response = resp.data
            response.forEach((user, index) => {
              var obj = {
                user,
                index
              }
              data.push({
                label: user.username,
                key: user.username, // 无奈之举！后续可以把 key 还原为 index，通过 index map 到 label
                disabled: true
              });
            })
          })
          .catch(error =>{
            console.log(error)
          })
        return data;
      },
      querySearchAsync(queryString, cb) {
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
      handleSelect(item) {
        this.meetingName = item.value;
        this.data = this.generateData()
        console.log(item);
      },
      handleChange(abbrName, direction, movedKeys) {
        console.log(abbrName, direction, movedKeys);
      },
      invite() {
        this.$axios.post('/invite',{
          chair: store.state.userName,
          meetingName: this.meetingName,
          pcMemberNames: this.selectList,
        })//未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              alert('successful Invitation')
              this.$router.replace('workspace')
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
