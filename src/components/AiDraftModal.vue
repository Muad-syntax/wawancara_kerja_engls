<script setup>
import { Wand2, Sparkles, Volume2, Check, X } from 'lucide-vue-next'
import { useTTS } from '../composables/useTTS.js'

const props = defineProps({
  show:             { type: Boolean, default: false },
  currentQuestion:  { type: String,  default: '' },
  selectedRole:     { type: String,  default: '' },
  draftTone:        { type: String,  default: 'star' },
  draftKeywords:    { type: String,  default: '' },
  isGenerating:     { type: Boolean, default: false },
  drafts:           { type: Array,   default: () => [] },
  quickPhrases:     { type: Array,   default: () => [] },
})

const emit = defineEmits([
  'close',
  'update:draftTone',
  'update:draftKeywords',
  'generate',
  'selectDraft',
  'appendPhrase',
])

const { playSpeech } = useTTS()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">

          <!-- Modal Header -->
          <div class="bg-navy-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Wand2 class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-bold text-base text-white">Interactive AI Answer Builder</h3>
                <p class="text-xs text-slate-400">Customized for {{ selectedRole }}</p>
              </div>
            </div>
            <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto custom-scrollbar space-y-5">

            <!-- Target question -->
            <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <span class="text-slate-500 font-bold uppercase block text-[10px] mb-0.5">Target Question:</span>
              <p class="font-semibold text-slate-800">"{{ currentQuestion }}"</p>
            </div>

            <!-- Options row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Answer Tone &amp; Structure:</label>
                <select
                  :value="draftTone"
                  @change="$emit('update:draftTone', $event.target.value)"
                  class="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="star">🌟 STAR Method (Situation, Task, Action, Result)</option>
                  <option value="concise">🚀 Short &amp; Direct (Concise Summary)</option>
                  <option value="technical">🛠️ Technical &amp; Practical Focus</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Key Experience / Keywords (Optional):</label>
                <input
                  :value="draftKeywords"
                  @input="$emit('update:draftKeywords', $event.target.value)"
                  type="text"
                  placeholder="e.g., Mikrotik, Cisco, internship, project..."
                  class="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <!-- Generate button -->
            <button
              @click="$emit('generate')"
              :disabled="isGenerating"
              class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-2.5 px-4 rounded-xl shadow transition text-xs flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              <Sparkles class="w-4 h-4" />
              <span>{{ isGenerating ? 'Generating AI Draft Options...' : 'Generate AI Answer Drafts' }}</span>
            </button>

            <!-- Draft cards -->
            <div v-if="drafts.length" class="space-y-3 pt-2">
              <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block">Select a Draft Variation to Use:</span>
              <div
                v-for="(draft, idx) in drafts"
                :key="idx"
                class="bg-slate-50 border border-slate-200 hover:border-emerald-500 rounded-xl p-4 transition space-y-3"
              >
                <div class="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span class="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Option {{ idx + 1 }}: {{ draft.title }}
                  </span>
                  <button
                    @click="playSpeech(draft.text)"
                    class="text-slate-500 hover:text-emerald-600 text-xs flex items-center space-x-1 bg-white px-2 py-1 rounded border border-slate-200"
                  >
                    <Volume2 class="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
                <p class="text-xs text-slate-800 leading-relaxed">{{ draft.text }}</p>
                <div class="pt-1 flex justify-end">
                  <button
                    @click="$emit('selectDraft', draft.text)"
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-1.5 rounded-lg transition flex items-center space-x-1.5 shadow-sm"
                  >
                    <Check class="w-3.5 h-3.5" />
                    <span>Insert Into Answer Workspace</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick phrases -->
            <div class="pt-3 border-t border-slate-200">
              <span class="text-xs font-bold text-slate-700 block mb-2">Or Click to Append Quick Sentence Starters:</span>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(phrase, pIdx) in quickPhrases"
                  :key="pIdx"
                  @click="$emit('appendPhrase', phrase)"
                  class="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 hover:border-emerald-400 text-xs px-2.5 py-1.5 rounded-lg transition text-left font-medium"
                >
                  + "{{ phrase }}"
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs">
            <span class="text-slate-500">Select any option above or append phrases directly.</span>
            <button
              @click="$emit('close')"
              class="bg-slate-800 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to    { opacity: 0; }
</style>
