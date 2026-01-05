<script lang="ts" setup>
import { computed } from 'vue'
import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'

defineOptions({ name: 'ExceptionBase' })

const props = defineProps<Props>()

type ExceptionType = '403' | '404' | '500'

interface Props {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType
}

const { routerPushByKey } = useRouterPush()

const iconMap: Record<ExceptionType, string> = {
  403: 'i-local-no-permission',
  404: 'i-local-not-found',
  500: 'i-local-service-error',
}

const icon = computed(() => iconMap[props.type])
</script>

<template>
  <div class="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
    <div class="flex text-400px text-primary" :class="[icon]" />
    <NButton type="primary" @click="routerPushByKey('root')">
      {{ $t('common.backToHome') }}
    </NButton>
  </div>
</template>

<style scoped></style>
