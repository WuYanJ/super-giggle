<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
  <h1 class="title">TO BE APPROVED</h1>
  <v-app>
    <v-container fluid>
      <v-data-iterator
        :items="notApprovedMeetings"
        :items-per-page.sync="itemsPerPage"
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="(item,itemIndex) in notApprovedMeetings"
              :key="item.name"
              cols="12"
              sm="12"
              md="4"
              lg="4"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">Conference</v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Abbr Name:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.abbrName }}</v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Full Name:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.fullName }}</v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Date:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Submit Due Date:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.submitDueDate }}</v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Result Release Date:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.resultReleaseDate }}</v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Spot:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ item.spot }}</v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn type="neutral" round size="lg" @click="approve(item,itemIndex)">Approve-{{item.abbrName}}</v-btn>
                <v-btn type="neutral" round size="lg" @click="reject(item,itemIndex)">Reject-{{item.abbrName}}</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>


    <h1 class="title">ALREADY APPROVED</h1>

    <v-container fluid>
      <v-data-iterator
        :items="alreadyApprovedMeetings"
        :items-per-page.sync="itemsPerPage"
        hide-default-footer
      >
        <v-row>
          <v-col
            v-for="(item,itemIndex) in alreadyApprovedMeetings"
            :key="item.name"
            cols="12"
            sm="12"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">Conference</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Abbr Name:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.abbrName }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Full Name:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.fullName }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Date:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Submit Due Date:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.submitDueDate }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Result Release Date:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.resultReleaseDate }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Spot:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.spot }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-data-iterator>
    </v-container>
  </v-app>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'AdminApprove',
    data () {
      const generateConferenceNotApproved = _ => {
        const conferences = [];
        this.$axios.post('/meetingToBeApproved')
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
                  pcMembers : meeting.pcMembers,
                  abbrName : meeting.abbrName,
                  fullName : meeting.fullName,
                  date : meeting.date,
                  spot : meeting.spot,
                  submitDueDate : meeting.submitDueDate,
                  resultReleaseDate : meeting.resultReleaseDate
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

      const generateConferenceAlreadyApproved = _ => {
        const conferences = [];
        this.$axios.post('/meetingAlreadyApproved')
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
                  pcMembers : meeting.pcMembers,
                  abbrName : meeting.abbrName,
                  fullName : meeting.fullName,
                  date : meeting.date,
                  spot : meeting.spot,
                  submitDueDate : meeting.submitDueDate,
                  resultReleaseDate : meeting.resultReleaseDate
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
        itemsPerPage: 4,
        notApprovedMeetings: generateConferenceNotApproved(),
        alreadyApprovedMeetings: generateConferenceAlreadyApproved()
      }
    },

    methods: {
      approve (item,itemIndex) {
        this.$axios.post('/approveMeeting', {
          chair: item.chair,
          meetingFullName: item.fullName
        })//后端未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              // alert('successful Approval')
              this.notApprovedMeetings.splice(itemIndex,1)
              location.reload()
            } else {
              // alert('approve error')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      reject (item,itemIndex) {
        this.$axios.post('/rejectMeeting', {
          chair: item.chair,
          meetingFullName: item.fullName
        })//后端未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              // alert('successful Rejection')
              this.notApprovedMeetings.splice(itemIndex,1)
            } else {
              // alert('reject error')
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
