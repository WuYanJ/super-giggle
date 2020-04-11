<template>
    <div>
      <div class="page-header page-header-small clear-filter" filter-color="orange">
            <parallax
                    class="page-header-image"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                  <h1 class="title" >Workspace, handling meeting .</h1>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container" >
                <div class="button-container">
                  <router-link to="applyMeeting">
                    <p class="btn btn-primary btn-round btn-lg">New A Meeting</p>
                  </router-link>
                  <router-link to="invite">
                    <p class="btn btn-primary btn-round btn-lg">Invite</p>
                  </router-link>
                </div>
              <div class="section">
                <div class="container" >
                  <h2 class="title">My Meeting</h2>
                  <v-app>
                    <v-container fluid>
                      <v-data-iterator
                        :items="myConferences"
                        :items-per-page.sync="itemsPerPage"
                        hide-default-footer
                      >
                        <v-row>
                          <v-col
                            v-for="(item,i) in myConferences"
                            :key="i"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="6"
                          >
                            <router-link :to="router">
                              <v-card>
                                <v-card-title class="subheading font-weight-bold">conference</v-card-title>

                                <v-divider></v-divider>

                                <v-list dense>
                                  <v-list-item>
                                    <v-list-item-content>Abbr Name</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.abbrName }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Full Name</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.fullName }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>PC Members</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.pcMemberNames }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Date</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Submit Due Date</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.submitDueDate }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Result Release Date</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.resultReleaseDate }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Spot</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.spot }}</v-list-item-content>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-list-item-content>Status</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.statusMessage }}</v-list-item-content>
                                  </v-list-item>
                                </v-list>
                                <n-button type="neutral" round size="lg"
                                          v-if="item.statusMessage === 'Already Approved'"
                                          v-on:click="allowContribute(item,i)">Allow Contribute</n-button>
                              </v-card>
                            </router-link>
                          </v-col>
                        </v-row>
                      </v-data-iterator>
                    </v-container>
                  </v-app>

                  <h2 class="title">New Invitations</h2>
                  <v-app>
                    <v-container fluid>
                      <v-data-iterator
                        :items="invitedConferences"
                        :items-per-page.sync="itemsPerPage"
                        hide-default-footer
                      >
                        <v-row>
                          <v-col
                            v-for="(item,i) in invitedConferences"
                            :key="i"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="6"
                          >
                            <router-link :to="router">
                              <v-card>
                                <v-card-title class="subheading font-weight-bold">conference</v-card-title>

                                <v-divider></v-divider>

                                <v-list dense>
                                  <v-list-item>
                                    <v-list-item-content>Abbr Name</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.abbrName }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Full Name</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.fullName }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>PC Members</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.pcMemberNames }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Date</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Submit Due Date</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.submitDueDate }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Result Release Date</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.resultReleaseDate }}</v-list-item-content>
                                  </v-list-item>

                                  <v-list-item>
                                    <v-list-item-content>Spot</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.spot }}</v-list-item-content>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-list-item-content>Status</v-list-item-content>
                                    <v-list-item-content class="align-end">{{ item.statusMessage }}</v-list-item-content>
                                  </v-list-item>
                                </v-list>
                                <n-button type="neutral" round size="lg" v-on:click="agree(i)">Agree</n-button>
                                <n-button type="neutral" round size="lg" v-on:click="reject(i)">Reject</n-button>
                              </v-card>
                            </router-link>
                          </v-col>
                        </v-row>
                      </v-data-iterator>
                    </v-container>
                  </v-app>

                  <h2 class="title">I Joined</h2>
                  <v-app>
                    <v-container fluid>
                      <v-data-iterator
                        :items="joinedConferences"
                        :items-per-page.sync="itemsPerPage"
                        hide-default-footer
                      >
                        <v-row>
                          <v-col
                            v-for="(item,i) in joinedConferences"
                            :key="i"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="6"
                          >
                            <v-card>
                              <v-card-title class="subheading font-weight-bold">conference</v-card-title>

                              <v-divider></v-divider>

                              <v-list dense>
                                <v-list-item>
                                  <v-list-item-content>Abbr Name</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.abbrName }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Full Name</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.fullName }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>PC Members</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.pcMemberNames }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Date</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Submit Due Date</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.submitDueDate }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Result Release Date</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.resultReleaseDate }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Spot</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.spot }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>Status</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.statusMessage }}</v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-data-iterator>
                    </v-container>
                  </v-app>

                  <h2 class="title">I Contributed</h2>
                  <v-app>
                    <v-container fluid>
                      <v-data-iterator
                        :items="contributedConferences"
                        :items-per-page.sync="itemsPerPage"
                        hide-default-footer
                      >
                        <v-row>
                          <v-col
                            v-for="(item,i) in contributedConferences"
                            :key="i"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="6"
                          >
                            <v-card>
                              <v-card-title class="subheading font-weight-bold">conference</v-card-title>

                              <v-divider></v-divider>

                              <v-list dense>
                                <v-list-item>
                                  <v-list-item-content>Abbr Name</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.abbrName }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Full Name</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.fullName }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>PC Members</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.pcMemberNames }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Date</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Submit Due Date</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.submitDueDate }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Result Release Date</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.resultReleaseDate }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>Spot</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.spot }}</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>Status</v-list-item-content>
                                  <v-list-item-content class="align-end">{{ item.statusMessage }}</v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-data-iterator>
                    </v-container>
                  </v-app>
                </div>
              </div>
            </div>
            </div>
        </div>
</template>

<script>
import { Tabs, TabPane, Button } from '@/components'
import Navigation from './components/Navigation'
import TabsSection from './components/Tabs'
import vTable from './components/Table'
import vLine from './components/TimeLine'
import store from './../store'

export default {
  name: 'workspace',
  bodyClass: 'profile-page',
  components: {
    Tabs,
    TabPane,
    vTable,
    vLine,
    [Button.name]: Button,
    Navigation,
    TabsSection
  },
  data () {
    const generateMyConference = _ => {
      const conferences = [];
      this.$axios.post('/meetingIApplied',store.state.userName)
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
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status == 1 ? 'To Be Approved' : (meeting.status == 2 ?'Already Approved': (meeting.status == 3 ?'Allow Contribution':'Rejected'))
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

    const generateJoinedConference = _ => {
      const conferences = [];
      this.$axios.post('/meetingIJoined',store.state.userName)
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
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status == 1 ? 'To Be Approved' : (meeting.status == 2 ?'Already Approved': (meeting.status == 3 ?'Allow Contribution':'Rejected'))
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

    const generateContributedConference = _ => {
      const conferences = [];
      this.$axios.post('/meetingIContributed',store.state.userName)
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
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status == 1 ? 'To Be Approved' : (meeting.status == 2 ?'Already Approved': (meeting.status == 3 ?'Allow Contribution':'Rejected'))
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
      this.$axios.post('/meetingInvitedMe',store.state.userName)
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
                resultReleaseDate : meeting.resultReleaseDate,
                statusMessage : meeting.status == 1 ? 'To Be Approved' : (meeting.status == 2 ?'Already Approved': (meeting.status == 3 ?'Allow Contribution':'Rejected'))
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
      userName: store.state.userName,
      router: '',
      itemsPerPage: 4,
      myConferences: generateMyConference(),
      invitedConferences: generateInvitedConference(),
      joinedConferences: generateJoinedConference(),
      contributedConferences :generateContributedConference()
    }
  },
  methods: {
    allowContribute (item,itemIndex) {
      this.$axios.post('/allowContribute',{
        userName: store.state.userName,
        meetingFullName: item.fullName
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
            alert('successful allowance')
          } else alert('allow error')
        })
        .catch(error => {
          console.log(error)
          alert('allow action is not committed')
        })
    }
  }
}
</script>

<style>
</style>
