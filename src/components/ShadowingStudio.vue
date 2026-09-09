<script setup>
import { Volume2, Mic, Shuffle } from 'lucide-vue-next'
import { useSpeakingStore }     from '../stores/speaking.js'
import { useSpeechRecognition } from '../composables/useSpeechRecognition.js'
import { useTTS }               from '../composables/useTTS.js'

const speaking = useSpeakingStore()
const { playSpeech } = useTTS()
const { isListening, startOnce } = useSpeechRecognition()

function startShadow () {
  speaking.isShadowListening = true
  startOnce(
    (result) => {
      speaking.setShadowResult(result)
      speaking.isShadowListening = false
    },
    () => { speaking.isShadowListening = false }
  )
}
</script>

<template>
  <div class="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
      <div>
        <h3 class="font-bold text-lg text-white flex items-center space-x-2">
          <Mic class="w-5 h-5 text-emerald-400" />
          <span>Interactive Pronunciation &amp; Shadowing Practice</span>
        </h3>
        <p class="text-xs text-slate-400 mt-1">Listen to standard native English pronunciation, then speak into your microphone to test your clarity!</p>
      </div>
      <button
        @click="speaking.pickRandomPracticeSentence"
        class="bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 transition flex items-center space-x-2"
      >
        <Shuffle class="w-4 h-4" />
        <span>New Practice Sentence</span>
      </button>
    </div>

    <!-- Sentence box -->
    <div class="bg-slate-800/90 p-5 rounded-xl border border-slate-700 text-center space-y-4">
      <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider">Target Sentence to Speak:</span>
      <p class="text-lg sm:text-xl font-semibold text-white leading-relaxed">"{{ speaking.shadowSentence }}"</p>

      <div class="flex justify-center space-x-3 pt-2">
        <button
          @click="playSpeech(speaking.shadowSentence)"
          class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
        >
          <Volume2 class="w-4 h-4" />
          <span>Listen (Model Speaker)</span>
        </button>
        <button
          @click="startShadow"
          :disabled="speaking.isShadowListening"
          :class="speaking.isShadowListening ? 'bg-rose-500 animate-pulse text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'"
          class="text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-2 border border-slate-600 disabled:opacity-70"
        >
          <Mic class="w-4 h-4" />
          <span>{{ speaking.isShadowListening ? 'Listening... Speak Now!' : 'Start Speaking Test' }}</span>
        </button>
      </div>
    </div>

    <!-- Match result -->
    <div v-if="speaking.shadowTranscript" class="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-400">What We Heard:</span>
        <span
          class="text-xs font-bold px-2.5 py-0.5 rounded-full border"
          :class="speaking.shadowAccuracy >= 75
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'"
        >
          Speech Match: {{ speaking.shadowAccuracy }}%
        </span>
      </div>
      <p class="text-sm font-mono text-slate-200 italic bg-slate-900 p-3 rounded-lg border border-slate-800">
        "{{ speaking.shadowTranscript }}"
      </p>
    </div>
  </div>
</template>
