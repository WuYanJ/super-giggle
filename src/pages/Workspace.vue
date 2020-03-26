<template>
    <div>
        <div class="page-header page-header-small" >
            <parallax
                    class="page-header-image"
                    style="background-image: url('img/bg6.jpg')"
            >
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">Workspace, handling meeting .</h1>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="button-container">
                    <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>
                    <a
                            href="#button"
                            class="btn btn-default btn-round btn-lg btn-icon"
                            rel="tooltip"
                            title="Follow me on Twitter"
                    >
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a
                            href="#button"
                            class="btn btn-default btn-round btn-lg btn-icon"
                            rel="tooltip"
                            title="Follow me on Instagram"
                    >
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                <div class="row">
                    <div class="col-md-6 ml-auto mr-auto">
                        <h4 class="title text-center">My Meeting</h4>
                    </div>
                    <tabs
                            pills
                            class="nav-align-center"
                            tab-content-classes="gallery"
                            tab-nav-classes="nav-pills-just-icons"
                            type="primary"
                    >
                        <tab-pane title="Profile">
                            <i slot="label" class="now-ui-icons design_image"></i>
                            <div class="col-md-6 ml-auto mr-auto">
                                <div class="row collections">
                                    <tabs-section></tabs-section>
                                </div>
                            </div>
                        </tab-pane>

                        <tab-pane title="Home">
                            <i slot="label" class="now-ui-icons location_world"></i>

                            <div class="col-md-6 ml-auto mr-auto">
                                <div class="row collections">
                                        <img src="img/bg7.jpg" alt="" class="img-raised" />
                                </div>
                            </div>
                        </tab-pane>

                        <tab-pane title="Messages">
                            <i slot="label" class="now-ui-icons sport_user-run"></i>
                            <div class="col-md-6 ml-auto mr-auto">
                                <div class="row collections">
                                        <img src="img/bg6.jpg" class="img-raised" />
                                </div>
                            </div>
                        </tab-pane>

                        <tab-pane title="Messages">
                            <i slot="label" class="now-ui-icons sport_user-run"></i>
                            <div class="col-md-6 ml-auto mr-auto">
                                <div class="row collections">
                                    <img src="img/bg6.jpg" class="img-raised" />
                                </div>
                            </div>
                        </tab-pane>
                    </tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Tabs, TabPane, Button } from '@/components'
import Navigation from './components/Navigation'
import TabsSection from './components/Tabs'

export default {
  name: 'workspace',
  bodyClass: 'profile-page',
  components: {
    Tabs,
    TabPane,
    [Button.name]: Button,
    Navigation,
    TabsSection
  }
}
</script>

<style scoped>

</style>
