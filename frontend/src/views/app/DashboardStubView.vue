<script setup>
import BaseStatCard from '../../components/common/BaseStatCard.vue'

const stats = [
  { label: '지표 1', value: '—', tone: 'primary' },
  { label: '지표 2', value: '—', tone: 'primary' },
  { label: '지표 3', value: '—', tone: 'primary' },
  { label: '지표 4', value: '—', tone: 'primary' },
]
</script>

<template>
  <div>
    <p class="mt-2 text-neutral-600">
      요약 지표와 차트 영역은 (3) 대시보드 제안과 연동해 확장할 수 있습니다.
    </p>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <BaseStatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :tone="stat.tone"
      />
    </div>
  </div>
</template>
