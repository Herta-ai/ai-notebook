<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/store/modules/theme'
import { setLocale } from '@/locales'

const { t, locale } = useI18n()
const themeStore = useThemeStore()

const activeTab = ref<'login' | 'register'>('login')

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
    message: () => t('login.usernameRequired'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: () => t('login.passwordRequired'),
    trigger: 'blur',
  },
}

const registerRules = {
  username: {
    required: true,
    message: () => t('login.usernameRequired'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: () => t('login.passwordRequired'),
    trigger: 'blur',
  },
  confirmPassword: {
    required: true,
    message: () => t('login.confirmPasswordRequired'),
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      if (!value) {
        return new Error(t('login.confirmPasswordRequired'))
      }
      if (value !== registerModel.password) {
        return new Error(t('login.passwordMismatch'))
      }
      return true
    },
  },
}

function handleLogin() {
  // TODO: Implement login logic
  console.log('Login clicked', loginModel)
}

function handleRegister() {
  // TODO: Implement register logic
  console.log('Register clicked', registerModel)
}

function toggleTheme() {
  themeStore.toggleThemeScheme()
}

function toggleLanguage() {
  const nextLocale = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  setLocale(nextLocale)
}
</script>

<template>
  <div class="wh-full flex-center bg-layout relative overflow-hidden">
    <!-- Top Right Actions -->
    <div class="absolute top-4 right-4 flex gap-2">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button circle quaternary @click="toggleTheme">
            <template #icon>
              <div :class="themeStore.darkMode ? 'i-carbon-moon' : 'i-carbon-sun'" />
            </template>
          </n-button>
        </template>
        {{ themeStore.darkMode ? t('theme.appearance.themeSchema.dark') : t('theme.appearance.themeSchema.light') }}
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button circle quaternary @click="toggleLanguage">
            <template #icon>
              <div class="i-carbon-language" />
            </template>
          </n-button>
        </template>
        {{ locale === 'zh-CN' ? 'English' : '中文' }}
      </n-tooltip>
    </div>

    <n-card class="w-full max-w-md shadow-lg" content-style="padding: 0;">
      <n-tabs
        v-model:value="activeTab"
        size="large"
        justify-content="space-evenly"
        type="segment"
        class="w-full"
      >
        <n-tab-pane name="login" :tab="t('login.title')">
          <div class="p-6 pt-2">
            <div class="mb-8 text-center">
              <h2 class="text-2xl font-bold text-primary">{{ t('login.welcomeBack') }}</h2>
            </div>
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
                  :placeholder="t('login.usernamePlaceholder')"
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
                  :placeholder="t('login.passwordPlaceholder')"
                  @keyup.enter="handleLogin"
                >
                  <template #prefix>
                    <div class="i-carbon-password" />
                  </template>
                </n-input>
              </n-form-item>
              <n-button type="primary" block size="large" @click="handleLogin">
                {{ t('login.loginBtn') }}
              </n-button>
            </n-form>
          </div>
        </n-tab-pane>

        <n-tab-pane name="register" :tab="t('login.register')">
          <div class="p-6 pt-2">
             <div class="mb-8 text-center">
              <h2 class="text-2xl font-bold text-primary">{{ t('login.createAccount') }}</h2>
            </div>
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
                  :placeholder="t('login.usernamePlaceholder')"
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
                  :placeholder="t('login.passwordPlaceholder')"
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
                  :placeholder="t('login.confirmPasswordPlaceholder')"
                  @keyup.enter="handleRegister"
                >
                  <template #prefix>
                    <div class="i-carbon-password" />
                  </template>
                </n-input>
              </n-form-item>
              <n-button type="primary" block size="large" @click="handleRegister">
                {{ t('login.registerBtn') }}
              </n-button>
            </n-form>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--primary-color);
}
</style>
