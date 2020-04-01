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
import vTable from './Table'
import vLine from './Line'
// Connection conn = DriverManager.getConnection('jdbc:h2:mem:testdb', 'sa', '');

export default {
  name: 'adminApprove',
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
          this.items[0].abbrName = resp.data[0].abbrName
          this.items[1].abbrName = resp.data[1].abbrName
        })
        .catch(error => {
          console.log(error)
          alert('errorrrrrrrrrr')
        })
    }
  }
}
</script>

<style>
</style>
