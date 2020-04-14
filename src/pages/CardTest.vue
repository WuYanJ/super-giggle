<template>
  <v-app id="inspire">
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
        >
        <template v-slot:default="props">
          <v-row>
            <v-col
              cols="6"
              lg="4"
              v-for="item in props.items"
              :key="item.index"
            >
        <mdc-card>
          <mdc-card-primary-action>
            <mdc-card-media :src="src">
            </mdc-card-media>
          </mdc-card-primary-action>
          <mdc-card-header
            :title="item.username"
            :subtitle="item.affiliation" >
          </mdc-card-header>
          <mdc-card-text>
            <v-checkbox
              v-model="selectList"
              :label="item.username"
              :value="item.username"
              :disabled="item.checkbox"
            ></v-checkbox>
            {{item.email}}
          </mdc-card-text>
          <mdc-card-actions>
            <mdc-card-action-buttons>
              <mdc-card-action-button>ACTION</mdc-card-action-button>
            </mdc-card-action-buttons>
            <mdc-card-action-icons>
              <mdc-card-action-icon icon="star" />
            </mdc-card-action-icons>
          </mdc-card-actions>
        </mdc-card>
            </v-col>
          </v-row>
        </template>
        </v-data-iterator>
      <v-btn @click="sendSelectList">Send Invitation</v-btn>
  </v-app>
</template>

<script>
  export default {
    name: 'CardTest',
    props: [
      '_list',
      '_itemsPerPage',
      '_title',
      '_displaySet',
      '_items',
      '_functions',
      '_itemPerPage',
      '_selectList',
    ],
    data () {
      return {
        src : 'head.jpeg',
        list: this._list,
        itemsPerPage: this._itemsPerPage,
        title: this._title,
        displaySet: this._displaySet,
        items:this._items,
        selectList:[],
        // selectList: this._selectList,
        functions: this._functions,
      }
    },
    methods:{
      sendSelectList(){
        console.log(this.selectList)
        this.$emit('selectListFunction',this.selectList)
      }
    }
  }
</script>

<style>

</style>
