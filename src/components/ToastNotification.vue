<script setup>
import { Info } from 'lucide-vue-next'

defineProps({
  message: { type: String, default: '' },
  show:    { type: Boolean, default: false }
})
</script>

<template>
  <transition name="toast-slide">
    <div
      v-if="show"
      class="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-3"
    >
      <Info class="w-4 h-4 text-emerald-400 flex-shrink-0" />
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active { transition: all 0.3s ease; }
.toast-slide-enter-from,
.toast-slide-leave-to    { opacity: 0; transform: translateY(10px); }
</style>
