import { ref } from 'vue'

/**
 * useSpeechRecognition – composable wrapping Web Speech Recognition API.
 * Returns reactive state and start/stop helpers.
 */
export function useSpeechRecognition () {
  const isListening  = ref(false)
  const transcript   = ref('')
  const isSupported  = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

  let recognition = null
  if (isSupported) {
    const SR   = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SR()
    recognition.continuous     = true
    recognition.interimResults = true
    recognition.lang           = 'en-US'
  }

  function start (onResult, onError) {
    if (!recognition) { onError?.('Speech recognition not supported'); return }
    isListening.value = true
    transcript.value  = ''

    recognition.onresult = (event) => {
      let text = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript
      }
      transcript.value = text
      onResult?.(text)
    }

    recognition.onerror = () => {
      isListening.value = false
      onError?.('Unable to access microphone.')
    }

    recognition.onend = () => { isListening.value = false }

    recognition.start()
  }

  function stop () {
    recognition?.stop()
    isListening.value = false
  }

  function startOnce (onResult, onError) {
    if (!recognition) { onError?.('Speech recognition not supported'); return }
    const SR  = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang  = 'en-US'
    isListening.value = true

    rec.onresult = (e) => {
      const result = e.results[0][0].transcript
      transcript.value  = result
      isListening.value = false
      onResult?.(result)
    }

    rec.onerror = () => {
      isListening.value = false
      onError?.('Speech test error.')
    }

    rec.onend = () => { isListening.value = false }
    rec.start()
  }

  return { isListening, transcript, isSupported, start, stop, startOnce }
}
