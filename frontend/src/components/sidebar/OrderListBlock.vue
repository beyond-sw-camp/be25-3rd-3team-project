<script setup>
import { computed, ref, watch } from 'vue'
import BaseCheckTable from '../common/BaseCheckTable.vue'
import BasePagination from '../common/BasePagination.vue'
import BaseSectionTitle from '../common/BaseSectionTitle.vue'

const props = defineProps({
  title: { type: String, default: '주문 목록' },
  summaryLabel: { type: String, default: '전체 주문 건수' },
  rows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

const search = ref('')
const currentPage = ref(1)
const pageSize = 10
const selectedKeys = ref([])

const columns = [
  { key: 'order', label: '주문번호 / 마켓', cellClass: 'whitespace-nowrap w-[180px]' },
  { key: 'status', label: '배송 상태', cellClass: 'w-[120px]' },
  { key: 'buyer', label: '고객 / 연락처', cellClass: 'w-[220px]' },
  { key: 'product', label: '주문 상품 / 가격', cellClass: 'w-[420px]' },
  { key: 'margin', label: '결제 금액 / 마진', cellClass: 'whitespace-nowrap w-[180px]' },
]

const currency = (value) => {
  return new Intl.NumberFormat('ko-KR').format(value || 0)
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083').replace(/\/$/, '')
const productImageKeys = [
  'productImage',
  'productImageUrl',
  'imageUrl',
  'thumbnailUrl',
  'thumbnail',
  'image',
  'imgUrl',
  'img',
]

function resolveImageSrc(value) {
  if (!value || typeof value !== 'string') return ''

  const trimmed = value.trim()

  if (!trimmed) return ''
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed
  if (trimmed.startsWith('//')) return `https:${trimmed}`
  if (trimmed.startsWith('/')) return `${apiBaseUrl}${trimmed}`

  return `${apiBaseUrl}/${trimmed.replace(/^\.?\//, '')}`
}

function getProductImage(row) {
  const candidates = [row, row?.raw, row?.product, row?.raw?.product]

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== 'object') continue

    for (const key of productImageKeys) {
      const resolved = resolveImageSrc(candidate[key])

      if (resolved) return resolved
    }
  }

  return ''
}

/**
 * 백엔드 rows를 기존 BaseCheckTable 형식으로 변환
 * 기존 테이블 구조를 유지하기 위해 화면용 데이터로 매핑
 */
const normalizedRows = computed(() => {
  return props.rows.map((row) => ({
    id: row.orderId,
    market: row.overseasMall || '-',
    status: row.autoOrderStatusLabel || row.statusLabel || '-',
    buyer: `${row.customerName || '-'} ${row.customerPhone || ''}`.trim(),
    buyerName: row.customerName || '-',
    buyerPhone: row.customerPhone || '-',
    product: `${row.productName || '-'} / ₩${currency(row.paymentAmount)}`,
    productImage: getProductImage(row),
    productName: row.productName || '-',
    paymentAmount: row.paymentAmount ?? 0,
    marginValue: row.margin ?? 0,
    margin: `₩${currency(row.paymentAmount)} / ₩${currency(row.margin)}`,
    source: row.overseasMall || '-',

    orderId: row.orderId,
    autoOrderStatusLabel: row.autoOrderStatusLabel,
    statusLabel: row.statusLabel,
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    overseasMall: row.overseasMall,
  }))
})

const filteredRows = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) return normalizedRows.value

  return normalizedRows.value.filter((row) => {
    return [
      row.orderId,
      row.customerName,
      row.customerPhone,
      row.productName,
      row.overseasMall,
      row.autoOrderStatusLabel,
      row.statusLabel,
    ]
      .join(' ')
      .toLowerCase()
      .includes(keyword)
  })
})

const totalCount = computed(() => filteredRows.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / pageSize)))

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredRows.value.slice(start, end)
})

const selectedCount = computed(() => selectedKeys.value.length)

watch(search, () => {
  currentPage.value = 1
  selectedKeys.value = []
})

watch(
  () => props.rows,
  () => {
    currentPage.value = 1
    selectedKeys.value = []
  },
  { deep: true },
)
</script>

<template>
  <section class="mt-8">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <BaseSectionTitle>{{ title }}</BaseSectionTitle>
        <div class="mt-1 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          <span>{{ summaryLabel }} {{ totalCount }}건</span>
          <span>{{ selectedCount }}개 선택</span>
        </div>
      </div>

      <input
        v-model="search"
        type="search"
        placeholder="주문번호 / 고객명 / 상품명 검색"
        class="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm sm:max-w-xs"
      />
    </div>

    <div
      v-if="loading"
      class="mt-4 rounded-lg border border-neutral-200 bg-white px-4 py-10 text-center text-sm text-neutral-500"
    >
      주문 데이터를 불러오는 중입니다.
    </div>

    <div
      v-else-if="error"
      class="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-10 text-center text-sm text-red-500"
    >
      {{ error }}
    </div>

    <div
      v-else-if="pagedRows.length === 0"
      class="mt-4 rounded-lg border border-neutral-200 bg-white px-4 py-10 text-center text-sm text-neutral-500"
    >
      표시할 주문이 없습니다.
    </div>

    <div v-else class="mt-4">
      <BaseCheckTable
        v-model:selected-keys="selectedKeys"
        :columns="columns"
        :rows="pagedRows"
        row-key="id"
        select-all-label="주문 전체 선택"
        :row-select-label="(row) => `${row.id} 주문 선택`"
      >
        <template #cell-order="{ row }">
          <div class="whitespace-nowrap text-neutral-800">
            <span class="font-mono">{{ row.id }}</span>
            <span class="mx-1 text-neutral-400">/</span>
            <span class="text-neutral-500">{{ row.market }}</span>
          </div>
        </template>

        <template #cell-buyer="{ row }">
          <div class="whitespace-nowrap text-neutral-700">
            <span class="font-medium text-neutral-900">{{ row.buyerName }}</span>
            <span class="mx-1 text-neutral-400">/</span>
            <span>{{ row.buyerPhone }}</span>
          </div>
        </template>

        <template #cell-status="{ row }">
          <span class="rounded bg-neutral-100 px-2 py-1 text-xs">{{ row.status }}</span>
        </template>

        <template #cell-product="{ row }">
          <div class="flex items-center gap-2">
            <img
              v-if="row.productImage"
              :src="row.productImage"
              :alt="row.productName"
              class="size-14 shrink-0 rounded bg-neutral-100 object-cover"
            />
            <span v-else class="size-14 shrink-0 rounded bg-neutral-100" />
            <span>{{ row.product }}</span>
          </div>
        </template>
      </BaseCheckTable>
    </div>

    <BasePagination
      v-if="!loading && !error && totalPages > 0"
      v-model:current-page="currentPage"
      :total-pages="totalPages"
    />
  </section>
</template>
