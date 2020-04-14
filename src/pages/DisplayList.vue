<template>
  <v-container>
<!--    <h2>{{title}}</h2>-->
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
                <v-card-title >{{item.abbrName}}
                  <v-btn type="neutral" round size="lg"
                         v-if="item.statusMessage === 'Already Approved' && item.chair === 'PJW'"
                         @click="allowContribute(item)">Allow Contribute</v-btn>
                  <v-btn v-if="title==='NewInvitations'" type="neutral" round size="lg" @click="agree(item,item.index)">Agree</v-btn>
                  <v-btn v-if="title==='NewInvitations'" type="neutral" round size="lg" @click="reject(item,item.index)">Reject</v-btn>
                  <v-btn @click="invitebutton(item)"
                         v-if="item.identity === 'Chair' && (item.statusMessage === 'Already Approved' || item.statusMessage === 'Allow Contribution')"
                  > Invite
                  </v-btn>
                  <v-btn @click="contributebutton(item)"
                         v-if="item.identity !== 'Chair' && (item.statusMessage === 'Allow Contribution')"
                  > Contribute
                  </v-btn>
                </v-card-title>
              <v-divider class="my-4 py-0"></v-divider>
              <v-list
                color="blue"
                dense
                class="white lighten-5 px-0 py-0"
                v-for="(value,name) in item"
                :key="item.index"
              >
                <v-list-item>
                  <v-list-item-content>{{name}} :</v-list-item-content>
                  <v-list-item-content>{{value}}</v-list-item-content>
                </v-list-item>
                </v-list>

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
      contributebutton(item){
        console.log(item.router)
        this.$emit('wantToContribute', item)
      },
      agree(item,itemIndex){
        this.$emit('wantToEatBanana', item,itemIndex)
      },
      reject(item,itemIndex){
        this.$emit('wantNotToEatBanana', item,itemIndex)
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
