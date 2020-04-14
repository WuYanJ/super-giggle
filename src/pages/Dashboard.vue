<template>
  <v-app id="inspire">
    <v-content>
  <v-container
    id="dashboard"
    fluid
  >
    <v-btn
      color="green"
      fab
      absolute
      right
      large
      to="/applyMeeting"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <displayList
      :_list="chairDisplayList"
      :_title="chairTitle"
      :_display-set="chairDisplaySet"
      :_functions="chairFunctions"
      :_items="meetingsAsChair"
      :_item-per-page="4"
    >
    </displayList>
    <displayList
      :_title="PCMemberTitle"
      :_display-set="PCMemberDisplaySet"
      :_functions="PCMemberFunctions"
      :_items="meetingsAsPCMember"
      :_item-per-page="4"
    >
    </displayList>
    <displayList
      :_title="authorTitle"
      :_display-set="authorDisplaySet"
      :_functions="authorFunctions"
      :_items="meetingsAsAuthor"
      :_item-per-page="4"
    >
    </displayList>
    <displayList
      :_title="otherTitle"
      :_display-set="otherDisplaySet"
      :_functions="otherFunctions"
      :_items="otherMeetings"
      :_item-per-page="4"
    >
    </displayList>
    <v-snackbar v-model="snackbar" :timeout="timeout" top :color="snackbar_color">
      {{tips_text}}
      <v-btn
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import DisplayList from './DisplayList'
  import store from '../store'

  export default {
    components:{
      DisplayList
    },
    data () {
      return {
        snackbar:false,
        snackbar_color:'success',
        timeout: 2000,
        tips_text: '',
        displayColorSet:[
          {"default":"green"},
          {"approved":"green"},
          {"rejected" : "red"},
          {"querying" : "orange"},
          {"Unprocessed":"orange"},
        ],
        itemsPerPage: 5,
        meetingsAsChair: [],
        meetingsAsPCMember: [],
        meetingsAsAuthor: [],
        otherMeetings:[],
        chairDisplaySet:['primaryArea', 'webPage', 'organizer', 'conferenceDate'],
        PCMemberDisplaySet:['primaryArea', 'webPage', 'organizer', 'conferenceDate'],
        authorDisplaySet:['primaryArea', 'webPage', 'organizer', 'conferenceDate'],
        otherDisplaySet:['primaryArea', 'webPage', 'organizer', 'conferenceDate'],
        chairTitle:"Role As Chair",
        PCMemberTitle:"Role As PCMember",
        authorTitle:"Role As Author",
        otherTitle:"All Available Meeting List",
        otherFunctions:[],
        chairFunctions:[],
        PCMemberFunctions:[],
        authorFunctions:[],
        chairDisplayList:{},
        PCMemberDisplayList:{},
        authorDisplayList:{},
        otherDisplayList:{},
        state2Color:{
          Unprocessed:"info",
          applyFailed:"warning",
          applyPassed:"primary"
        }
      }
    },
    methods: {
      essayDetails(id) {
        this.$router.push({
          path: 'essaydetail',
          query: {
            meetingId:id,
          }
        })
      },
      submitEssay(id) {
        let username = localStorage.username;
        this.$router.push({
          path: 'essaySubmission',
          query: {
            meetingid:id,
            username:username
          }
        })
      },
      invitePCMember(id) {
        this.$router.push({
          path: 'pages/pcminvite',
          query: {
            meetingid:id,
          }
        })
      },
      beginSubmission(item){
        console.log(item.id)
        this.$axios.post('http://114.115.164.58:8080/meeting/submission',
          {"meetingid":String(item["id"])}
        ).then(resp => {
          if(resp.data.responseCode == 200 && resp.data.responseMessage == "success"){
            this.$router.go();
          }else{
            console.log(resp)
          }
        }).catch(error =>{
          console.log(error)
        });
      },
      newFunction(functionName,componentName,displayColor) {
        let func = {
          "functionName":"default",
          "componentName":"default",
          "displayColor":"green"
        };
        func["functionName"] = functionName;
        func["componentName"] = componentName;
        func["displayColor"] = displayColor;
        return func;
      },
      loadRelatedMeetings(){
        var username = localStorage.username;
        var requestUrl = "/meetingIApplied";
        var that = this;
        this.$axios.post('/meetingIApplied',store.state.userName)
          .then(resp => {
            if(resp!=null){
              let response = resp.data;
              response.forEach((meeting,index) => {
                var obj={
                  meeting,
                  index
                }
                this.meetingsAsChair.push({
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
            }else{
              this.tips_text = "meetings loaded error" ;
              this.snackbar_color = 'error';
              this.snackbar = true;
            }
          })
          .catch(error => {
            console.log(error);
            this.tips_text = "network error";
            this.snackbar_color = 'error';
            this.snackbar = true;
          })
      },
      loadAllMeetings(){
        var requestUrl = "http://114.115.164.58:8080/user/meetinglist";
        var that = this;
        // this.$axios.get(requestUrl)
        //   .then(resp => {
        //     if(resp.data.responseCode == 200 && resp.data.responseMessage == "success") {
        //       let meetings = resp.data.responseBody.meetings;
        //       for(let i = 0; i < meetings.length; i++)
        //       {
        //         let meeting = meetings[i];
        //         meeting["functions"] = [];
        //         if(meeting.approval ==  "ApplyPassed") {
        //           console.log("applyPassed");
        //           meeting["functions"].push(this.newFunction("submitEssayDisabled", "Submit Essay", "grey"));
        //         }
        //         else if (meeting.approval ==  "SubmittedAvailable")
        //         {
        //           console.log("SubmittedAvailable");
        //           meeting["functions"].push(this.newFunction("submitEssay", "Submit Essay","green"));
        //         }
        //         if(that.meetingsAsChair.filter(e => e.id == meeting.id).length > 0){continue;}
        //         if(that.meetingsAsAuthor.filter(e => e.id == meeting.id).length > 0){continue;}
        //         that.otherMeetings.push(meeting);
        //       }
        //     }
        //     else{
        //       this.tips_text = "meetings loaded error due to" + resp.data.responseBody.reason;
        //       this.snackbar_color = 'error'
        //       this.snackbar = true
        //     }
        //   })
        this.$axios.post('/meetingIApplied',store.state.userName)
          .then(resp => {
            if(resp!=null){
              let response = resp.data;
              response.forEach((meeting,index) => {
                var obj={
                  meeting,
                  index
                }
                this.meetingsAsChair.push({
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
            }else{
              this.tips_text = "meetings loaded error" ;
              this.snackbar_color = 'error';
              this.snackbar = true;
            }
          })
          .catch(error => {
            console.log(error);
            this.tips_text = "network error";
            this.snackbar_color = 'error';
            this.snackbar = true;
          })
      },
      loadFunctions()
      {
        let that = this;
        this.chairFunctions["rejected"] = function (item) {
        };
        this.chairFunctions["querying"] = function (item) {
        };
        this.chairFunctions["invitePCMember"] = function (item) {
          that.$router.push({
            path: 'pages/pcminvite',
            query: {
              meetingid:item.id,
            }
          })
        };
        this.chairFunctions["beginSubmission"] = function (item) {
          //console.log(item.id)
          that.$axios.post('http://114.115.164.58:8080/meeting/submission',
            {"meetingid":String(item["id"])}
          ).then(resp => {
            if(resp.data.responseCode == 200){
              that.tips_text = 'begin submission successfully';
              that.snackbar_color = 'success';
              that.snackbar = true;
              window.setTimeout(function(){
                that.$router.go()
              }.bind(that), 1000)
            }else{
              console.log(resp)
              that.tips_text = "meetings loaded error due to network problem";
              that.snackbar_color = 'error'
              that.snackbar = true
            }
          }).catch(error =>{
            console.log(error)
            that.tips_text = "network error";
            that.snackbar_color = 'error';
            that.snackbar = true;
          });
        };
        this.authorFunctions["submitEssay"] = function (item) {
          let username = localStorage.username;
          that.$router.push({
            path: 'essaySubmission',
            query: {
              meetingid:item.id,
              username:username
            }
          })
        };
        this.authorFunctions["checkSubmissions"] = function (item) {
          let username = localStorage.username;
          that.$router.push({
            path: '/submission/list',
            query: {
              username:username,
              meetingid:item.id
            }
          })
        };
        this.otherFunctions["submitEssay"] = function (item) {
          let username = localStorage.username;
          that.$router.push({
            path: 'essaySubmission',
            query: {
              meetingid:item.id,
              username:username
            }
          })
        };
        this.otherFunctions["submitEssayDisable"] = function (item) {
        };
      },
      //wrong modify later
      listGenerator(title,items,displaySet,functions)
      {
        let list = {
          "title":"title",
          "items":[],
          "displaySet":[],
          "functions":[]
        };
        list["title"] = title;
        list["items"] = items;
        list["displaySet"] = displaySet;
        list["functions"] = functions;
        return list;
      },
      loadDisplayLists() {
        this.chairDisplayList = this.listGenerator("Role: Chair",this.meetingsAsChair,['city','region','venue','primaryArea','secondaryArea','organiser','webPage','submissionDeadlineDate','conferenceDate'],this.chairFunctions);
        this.PCMemberDisplayList = this.listGenerator("Role: PC Member",this.meetingsAsPCMember,['city','region','venue','primaryArea','secondaryArea','organiser','webPage','submissionDeadlineDate','conferenceDate'],this.PCMemberFunctions);
        this.authorDisplayList = this.listGenerator("Role: Author",this.meetingsAsAuthor,['city','region','venue','primaryArea','secondaryArea','organiser','webPage','submissionDeadlineDate','conferenceDate'],this.authorFunctions);
        this.otherDisplayList = this.listGenerator("Other Meetings",this.otherMeetings,['city','region','venue','primaryArea','secondaryArea','organiser','webPage','submissionDeadlineDate','conferenceDate'],this.otherFunctions);
      },
    },

    mounted: function(){
      this.loadFunctions();
      this.loadRelatedMeetings();
      this.loadAllMeetings();
      this.loadDisplayLists();
    }

  }
</script>

<style scoped>
  element.style{
    background-color: deepskyblue !important;
  }
</style>
