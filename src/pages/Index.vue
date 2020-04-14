<template>
  <v-app id="inspire">
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
            v-else
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
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
        <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on }">
        <mdl-badge badge="3" no-background>
        <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
        </mdl-badge>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in dropdownItems"
          :key="index"
          @click=""
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
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
    <v-btn
      color="pink"
      dark
      fab
      fixed
      draggable="true"
      @click="openApplyPage"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
  export default {
    methods: {
      openApplyPage:function(){
        this.$router.replace({path: '/applyMeeting'})
      },
      openWorkspace:function() {
        this.$router.replace({path: '/workspace'})
      }
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      dropdownItems: [
        { title: 'Click Me' },
        { title: 'Click Me' }
      ],
      items: [
        { icon: 'lightbulb_outline', text: 'News', router: "news"},
        { icon: 'touch_app', text: 'Work Space', router: "workspace"},
        { icon: 'add', text: 'Apply For A Meeting', router: "applyMeeting"  },
        { icon: 'delete', text: 'Register', router: "register" },
        { icon: 'settings', text: 'Login',router: "login" },
        { icon: 'add', text: 'Window',router: "window" },
        { icon: 'settings', text: 'Approve Meeting',router: "adminApprove" },
        { icon: 'add', text: 'AllUsers',router: "users" },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'Labels',
          router: "login",
          model: true,
          children: [
            { icon: 'mdi-plus', text: 'Create label',router: "login"  },
          ],
        },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'More',
          router: "login",
          model: false,
          children: [
            { icon: 'mdi-plus',text: 'Import',router: "login" },
            { icon: 'mdi-plus',text: 'Export',router: "login" },
            { icon: 'mdi-plus',text: 'Print',router: "login" },
            { icon: 'mdi-plus',text: 'Undo changes',router: "login" },
            { icon: 'mdi-plus',text: 'Other contacts',router: "login" },
          ],
        },
        { icon: 'mdi-keyboard', text: 'Go to the old version',router: "login" },
      ],
    }),
    created () {
    },
  }
</script>
<style>
  a{
    text-decoration: none;
  }
</style>
