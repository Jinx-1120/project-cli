<template>
    <el-button :disabled="btnData.disabled" :size="btnData.size" :type="type" :loading="loading" @click="submit">
        <span v-if="!loading">{{btnData.title}}</span>
        <span v-else>{{loadText}}</span>
    </el-button>
</template>
<script>
  export default {
    props: ['btnData'],
    data() {
      return {
        loading: false,
        size: '',
        disabled: '',
        type: 'primary',
        loadText: '加载中'
      }
    },
    created() {
      if (typeof this.btnData.type !== "undefined") {
        this.type = this.btnData.type
      }
      if (typeof this.btnData.size !== "undefined") {
        this.size = this.btnData.size
      }
      if (typeof this.btnData.disable !== "undefined") {
        this.disable = this.btnData.disabled
      }
      if (typeof this.btnData.loadText !== "undefined") {
        this.loadText = this.btnData.loadText

      }
    },
    mounted() {
    },
    methods: {
      postData() {
        this.$emit(this.btnData["callParEvent"], this.isLoadingFun)
      },
      isLoadingFun(status) {
        this.loading = status
      },
      submit() {
        this.postData()
      }
    }
  }
</script>
