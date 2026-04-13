<script setup>
import { computed, ref } from 'vue'
import BaseCheckTable from '../common/BaseCheckTable.vue'
import BasePagination from '../common/BasePagination.vue'
import BaseSectionTitle from '../common/BaseSectionTitle.vue'

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

const columns = [
  { key: 'order', label: '주문번호 / 마켓' },
  { key: 'status', label: '배송 상태' },
  { key: 'buyer', label: '구매자', cellClass: 'text-neutral-700' },
  { key: 'product', label: '상품' },
  { key: 'margin', label: '마진', cellClass: 'text-neutral-800' },
]

const selectedKeys = ref([])
const selectedCount = computed(() => selectedKeys.value.length)
</script>

<template>
  <section class="mt-8">
    <div class="flex items-center justify-between gap-3">
      <BaseSectionTitle>{{ title }}</BaseSectionTitle>
      <span class="text-sm text-neutral-500">{{ summaryLabel }} {{ selectedCount }}개 선택</span>
    </div>
    <div class="mt-4">
      <BaseCheckTable
        v-model:selected-keys="selectedKeys"
        :columns="columns"
        :rows="rows"
        row-key="id"
        select-all-label="주문 전체 선택"
        :row-select-label="(row) => `${row.id} 주문 선택`"
      >
        <template #cell-order="{ row }">
          <span class="font-mono text-neutral-800">{{ row.id }}</span>
          <span class="ml-2 text-neutral-500">{{ row.market }}</span>
        </template>
        <template #cell-status="{ row }">
          <span class="rounded bg-neutral-100 px-2 py-1 text-xs">{{ row.status }}</span>
        </template>
        <template #cell-product="{ row }">
          <div class="flex items-center gap-2">
            <span class="size-14 shrink-0 rounded bg-neutral-100" />
            <span>{{ row.product }}</span>
          </div>
        </template>
      </BaseCheckTable>
    </div>
    <BasePagination v-model:current-page="currentPage" :total-pages="2" />
  </section>
</template>
