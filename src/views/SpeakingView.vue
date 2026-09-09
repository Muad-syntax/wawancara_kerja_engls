<script setup>
import { useRouter }         from 'vue-router'
import { useInterviewStore } from '../stores/interview.js'
import { useSpeakingStore }  from '../stores/speaking.js'
import VocabCard             from '../components/VocabCard.vue'
import ShadowingStudio       from '../components/ShadowingStudio.vue'
import { useTTS }            from '../composables/useTTS.js'
import { Volume2, HelpCircle } from 'lucide-vue-next'
import { speakingCategories } from '../data/speakingBank.js'
import * as LucideVue from 'lucide-vue-next'

const router    = useRouter()
const interview = useInterviewStore()
const speaking  = useSpeakingStore()
const { playSpeech } = useTTS()

const roles = [
  { value: 'all',                                    label: 'All Vocational Majors' },
  { value: 'Computer Network Engineer (TKJ)',         label: 'TKJ (Network & Infrastructure)' },
  { value: 'Software Developer / Programmer (RPL)',   label: 'RPL (Software & Web Dev)' },
  { value: 'Graphic & Multimedia Designer',          label: 'DKV / Multimedia Design' },
  { value: 'Office Administration Staff',            label: 'Office Administration' },
  { value: 'Customer Service & Sales Representative',label: 'Customer Service & Sales' },
]

function getIcon (name) {
  // map icon string name to lucide component
  const map = {
    Sparkles:    LucideVue.Sparkles,
    ShieldCheck: LucideVue.ShieldCheck,
    Wrench:      LucideVue.Wrench,
    Cpu:         LucideVue.Cpu,
    HelpCircle:  LucideVue.HelpCircle,
  }
  return map[name] || LucideVue.Circle
}

function practiceInSim (sentence) {
  interview.userAnswer = interview.userAnswer
    ? interview.userAnswer + ' ' + sentence
    : sentence
  router.push('/')
}
</script>

<template>
  <div class="space-y-6">

    <!-- Header Banner -->
    <div class="glass-panel p-6 rounded-2xl border border-slate-200">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Volume2 class="w-6 h-6 text-emerald-600" />
            <span>Speaking Practice &amp; Vocabulary Express Bank</span>
          </h2>
          <p class="text-sm text-slate-600 mt-1">
            Master high-impact interview vocabulary, professional sentence starters, and role-specific technical terminology.
            Listen to audio models and practice shadowing.
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <label class="text-xs font-semibold text-slate-500">Target Vocation:</label>
          <select
            v-model="speaking.speakingRoleFilter"
            class="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option v-for="r in roles" :key="r.value" :value="r.value">{{ r.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Category Pills -->
    <div class="flex overflow-x-auto space-x-2 pb-2">
      <button
        v-for="cat in speakingCategories"
        :key="cat.id"
        @click="speaking.selectedSpeakingCat = cat.id"
        :class="speaking.selectedSpeakingCat === cat.id
          ? 'bg-navy-900 text-white shadow-md'
          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'"
        class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2"
      >
        <component :is="getIcon(cat.icon)" class="w-4 h-4 text-emerald-400" />
        <span>{{ cat.title }}</span>
      </button>
    </div>

    <!-- Vocab Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <VocabCard
        v-for="(item, idx) in speaking.filteredVocabList"
        :key="idx"
        :item="item"
        @listen="playSpeech"
        @practice-in-sim="practiceInSim"
      />
    </div>

    <!-- Empty state -->
    <div
      v-if="speaking.filteredVocabList.length === 0"
      class="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3"
    >
      <HelpCircle class="w-10 h-10 text-slate-300 mx-auto" />
      <p class="text-slate-600 text-sm font-medium">No phrases found for the selected category and role filter.</p>
      <button @click="speaking.speakingRoleFilter = 'all'" class="text-xs text-emerald-600 font-bold hover:underline">
        Reset Role Filter
      </button>
    </div>

    <!-- Shadowing Studio -->
    <ShadowingStudio />
  </div>
</template>
