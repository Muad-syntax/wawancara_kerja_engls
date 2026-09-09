import { createRouter, createWebHistory } from 'vue-router'
import SimulationView   from '../views/SimulationView.vue'
import SpeakingView     from '../views/SpeakingView.vue'
import StarView         from '../views/StarView.vue'
import EtikaView        from '../views/EtikaView.vue'
import CertificateView  from '../views/CertificateView.vue'

const routes = [
  { path: '/',            name: 'simulasi',   component: SimulationView,  meta: { title: 'Interview Simulation' } },
  { path: '/speaking',    name: 'speaking',   component: SpeakingView,    meta: { title: 'Speaking & Vocab' } },
  { path: '/star',        name: 'star',       component: StarView,        meta: { title: 'STAR Method' } },
  { path: '/etika',       name: 'etika',      component: EtikaView,       meta: { title: 'Etiquette & Dress Code' } },
  { path: '/certificate', name: 'sertifikat', component: CertificateView, meta: { title: 'Report & Certificate' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
