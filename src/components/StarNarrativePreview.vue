<script setup>
import { Volume2, ArrowRight, Copy, Layers, FileText } from 'lucide-vue-next'
import { useTTS } from '../composables/useTTS.js'

const props = defineProps({
  narrative: { type: String, default: '' }
})
defineEmits(['listen', 'sendToSim', 'copy'])

const { playSpeech } = useTTS()
</script>

<template>
  <div class="bg-navy-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-800 min-h-[320px]">
    <div>
      <h3 class="font-bold text-emerald-400 text-base border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
        <span>Your Structured Interview Narrative</span>
        <FileText class="w-5 h-5" />
      </h3>

      <div
        v-if="narrative"
        class="bg-slate-800/80 p-5 rounded-xl text-sm leading-relaxed text-slate-200 border border-slate-700"
      >
        <p class="text-white font-medium">{{ narrative }}</p>
      </div>

      <div v-else class="text-center py-16 text-slate-500 text-xs space-y-3">
        <Layers class="w-10 h-10 text-slate-600 mx-auto" />
        <p>Fill in the form on the left or click <strong>"Load Sample STAR Template"</strong> above to generate your complete English interview narrative.</p>
      </div>
    </div>

    <div v-if="narrative" class="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
      <button
        @click="playSpeech(narrative)"
        class="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition flex items-center space-x-1"
      >
        <Volume2 class="w-4 h-4 text-emerald-400" />
        <span>Listen Narrative</span>
      </button>

      <div class="flex space-x-2">
        <button
          @click="$emit('sendToSim')"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center space-x-1.5 shadow"
        >
          <ArrowRight class="w-3.5 h-3.5" />
          <span>Send to Interview Simulation</span>
        </button>
        <button
          @click="$emit('copy')"
          class="bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition flex items-center space-x-1"
        >
          <Copy class="w-4 h-4" />
          <span>Copy</span>
        </button>
      </div>
    </div>
  </div>
</template>
