<template>
  <div class="section section-tabs">
    <div class="container">
      <div class="row">
        <div class="col-md-24 ml-auto col-xl-24 mr-auto">
          <p class="category">Apply For A Meeting</p>
          <!-- Tabs with Background on Card -->
          <div class="card">
            <tabs
              centered
              type="neutral"
              tab-nav-wrapper-classes="card-header"
              tab-content-classes="card-body text-center"
              data-background-color="orange"

            >
              <tab-pane>
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <div class="col-sm-12 col-lg-12">
                  <fg-input placeholder="Regular"></fg-input>
                </div>
                <n-button type="primary" round simple>Confirm</n-button>
              </tab-pane>
            </tabs>
          </div>
          <!-- End Tabs on plain Card -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Tabs, TabPane, Button, Checkbox, Radio, FormGroupInput, Slider, Switch } from '@/components'

export default {
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [FormGroupInput.name]: FormGroupInput,
    [Switch.name]: Switch,
    [Option.name]: Option,
    Slider,
    Card,
    Tabs,
    TabPane
  }
}
</script>
<style>
.tab-content.tab-content-padding {
  padding: 20px;
}
</style>
