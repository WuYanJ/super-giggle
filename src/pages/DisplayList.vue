<template>

  <v-container>
    <h2>{{title}}</h2>
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
            <v-card
              color="blue"
              class="white lighten-5 pa-0"
            >
              <template
                v-slot:heading
              >
                <v-card-title class="whit--text display-2 red_title font-weight-bold px-0 py-2">{{item.abbrName}}
                </v-card-title>
                <v-card-subtitle
                  small
                  class="white--text text--darken-2 py-2 px-0"
                >{{ item.fullName }}
                </v-card-subtitle>
              </template>
              <v-divider class="my-4 py-0"></v-divider>
              <v-list
                dense
                class="white lighten-5 px-0 py-0"
                v-for="(value,name) in item"
                :key="value"
              >
                <v-list-item>
                  <v-list-item-content>{{name}} :</v-list-item-content>
                  <v-list-item-content>{{value}}</v-list-item-content>
                </v-list-item>
                </v-list>
              <v-btn type="neutral" round size="lg"
                     v-if="item.statusMessage === 'Already Approved' && item.chair === 'PJW'"
                     @click="allowContribute(item)">Allow Contribute</v-btn>
              <v-btn v-if="this.title==='NewInvitations'" type="neutral" round size="lg" @click="agree(item,item.index)">Agree</v-btn>
              <v-btn v-if="this.title==='NewInvitations'" type="neutral" round size="lg" v-on:click="this.reject(item,i)">Reject</v-btn>
              <v-btn @click="invitebutton(item)"
                     v-if="item.identity === 'Chair' && (item.statusMessage === 'Already Approved' || item.statusMessage === 'Allow Contribution')"
              > Invite
              </v-btn>
              <v-list
                dense
                class="white lighten-5 px-0 py-0"
                v-for="func in item.functions"
                :key="func"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-btn
                      small
                      :class="func.displayColor"
                      @click="callFunction(func.functionName,item)"
                    >{{func.componentName}}
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
                 </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  import MaterialCard from './MaterialCard'
  export default {
    name:'displayList',
    props: [
      '_list',
      '_itemsPerPage',
      '_title',
      '_displaySet',
      '_items',
      '_functions',
      '_itemPerPage',
    ],
    components:{
      MaterialCard
    },
    data () {
      return {
        list: this._list,
        itemsPerPage: this._itemsPerPage,
        title: this._title,
        displaySet: this._displaySet,
        items:this._items,
        functions: this._functions
      }
    },
    methods: {
      invitebutton(item){
        console.log(item.router)
        this.$emit('wantToEatApple', item)
      },
      agree(item,itemIndex){
        this.$emit('wantToEatBanana', item,itemIndex)
      },
      allowContribute(item){
        this.$emit('wantToAllContribute', item)
      },
      callFunction(functionName,item) {
        console.log(this.list);
        console.log(this.functions);
        this.functions[functionName](item);
      },
    },
  }
</script>
