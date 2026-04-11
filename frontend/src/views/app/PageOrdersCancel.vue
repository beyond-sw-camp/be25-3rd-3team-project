<script setup>
import BaseStatCard from '../../components/common/BaseStatCard.vue'
import BaseSectionTitle from '../../components/common/BaseSectionTitle.vue'
import OrderListBlock from '../../components/sidebar/OrderListBlock.vue'

const stats = [
  { label: '오늘 수집한 상품', value: '—', tone: 'muted' },
  { label: '취소 완료', value: 50, tone: 'primary' },
  { label: '자동 주문 처리 중', value: 6 },
  { label: '재시도 대기 중', value: 6, tone: 'warning' },
]
</script>

<template>
  <div>
    <section>
      <BaseSectionTitle>취소/환불 건수</BaseSectionTitle>
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
    <OrderListBlock title="주문 목록" summary-label="취소/환불 건수" />
  </div>
</template>
