<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
<div class="flex">
  <div class="flex-none w-14 h-14">
    01
  </div>
  <div class="flex-initial w-64 ...">
    02
  </div>
  <div class="flex-initial w-32 ...">
    03
  </div>
</div>
  <h1 class="text-3xl font-bold underline text-red-600">
    Hello world!
  </h1>  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <h1>{{ msg }}</h1>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
