<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div
                class="page-header-image"
        ></div>
        <div class="content">
            <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                    <card type="login" plain>
                      <h3>Apply For A Meeting.</h3>
                        <v-form
                                ref="form"
                                v-model="applyMeetingForm"
                                lazy-validation
                        >
                          <div class="col-sm-16 col-lg-16">
                            <fg-input v-model="applyMeetingForm.abbrName"
                                      :counter="10"
                                      :rules="abbrnameRules"
                                      placeholder="Conference Name(abbr.)"
                                      required></fg-input>
                          </div>
                          <br>
                          <div class="col-sm-16 col-lg-16">
                            <fg-input v-model="applyMeetingForm.fullName"
                                      :rules="fullnameRules"
                                      placeholder="Conference Name(formal)"
                                      required></fg-input>
                          </div>
                          <br>
                          <div class="col-sm-16 col-lg-16">
                            <fg-input v-model="applyMeetingForm.spot"
                                      :rules="fullnameRules"
                                      placeholder="Spot"
                                      required></fg-input>
                          </div>
                          <br>
                            <fg-input>
                                <el-date-picker
                                        type="date"
                                        popper-class="date-picker date-picker-primary"
                                        placeholder="Meeting Date"
                                        v-model="applyMeetingForm.date"
                                >
                                </el-date-picker>
                            </fg-input>
                            <br>
                            <fg-input>
                                <el-date-picker
                                        type="date"
                                        popper-class="date-picker date-picker-primary"
                                        placeholder="Submit Due Date "
                                        v-model="applyMeetingForm.submitDueDate"
                                >
                                </el-date-picker>
                            </fg-input>
                            <br>
                            <fg-input>
                                <el-date-picker
                                        type="date"
                                        popper-class="date-picker date-picker-primary"
                                        placeholder="Release Result Time"
                                        v-model="applyMeetingForm.resultReleaseDate"
                                >
                                </el-date-picker>
                            </fg-input>
                            <br>
<!--                            <n-checkbox v-model="checkboxes.unchecked">I have already know every rules.</n-checkbox>-->
                        </v-form>

                        <template slot="raw-content">
                            <div class="card-footer text-center">
                                <a
                                        v-on:click="submit()"
                                        href="/"
                                        class="btn btn-primary btn-round btn-lg btn-block"
                                >Ready To Apply</a
                                >
                            </div>
                            <div class="pull-left">
                                <h6>
                                    <router-link to="/" class="link footer-link">
                                        Create Account
                                    </router-link>
                                </h6>
                            </div>
                            <div class="pull-right">
                                <h6>
                                    <a href="#pablo" class="link footer-link">Need Help?</a>
                                </h6>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Card, Button, FormGroupInput, Checkbox } from '@/components'
import MainFooter from '@/layout/MainFooter'
import JavascriptComponents from './components/JavascriptComponents'
import { DatePicker } from 'element-ui'

export default {
  name: 'meeting',
  bodyClass: 'login-page',
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
    JavascriptComponents,
    [Checkbox.name]: Checkbox,
    DatePicker
  },
  data () {
    return {
      applyMeetingForm: {
        // 表单对象
        abbrName: '',
        fullName: '',
        date: '',
        spot: '',
        submitDueDate: '',
        resultReleaseDate: ''
      },
      modals: {
        classic: false,
        mini: false
      },
      checkboxes: {
        unchecked: false,
        checked: true,
        disabledUnchecked: false,
        disabledChecked: true
      },
      valid: false,
      abbrName: '',
      abbrnameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      fullName: '',
      fullnameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      spots: ''
    }
  },
  methods: {
    submit () {
      this.$axios.post('/meeting', {
        abbrName: this.applyMeetingForm.abbrName,
        fullName: this.applyMeetingForm.fullName,
        date: this.applyMeetingForm.date,
        spot: this.applyMeetingForm.spot,
        submitDueDate: this.applyMeetingForm.submitDueDate,
        resultReleaseDate: this.applyMeetingForm.resultReleaseDate
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
            alert('successful application')
            this.$router.replace({path: '/workspace'})
            this.$store.commit('login', resp.data)
          } else if (resp.status === 200 && resp.data.hasOwnProperty('error')) {
            alert('please login first')
            this.$router.replace({path: '/login'})
          } else {
            alert('apply error')
          }
        })
        .catch(error => {
          console.log(error)
          alert('Meeting Has Been Applied')
        })
    }
  }
}
</script>
<style lang="scss">
#javascriptComponents {
    .modal-buttons,
    .popover-buttons,
    .tooltip-buttons {
    .btn + .btn {
        margin-left: 3px;
    }
    }
}
</style>
