import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { speakingBank, speakingCategories } from '../data/speakingBank.js'

export const useSpeakingStore = defineStore('speaking', () => {
  const speakingRoleFilter  = ref('all')
  const selectedSpeakingCat = ref('starters')

  const shadowSentence    = ref("I am a dedicated vocational student with hands-on experience in technical troubleshooting and teamwork.")
  const shadowTranscript  = ref('')
  const shadowAccuracy    = ref(0)
  const isShadowListening = ref(false)

  const practicePool = [
    "I am a dedicated vocational student with hands-on experience in technical troubleshooting and teamwork.",
    "My core strength is my ability to learn new tools quickly and solve complex errors under pressure.",
    "During my internship, I configured network routers and ensured smooth data connections.",
    "I handle constructive feedback by listening carefully and taking steps to improve my work.",
    "I am eager to contribute my technical knowledge and strong work ethic to your team."
  ]

  const filteredVocabList = computed(() =>
    speakingBank.filter(item => {
      const matchesCat  = item.catId === selectedSpeakingCat.value
      const matchesRole = speakingRoleFilter.value === 'all' || item.role === 'all' || item.role === speakingRoleFilter.value
      return matchesCat && matchesRole
    })
  )

  function pickRandomPracticeSentence () {
    const idx = Math.floor(Math.random() * practicePool.length)
    shadowSentence.value   = practicePool[idx]
    shadowTranscript.value = ''
    shadowAccuracy.value   = 0
  }

  function setShadowResult (transcript) {
    shadowTranscript.value = transcript
    const targetWords = shadowSentence.value.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ')
    const heardWords  = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ')
    let matchCount    = 0
    targetWords.forEach(w => { if (heardWords.includes(w)) matchCount++ })
    shadowAccuracy.value = Math.round((matchCount / targetWords.length) * 100)
  }

  return {
    speakingRoleFilter, selectedSpeakingCat,
    shadowSentence, shadowTranscript, shadowAccuracy, isShadowListening,
    filteredVocabList,
    speakingCategories, speakingBank,
    pickRandomPracticeSentence, setShadowResult
  }
})
