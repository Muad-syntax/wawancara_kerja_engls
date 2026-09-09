<script setup>
import { computed }          from 'vue'
import { RotateCcw, CheckCircle, XCircle } from 'lucide-vue-next'
import { useStarStore }      from '../stores/star.js'

const star = useStarStore()
</script>

<template>
  <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <!-- Header -->
    <div class="flex justify-between items-center border-b border-slate-100 pb-3">
      <div>
        <h3 class="font-bold text-slate-800 text-base">Quick Etiquette &amp; Communication Quiz</h3>
        <p class="text-xs text-slate-500">Test your knowledge on professional interview standards.</p>
      </div>
      <div class="flex items-center space-x-3">
        <span
          v-if="star.quizCompleted"
          class="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full"
        >
          Score: {{ star.quizScore }} / {{ star.quizQuestions.length }}
        </span>
        <button
          @click="star.resetQuiz"
          class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg transition flex items-center space-x-1"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span>Reset Quiz</span>
        </button>
      </div>
    </div>

    <!-- Questions -->
    <div
      v-for="(q, index) in star.quizQuestions"
      :key="index"
      class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
    >
      <p class="text-xs font-bold text-slate-800">{{ index + 1 }}. {{ q.question }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          v-for="(opt, optIdx) in q.options"
          :key="optIdx"
          @click="star.selectQuizAnswer(index, optIdx)"
          :disabled="q.userSelected !== null"
          :class="q.userSelected === optIdx
            ? (optIdx === q.correct ? 'bg-emerald-600 text-white font-bold' : 'bg-rose-600 text-white font-bold')
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'"
          class="text-xs p-3 rounded-xl text-left transition font-medium flex items-center justify-between disabled:cursor-not-allowed"
        >
          <span>{{ opt }}</span>
          <CheckCircle v-if="q.userSelected === optIdx && optIdx === q.correct" class="w-4 h-4 text-white flex-shrink-0" />
          <XCircle    v-if="q.userSelected === optIdx && optIdx !== q.correct" class="w-4 h-4 text-white flex-shrink-0" />
        </button>
      </div>
      <p
        v-if="q.userSelected !== null"
        class="text-xs mt-2 font-medium p-2.5 rounded-lg border"
        :class="q.userSelected === q.correct
          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
          : 'bg-rose-100 text-rose-800 border-rose-200'"
      >
        <strong>{{ q.userSelected === q.correct ? 'Correct! ' : 'Incorrect. ' }}</strong>
        {{ q.explanation }}
      </p>
    </div>
  </div>
</template>
