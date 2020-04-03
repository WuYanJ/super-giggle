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
      return {
        response1: 'hahaha',
        itemsPerPage: 4,
        items: [
          {
            abbrName: 'AAA',
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
          }
        ]
      }
    },
    methods: {
      submit () {
        this.$axios.post('/meetingApprove')
          .then(resp => {
            this.response1 = resp.data.length
            for(let i = 0;i < resp.data.length;i ++){
              this.items[i].abbrName = resp.data[i].abbrName
              this.items[i].fullName = resp.data[i].fullName
              this.items[i].date = resp.data[i].date
              this.items[i].spot = resp.data[i].spot
              this.items[i].submitDueDate = resp.data[i].submitDueDate
              this.items[i].resultReleaseDate = resp.data[i].resultReleaseDate
            }
          })
          .catch(error => {
            console.log(error)
            alert('errorrrrrrrrrr')
          })
      },
      approve (item,itemIndex) {
        this.$axios.post('/approveMeeting', {
          meetingAbbrName: item.abbrName
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
