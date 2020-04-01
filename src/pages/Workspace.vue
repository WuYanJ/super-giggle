<template>
    <div>
      <div class="page-header page-header-small clear-filter" filter-color="orange">
            <parallax
                    class="page-header-image"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                  <h1 class="title"  v-if="userName!=='admin'">Workspace, handling meeting .</h1>
                  <h1 class="title" v-if="userName==='admin'">Admin: Handle Meetings ! </h1>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container" >
                <div class="button-container">
                    <a href="/#/meeting" class="btn btn-primary btn-round btn-lg">New A Meeting</a>
                </div>
<!--以上是按钮组-->
              <div class="section" v-if="userName!=='admin'">
                <div class="container">
                  <h3 class="title">YOU ARE INVITED IN :</h3>
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
                              v-for="item in props.items"
                              :key="item.name"
                              cols="12"
                              sm="6"
                              md="4"
                              lg="3"
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
                                </v-list>
                                <n-button type="neutral" round size="lg" v-on:click="approve()">Approve</n-button>
                              </v-card>
                            </v-col>
                          </v-row>
                        </template>
                      </v-data-iterator>
                    </v-container>
                  </v-app>
                  <h3 class="title">AS PC MEMBER</h3>
                  <v-table></v-table>
                  <h3 class="title">AS CHAIR</h3>
                  <v-table></v-table>
                  <h3 class="title">AS AUTHOR</h3>
                  <v-table></v-table>
                  <v-line></v-line>
                </div>
              </div>
              <div class="section" v-if="userName==='admin'">
                <div class="container" >
                  <button v-on:click="submit()">test</button>
                  <!--以上是按钮组-->
                  <p class="title">{{response1}}</p>
                  <!--            <v-table ></v-table>-->
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
                              v-for="item in props.items"
                              :key="item.name"
                              cols="12"
                              sm="6"
                              md="4"
                              lg="3"
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
                                </v-list>
                                <n-button type="neutral" round size="lg" v-on:click="approve()">Approve</n-button>
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

            </div>
        </div>
</template>

<script>
import { Tabs, TabPane, Button } from '@/components'
import Navigation from './components/Navigation'
import TabsSection from './components/Tabs'
import vTable from './Table'
import vLine from './Line'
import store from './../store'
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
      userName: store.state.userName,
      response1: 'hahaha',
      itemsPerPage: 4,
      items: [
        {
          abbrName: 'How to do in Vue',
          fullName: 'Jaoe',
          date: '200',
          spot: 'beng',
          submitDueDate: 'haha',
          resultReleaseDate: '23152',
        },
        {
          abbrName: 'Frozen Yogurt',
          fullName: 159,
          date: 6.0,
          spot: 87,
          submitDueDate: 24,
          resultReleaseDate: 4.0,
        },
        {
          abbrName: 'Frozen Yogurt',
          fullName: 159,
          date: 6.0,
          spot: 87,
          submitDueDate: 24,
          resultReleaseDate: 4.0,
        },
        {
          abbrName: 'Frozen Yogurt',
          fullName: 159,
          date: 6.0,
          spot: 87,
          submitDueDate: 24,
          resultReleaseDate: 4.0,
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$axios.post('/meetingApprove')
        .then(resp => {
          this.response1 = resp.data.length
          this.items[1].abbrName = resp.data[1].abbrName
        })
        .catch(error => {
          console.log(error)
          alert('errorrrrrrrrrr')
        })
    },
    approve () {
      this.$axios.post('/approve')//后端未实现
        .then(resp => {
        })
        .catch(error => {
          console.log(error)
        })
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
