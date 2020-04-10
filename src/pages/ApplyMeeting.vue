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
                      <el-form ref="applyMeetingForm"
                               :inline="true"
                               :rules="rules"
                               :model="applyMeetingForm"
                               v-loading="loading"
                               class="demo-form-inline">
                        <el-form-item prop="abbrName" style=" margin-bottom: 5px">
                          Conference Name(abbr.)
                          <el-input v-model="applyMeetingForm.abbrName" label="Conference Name(abbr.)"

                                    placeholder="Conference Name(abbr.)"
                          ></el-input>
                        </el-form-item>
                        <el-form-item prop="fullName" style=" margin-bottom: 5px"
                        >
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
                                        v-on:click="submit(applyMeetingForm)"
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
    const dataValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('can\'t be empty'))
      }
      if (value === '') {
        return callback(new Error('can\'t be empty'))
      }
      return callback()
    }
    const usernameValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('can\'t be empty'))
      } else if (value === '') {
        return callback(new Error('can\'t be empty'))
      } else {
        // eslint-disable-next-line no-useless-escape
        let reg = /^[a-zA-Z\-][a-zA-Z0-9_\-]*$/
        if (!reg.test(value)) {
          return callback(new Error('只能包含字母，数字或两种特殊字符(-_)且只能以字母或-开头'))
        }
      }
      return callback()
    }
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
      rules: {
        abbrName: [
          {required: true, message: 'fill in abbr', trigger: 'blur'},
          {min: 5, max: 32},
          {validator: usernameValid, trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        fullName: [
          {required: true, message: 'fill in abbr', trigger: 'blur'},
          {min: 5, max: 32},
          {validator: usernameValid, trigger: 'blur'},
          {validator: dataValid, trigger: 'blur'}
        ],
        date: [
          {required: true, message: 'Date is required', trigger: 'blur'},
        ],
        submitDueDate: [
          {required: true, message: 'Submit Due Date is required', trigger: 'blur'},
        ],
        resultReleaseDate: [
          {required: true, message: 'Result Release Date is required', trigger: 'blur'},
        ],
        spot: [
          {required: true, message: 'Spot is required', trigger: 'blur'},
        ]
      },
      loading: false
    }
  },
  methods: {
    submit (formName) {
      this.$refs.applyMeetingForm.validate(valid => {
        if (valid) {
          this.$axios.post('/meeting', {
            abbrName: this.applyMeetingForm.abbrName,
            fullName: this.applyMeetingForm.fullName,
            chair: store.state.userName,
            pcMembers: null,
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
        } else {
          alert('表单填写不完整')
        }
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
