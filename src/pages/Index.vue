<template>
  <v-app id="inspire">
      <v-btn
        color="pink"
        fab
        absolute
        righ
        large
        @click="openApplyPage"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <router-link :to="item.router">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
              </router-link>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <router-link :to="child.router">
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
              </router-link>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else-if="!((item.text==='Login' || item.text==='Register') && this.localStorage.getItem('userName')!=null)"
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <router-link :to="item.router">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
            </router-link>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Wheel Chair</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <router-link to="/login">
      <v-btn large color="primary"
             v-if="userName == null"
      >Login
      </v-btn>
      </router-link>
      <router-link to="/register">
      <v-btn large color="primary"
             v-if="userName == null"
      >Register
      </v-btn>
      </router-link>
      <router-link to="/adminApprove">
        <v-btn large color="primary"
               v-if="userName == 'admin'"
        >Approve Meeting
        </v-btn>
      </router-link>
        <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                v-on="on"
                v-if="userName != null"
              >
                {{userName}}
              </v-btn>
            </template>
            <v-list v-if="now">
              <v-list-item
                v-for="(item, index) in dropdownItems"
                :key="index"
                @click="item.function"
              >
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>
      <v-btn
        icon
        large
        @click="openWorkspace"
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          /></v-avatar>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
  import store from '../store'
  export default {
    methods: {
      openApplyPage:function(){
        this.$router.replace({path: '/applyMeeting'})
      },
      openWorkspace:function() {
        this.$router.replace({path: '/workspace'})
      },
      toProfile(){
        this.$router.replace({path: '/profile'})
      },
      logout () {
        this.$confirm('You want to logout?', 'Confirm', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Logout!'
          });
          this.$store.commit('logout')
          this.$router.push({path: '/'})
          location.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelled'
          });
        });
      }
    },
    props: {
      source: String,
    },
    data () {
      return {
        userName: store.state.userName, // userDetails.getUsername()
        now: store.state.now,
        drawer: null,
        dropdownItems: [
          {title: 'Profile', function: this.toProfile},
          {title: 'Logout', function: this.logout}
        ],
        items: [
          {icon: 'lightbulb_outline', text: 'News', router: "/news"},
          {icon: 'touch_app', text: 'Work Space', router: "/workspace"},
          {icon: 'add', text: 'Apply For A Meeting', router: "/applyMeeting"},
          {
            icon: 'mdi-chevron-up',
            'icon-alt': 'mdi-chevron-down',
            text: 'Labels',
            router: "login",
            model: true,
            children: [
              {icon: 'mdi-plus', text: 'Create label', router: "login"},
            ],
          }
        ],
      }
    },
    created () {
    }
  }
</script>
<style>
  a{
    text-decoration: none;
  }
</style>
