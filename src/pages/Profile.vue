<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('./../../public/img/bg5.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img src="../../public/img/ryan.jpg" alt="" />
        </div>
        <h3 class="title">{{userName}}</h3>
        <p class="category">Photographer</p>
        <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>Contributed</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Reviewed</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Initiated</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="button-container">
          <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>
        </div>
<!--        新的会议信息-->
<!--        <div class="row">-->
<!--          <div class="col-md-12 ml-auto mr-auto">-->
<!--            <h4 class="title text-center">News</h4>-->
<!--            <div v-for="value in objects" :key="value.meetingInfo">-->
<!--              {{value}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--          <div class="col-md-12 ml-auto mr-auto">-->
<!--            <div v-for="value in objects" :key="value.meetingInfo">-->
<!--              {{value}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--          <div class="col-md-12 ml-auto mr-auto">-->
<!--            <div v-for="value in objects" :key="value.meetingInfo2">-->
<!--              {{value}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="section">
          <div class="container">
              <v-table></v-table>
            <v-table></v-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from '@/components'
import vTable from './Table'
import store from './../store'

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    Tabs,
    TabPane,
    vTable
  },
  data () {
    return {
      userName: store.state.userName, // userDetails.getUsername()
      objects: {
        meetingInfo: 'How to do in Vue' + 'Jaoe' + '200' + 'beng',
        meetingInfo2: 'How to do huihuiVue' + 'Jaddddoe' + '2q1200' + 'beng'
      }
    }
  }
}
</script>
<style></style>
