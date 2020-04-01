<template>
    <div>
      <div class="page-header page-header-small clear-filter" filter-color="orange">
            <parallax
                    class="page-header-image"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">Workspace, handling meeting .</h1>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container" >
                <div class="button-container">
                    <a href="/#/meeting" class="btn btn-primary btn-round btn-lg">New A Meeting</a>
                </div>
<!--以上是按钮组-->
              <div class="section">
                <div class="container">
                  <h3 class="title">As PC Member</h3>
                  <v-table></v-table>
                  <h3 class="title">As Chair</h3>
                  <v-table></v-table>
                  <h3 class="title">As Author</h3>
                  <v-table></v-table>
                  <v-line></v-line>
<!--                  <div class="row applyRow">-->
<!--                    <div class="col-md-3 meetingBlock">-->
<!--                      <div v-for="value in objects" :key="value.abbrName">-->
<!--                        {{value}}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="col-md-3 meetingBlock" v-for="value in objects" :key="value.abbrName">-->
<!--                      {{value}}-->
<!--                    </div>-->
<!--                    <div class="col-md-3 meetingBlock">-->
<!--                      <div>qazxcfew</div>-->
<!--                    </div>-->
<!--                    <div class="col-md-3 meetingBlock">-->
<!--                      <div>qazxcfew</div>-->
<!--                    </div>-->
<!--                    <div class="col-md-3 meetingBlock">-->
<!--                      <div>qazxcfew</div>-->
<!--                    </div>-->
<!--                  </div>-->
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
import vTable from './Table'
import vLine from './Line'
// Connection conn = DriverManager.getConnection('jdbc:h2:mem:testdb', 'sa', '');

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
    return {
      objects: {
        abbrName: 'How to do in Vue',
        fullName: 'Jaoe',
        date: '200',
        spot: 'beng',
        submitDueDate: 'haha',
        resultReleaseDate: '23152'
      }
    }
  }
}
</script>

<style>
  .meetingBlock {
    padding: 20px;
    margin: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 grey;
    font-size: 20px;
    letter-spacing: -0.05em;
  }
</style>
