<script setup>
import { computed, ref } from 'vue'
import BasePagination from '../common/BasePagination.vue'
import BaseSectionTitle from '../common/BaseSectionTitle.vue'
import { useRowSelection } from '../../composables/useRowSelection'

defineProps({
  title: { type: String, default: '주문 목록' },
  summaryLabel: { type: String, default: '전체 주문 건수' },
})

const currentPage = ref(1)
const rows = ref([
  {
    id: '202603148876',
    market: 'coupang',
    status: '배송 준비 중',
    buyer: '홍길동 010-1234-5678',
    product: '무선 이어폰 29,000',
    margin: '39,000 10,000 (20%)',
    source: 'amazon',
  },
  {
    id: '202603148877',
    market: 'coupang',
    status: '배송 준비 중',
    buyer: '홍길동 010-1234-5678',
    product: '무선 이어폰 29,000',
    margin: '39,000 10,000 (20%)',
    source: 'amazon',
  },
  {
    id: '202603148878',
    market: 'coupang',
    status: '배송 준비 중',
    buyer: '홍길동 010-1234-5678',
    product: '무선 이어폰 29,000',
    margin: '39,000 10,000 (20%)',
    source: 'amazon',
  },
])

const { selectedKeys, allSelected, isSelected, toggleRow } = useRowSelection(rows, (row) => row.id)

const selectedCount = computed(() => selectedKeys.value.length)
</script>

<template>
  <section class="mt-8">
    <div class="flex items-center justify-between gap-3">
      <BaseSectionTitle>{{ title }}</BaseSectionTitle>
      <span class="text-sm text-neutral-500">{{ summaryLabel }} {{ selectedCount }}개 선택</span>
    </div>
    <div class="mt-4 overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div
        class="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-3 text-xs font-medium text-neutral-600 md:grid-cols-12 md:text-sm"
      >
        <span class="md:col-span-1">
          <input
            v-model="allSelected"
            type="checkbox"
            class="rounded border-neutral-300"
            aria-label="주문 전체 선택"
          />
        </span>
        <span class="md:col-span-2">주문번호 / 마켓</span>
        <span class="md:col-span-2">배송 상태</span>
        <span class="md:col-span-2">구매자</span>
        <span class="md:col-span-3">상품</span>
        <span class="md:col-span-2">마진</span>
      </div>
      <div
        v-for="row in rows"
        :key="row.id"
        class="grid grid-cols-1 gap-2 border-b border-neutral-100 px-4 py-4 text-sm last:border-0 md:grid-cols-12 md:items-center"
      >
        <div class="flex items-center md:col-span-1">
          <input
            type="checkbox"
            class="rounded border-neutral-300"
            :checked="isSelected(row.id)"
            :aria-label="`${row.id} 주문 선택`"
            @change="toggleRow(row.id, $event.target.checked)"
          />
        </div>
        <div class="md:col-span-2">
          <span class="font-mono text-neutral-800">{{ row.id }}</span>
          <span class="ml-2 text-neutral-500">{{ row.market }}</span>
        </div>
        <div class="md:col-span-2">
          <span class="rounded bg-neutral-100 px-2 py-1 text-xs">{{ row.status }}</span>
        </div>
        <div class="text-neutral-700 md:col-span-2">{{ row.buyer }}</div>
        <div class="flex items-center gap-2 md:col-span-3">
          <span class="size-14 shrink-0 rounded bg-neutral-100" />
          <span>{{ row.product }}</span>
        </div>
        <div class="text-neutral-800 md:col-span-2">{{ row.margin }}</div>
      </div>
    </div>
    <BasePagination v-model:current-page="currentPage" :total-pages="2" />
  </section>
</template>
