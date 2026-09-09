<script setup>
import { useInterviewStore } from '../stores/interview.js'
import CertificateCard       from '../components/CertificateCard.vue'
import { Printer }           from 'lucide-vue-next'

const interview = useInterviewStore()
</script>

<template>
  <div class="space-y-6">

    <!-- Dashboard header -->
    <div class="glass-panel p-6 rounded-2xl border border-slate-200 no-print">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Lab Performance &amp; Digital Certificate</h2>
          <p class="text-sm text-slate-600 mt-1">Summary of your performance and virtual interview competency certificate.</p>
        </div>
        <button
          @click="window.print()"
          :disabled="interview.completedQuestionsCount === 0"
          class="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
        >
          <Printer class="w-4 h-4" />
          <span>Print Digital Certificate</span>
        </button>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
        <span class="text-xs font-semibold text-slate-400 uppercase">Questions Answered</span>
        <div class="text-3xl font-extrabold text-slate-800 mt-1">
          {{ interview.completedQuestionsCount }} / {{ interview.totalQuestions }}
        </div>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
        <span class="text-xs font-semibold text-slate-400 uppercase">Average Score</span>
        <div class="text-3xl font-extrabold text-emerald-600 mt-1">{{ interview.averageScore }} / 100</div>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
        <span class="text-xs font-semibold text-slate-400 uppercase">Interview Readiness Status</span>
        <div
          class="text-lg font-bold mt-2"
          :class="interview.averageScore >= 75 ? 'text-emerald-600' : 'text-amber-600'"
        >
          {{ interview.averageScore >= 75 ? 'WORKPLACE READY' : 'NEEDS PRACTICE' }}
        </div>
      </div>
    </div>

    <!-- Certificate -->
    <CertificateCard
      :student-name="interview.studentName"
      :selected-role="interview.selectedRole"
      :average-score="interview.averageScore"
      :formatted-date="interview.currentFormattedDate"
    />
  </div>
</template>
