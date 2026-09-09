<script setup>
import { useRouter }         from 'vue-router'
import { useInterviewStore } from '../stores/interview.js'
import { useStarStore }      from '../stores/star.js'
import StarBuilderForm       from '../components/StarBuilderForm.vue'
import StarNarrativePreview  from '../components/StarNarrativePreview.vue'
import { Wand2 } from 'lucide-vue-next'

const router    = useRouter()
const interview = useInterviewStore()
const star      = useStarStore()

function sendToSim () {
  interview.userAnswer = star.formattedStarNarrative
  router.push('/')
}

function copyNarrative () {
  navigator.clipboard.writeText(star.formattedStarNarrative)
}
</script>

<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="max-w-2xl">
        <h2 class="text-xl font-bold text-slate-900">STAR Method Builder Lab</h2>
        <p class="text-sm text-slate-600 mt-1">
          The STAR method (Situation, Task, Action, Result) is an internationally recognized framework for answering
          behavioral interview questions effectively in English.
        </p>
      </div>
      <button
        @click="star.loadStarPreset(interview.selectedRole)"
        class="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2.5 rounded-xl shadow text-xs transition flex items-center justify-center space-x-2"
      >
        <Wand2 class="w-4 h-4" />
        <span>Load Sample STAR Template</span>
      </button>
    </div>

    <!-- STAR Steps Guide Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
      <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm">S</div>
        <div>
          <div class="font-bold text-xs text-slate-800">Situation</div>
          <div class="text-[10px] text-slate-500">Set the background context</div>
        </div>
      </div>
      <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center text-sm">T</div>
        <div>
          <div class="font-bold text-xs text-slate-800">Task</div>
          <div class="text-[10px] text-slate-500">Describe your responsibility</div>
        </div>
      </div>
      <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-sm">A</div>
        <div>
          <div class="font-bold text-xs text-slate-800">Action</div>
          <div class="text-[10px] text-slate-500">Explain tools &amp; steps taken</div>
        </div>
      </div>
      <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm">R</div>
        <div>
          <div class="font-bold text-xs text-slate-800">Result</div>
          <div class="text-[10px] text-slate-500">Highlight measurable outcomes</div>
        </div>
      </div>
    </div>

    <!-- Builder + Preview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StarBuilderForm
        :star-data="star.starData"
        :selected-role="interview.selectedRole"
        :is-polishing="star.isPolishingStar"
        @update:starData="star.starData = $event"
        @combine="star.combineStarAnswer()"
        @polish="star.polishStarWithAI(interview.selectedRole)"
      />
      <StarNarrativePreview
        :narrative="star.formattedStarNarrative"
        @send-to-sim="sendToSim"
        @copy="copyNarrative"
      />
    </div>
  </div>
</template>
