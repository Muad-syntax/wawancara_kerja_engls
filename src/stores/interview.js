import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { questionBank, roles } from '../data/questionBank.js'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_BASE    = 'https://generativelanguage.googleapis.com/v1beta/models'

export const useInterviewStore = defineStore('interview', () => {
  // ─── Config ───────────────────────────────────────────────────────────────
  const studentName       = ref(localStorage.getItem('student_name') || 'Vocational Student')
  const selectedRole      = ref(roles[0])
  const selectedLang      = ref('en')
  const selectedDifficulty = ref('beginner')

  // ─── Session State ────────────────────────────────────────────────────────
  const isInterviewActive    = ref(false)
  const currentQuestionIndex = ref(0)
  const totalQuestions       = 5
  const currentQuestion      = ref('')
  const userAnswer           = ref('')
  const isAnalyzing          = ref(false)
  const isSpeakingTTS        = ref(false)
  const isListening          = ref(false)
  const evaluationsList      = ref([])
  const lastEvaluation       = ref(null)

  // ─── Draft Modal ──────────────────────────────────────────────────────────
  const showDraftModal    = ref(false)
  const draftTone         = ref('star')
  const draftKeywords     = ref('')
  const isGeneratingDrafts = ref(false)
  const generatedDrafts   = ref([])

  const quickPhrases = [
    "Thank you for asking this question.",
    "During my vocational school training and internship, I gained hands-on experience in...",
    "I took the initiative to troubleshoot and resolve the issue effectively.",
    "As a result of my actions, we successfully achieved our goals.",
    "I am eager to contribute my technical background and positive attitude to your company."
  ]

  // ─── Computed ─────────────────────────────────────────────────────────────
  const completedQuestionsCount = computed(() => evaluationsList.value.length)
  const averageScore = computed(() => {
    if (!evaluationsList.value.length) return 0
    return Math.round(
      evaluationsList.value.reduce((a, c) => a + (c.score || 0), 0) / evaluationsList.value.length
    )
  })
  const currentFormattedDate = computed(() =>
    new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  )

  // ─── Watchers (called externally after watch setup in component) ──────────
  function persistStudentName (val) {
    localStorage.setItem('student_name', val)
  }

  // ─── Actions ──────────────────────────────────────────────────────────────
  function startInterview () {
    isInterviewActive.value    = true
    currentQuestionIndex.value = 0
    evaluationsList.value      = []
    lastEvaluation.value       = null
    loadQuestion()
  }

  function resetInterview () {
    isInterviewActive.value = false
    currentQuestion.value   = ''
    userAnswer.value        = ''
    lastEvaluation.value    = null
  }

  function loadQuestion () {
    const qs = questionBank[selectedRole.value] || questionBank[roles[0]]
    currentQuestion.value = qs[currentQuestionIndex.value] || 'Tell me about yourself!'
    userAnswer.value      = ''
    lastEvaluation.value  = null
  }

  function nextQuestion () {
    if (currentQuestionIndex.value < totalQuestions - 1) {
      currentQuestionIndex.value++
      loadQuestion()
      return false // not done
    }
    return true // all done → navigate to certificate
  }

  async function submitAnswer () {
    if (!userAnswer.value.trim()) return
    isAnalyzing.value = true

    const systemPrompt = `You are Ms. Sarah Ramadhani, M.Psi., a professional HR Talent Acquisition Specialist & Senior English Examiner. 
    Your goal is to evaluate candidate (vocational English student) answers objectively and constructively according to the communicative pedagogy of Dian Hermayani, S.S., M.Pd.

    Provide output strictly in valid JSON with the following structure:
    {
        "score": 85,
        "relevanceScore": 88,
        "starScore": 80,
        "grammarScore": 90,
        "confidenceScore": 85,
        "strengths": "1-2 sentences highlighting candidate's strong points in English.",
        "improvements": "1-2 sentences giving actionable grammar or vocabulary advice.",
        "sampleBetterAnswer": "An exemplary, natural English response suited for a professional job interview."
    }`

    const userPrompt = `Target Job Role: ${selectedRole.value}
    Interview Question: "${currentQuestion.value}"
    Candidate Response: "${userAnswer.value}"
    Language: English`

    try {
      const res = await fetch(
        `${GEMINI_BASE}/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      )
      const result = await res.json()
      const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text
      if (jsonText) {
        const parsed = JSON.parse(jsonText)
        lastEvaluation.value = parsed
        evaluationsList.value.push(parsed)
        return 'success'
      } else throw new Error('Empty response')
    } catch {
      const wordCount = userAnswer.value.trim().split(/\s+/).length
      const fallback = {
        score: Math.min(65 + wordCount * 2, 92),
        relevanceScore: 85, starScore: wordCount > 25 ? 85 : 65,
        grammarScore: 82,   confidenceScore: 80,
        strengths: "Your response addresses the core prompt directly with clear intent.",
        improvements: "Incorporate specific action verbs and measurable results to strengthen your answer.",
        sampleBetterAnswer: `I have hands-on experience in ${selectedRole.value}. During my internship, I applied structured steps to achieve an effective outcome.`
      }
      lastEvaluation.value = fallback
      evaluationsList.value.push(fallback)
      return 'fallback'
    } finally {
      isAnalyzing.value = false
    }
  }

  async function generateAiDrafts () {
    if (!currentQuestion.value) return
    isGeneratingDrafts.value = true

    const systemPrompt = `You are an expert vocational English interview coach (Dian Hermayani, S.S., M.Pd standard).
    The candidate is applying for: ${selectedRole.value}.
    Question: "${currentQuestion.value}".
    Tone requested: ${draftTone.value}.
    Keywords/Experience: "${draftKeywords.value}".

    Generate exactly 3 JSON draft answer options in English tailored for a vocational graduate.
    Format required:
    [
      { "title": "STAR Standard Response", "text": "English response text..." },
      { "title": "Direct & Action-Oriented", "text": "English response text..." },
      { "title": "Technical Highlight", "text": "English response text..." }
    ]
    Output ONLY valid JSON array with no extra markdown formatting.`

    try {
      const res = await fetch(
        `${GEMINI_BASE}/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      )
      const result = await res.json()
      const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text
      if (jsonText) {
        generatedDrafts.value = JSON.parse(jsonText)
      } else throw new Error('Empty')
    } catch {
      const kw = draftKeywords.value ? ` using ${draftKeywords.value}` : ''
      generatedDrafts.value = [
        { title: 'Structured STAR Framework', text: `Thank you for asking. In my vocational studies and practical work in ${selectedRole.value}, I faced a situation where I needed to demonstrate my technical competence${kw}. I took structured action by inspecting the situation carefully, applying my hands-on training, and delivering a reliable solution that benefited the team.` },
        { title: 'Direct & Action-Oriented',  text: `I specialize in ${selectedRole.value}. When handling this task, I prioritize efficiency, clear communication, and quality results. My experience${kw} has taught me to remain calm under pressure and continuously learn new techniques to keep my work at industry standards.` },
        { title: 'Technical Focus & Skill Showcase', text: `Regarding this topic, my core strength lies in applying technical best practices in ${selectedRole.value}${kw}. During my school projects and practical training, I systematically identified challenges, utilized appropriate tools, and successfully completed tasks with accuracy.` }
      ]
    } finally {
      isGeneratingDrafts.value = false
    }
  }

  async function speakCurrentQuestion () {
    if (!currentQuestion.value || isSpeakingTTS.value) return
    isSpeakingTTS.value = true
    try {
      const res = await fetch(
        `${GEMINI_BASE}/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Read this job interview question clearly and warmly in natural English: ${currentQuestion.value}` }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
            }
          })
        }
      )
      const result = await res.json()
      const audioData = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data
      if (audioData) {
        const audioCtx   = new (window.AudioContext || window.webkitAudioContext)()
        const binaryStr  = atob(audioData)
        const bytes      = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i)
        const int16      = new Int16Array(bytes.buffer)
        const buffer     = audioCtx.createBuffer(1, int16.length, 24000)
        const ch         = buffer.getChannelData(0)
        for (let i = 0; i < int16.length; i++) ch[i] = int16[i] / 32768.0
        const src        = audioCtx.createBufferSource()
        src.buffer       = buffer
        src.connect(audioCtx.destination)
        src.onended      = () => { isSpeakingTTS.value = false }
        src.start()
        return
      }
    } catch { /* fall through to browser TTS */ }
    // Browser TTS fallback
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(currentQuestion.value)
      utt.lang  = 'en-US'
      utt.onend = () => { isSpeakingTTS.value = false }
      window.speechSynthesis.speak(utt)
    } else {
      isSpeakingTTS.value = false
    }
  }

  function selectDraft (text) {
    userAnswer.value    = text
    showDraftModal.value = false
  }

  function appendSentence (phrase) {
    userAnswer.value = (userAnswer.value ? userAnswer.value + ' ' : '') + phrase
  }

  function openDraftModal () {
    if (!isInterviewActive.value || !currentQuestion.value) return false
    showDraftModal.value = true
    if (!generatedDrafts.value.length) generateAiDrafts()
    return true
  }

  return {
    studentName, selectedRole, selectedLang, selectedDifficulty,
    isInterviewActive, currentQuestionIndex, totalQuestions,
    currentQuestion, userAnswer, isAnalyzing, isSpeakingTTS, isListening,
    evaluationsList, lastEvaluation,
    showDraftModal, draftTone, draftKeywords, isGeneratingDrafts, generatedDrafts, quickPhrases,
    completedQuestionsCount, averageScore, currentFormattedDate,
    persistStudentName,
    startInterview, resetInterview, loadQuestion, nextQuestion,
    submitAnswer, generateAiDrafts, speakCurrentQuestion,
    selectDraft, appendSentence, openDraftModal,
    roles
  }
})
