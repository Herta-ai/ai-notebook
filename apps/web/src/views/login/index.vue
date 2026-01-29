<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNaiveForm, useStore } from '@/hooks'

const { t } = useI18n()

const { login, register } = useStore('user')
const { localeOptions, changeLocale } = useStore('app')
const { toggleThemeScheme, themeScheme } = useStore('theme')

const activeTab = ref<'login' | 'register'>('login')

const { formRef: loginFormRef, validate: validateLogin } = useNaiveForm()
const { formRef: registerFormRef, validate: validateRegister } = useNaiveForm()

const loginModel = reactive({
  username: '',
  password: '',
})

const registerModel = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

const loginRules = {
  username: {
    required: true,
    message: () => t('page.login.form.username.required'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: () => t('page.login.form.password.required'),
    trigger: 'blur',
  },
}

const registerRules = {
  username: {
    required: true,
    message: () => t('page.login.form.username.required'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: () => t('page.login.form.password.required'),
    trigger: 'blur',
  },
  confirmPassword: {
    required: true,
    trigger: 'blur',
    validator: (_: any, value: string) => {
      if (!value) {
        return new Error(t('page.login.form.confirmPassword.required'))
      }
      if (value !== registerModel.password) {
        return new Error(t('page.login.form.confirmPassword.invalid'))
      }
      return true
    },
  },
}

async function handleLogin() {
  try {
    await validateLogin()
    await login(loginModel.username, loginModel.password)
  }
  catch {}
}

async function handleRegister() {
  try {
    await validateRegister()
    await register(loginModel.username, loginModel.password)
  }
  catch {}
}
</script>

<template>
  <div class="relative wh-full flex-col-center overflow-hidden bg-layout">
    <!-- Top Right Actions -->
    <div class="absolute right-4 top-4 flex gap-2">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button circle quaternary @click="toggleThemeScheme">
            <template #icon>
              <div v-if="themeScheme === 'light'" class="i-carbon-sun" />
              <div v-else-if="themeScheme === 'dark'" class="i-carbon-moon" />
              <div v-else class="i-carbon-laptop" />
            </template>
          </n-button>
        </template>
        {{ t(`theme.appearance.themeSchema.${themeScheme}`) }}
      </n-tooltip>
      <n-dropdown
        :options="localeOptions"
        trigger="hover"
        @select="changeLocale"
      >
        <n-button circle quaternary>
          <template #icon>
            <div class="i-carbon-language" />
          </template>
        </n-button>
      </n-dropdown>
    </div>
    <!-- Title -->
    <h1 class="text-center font-bold">
      {{ t('system.title') }}
    </h1>
    <n-card class="max-w-md w-full shadow-lg" content-style="padding: 0;">
      <n-tabs
        v-model:value="activeTab"
        size="large"
        justify-content="space-evenly"
        type="segment"
        class="w-full"
      >
        <n-tab-pane name="login" :tab="t('page.login.login.title')">
          <div class="p-6 pt-2">
            <n-form
              ref="loginFormRef"
              :model="loginModel"
              :rules="loginRules"
              label-placement="left"
              size="large"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="loginModel.username"
                  :placeholder="t('page.login.common.usernamePlaceholder')"
                >
                  <template #prefix>
                    <div class="i-carbon-user" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="loginModel.password"
                  type="password"
                  show-password-on="click"
                  :placeholder="t('page.login.common.passwordPlaceholder')"
                  @keyup.enter="handleLogin"
                >
                  <template #prefix>
                    <div class="i-carbon-password" />
                  </template>
                </n-input>
              </n-form-item>
              <n-button type="primary" block size="large" @click="handleLogin">
                {{ t('page.login.common.confirm') }}
              </n-button>
            </n-form>
          </div>
        </n-tab-pane>

        <n-tab-pane name="register" :tab="t('page.login.register.title')">
          <div class="p-6 pt-2">
            <n-form
              ref="registerFormRef"
              :model="registerModel"
              :rules="registerRules"
              label-placement="left"
              size="large"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="registerModel.username"
                  :placeholder="t('page.login.common.usernamePlaceholder')"
                >
                  <template #prefix>
                    <div class="i-carbon-user" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="registerModel.password"
                  type="password"
                  show-password-on="click"
                  :placeholder="t('page.login.common.passwordPlaceholder')"
                >
                  <template #prefix>
                    <div class="i-carbon-password" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="confirmPassword">
                <n-input
                  v-model:value="registerModel.confirmPassword"
                  type="password"
                  show-password-on="click"
                  :placeholder="t('page.login.common.confirmPasswordPlaceholder')"
                  @keyup.enter="handleRegister"
                >
                  <template #prefix>
                    <div class="i-carbon-password" />
                  </template>
                </n-input>
              </n-form-item>
              <n-button type="primary" block size="large" @click="handleRegister">
                {{ t('page.login.common.confirm') }}
              </n-button>
            </n-form>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped>

</style>
