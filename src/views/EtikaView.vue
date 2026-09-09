<script setup>
import EtiketteCard from '../components/EtiketteCard.vue'
import EtiketteQuiz from '../components/EtiketteQuiz.vue'

const dresscodeCards = [
  {
    title:    'Gentlemen (Formal Attire)',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Male Attire',
    points: [
      'Long-sleeve formal white or soft-toned button-up shirt.',
      'Dark-colored dress trousers (no denim or jeans).',
      'Matching dark tie and polished belt.',
      'Clean dark leather shoes (pantofel) with dark socks.',
      'Neatly groomed hair and clean-shaven appearance.',
    ]
  },
  {
    title:    'Ladies (Formal Attire / Hijab)',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Female Attire',
    points: [
      'Professional blouse or blazer (non-transparent/modest).',
      'Dark formal skirt (knee-length or longer) or trousers.',
      'For Hijab wearers: Solid neutral-colored square scarf.',
      'Closed-toe dress shoes or modest low heels (3–5 cm).',
      'Natural, subtle makeup and understated accessories.',
    ]
  },
  {
    title:    'Body Language & Posture',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Body Language',
    points: [
      'Knock gently 3 times before entering the room.',
      'Firm handshake (if offered) or polite gesture with a warm smile.',
      'Sit upright with good posture; do not slouch or cross arms.',
      'Maintain consistent eye contact (approx. 60–70% of the time).',
      'Nod slightly to show active listening and eliminate fidgeting.',
    ]
  },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="glass-panel p-6 rounded-2xl border border-slate-200">
      <h2 class="text-xl font-bold text-slate-900">Job Interview Etiquette &amp; Dress Code Guide</h2>
      <p class="text-sm text-slate-600 mt-1">
        Professional standard appearance and communication guidelines tailored for vocational students and graduates entering global industries.
      </p>
    </div>

    <!-- Dress Code Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EtiketteCard
        v-for="card in dresscodeCards"
        :key="card.title"
        v-bind="card"
      />
    </div>

    <!-- Quiz -->
    <EtiketteQuiz />
  </div>
</template>
