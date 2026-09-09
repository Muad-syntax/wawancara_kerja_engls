import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { starPresets, defaultQuizQuestions } from '../data/starPresets.js'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_BASE    = 'https://generativelanguage.googleapis.com/v1beta/models'

export const useStarStore = defineStore('star', () => {
  const starData              = ref({ situation: '', task: '', action: '', result: '' })
  const formattedStarNarrative = ref('')
  const isPolishingStar       = ref(false)

  const quizQuestions = ref(JSON.parse(JSON.stringify(defaultQuizQuestions)))

  const quizCompleted = computed(() => quizQuestions.value.every(q => q.userSelected !== null))
  const quizScore     = computed(() => quizQuestions.value.filter(q => q.userSelected === q.correct).length)

  function loadStarPreset (role) {
    const preset = starPresets[role] || starPresets['Computer Network Engineer (TKJ)']
    starData.value = { ...preset }
    combineStarAnswer()
  }

  function combineStarAnswer () {
    const { situation: s, task: t, action: a, result: r } = starData.value
    if (!s.trim() && !a.trim()) return false
    let narrative = ''
    if (s.trim()) narrative += `In my experience, ${s.trim()} `
    if (t.trim()) narrative += `My main goal was to ${t.trim()} `
    if (a.trim()) narrative += `To address this, I ${a.trim()} `
    if (r.trim()) narrative += `As a result, ${r.trim()}`
    formattedStarNarrative.value = narrative.trim()
    return true
  }

  async function polishStarWithAI (role) {
    combineStarAnswer()
    if (!formattedStarNarrative.value) return false
    isPolishingStar.value = true

    const systemPrompt = `You are an expert English teacher (Dian Hermayani, S.S., M.Pd).
    Refine the candidate's STAR interview response into a single, cohesive, highly professional English paragraph suitable for a job interview.
    Maintain the candidate's core facts while improving flow, vocabulary, and grammatical confidence. Output ONLY the polished response.`

    try {
      const res = await fetch(
        `${GEMINI_BASE}/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Job Role: ${role}\nSTAR Response: "${formattedStarNarrative.value}"` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      )
      const result = await res.json()
      const text   = result.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) { formattedStarNarrative.value = text.trim(); return true }
    } catch { /* ignore */ } finally {
      isPolishingStar.value = false
    }
    return false
  }

  function selectQuizAnswer (qIndex, optIndex) {
    quizQuestions.value[qIndex].userSelected = optIndex
  }

  function resetQuiz () {
    quizQuestions.value = JSON.parse(JSON.stringify(defaultQuizQuestions))
  }

  return {
    starData, formattedStarNarrative, isPolishingStar,
    quizQuestions, quizCompleted, quizScore,
    loadStarPreset, combineStarAnswer, polishStarWithAI,
    selectQuizAnswer, resetQuiz
  }
})
