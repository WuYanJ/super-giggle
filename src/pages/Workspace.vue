<template>
  <v-app id="inspire">
    <v-content>
        <v-container fluid>
          <h1 >My Meeting</h1>
            <displayList
              @wantToEatApple="inviteButton"
              @wantToAllContribute="allowContribute"
              :_items="myConferences"
              :_item-per-page="4"
            >
            </displayList>

          <h1>New Invitations</h1>
          <displayList
            @wantToEatBanana="inviteButton"
            :_items="invitedConferences"
            :_item-per-page="4"
          >
            </displayList>

          <h1>My Contributions</h1>
          <displayList
            :_items="contributedConferences"
            :_item-per-page="4"
          >
          </displayList>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import DisplayList from './DisplayList'
  export default {
    name: 'Workspace',
    components:{
      DisplayList
    },
    data () {
      const generateMyConference = _ => {
        const conferences = [];
        this.$axios.post('/meetingIApplied','wuyanjie')
          .then(resp => {
            var response = resp.data
            response.forEach((meeting,index) => {
              var obj={
                meeting,
                index
              }
              conferences.push({
                identity : "Chair",
                chair : meeting.chair,
                pcMemberNames : meeting.pcMembers,
                abbrName : meeting.abbrName,
                fullName : meeting.fullName,
                date : meeting.date,
                spot : meeting.spot,
                submitDueDate : meeting.submitDueDate,
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status === 0 ? 'To Be Approved' : (meeting.status === 1 ?'Already Approved': (meeting.status === 2 ?'Allow Contribution': (meeting.status === 3 ?'Ended':'Rejected'))),
                router : meeting.status === -1 ? "" : "invite/"+meeting.fullName
              });
            })
          })
        this.$axios.post('/meetingMyEnded','wuyanjie')
          .then(resp => {
            var response = resp.data
            response.forEach((meeting,index) => {
              var obj={
                meeting,
                index
              }
              conferences.push({

                identity : "Chair",
                chair : meeting.chair,
                pcMemberNames : meeting.pcMembers,
                abbrName : meeting.abbrName,
                fullName : meeting.fullName,
                date : meeting.date,
                spot : meeting.spot,
                submitDueDate : meeting.submitDueDate,
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status === 0 ? 'To Be Approved' : (meeting.status === 1 ?'Already Approved': (meeting.status === 2 ?'Allow Contribution': (meeting.status === 3 ?'Ended':'Rejected'))),
                router : '',
              });
            })
          })

        this.$axios.post('/meetingIJoined','wuyanjie')
          .then(resp => {
            var response = resp.data
            response.forEach((meeting,index) => {
              var obj={
                meeting,
                index
              }
              conferences.push({

                identity: "PC Member",
                chair : meeting.chair,
                pcMemberNames : meeting.pcMembers,
                abbrName : meeting.abbrName,
                fullName : meeting.fullName,
                date : meeting.date,
                spot : meeting.spot,
                submitDueDate : meeting.submitDueDate,
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status === 0 ? 'To Be Approved' : (meeting.status === 1 ?'Already Approved': (meeting.status === 2 ?'Allow Contribution': (meeting.status === 3 ?'Ended':'Rejected'))),
                router : '',
              });
            })
          })
          .catch(error =>{
            console.log(error)
          })
        return conferences;
      };
      const generateContributedConference = _ => {
        const conferences = [];
        this.$axios.post('/meetingIContributed','wuyanjie')
          .then(resp => {
            if(resp != null) {
              var response = resp.data
              response.forEach((contribution,index) => {
                var obj={
                  contribution,
                  index
                }
                conferences.push({
                  identity : "Author",
                  contributor : contribution.contributor,
                  meetingFullName : contribution.meetingFullName,
                  fileTitle : contribution.fileTitle,
                  fileAbstract : contribution.fileAbstract,
                });
              })
              return conferences;
            } else return null;
          })
          .catch(error =>{
            console.log(error)
          })
        return conferences;
      };

      const generateInvitedConference = _ => {
        const conferences = [];
        this.$axios.post('/meetingInvitedMe','wuyanjie')
          .then(resp => {
            if(resp != null) {
              var response = resp.data
              response.forEach((meeting,index) => {
                var obj={
                  meeting,
                  index
                }
                conferences.push({
                  chair : meeting.chair,
                  pcMemberNames : meeting.pcMembers,
                  abbrName : meeting.abbrName,
                  fullName : meeting.fullName,
                  date : meeting.date,
                  spot : meeting.spot,
                  submitDueDate : meeting.submitDueDate,
                  resultReleaseDate : meeting.resultReleaseDate,
                  statusMessage : meeting.status === 0 ? 'To Be Approved' : (meeting.status === 1 ?'Already Approved': (meeting.status === 2 ?'Allow Contribution': (meeting.status === 3 ?'Ended':'Rejected')))
                });
              })
              return conferences;
            } else return null;
          })
          .catch(error =>{
            console.log(error)
          })
        return conferences;
      };
      return {
        //userName: store.state.userName,
        userName: 'wuyanjie',
        router: '',
        itemsPerPage: 4,
        myConferences: generateMyConference(),
        invitedConferences: generateInvitedConference(),
        contributedConferences :generateContributedConference()
      }
    },
    methods: {
      allowContribute (item) {
        this.$axios.post('/allowContribute',{
          userName: 'wuyanjie',
          meetingFullName: item.fullName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              alert('successful allowance')
              item.statusMessage = 'Allow Contribution'
              location.reload()
            } else alert('allow error')
          })
          .catch(error => {
            console.log(error)
            alert('allow action is not committed')
          })
      },
      inviteButton(item){
        console.log(item.router)
        this.$router.replace({path: item.router})
      },
      agree (item,itemIndex) {
        this.$axios.post('/agreeInvitation', {
          username: 'wuyanjie',
          meetingFullName: item.fullName
        })
          .then(resp => {
            console.log(resp.status)
            console.log(resp.data)
            if (resp.status === 200 && resp.data === "accepted") {
              alert('successful aggreement')
              this.invitedConferences.splice(itemIndex,1)
              location.reload()
            } else {
              alert('agree error')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      reject (item,itemIndex) {
        this.$axios.post('/rejectInvitation', {
          username: 'wuyanjie',
          meetingFullName: item.fullName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data === "rejected") {
              alert('successful Rejection')
              this.invitedConferences.splice(itemIndex,1)
              location.reload()
            } else {
              alert('reject error')
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
