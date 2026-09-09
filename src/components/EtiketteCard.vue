<script setup>
import { UserCheck, ShieldCheck } from 'lucide-vue-next'

defineProps({
  title:    { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageAlt: { type: String, default: 'Attire' },
  icon:     { type: String, default: 'user-check' },
  points:   { type: Array,  default: () => [] },
})
</script>

<template>
  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
    <div class="w-full h-40 bg-slate-100 rounded-xl overflow-hidden">
      <img :src="imageUrl" :alt="imageAlt" class="w-full h-full object-cover" loading="lazy" />
    </div>
    <h3 class="font-bold text-slate-800 flex items-center space-x-2">
      <UserCheck class="w-4 h-4 text-emerald-600" />
      <span>{{ title }}</span>
    </h3>
    <ul class="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
      <li v-for="(point, i) in points" :key="i">{{ point }}</li>
    </ul>
  </div>
</template>
