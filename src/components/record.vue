<template>
  <div class="record">
    <el-tabs type="border-card">
      <!--支出-->
      <el-tab-pane class="expend">
        <span slot="label"><i class="el-icon-star-off"></i> 支出</span>
        <el-form :model="recordForm" ref="recordForm">
          <el-form-item>
            <p>分类</p>
            <el-select v-model="recordForm.expendClassify" placeholder="请选择">
              <el-option-group v-for="group in recordForm.expendOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <p>备注</p>
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="recordForm.expendRemark"
              :fetch-suggestions="querySearch"
              custom-item="my-item-zh"
              placeholder="如：望湘园吃饭"
              @select="handleSelect"
              icon="edit"
              :on-icon-click="handleIconClick"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <p>时间</p>
            <el-date-picker
              v-model="recordForm.dataTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="recordForm.pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <P>金额</P>
            <el-input-number v-model="recordForm.money" :step="2" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item>
            <!--Apply-->
            <el-button type="primary" @click="submitForm('recordForm','expend')">记账</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--收入-->
      <el-tab-pane class="income">
        <span slot="label"><i class="el-icon-star-on"></i> 收入</span>
        <el-form :model="recordForm"  ref="recordForm">
          <el-form-item>
            <p>分类</p>
            <el-select v-model="recordForm.incomeClassify" placeholder="请选择">
              <el-option
                v-for="item in recordForm.incomeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <p>备注</p>
            <el-input v-model="recordForm.incomeRemark" placeholder="如：北京加维工资"></el-input>
          </el-form-item>
          <el-form-item>
            <p>时间</p>
            <el-date-picker
              v-model="recordForm.dataTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="recordForm.pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <P>金额</P>
            <el-input-number v-model="recordForm.money" :step="2" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item>
            <!--Apply-->
            <el-button type="primary" @click="submitForm('recordForm','income')">记账</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ElTabPane from '../../node_modules/element-ui/packages/tabs/src/tab-pane'
  import ElForm from '../../node_modules/element-ui/packages/form/src/form'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item'

  export default{
    components: {
      ElFormItem,
      ElForm,
      ElTabPane},
    name: 'record',
    data () {
      return {
        recordForm: {
          expendOptions: [
            {
              'label': '衣',
              'options': [
                {'value': 'fushi', 'label': '服饰'},
                {'value': 'wanggou', 'label': '网购'},
                {'value': 'huazhaung', 'label': '化妆'},
                {'value': 'hufu', 'label': '护肤'}
              ]
            },
            {
              'label': '食',
              'options': [
                {'value': 'chifan', 'label': '吃饭'},
                {'value': 'shucai', 'label': '蔬菜'},
                {'value': 'shuiguo', 'label': '水果'},
                {'value': 'lingshi', 'label': '零食'},
                {'value': 'yiliao', 'label': '医疗'}
              ]
            },
            {
              'label': '住',
              'options': [
                {'value': 'fangzu', 'label': '房租'},
                {'value': 'dianfei', 'label': '电费'},
                {'value': 'huafei', 'label': '话费'},
                {'value': 'riyong', 'label': '日用'},
                {'value': 'yule', 'label': '娱乐'}
              ]
            },
            {
              'label': '行',
              'options': [
                {'value': 'jiaotong', 'label': '交通'}
              ]
            }
          ], // 支出的分类
          expendClassify: '',
          restaurants: [], // 支出的备注
          expendRemark: '',
          pickerOptions1: {}, // 支出的时间
          dataTime: '',
          money: 0, // 支出的金额
          incomeOptions: [
            {
              value: 'gongzi',
              label: '工资'
            }, {
              value: 'hongbao',
              label: '红包'
            }, {
              value: 'jianzhi',
              label: '兼职'
            }, {
              value: 'touzi',
              label: '投资'
            }, {
              value: 'jiangjin',
              label: '奖金'
            }
          ], // 收入的分类
          incomeClassify: '',
          incomeRemark: '' // 收入的备注
        }
      }
    },
    methods: {
      querySearch (queryString, callback) { // 支出的备注
        var restaurants = this.restaurants
        var result = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用callback返回建议列表的数据
        callback(result)
      },
      createFilter (queryString) { // 支出的备注
        return (restaurants) => {
          return (restaurants.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll () { // 支出的备注
        return [
          {'value': '望湘园', 'address': '北京昌平永旺'},
          {'value': '金鼎轩', 'address': '北京昌平永旺'},
          {'value': 'VeryModa', 'address': '北京昌平永旺'}
        ]
      },
      handleSelect (item) { // 支出的备注
        // console.log(item)
      },
      handleIconClick (ev) { // 支出的备注
        console.log(ev)
      },
      submitForm (formName, opt) {
        var recordData = {}
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.recordForm)
            if (opt === 'expend') {
              recordData.label = 'expend'
              recordData.classify = this.recordForm.expendClassify
              recordData.remark = this.recordForm.expendRemark
              recordData.dataTime = this.recordForm.dataTime
              recordData.money = this.recordForm.money
            } else if (opt === 'income') {
              recordData.label = 'income'
              recordData.classify = this.recordForm.incomeClassify
              recordData.remark = this.recordForm.incomeRemark
              recordData.dataTime = this.recordForm.dataTime
              recordData.money = this.recordForm.money
            }
            console.log(recordData)
            this.$ajax({
              url: '#',
              method: 'get',
              data: recordData
            })
            // 置空
            this.recordForm.expendClassify = ''
            this.recordForm.expendRemark = ''
            this.recordForm.dataTime = ''
            this.recordForm.money = 0
            this.recordForm.incomeClassify = ''
            this.recordForm.incomeRemark = ''
          } else {
            console.log('error submit')
            return false
          }
        })
      }
    },
    mounted () {
      this.restaurants = this.loadAll() // 支出的备注
    }
  }
</script>

<style>
  .expend p,
  .income p{
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  /*重置样式*/
  .el-form-item {
     margin-bottom: 0px;
  }
  .el-tabs--border-card {
     border: 0px;
    margin-top: 20px;
  }
  .el-tabs--border-card>.el-tabs__content {
    padding-top:0px;
  }
  /*分类*/
  .el-select {
    width: 100%;
  }
  /*备注*/
  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }
  .my-autocomplete .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete .addr {
    font-size: 12px;
    color: #b4b4b4;
  }
  .my-autocomplete .highlighted .addr {
    color: #ddd;
  }
  .el-autocomplete, .el-dropdown {
    width: 100%;
  }
  /*时间*/
  .el-date-editor.el-input {
   /* width: 217px;*/
    width: 100%;
  }
  /*金额*/
  .el-input-number {
   /* width: 217px;*/
    width: 100%;
  }
  /*Apply*/
  .el-button--primary{
    width: 100%;
    margin-top: 15px;
    font-size: x-large;
  }

</style>
