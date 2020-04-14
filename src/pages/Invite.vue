<template>
    <v-app id="inspire">
      <v-content>
        <v-container fluid>
          <h1 class="title">Invite</h1>
          <p>当前会议：{{meetingName}}</p>

        <v-card plain >
            <el-transfer
              style="text-align: left;display: inline-block"
              v-model="selectList"
              filterable
              :filter-method="dataFilter"
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
          <div class="card-footer text-center">
<!--            <n-button type="neutral" round size="lg" v-on:click="invite()">Confirm</n-button>-->
          </div>
        </v-card>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
  import store from '../store'
  export default {
    name: 'Invite',
    data () {
      const generateData = _ => {
        const data = [];
        this.$axios.post('/notInvitedUsers',this.$route.params.id)
          .then(resp => {
            if (resp != null) {
              var response = resp.data
              response.forEach((user, index) => {
                var obj = {
                  user,
                  index
                }
                data.push({
                  identity: user.fullname,
                  label: "("+user.fullname+")"+user.affiliation + " " + user.region,
                  key: user.username, // 无奈之举！后续可以把 key 还原为 index，通过 index map 到 label
                  disabled: user.username === store.state.userName || user.username === 'admin'
                });
              })
            }
          })
          .catch(error =>{
            console.log(error)
            // alert('get users error')
          })

        this.$axios.post('/alreadyInvitedUsers',this.$route.params.id)
          .then(resp => {
            if (resp != null) {
              var response = resp.data
              response.forEach((user, index) => {
                var obj = {
                  user,
                  index
                }
                data.push({
                  identity: user.fullname,
                  label: "("+user.fullname+")"+user.affiliation + " " + user.region,
                  key: user.username,
                  disabled: true
                });
              })
            }
          })
          .catch(error =>{
            console.log(error)
          })
        return data;
      };
      return {
        meetingName: this.$route.params.id,
        // selectAMeeting: generateAppliedConference(),
        state: '',
        timeout:  null,
        data: generateData(),
        selectList: [], // selectList: [1], 效果是第2个条目自动在右边 => selectList v-model
        renderFunc(h, option) {
          return <span> { option.key } - { option.label }</span>;
        }
      };
    },
    methods :{
      invite() {
        this.$axios.post('/invite',{
          chair: store.state.userName,
          meetingName: this.meetingName,
          pcMemberNames: this.selectList,
        })//未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              // alert('successful Invitation')
              location.reload()
              this.$route.replace('workspace')
            } else {
              // alert('invite error')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
