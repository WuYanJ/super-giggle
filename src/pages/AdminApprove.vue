<template>
  <div>
    <div class="page-header page-header-small clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">Admin: Handle Meetings ! </h1>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container" >
        <h1 class="title">TO BE APPROVED</h1>
        <v-app>
          <v-container fluid>
            <v-data-iterator
              :items="items"
              :items-per-page.sync="itemsPerPage"
              hide-default-footer
            >
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="(item,itemIndex) in props.items"
                    :key="item.name"
                    cols="12"
                    sm="12"
                    md="6"
                    lg="6"
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
                      <n-button type="neutral" round size="lg" @click="approve(item,itemIndex)">Approve-{{item.abbrName}}</n-button>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-container>
        </v-app>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tabs, TabPane, Button } from '@/components'
  import Navigation from './components/Navigation'
  import TabsSection from './components/Tabs'
  import vTable from './components/Table'
  import NButton from '../components/Button'

  export default {
    name: 'adminApprove',
    bodyClass: 'profile-page',
    components: {
      NButton,
      Tabs,
      TabPane,
      vTable,
      [Button.name]: Button,
      Navigation,
      TabsSection
    },
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
            alert('get meetings to be approved error')
          })
        return conferences;
      };
      return {
        itemsPerPage: 4,
        items: generateConferenceNotApproved()
      }
    },
    methods: {
      approve (item,itemIndex) {
        this.$axios.post('/approveMeeting', {
          meetingFullName: item.fullName
        })//后端未实现
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
              alert('successful Approval')
              this.items.splice(itemIndex,1)
            } else {
              alert('approve error')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
</style>
