<template>
  <div>
    111
  </div>
</template>

<script>
import { queryPointTree } from '@/api/test'

export default {
  name: 'Startpage',
  data () {
    return {

    }
  },
  methods: {
    getData () { // 请求示例
      const args = {
        name: '测试'
      }
       queryPointTree(args).then((res) => {
         this.$message.success('请求成功')
      }).catch((error) => {
        console.log(error)
         this.$message.error('请求失败') // 失败 全局会自动弹 一般不需要写catch这一段
      }).finally(() => { // 请求结束 无论失败还是成功 都会走

      })
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>

</style>
