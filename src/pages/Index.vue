<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url(../../public/img/login.jpg)">
      </parallax>
      <div class="container">
        <div class="content-center brand">
<!--          <img class="n-logo" src="../../src/assets/logo.png" alt="" />-->
          <h1 class="h1-seo">Paper Forum.</h1>
          <h3>A complete Paper submission and review ecology</h3>
        </div>
      </div>
    </div>
    <div class="section section-basic">
      <div class="container">
        <h2 class="title">
          Conference News
        </h2>
        <v-app>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item,i) in 5"
              :key="i"
            >
              <v-expansion-panel-header>Conference</v-expansion-panel-header>
              <v-expansion-panel-content>
               Abbr Name:
                </v-expansion-panel-content>
              <v-expansion-panel-content>
                Full Name:
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Date:
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Submit Due Date:
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Result Release Date:
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                Spot:
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-app>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from '@/components'
import Navigation from './components/Navigation'
import TabsSection from './components/Tabs'
import ProgressPagination from './components/ProgressPagination'
import Notifications from './components/Notifications'
import Typography from './components/Typography'
import JavascriptComponents from './components/JavascriptComponents'
import CarouselSection from './components/CarouselSection'
import NucleoIconsSection from './components/NucleoIconsSection'
import ExamplesSection from './components/ExamplesSection'
import DownloadSection from './components/DownloadSection'

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    Navigation,
    TabsSection,
    ProgressPagination,
    Notifications,
    Typography,
    JavascriptComponents,
    CarouselSection,
    NucleoIconsSection,
    ExamplesSection,
    DownloadSection
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    load () {
      if(this.count < 22)
      this.count += 2
    }
  }
}
</script>
<style></style>
