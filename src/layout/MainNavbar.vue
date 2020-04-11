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
        Homepage
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Fudan Soft 2020.
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item" v-if="!now">
        <router-link
          class="nav-link"
          to="register"
        >
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Sign up</p>
        </router-link>
      </li>
      <li class="nav-item" v-if="!now">
        <router-link
          class="nav-link"
          to="login"
        >
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Sign in</p>
        </router-link>
      </li>
      <drop-down
              tag="li"
              title="Link"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> About Us
        </nav-link>
      </drop-down>
      <drop-down
        tag="li"
        v-bind:title="userName"
        icon="now-ui-icons design_app"
        class="nav-item"
        v-if="now"
    >
        <nav-link to="/profile">
          <i class="now-ui-icons business_chart-pie-36"></i> Profile
        </nav-link>
        <nav-link to="/applyMeeting" v-if="userName!=='admin'">
          <i class="now-ui-icons business_chart-pie-36"></i> New Meeting
        </nav-link>
        <nav-link to="/adminApprove" v-if="userName==='admin'">
          <i class="now-ui-icons business_chart-pie-36"></i> Approve Meeting
        </nav-link>
      <div
        class="dropdown-item"
        divided
        @click="logout"
      >
        <i class="now-ui-icons design_bullet-list-67"></i> Logout
      </div>
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
      userName: store.state.userName, // userDetails.getUsername()
      now: store.state.now,
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
  }
}
</script>

<style scoped></style>
