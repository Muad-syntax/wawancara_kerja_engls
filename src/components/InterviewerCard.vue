<script setup>
import { Volume2 } from 'lucide-vue-next'

defineProps({
  isInterviewActive: { type: Boolean, default: false },
  isSpeakingTTS:     { type: Boolean, default: false },
  currentQuestion:   { type: String,  default: '' }
})
defineEmits(['speak'])
</script>

<template>
  <div class="bg-navy-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] border border-slate-700">
    <!-- Background glows -->
    <div class="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Avatar -->
    <div class="relative mb-4">
      <div class="w-28 h-28 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 p-1 border-2 border-emerald-500/50 shadow-2xl flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
          alt="HR Manager Avatar"
          class="w-full h-full object-cover rounded-full"
        />
      </div>
      <div
        v-if="isSpeakingTTS"
        class="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-2 rounded-full shadow-lg animate-bounce"
      >
        <Volume2 class="w-4 h-4" />
      </div>
    </div>

    <h3 class="text-lg font-bold text-white">Ms. Sarah Ramadhani, M.Psi.</h3>
    <p class="text-xs text-emerald-400 font-medium mb-3">Senior HR Talent Acquisition Specialist</p>

    <!-- Status indicator -->
    <div class="inline-flex items-center space-x-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 text-xs text-slate-300">
      <span class="w-2 h-2 rounded-full" :class="isInterviewActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'"></span>
      <span>{{ isInterviewActive ? 'Session in Progress' : 'Interview Room Ready' }}</span>
    </div>

    <!-- Listen button -->
    <div v-if="isInterviewActive && currentQuestion" class="mt-5 w-full flex justify-center">
      <button
        @click="$emit('speak')"
        :disabled="isSpeakingTTS"
        class="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center space-x-2 disabled:opacity-50"
      >
        <Volume2 class="w-4 h-4" />
        <span>{{ isSpeakingTTS ? 'Playing Audio...' : 'Listen to Question (TTS)' }}</span>
      </button>
    </div>
  </div>
</template>
