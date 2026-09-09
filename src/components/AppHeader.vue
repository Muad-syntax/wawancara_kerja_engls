<script setup>
import { ref, watch } from 'vue'
import { useRoute }   from 'vue-router'
import { useInterviewStore } from '../stores/interview.js'
import {
  Briefcase, Mic, Volume2, Layers, UserCheck, Award
} from 'lucide-vue-next'

const interview = useInterviewStore()
const route     = useRoute()

const navLinks = [
  { name: 'simulasi',   path: '/',            label: 'Interview Simulation', icon: Mic },
  { name: 'speaking',   path: '/speaking',    label: 'Speaking & Vocab',     icon: Volume2 },
  { name: 'star',       path: '/star',        label: 'STAR Method',          icon: Layers },
  { name: 'etika',      path: '/etika',       label: 'Etiquette & Dress Code', icon: UserCheck },
  { name: 'sertifikat', path: '/certificate', label: 'Report & Certificate', icon: Award },
]

watch(() => interview.studentName, val => interview.persistStudentName(val))
</script>

<template>
  <header class="bg-navy-900 text-white sticky top-0 z-40 shadow-md no-print border-b border-slate-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Briefcase class="w-5 h-5" />
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <h1 class="font-bold text-lg sm:text-xl tracking-tight leading-none text-white">Virtual Job Interview Lab</h1>
            <span class="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">v2.5 English Edition</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">
            Designed by: <span class="text-emerald-400 font-medium">Dian Hermayani, S.S., M.Pd.</span>
            &bull; <span class="text-slate-300">SMK TI Muhammadiyah Cikampek</span>
          </p>
        </div>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2"
          :class="route.name === link.name
            ? 'bg-emerald-600 text-white shadow'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'"
        >
          <component :is="link.icon" class="w-4 h-4" />
          <span>{{ link.label }}</span>
        </router-link>
      </nav>

      <!-- Student Name -->
      <div class="flex items-center space-x-3">
        <div class="hidden sm:block text-right">
          <div class="text-xs text-slate-400">Student Name:</div>
          <input
            v-model="interview.studentName"
            type="text"
            placeholder="Enter your full name..."
            class="bg-slate-800 text-white text-sm px-2.5 py-1 rounded border border-slate-700 focus:outline-none focus:border-emerald-500 w-40 sm:w-48 text-right font-semibold"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div class="md:hidden flex overflow-x-auto p-2 bg-slate-800 space-x-2 border-t border-slate-700">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition"
        :class="route.name === link.name ? 'bg-emerald-600 text-white' : 'text-slate-300'"
      >
        {{ link.label }}
      </router-link>
    </div>
  </header>
</template>
