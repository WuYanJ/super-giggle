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
