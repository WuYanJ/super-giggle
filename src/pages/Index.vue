<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url(../../public/img/login.jpg)">
      </parallax>
      <div class="container">
        <div class="content-center brand">
<!--          <img class="n-logo" src="../../src/assets/logo.png" alt="" />-->
          <h1 class="h1-seo">Paper Forum.</h1>
          <h3>A complete Paper submission and review ecology</h3>
          <h3>↓</h3>
          <h5>Drop down to find the latest meeting</h5>
        </div>
      </div>
    </div>
    <div class="section section-basic">
      <div class="container">
        <h2 class="title">
          Conference News
        </h2>
        <div class="button-container">
          <router-link to="contribute">
            <p class="btn btn-primary btn-round btn-lg">Contribute</p>
          </router-link>
        </div>
        <v-app>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item,i) in conferences"
              :key="i"
            >
              <v-expansion-panel-header>Conference: {{item.abbrName}} —— Chair: {{item.chair}} 👉
                <h6 v-if="item.statusMessage==='Already Approved'" style="color: cornflowerblue">Status: {{item.statusMessage}}</h6>
                <h6 v-else-if="item.statusMessage==='To Be Approved'" style="color: #edde34">Status: {{item.statusMessage}}</h6>
                <h6 v-else-if="item.statusMessage==='Allow Contribution'" style="color: darkseagreen">Status: {{item.statusMessage}}</h6>
                <h6 v-else-if="item.statusMessage==='Ended'" style="color: gainsboro">Status: {{item.statusMessage}}</h6>
                <h6 v-else style="color: red">Status: {{item.statusMessage}}</h6>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Chair: {{item.chair}}
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Abbr Name: {{item.abbrName}}
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Full Name: {{item.fullName}}
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Date: {{item.date}}
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Submit Due Date: {{item.submitDueDate}}
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Result Release Date: {{item.resultReleaseDate}}
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Spot: {{ item.spot}}
              </v-expansion-panel-content>
              <v-expansion-panel-content >
                Status: {{ item.statusMessage}}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-app>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from '@/components'
import Navigation from './components/Navigation'
import TabsSection from './components/Tabs'
import ProgressPagination from './components/ProgressPagination'
import Notifications from './components/Notifications'
import Typography from './components/Typography'
import JavascriptComponents from './components/JavascriptComponents'
import CarouselSection from './components/CarouselSection'
import NucleoIconsSection from './components/NucleoIconsSection'
import ExamplesSection from './components/ExamplesSection'
import DownloadSection from './components/DownloadSection'

import store from "../store"

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    Navigation,
    TabsSection,
    ProgressPagination,
    Notifications,
    Typography,
    JavascriptComponents,
    CarouselSection,
    NucleoIconsSection,
    ExamplesSection,
    DownloadSection
  },
  data () {
    const generateConference = _ => {
      const conferences = [];
      this.$axios.post('/allMeetings')
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
              statusMessage : meeting.status === 0 ? 'To Be Approved' : (meeting.status === 1 ?'Already Approved': (meeting.status === 2 ?'Allow Contribution': (meeting.status === 3 ?'Ended':'Rejected')))
            });
          })
          return conferences;
          } else return null
        })
        .catch(error =>{
          console.log(error)
        })
      return conferences;
    };
    const generateOpenedContributionConference = _ => {
      const conferences = [];
      this.$axios.post('/meetingOpenedContribution',store.state.userName)
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
                statusMessage : meeting.status === 0 ? 'To Be Approved' : (meeting.status === 1 ?'Already Approved': (meeting.status === 2 ?'Allow Contribution': (meeting.status === 3 ?'Ended':'Rejected')))

              });
            })
            return conferences;
          } else return null
        })
        .catch(error =>{
          console.log(error)
        })
      return conferences;
    };
    return {
      conferences: generateConference()
    }
  }
}
</script>
<style></style>
