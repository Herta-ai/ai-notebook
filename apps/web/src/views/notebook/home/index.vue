<script setup lang="ts">
import { service } from '@service'
import { onMounted } from 'vue'

onMounted(async () => {
  const userInfo = await service.profile()
  // eslint-disable-next-line no-console
  console.log(userInfo)
})
</script>

<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>
