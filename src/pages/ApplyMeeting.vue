<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="8"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Apply meeting form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-model="applyMeetingForm">
                  <v-text-field
                    v-model="abbrName"
                    :rules="abbrRules"
                    label="Conference Name(abbr.)"
                    name="Conference Name(abbr.)"
                    type="text"
                  />

                  <v-text-field
                    v-model="fullName"
                    :rules="fullRules"
                    label="Conference Name(formal)"
                    name="Conference Name(formal)"
                    type="text"
                  />

                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Choose Conference Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false"
                                   :allowed-dates="allowedDates"
                                   :min="nowDate"
                    >

                    </v-date-picker>
                  </v-menu>

                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="submitDueDate"
                        label="Choose Submit Due Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="submitDueDate" @input="menu1 = false"
                                   :allowed-dates="allowedSubmitDates"
                                   :min="nowDate"
                    >

                    </v-date-picker>
                  </v-menu>

                  <v-menu
                    v-model="menu2"
                    :ref="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="resultReleaseDate"
                        label="Choose Result Releasing Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="resultReleaseDate" @input="menu2 = false"
                                   :allowed-dates="allowedReleaseDates"
                                   :min="nowDate"
                    >
                    </v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="spot"
                    :rules="spotRules"
                    label="Spot"
                    name="Choose spot"
                    type="text"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="submit">Apply</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import store from '../store'
  export default {
    props: {
      source: String,
    },
    data () {
      return {
        abbrRules: [
          v => !!v || 'Abbr Name is required',
          v => v.length <= 10 || 'Must be less than 10 characters',
        ],
        fullRules: [
          v => !!v || 'Full Name is required',
          v => v.length <= 30 || 'Must be less than 30 characters',
        ],
        spotRules: [
          v => !!v || 'Spot is required',
          v => v.length <= 20 || 'Must be less than 20 characters',
        ],
        applyMeetingForm: '',
        abbrName: '',
        fullName: '',
        spot: '',
        date: new Date().toISOString().substr(0, 10),
        submitDueDate: new Date().toISOString().substr(0, 10),
        resultReleaseDate: new Date().toISOString().substr(0, 10),
        nowDate: new Date().toISOString().substr(0, 10),
        menu: false,
        menu1: false,
        menu2: false
      }
    },
    methods:{
      allowedDates(val){
        return true
      },
      allowedSubmitDates(val) {
        let judge;
        if(parseInt(val.split('-')[0]) > parseInt(this.date.split('-')[0])){
          judge = true
        } else if(parseInt(val.split('-')[0]) === parseInt(this.date.split('-')[0])){
          if(parseInt(val.split('-')[1]) > parseInt(this.date.split('-')[1])){
            judge = true
          } else if(parseInt(val.split('-')[1]) === parseInt(this.date.split('-')[1])){
            judge = parseInt(val.split('-')[2]) > parseInt(this.date.split('-')[2]);
          } else judge = false
        } else judge = false
        return judge
      },
      allowedReleaseDates(val) {
        let judge;
        if(parseInt(val.split('-')[0]) > parseInt(this.submitDueDate.split('-')[0])){
          judge = true
        } else if(parseInt(val.split('-')[0]) === parseInt(this.submitDueDate.split('-')[0])){
          if(parseInt(val.split('-')[1]) > parseInt(this.submitDueDate.split('-')[1])){
            judge = true
          } else if(parseInt(val.split('-')[1]) === parseInt(this.submitDueDate.split('-')[1])){
            judge = parseInt(val.split('-')[2]) > parseInt(this.submitDueDate.split('-')[2]);
          } else judge = false
        } else judge = false
        return judge
      },
      submit () {
            console.log(this.date)
            console.log(this.submitDueDate)
            this.$axios.post('/meeting', {
              abbr: this.abbrName,
              full: this.fullName,
              chair: store.state.userName,
              pc: null,
              date: this.date,
              spot: this.spot,
              submit: this.submitDueDate,
              result: this.resultReleaseDate
            })
              .then(resp => {
                if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
                  alert('successful application')
                  this.$router.replace({path: '/workspace'})
                } else if (resp.status === 200 && resp.data.hasOwnProperty('error')) {
                  alert('please login first')
                  this.$router.replace({path: '/login'})
                } else {
                  alert('apply error')
                }
              })
              .catch(error => {
                console.log(error)
                alert('Meeting Has Been Applied')
        })
      }
    }
  }
</script>
