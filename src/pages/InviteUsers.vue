<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-btn
          color="pink"
          fab
          absolute
          right
          large
          @click="openApplyPage"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <h1>Invite PC Members</h1>
        <v-btn large>{{meetingName}}</v-btn>
          <card-test
            @selectListFunction="invite"
            :_selectList="selectList"
            :_items="users"
            :_item-per-page="4"
          >
          </card-test>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import store from '../store'
  import CardTest from './CardTest'
  export default {
    name: 'InviteUsers',
    components:{
      CardTest
    },
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
                  username: user.username,
                  affiliation: user.affiliation,
                  email: user.email, // 无奈之举！后续可以把 key 还原为 index，通过 index map 到 label
                  checkbox: user.username === store.state.userName || user.username === 'admin'
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
                  username: user.username,
                  affiliation: user.affiliation,
                  email: user.email, // 无奈之举！后续可以把 key 还原为 index，通过 index map 到 label
                  checkbox: true
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
        users: generateData(),
        meetingName: this.$route.params.id,
        selectList: [], // selectList: [1], 效果是第2个条目自动在右边 => selectList v-model
      };
    },
    methods :{
      openApplyPage:function(){
        this.$router.replace({path: '/applyMeeting'})
      },
      invite(selectList) {
        this.selectList = selectList
        this.$axios.post('/invite',{
          chair: store.state.userName,
          meetingName: this.$route.params.id,
          pcMemberNames: this.selectList,
        })//未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              alert('successful Invitation')
              this.$router.push('/workspace')
              location.reload()
            } else {
              alert('invite error')
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
