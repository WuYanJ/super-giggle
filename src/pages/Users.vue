<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
       <card-test
         :_items="users"
         :_item-per-page="4"
       >
       </card-test>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import CardTest from './CardTest'
  export default {
    name: 'Users',
    components:{
      CardTest
    },
    data(){
      const generateData = _ => {
        const data = [];
        this.$axios.post('/allUsers')
          .then(resp => {
            if (resp != null) {
              var response = resp.data
              response.forEach((user, index) => {
                var obj = {
                  user,
                  index
                }
                data.push({
                  username : user.username,
                  affiliation: user.affiliation,
                  email: user.email
                });
              })
            }
          })
          .catch(error =>{
            console.log(error)
            // alert('get users error')
          })
        return data;
      };
      return{
        users: generateData(),
      }
    }
  }
</script>

<style scoped>

</style>
