<template>
  <div>
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
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Abbr Name</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.abbrNname }}</v-list-item-content>
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
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 4,
    items: [
      {
        name: 'Conference1',
        abbrNname: 'Frozen Yogurt',
        fullName: 159,
        date: 6.0,
        submitDueDate: 24,
        resultReleaseDate: 4.0,
        spot: 87
      },
      {
        name: 'Ice cream sandwich',
        abbrNname: 'Frozen Yogurt',
        fullName: 159,
        date: 6.0,
        submitDueDate: 24,
        resultReleaseDate: 4.0,
        spot: 87
      },
      {
        name: 'Eclair',
        abbrNname: 'Frozen Yogurt',
        fullName: 159,
        date: 6.0,
        submitDueDate: 24,
        resultReleaseDate: 4.0,
        spot: 87
      },
      {
        name: 'Cupcake',
        abbrNname: 'Frozen Yogurt',
        fullName: 159,
        date: 6.0,
        submitDueDate: 24,
        resultReleaseDate: 4.0,
        spot: 87
      }
    ]
  })
}
</script>

<style scoped>

</style>
