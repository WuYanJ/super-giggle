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
                      <el-form ref="applyMeeting"
                               :inline="true"
                               :model="applyMeetingForm"
                               class="demo-form-inline">
                        <el-form-item prop="abbrName" style=" margin-bottom: 5px">
                          Conference Name(abbr.)
                          <el-input v-model="applyMeetingForm.abbrName" label="Conference Name(abbr.)"
                                    placeholder="Conference Name(abbr.)"
                          ></el-input>
                        </el-form-item>
                        <el-form-item prop="fullName" style=" margin-bottom: 5px">
                          Conference Name(formal)
                          <el-input v-model="applyMeetingForm.fullName" placeholder="Conference Name(formal)"
                                    class="input"></el-input>
                        </el-form-item>
                        <el-form-item prop="date" style="margin-bottom: 5px">
                          Choose Conference Date
                          <el-date-picker type="date" placeholder="Choose Conference Date"
                                          v-model="applyMeetingForm.date"></el-date-picker>
                        </el-form-item>
                        <el-form-item prop="submitDueDate" style="margin-bottom: 5px">
                          Choose Submit Due Date
                          <el-date-picker type="date" placeholder="Choose Submit Due Date"
                                          v-model="applyMeetingForm.submitDueDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item prop="resultReleaseDate" style="margin-bottom: 5px">
                          Choose Result Releasing Date
                          <el-date-picker type="date"
                                          placeholder="Choose Result Releasing Date"
                                          v-model="applyMeetingForm.resultReleaseDate">
                          </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="spot">
                          Conference Venue
                          <el-select v-model="applyMeetingForm.spot" placeholder="Conference Venue">
                            <el-option label="Shanghai" value="shanghai"></el-option>
                            <el-option label="Beijing" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>

                        <template slot="raw-content">
                            <div class="card-footer text-center">
                                <a
                                        v-on:click="submit()"
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
import store from '../store'

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
        chair: store.state.userName,
        pcMembers : null,
        date: this.applyMeetingForm.date,
        spot: this.applyMeetingForm.spot,
        submitDueDate: this.applyMeetingForm.submitDueDate,
        resultReleaseDate: this.applyMeetingForm.resultReleaseDate
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty('abbrName')) {
            alert('successful application')
            this.$router.replace({path: '/workspace'})
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
input.el-input__inner {
  padding: 0 30px;
  opacity:0.5;
  border-radius: 20px;
}
</style>
