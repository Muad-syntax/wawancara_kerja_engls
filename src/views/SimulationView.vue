<script setup>
import { useRouter }           from 'vue-router'
import { useInterviewStore }   from '../stores/interview.js'
import { useTTS }              from '../composables/useTTS.js'
import { useSpeechRecognition } from '../composables/useSpeechRecognition.js'
import InterviewerCard         from '../components/InterviewerCard.vue'
import QuestionPanel           from '../components/QuestionPanel.vue'
import EvaluationCard          from '../components/EvaluationCard.vue'
import AiDraftModal            from '../components/AiDraftModal.vue'
import { PlayCircle, RotateCcw, Lightbulb } from 'lucide-vue-next'

const router    = useRouter()
const interview = useInterviewStore()
const { playSpeech } = useTTS()
const { isListening, start, stop } = useSpeechRecognition()

const roles = [
  'Computer Network Engineer (TKJ)',
  'Software Developer / Programmer (RPL)',
  'Graphic & Multimedia Designer',
  'Office Administration Staff',
  'Customer Service & Sales Representative',
]

function toggleMic () {
  if (isListening.value) {
    stop()
    interview.isListening = false
  } else {
    interview.isListening = true
    start(
      (text) => { interview.userAnswer = text },
      (err)  => { interview.isListening = false }
    )
  }
}

async function handleSubmit () {
  const status = await interview.submitAnswer()
}

function handleNext () {
  const done = interview.nextQuestion()
  if (done) router.push('/certificate')
}

function openDraft () {
  const ok = interview.openDraftModal()
  if (!ok) alert('Please start the interview session first!')
}
</script>

<template>
  <div class="space-y-6">

    <!-- Config Banner -->
    <div class="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <!-- Role -->
        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Job Position</label>
          <select
            v-model="interview.selectedRole"
            :disabled="interview.isInterviewActive"
            class="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>
        <!-- Language -->
        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Instruction Language</label>
          <select
            v-model="interview.selectedLang"
            :disabled="interview.isInterviewActive"
            class="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="en">English (Professional Practice)</option>
            <option value="id">Bahasa Indonesia (Bilingual Mode)</option>
          </select>
        </div>
        <!-- Difficulty -->
        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Difficulty Level</label>
          <select
            v-model="interview.selectedDifficulty"
            :disabled="interview.isInterviewActive"
            class="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="beginner">Beginner (Core Questions)</option>
            <option value="intermediate">Intermediate (Case Studies &amp; Technical)</option>
            <option value="advanced">Advanced (Pressure &amp; Problem Solving)</option>
          </select>
        </div>
        <!-- Start / Reset -->
        <div class="flex items-end">
          <button
            v-if="!interview.isInterviewActive"
            @click="interview.startInterview"
            class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
          >
            <PlayCircle class="w-5 h-5" />
            <span>Start Lab Session</span>
          </button>
          <button
            v-else
            @click="interview.resetInterview"
            class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl shadow transition flex items-center justify-center space-x-2"
          >
            <RotateCcw class="w-5 h-5" />
            <span>Reset / Finish</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Interview Room Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- Left: Interviewer + Teaching Note -->
      <div class="lg:col-span-5 space-y-6">
        <InterviewerCard
          :is-interview-active="interview.isInterviewActive"
          :is-speaking-t-t-s="interview.isSpeakingTTS"
          :current-question="interview.currentQuestion"
          @speak="interview.speakCurrentQuestion"
        />

        <!-- Teaching note -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-900 shadow-sm">
          <div class="flex items-start space-x-3">
            <Lightbulb class="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-bold text-sm text-emerald-900">Teaching Note by Dian Hermayani, M.Pd:</h4>
              <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
                "Encourage students to structure their answers using the <strong>STAR</strong> method (Situation, Task, Action, Result).
                Maintain good eye contact, use clear pronunciation, and highlight real achievements!"
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Q&A + Evaluation -->
      <div class="lg:col-span-7 flex flex-col justify-between space-y-4">
        <QuestionPanel
          v-model="interview.userAnswer"
          :current-question="interview.currentQuestion"
          :is-interview-active="interview.isInterviewActive"
          :is-analyzing="interview.isAnalyzing"
          :is-listening="isListening"
          :current-index="interview.currentQuestionIndex"
          :total-questions="interview.totalQuestions"
          @submit="handleSubmit"
          @toggle-mic="toggleMic"
          @open-draft="openDraft"
        />

        <EvaluationCard
          :evaluation="interview.lastEvaluation"
          @next="handleNext"
        />
      </div>
    </div>

    <!-- AI Draft Modal -->
    <AiDraftModal
      :show="interview.showDraftModal"
      :current-question="interview.currentQuestion"
      :selected-role="interview.selectedRole"
      :draft-tone="interview.draftTone"
      :draft-keywords="interview.draftKeywords"
      :is-generating="interview.isGeneratingDrafts"
      :drafts="interview.generatedDrafts"
      :quick-phrases="interview.quickPhrases"
      @close="interview.showDraftModal = false"
      @update:draftTone="interview.draftTone = $event"
      @update:draftKeywords="interview.draftKeywords = $event"
      @generate="interview.generateAiDrafts"
      @select-draft="interview.selectDraft"
      @append-phrase="interview.appendSentence"
    />
  </div>
</template>
