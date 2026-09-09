/**
 * useTTS – composable for browser Speech Synthesis (Web Speech API)
 * Used as fallback when Gemini TTS is unavailable.
 */
export function useTTS () {
  function playSpeech (text, lang = 'en-US', rate = 0.9) {
    if (!text) return
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utt  = new SpeechSynthesisUtterance(text)
    utt.lang   = lang
    utt.rate   = rate
    window.speechSynthesis.speak(utt)
  }

  function cancelSpeech () {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }

  return { playSpeech, cancelSpeech }
}
