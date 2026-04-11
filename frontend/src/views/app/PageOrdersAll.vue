<script setup>
import BaseStatCard from '../../components/common/BaseStatCard.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'
import OrderListBlock from '../../components/sidebar/OrderListBlock.vue'

const stats = [
  { label: '오늘 수집한 상품', value: '—', tone: 'muted' },
  { label: '자동 주문 성공', value: 50, tone: 'primary' },
  { label: '자동 주문 실패', value: 6, tone: 'danger' },
  { label: '송장 미등록', value: 11, tone: 'warning' },
]
</script>

<template>
  <div>
    <section>
      <BaseSectionTitle>전체 주문 건수</BaseSectionTitle>
      <div class="mt-3 h-px bg-neutral-200" />
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BaseStatCard
          v-for="stat in stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :tone="stat.tone"
        />
      </div>
    </section>
    <OrderListBlock />
  </div>
</template>
