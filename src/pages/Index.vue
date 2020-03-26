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
    <signup-form></signup-form>
  </div>
</template>
<script>
import { Parallax } from '@/components'
import BasicElements from './components/BasicElementsSection'
import Navigation from './components/Navigation'
import TabsSection from './components/Tabs'
import ProgressPagination from './components/ProgressPagination'
import Notifications from './components/Notifications'
import Typography from './components/Typography'
import JavascriptComponents from './components/JavascriptComponents'
import CarouselSection from './components/CarouselSection'
import NucleoIconsSection from './components/NucleoIconsSection'
import SignupForm from './components/SignupForm'
import ExamplesSection from './components/ExamplesSection'
import DownloadSection from './components/DownloadSection'

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax,
    BasicElements,
    Navigation,
    TabsSection,
    ProgressPagination,
    Notifications,
    Typography,
    JavascriptComponents,
    CarouselSection,
    NucleoIconsSection,
    SignupForm,
    ExamplesSection,
    DownloadSection
  }
}
</script>
<style></style>
