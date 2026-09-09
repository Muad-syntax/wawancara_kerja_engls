<script setup>
defineProps({
  studentName:   { type: String, default: 'Student Name' },
  selectedRole:  { type: String, default: '' },
  averageScore:  { type: Number, default: 0 },
  formattedDate: { type: String, default: '' },
})
</script>

<template>
  <div
    id="certificate-print"
    class="bg-white p-8 sm:p-12 rounded-2xl border-8 border-double border-slate-300 shadow-2xl relative overflow-hidden max-w-4xl mx-auto my-6 text-slate-800"
  >
    <!-- Background glows -->
    <div class="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-0 pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-0 pointer-events-none"></div>

    <div class="relative z-10 text-center space-y-6">
      <!-- Letterhead -->
      <div class="flex justify-between items-center border-b border-slate-200 pb-6">
        <div class="text-left">
          <h4 class="font-extrabold text-base text-slate-900 tracking-tight">SMK TI MUHAMMADIYAH CIKAMPEK</h4>
          <p class="text-xs text-slate-500">Language Laboratory &amp; Career Development Center</p>
        </div>
        <div class="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-md">
          TI
        </div>
      </div>

      <!-- Title -->
      <div class="py-4">
        <h1 class="text-2xl sm:text-4xl font-extrabold tracking-widest text-slate-900 uppercase" style="font-family: serif">
          CERTIFICATE OF COMPLETION
        </h1>
        <p class="text-xs sm:text-sm text-emerald-700 font-semibold tracking-widest uppercase mt-1">
          Virtual English Job Interview Competency Assessment
        </p>
      </div>

      <!-- Recipient -->
      <div class="space-y-2">
        <p class="text-xs text-slate-500 uppercase tracking-wider">This is to certify that:</p>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-emerald-800 underline decoration-emerald-500 decoration-2 underline-offset-8">
          {{ studentName || 'Student Name' }}
        </h2>
      </div>

      <p class="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
        has successfully completed the Interactive English Job Interview Assessment in
        <strong>Virtual Job Interview Lab SMK TI Muhammadiyah Cikampek</strong>
        for the target position <strong>{{ selectedRole }}</strong> with an overall score of:
      </p>

      <div class="inline-block bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-xl border border-slate-800">
        <span class="text-xs uppercase tracking-wider block text-slate-400">Final Competency Score:</span>
        <span class="text-3xl font-extrabold text-emerald-400">{{ averageScore }} / 100</span>
      </div>

      <!-- Signatures -->
      <div class="grid grid-cols-2 gap-8 pt-10 border-t border-slate-200 text-xs">
        <div class="text-center space-y-12">
          <p class="text-slate-500">Acknowledged by,<br />Head of Department / School Principal</p>
          <div class="font-bold text-slate-800 border-b border-slate-400 inline-block px-4 pb-1">______________________</div>
        </div>
        <div class="text-center space-y-12">
          <p class="text-slate-500">Cikampek, {{ formattedDate }}<br />English Teacher &amp; Lab Instructor,</p>
          <div>
            <div class="font-bold text-slate-900 text-sm border-b border-slate-800 inline-block px-4 pb-1">Dian Hermayani, S.S., M.Pd.</div>
            <p class="text-[10px] text-slate-500 mt-0.5">SMK TI Muhammadiyah Cikampek</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
