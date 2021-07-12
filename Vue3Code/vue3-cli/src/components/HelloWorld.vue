<template>
  <div>Name: {{state.name}}</div>
  <div>Age: {{state.age}}</div>
  <div>Wife: {{state.wife}}</div>
  <div>Gender: {{state.gender}}</div>
  <button @click="update">按我一下</button>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    setup () {
      const obj: any = {
        name: 'tom',
        age: 25,
        wife: {
          name: 'marry',
          age: 22
        },
      }
      // 定义响应式数据对象
      // 返回的是一个Proxy代理的对象，被代理者就是reactive中传入的对象
      const state = reactive(obj)
      console.log(state, state.wife)

      const update = () => {
        // 也可以直接操作obj对象
        // obj.name += '--'
        // obj.age += 1
        // state.wife.name += '++'
        // state.wife.age += 2

        // 更新变量不会重新渲染
        // obj.gender = '男'
        // 更新变量通过Proxy会渲染
        state.gender = '男'
      }

      return {
        obj,
        state,
        update,
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
