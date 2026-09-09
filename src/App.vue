<script setup>
import { ref }               from 'vue'
import AppHeader             from './components/AppHeader.vue'
import AppFooter             from './components/AppFooter.vue'
import ToastNotification     from './components/ToastNotification.vue'

// Global toast state (provide/inject pattern kept minimal)
const toast = ref({ show: false, message: '' })

function showToast (msg) {
  toast.value = { show: true, message: msg }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// Make showToast globally available via provide
import { provide } from 'vue'
provide('showToast', showToast)
</script>

<template>
  <div class="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
    <AppHeader />

    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
    <ToastNotification :show="toast.show" :message="toast.message" />
  </div>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active { transition: opacity 0.2s ease; }
.page-fade-enter-from,
.page-fade-leave-to    { opacity: 0; }
</style>
