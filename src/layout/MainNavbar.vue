<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        Now Ui Kit
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Download</p>
        </a>
      </li>
      <drop-down
        tag="li"
        title="Components"
        icon="now-ui-icons design_app"
        class="nav-item"
      >
        <nav-link to="/">
          <i class="now-ui-icons business_chart-pie-36"></i> All components
        </nav-link>
        <a
          href="https://demos.creative-tim.com/vue-now-ui-kit/documentation"
          target="_blank"
          class="dropdown-item"
        >
          <i class="now-ui-icons design_bullet-list-67"></i> Documentation
        </a>
      </drop-down>
      <drop-down
              tag="li"
              title="Link"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> Landing
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
      </drop-down>
      <li class="nav-item">
        <a
          class="nav-link btn btn-neutral"
          href="https://www.creative-tim.com/product/vue-now-ui-kit-pro"
          target="_blank"
        >
          <i class="now-ui-icons arrows-1_share-66"></i>
          <p>Upgrade to PRO</p>
        </a>
      </li>
      <drop-down
        tag="li"
        v-bind:title="username"
        icon="now-ui-icons design_app"
        class="nav-item"
        @command="handleCommand"
    >
      <nav-link to="/profile">
        <i class="now-ui-icons business_chart-pie-36"></i> Profile
      </nav-link>
      <nav-link
        to="/"
        class="dropdown-item"
        command="logout"
      >
        <i class="now-ui-icons design_bullet-list-67"></i> Logout
      </nav-link>
    </drop-down>
    </template>
  </navbar>
</template>

<script>
import store from './../store'
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components'
import { Popover } from 'element-ui'
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  data () {
    return {
      collapse: true,
      fullscreen: false,
      username: store.state.userName, // userDetails.getUsername()
      message: 2
    }
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.$store.commit('logout')
        location.reload()
      } else if (command === 'toWorkspace') {
        this.$router.replace('/workspace')
      }
    }
  }
}
</script>

<style scoped></style>
