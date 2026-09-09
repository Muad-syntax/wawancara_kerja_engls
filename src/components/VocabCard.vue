<script setup>
import { Volume2, ArrowRight } from 'lucide-vue-next'

defineProps({
  item: { type: Object, required: true }
})
defineEmits(['listen', 'practiceInSim'])
</script>

<template>
  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
    <div>
      <div class="flex justify-between items-start mb-2">
        <span class="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {{ item.categoryTag }}
        </span>
        <button
          @click="$emit('listen', item.englishText)"
          class="text-emerald-600 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-100 p-2 rounded-full transition"
          title="Listen to Pronunciation"
        >
          <Volume2 class="w-4 h-4" />
        </button>
      </div>
      <h3 class="font-bold text-slate-900 text-base leading-snug">{{ item.englishText }}</h3>
      <p class="text-xs text-slate-500 font-medium mt-1 italic">Meaning: "{{ item.indonesianMeaning }}"</p>
    </div>

    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
      <span class="font-bold text-slate-500 uppercase text-[10px] block">In Interview Context:</span>
      <p class="italic">"{{ item.exampleSentence }}"</p>
    </div>

    <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
      <span class="text-[11px] text-slate-400">Level: <strong class="text-slate-600">{{ item.level }}</strong></span>
      <button
        @click="$emit('practiceInSim', item.exampleSentence)"
        class="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center space-x-1"
      >
        <span>Practice in Sim</span>
        <ArrowRight class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
