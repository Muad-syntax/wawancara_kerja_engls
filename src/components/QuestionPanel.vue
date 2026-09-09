<script setup>
import { computed }  from 'vue'
import { Send, Mic, Wand2 } from 'lucide-vue-next'

const props = defineProps({
  currentQuestion:   { type: String,  default: '' },
  isInterviewActive: { type: Boolean, default: false },
  isAnalyzing:       { type: Boolean, default: false },
  isListening:       { type: Boolean, default: false },
  currentIndex:      { type: Number,  default: 0 },
  totalQuestions:    { type: Number,  default: 5 },
  modelValue:        { type: String,  default: '' }
})
const emit = defineEmits(['update:modelValue', 'submit', 'toggleMic', 'openDraft'])

const wordCount = computed(() => {
  const t = props.modelValue.trim()
  return t ? t.split(/\s+/).length : 0
})
</script>

<template>
  <div class="glass-panel p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col">

    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Question {{ currentIndex + 1 }} of {{ totalQuestions }}
      </span>
      <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
        Status: <strong class="text-emerald-600">{{ isAnalyzing ? 'Gemini AI Analyzing...' : 'Awaiting Response' }}</strong>
      </span>
    </div>

    <!-- Question bubble -->
    <div class="bg-slate-900 text-white p-5 rounded-xl mb-5 shadow-inner border border-slate-800">
      <p class="text-xs text-emerald-400 font-semibold mb-1">Interviewer's Question:</p>
      <p class="text-base sm:text-lg font-medium leading-relaxed" v-if="isInterviewActive">
        "{{ currentQuestion }}"
      </p>
      <p class="text-slate-400 text-sm italic" v-else>
        Click the "Start Lab Session" button above to initiate your interactive job interview simulation.
      </p>
    </div>

    <!-- Answer area -->
    <div class="flex-1 flex flex-col space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">Type or Dictate Your Answer:</label>
        <div class="flex items-center space-x-2">
          <!-- AI Draft -->
          <button
            @click="$emit('openDraft')"
            :disabled="!isInterviewActive"
            class="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 font-semibold text-xs px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 shadow-sm border border-amber-400"
          >
            <Wand2 class="w-3.5 h-3.5" />
            <span>Bantu Susun Jawaban (AI Draft)</span>
          </button>
          <!-- Mic -->
          <button
            @click="$emit('toggleMic')"
            :disabled="!isInterviewActive"
            :class="isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            class="text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 border border-slate-300 disabled:opacity-50"
          >
            <Mic class="w-3.5 h-3.5" />
            <span>{{ isListening ? 'Listening...' : 'Use Microphone' }}</span>
          </button>
        </div>
      </div>

      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="!isInterviewActive || isAnalyzing"
        rows="5"
        placeholder="Type your answer clearly in English or click 'Bantu Susun Jawaban (AI Draft)' for guidance..."
        class="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none flex-1 font-sans text-slate-800 shadow-inner disabled:bg-slate-50"
      ></textarea>

      <div class="flex justify-between items-center pt-2">
        <span class="text-xs text-slate-400">Word count: {{ wordCount }} words</span>
        <button
          @click="$emit('submit')"
          :disabled="!isInterviewActive || !modelValue.trim() || isAnalyzing"
          class="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
        >
          <span v-if="!isAnalyzing">Submit &amp; Request AI Evaluation</span>
          <span v-else>Evaluating...</span>
          <Send v-if="!isAnalyzing" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
