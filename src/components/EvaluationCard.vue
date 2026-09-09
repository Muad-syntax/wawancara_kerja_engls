<script setup>
import { Sparkles, ArrowRight, Volume2, Check, X } from 'lucide-vue-next'
import { useTTS } from '../composables/useTTS.js'

const props = defineProps({
  evaluation: { type: Object, default: null }
})
defineEmits(['next'])

const { playSpeech } = useTTS()
</script>

<template>
  <div v-if="evaluation" class="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
      <h4 class="font-bold text-slate-800 flex items-center space-x-2">
        <Sparkles class="w-5 h-5 text-amber-500" />
        <span>AI Feedback &amp; Performance Evaluation</span>
      </h4>
      <span class="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full">
        Overall Score: {{ evaluation.score }}/100
      </span>
    </div>

    <!-- Score grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
        <div class="text-xs text-slate-500">Relevance</div>
        <div class="font-extrabold text-emerald-600 text-lg">{{ evaluation.relevanceScore }}%</div>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
        <div class="text-xs text-slate-500">STAR Structure</div>
        <div class="font-extrabold text-teal-600 text-lg">{{ evaluation.starScore }}%</div>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
        <div class="text-xs text-slate-500">Grammar &amp; Fluency</div>
        <div class="font-extrabold text-blue-600 text-lg">{{ evaluation.grammarScore }}%</div>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
        <div class="text-xs text-slate-500">Confidence Tone</div>
        <div class="font-extrabold text-indigo-600 text-lg">{{ evaluation.confidenceScore }}%</div>
      </div>
    </div>

    <!-- Feedback text -->
    <div class="space-y-2 text-xs leading-relaxed">
      <p class="text-slate-700"><strong>Key Strengths:</strong> {{ evaluation.strengths }}</p>
      <p class="text-slate-700"><strong>Areas for Improvement:</strong> {{ evaluation.improvements }}</p>
      <div class="bg-amber-50 text-amber-900 p-3 rounded-lg border border-amber-200 mt-2">
        <strong>Recommended Model Answer (Dian Hermayani, M.Pd Standard):</strong>
        <p class="mt-1 italic">"{{ evaluation.sampleBetterAnswer }}"</p>
      </div>
    </div>

    <!-- Next button -->
    <div class="pt-2 flex justify-end">
      <button
        @click="$emit('next')"
        class="bg-navy-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow transition flex items-center space-x-2"
      >
        <span>Proceed to Next Question</span>
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
