<template>
  <div class="main-content">
    <div class="refund_application">
      <div class="item info_item">
        <h2>经销商信息</h2>
        <el-form label-width="120px" inline>
          <el-form-item label="经销商姓名：">{{ responseData.dealerName }}</el-form-item>
          <el-form-item label="经销商手机号：">{{ responseData.dealerMobile }}</el-form-item>
        </el-form>
        <el-form label-width="120px" inline>
          <el-form-item label="签约日期：">{{ responseData.signTime }}</el-form-item>
          <el-form-item label="合同编号：">{{ responseData.contractNo }}</el-form-item>
          <el-form-item label="签约乙方：">
            {{ responseData.signUser }}
          </el-form-item>
          <el-form-item label="所属城市：">
            {{ responseData.provinceName + '-' + responseData.cityName + '-' + responseData.areaName }}
          </el-form-item>
        </el-form>
        <el-form label-width="120px" inline>
          <el-form-item label="合同金额：">{{ (responseData.money / 100).toFixed(2) }}</el-form-item>
          <el-form-item label="已付款金额：">{{ (responseData.paidMoney / 100).toFixed(2) }}</el-form-item>
          <el-form-item label="待付款金额：">{{
            ((responseData.money - responseData.paidMoney) / 100).toFixed(2)
          }}
          </el-form-item>
          <el-form-item label="合同照片：">

            <el-image
              v-for="item in responseData.contractAttachArr"
              v-if="responseData.contractAttachArr.length"
              style="width: 70px; height: 70px;margin-right: 10px"
              :src="item.url"
              :preview-src-list="contractAttachArr"
            />
            <div v-else style="width: 20px;height: 20px;"> -</div>

          </el-form-item>
        </el-form>
        <el-form label-width="120px" inline>
          <el-form-item label="交费截图：">
            <el-image
              v-for="item in responseData.ticketArr"
              v-if="responseData.ticketArr.length"
              style="width: 70px; height: 70px;margin-right: 10px;margin-left: auto"
              :src="item"
              :preview-src-list="responseData.ticketArr"
            />
            <div v-else style="width: 20px;height: 20px;"> -</div>

          </el-form-item>
        </el-form>

      </div>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="item">
            <h2>退费信息</h2>
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="退费申请人：">
                {{ this.$store.getters.userInfo.name }}
              </el-form-item>
              <el-form-item label="退费类型：" prop="refundType">
                <el-checkbox v-model="ruleForm.refundType" :disabled="!isEdit" label="特殊退费" name="refundType" />
              </el-form-item>
              <el-form-item label="退费方式：" prop="refundMethod">
                <el-checkbox v-model="ruleForm.refundMethod" :disabled="!isEdit" label="银行转账" name="refundMethod" />
              </el-form-item>
              <el-form-item v-model="ruleForm.isInvoiceReturned" label="收据/发票：" prop="invoice">
                <el-radio-group v-model="ruleForm.isInvoiceReturned" :disabled="!isEdit">
                  <el-radio label="1"> 已退回</el-radio>
                  <el-radio label="0"> 未退回</el-radio>
                </el-radio-group>
                <el-input
                  v-if="ruleForm.isInvoiceReturned == '0'"
                  v-model.trim="ruleForm.specialReason"
                  :disabled="!isEdit"

                  placeholder="请输入未退回原因"
                />
              </el-form-item>

              <el-form-item label="收款总金额：">
                {{ (responseData.money / 100).toFixed(2) + '元' }}
              </el-form-item>
              <el-form-item label="已签收总金额：">
                {{
                  (responseData.totalSignForward / 100).toFixed(2) +
                    ' 元 ( 已结转: ' +
                    (responseData.signForward / 100).toFixed(2) +
                    '元, 待结转: '
                }}
                <!--                 +(responseData.signUnForward / 100).toFixed(2) + '元 )'-->
                <span style="color: orangered"> {{ (responseData.signUnForward / 100).toFixed(2) }} </span>
                元)
              </el-form-item>
              <el-form-item label="运送中总金额：">
                {{ (responseData.deliveringForward / 100).toFixed(2) + '元' }}
              </el-form-item>
              <el-form-item label="未发货总金额：">
                {{ (responseData.noDeliveryForward / 100).toFixed(2) + '元' }}
              </el-form-item>
              <el-form-item label="退费金额：" prop="refundAmount">
                <el-input
                  v-model.trim="ruleForm.refundAmount"
                  :disabled="!isEdit"
                  style="width:200px"
                />
              </el-form-item>
              <br>
              <el-form-item label="退费原因：" prop="refundReason">
                <el-input
                  v-model.trim="ruleForm.refundReason"
                  :disabled="!isEdit"
                  type="textarea"
                  rows="4"
                  maxlength="2000"
                  show-word-limit
                  placeholder="请输入退费原因"
                />
              </el-form-item>
              <h2>收款人信息</h2>
              <el-form-item label="收款人姓名:" prop="payeeName">
                <el-input
                  v-model="ruleForm.payeeName"
                  :disabled="!isEdit"
                  placeholder="请输入收款人姓名"
                />
              </el-form-item>
              <br>
              <el-form-item label="开户行行号:" prop="bankLine">
                <el-input
                  v-model.trim="ruleForm.bankLine"
                  :disabled="!isEdit"
                  placeholder="请输入开户行行号"
                />
              </el-form-item>
              <br>
              <el-form-item label="开户行名称:" prop="bankName">
                <el-input
                  v-model.trim="ruleForm.bankName"
                  :disabled="!isEdit"
                  placeholder="请输入开户行名称"
                />
              </el-form-item>
              <br>
              <el-form-item label="银行卡号:" prop="bankNum">
                <el-input
                  v-model.trim="ruleForm.bankNum"
                  :disabled="!isEdit"
                  placeholder="请输入银行卡号"
                />
              </el-form-item>
              <br>
              <el-form-item v-if="isEdit">
                <el-button type="primary" @click="submitForm('ruleForm')">
                  提交审核
                </el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { contractDetail, contractRefundAdd, contractRefundDetail } from '@/api/shop'

export default {
  components: {},

  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      srcList: [],
      contractAttachArr: [], // / 合同照片
      responseData: {},
      ruleForm: {
        isInvoiceReturned: '1',
        refundAmount: '00.00',
        invoice: '',
        applyName: '',
        refundType: true,
        refundMethod: true,
        name: '',
        bankNum: '',
        bankName: '',
        bankLine: '',
        payeeName: '',
        refundReason: '',
        specialReason: ''
      },
      rules: {
        invoice: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        refundAmount: [{ required: true, message: '请输入退费金额', trigger: 'blur' }],
        refundReason: [{ required: true, message: '请输入退费原因', trigger: 'blur' }],
        specialReason: [{ required: true, message: '请输入未退回原因', trigger: 'blur' }],
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        bankNum: [{ required: true, message: '请输入银行卡卡号', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入开户行名称', trigger: 'blur' }],
        bankLine: [{ required: true, message: '请输入开户行行号', trigger: 'blur' }],
        payeeName: [{ required: true, message: '请输入收款人名称', trigger: 'blur' }],
        refundType: [{ required: true, message: '请输入收款人名称', trigger: 'blur' }],
        refundMethod: [{ required: true, message: '请输入收款人名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.tableListData()
    } else {
      this.contractDetail()
    }
  },
  methods: {
    contractDetail() {
      contractRefundDetail({
        id: this.$route.query.id
      }).then((res) => {

      })
    },
    tableListData() {
      contractDetail({
        id: this.$route.query.id
      }
      ).then((res) => {
        if (res.status) {
          this.contractAttachArr = []
          this.responseData = res.data
          res.data.constructor
          for (var item of this.responseData.contractAttachArr) {
            this.contractAttachArr.push(item.url)
          }
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.ruleForm))
          params.contractId = this.$route.query.id
          params.applyName = this.$store.getters.userInfo.name
          params.refundAmount = parseInt(params.refundAmount * 100)
          params.applyId = this.$store.getters.userInfo.id
          delete params.refundType
          delete params.refundMethod
          delete params.invoice
          delete params.name


          contractRefundAdd(params).then((res) => {
            if (res.status) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.refund_application {
  .item {
    padding-bottom: 20px;
  }

  .info_item {
    label {
      // color: #99a9bf;
    }
  }

  h2 {
    font-size: 16px;
    margin: 10px 0;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .el-form-item__content {
    min-width: 140px;
  }
}
.refund_steps{

}
</style>
