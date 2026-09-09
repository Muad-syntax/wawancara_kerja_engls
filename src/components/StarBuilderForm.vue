<script setup>
import { Layers, Sparkles } from 'lucide-vue-next'

defineProps({
  starData:     { type: Object,  required: true },
  selectedRole: { type: String,  default: '' },
  isPolishing:  { type: Boolean, default: false },
})
defineEmits(['update:starData', 'combine', 'polish'])

function updateField (field, val) {
  // emit a shallow copy with the updated field
}
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
    <h3 class="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 flex items-center justify-between">
      <span>STAR Answer Construction Form</span>
      <span class="text-xs font-normal text-slate-400">Target Role: {{ selectedRole }}</span>
    </h3>

    <!-- Situation -->
    <div>
      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">1. Situation (Background &amp; Context)</label>
      <textarea
        :value="starData.situation"
        @input="$emit('update:starData', { ...starData, situation: $event.target.value })"
        rows="2"
        placeholder="e.g., During my internship at PT Tech, our local network experienced frequent downtime..."
        class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      ></textarea>
    </div>

    <!-- Task -->
    <div>
      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">2. Task (Your Goal &amp; Responsibility)</label>
      <textarea
        :value="starData.task"
        @input="$emit('update:starData', { ...starData, task: $event.target.value })"
        rows="2"
        placeholder="e.g., I was assigned by my supervisor to reconfigure the Mikrotik router..."
        class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      ></textarea>
    </div>

    <!-- Action -->
    <div>
      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">3. Action (Concrete Steps &amp; Tools Used)</label>
      <textarea
        :value="starData.action"
        @input="$emit('update:starData', { ...starData, action: $event.target.value })"
        rows="2"
        placeholder="e.g., I analyzed the bandwidth usage, implemented queue trees, and set up VLAN segmentation..."
        class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      ></textarea>
    </div>

    <!-- Result -->
    <div>
      <label class="block text-xs font-bold text-slate-700 uppercase mb-1">4. Result (Measurable Outcome &amp; Impact)</label>
      <textarea
        :value="starData.result"
        @input="$emit('update:starData', { ...starData, result: $event.target.value })"
        rows="2"
        placeholder="e.g., Network uptime improved to 99%, bandwidth latency was reduced by 35%..."
        class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      ></textarea>
    </div>

    <!-- Action buttons -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      <button
        @click="$emit('combine')"
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow transition text-xs flex items-center justify-center space-x-2"
      >
        <Layers class="w-4 h-4" />
        <span>Combine Into Narrative</span>
      </button>
      <button
        @click="$emit('polish')"
        :disabled="isPolishing"
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl shadow transition text-xs flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <Sparkles class="w-4 h-4" />
        <span>{{ isPolishing ? 'Polishing...' : 'Polish with AI Gemini' }}</span>
      </button>
    </div>
  </div>
</template>
