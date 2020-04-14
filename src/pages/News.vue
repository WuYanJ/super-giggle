<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <h1>News</h1>
        <v-app>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item,i) in newConferences"
              :key="i"
            >
              <v-expansion-panel-header><div class="my-2">{{item.fullName}}</div>
                <div class="my-2"><v-btn small>{{item.chair}}</v-btn></div>
                <div class="my-2" v-if="item.statusMessage==='Already Approved'">
                <v-btn class="ma-2" color="primary" small dark >Approved
                    <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                  </v-btn>
                </div>
                  <div class="my-2" v-else-if="item.statusMessage==='To Be Approved'">
                  <v-btn class="ma-2" color="yellow" small dark >To Be Approved
                    <v-icon dark right>mdi-cancel</v-icon>
                  </v-btn>
                  </div>
                    <div class="my-2" v-else-if="item.statusMessage==='Allow Contribution'">
                  <v-btn class="ma-2" color="orange darken-2" small dark >
                    <v-icon dark left>mdi-arrow-left</v-icon>Contribution Opening
                  </v-btn>
                    </div>
                      <div class="my-2" v-else-if="item.statusMessage==='Ended'">
                  <v-btn class="ma-2" color="grey" small dark >Ended
                    <v-icon dark right>mdi-cancel</v-icon>
                  </v-btn>
                      </div>
                        <div class="my-2" v-else>
                <v-btn class="ma-2" color="red" small dark >Decline
                  <v-icon dark right>mdi-cancel</v-icon>
                </v-btn>
                        </div>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'News',
    data () {
      const generateNewConferences = _ => {
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
                  pcMemberNames : meeting.pcMemberNames,
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
            } else return null;
          })
          .catch(error =>{
            console.log(error)
          })
        return conferences;
      }
      return {
        router: '',
        itemsPerPage: 4,
        newConferences : generateNewConferences()
      }
    }
  }
</script>

<style scoped>

</style>
